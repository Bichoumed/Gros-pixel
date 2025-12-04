// Sound generation using Web Audio API
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  switch(type) {
    case 'click':
      oscillator.frequency.value = 800;
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.1);
      break;
    case 'correct':
      oscillator.frequency.value = 523.25;
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      oscillator.start(audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1046.50, audioCtx.currentTime + 0.2);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      oscillator.stop(audioCtx.currentTime + 0.3);
      break;
    case 'wrong':
      oscillator.frequency.value = 200;
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      oscillator.start(audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.3);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
      oscillator.stop(audioCtx.currentTime + 0.4);
      break;
    case 'start':
      oscillator.frequency.value = 440;
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      oscillator.start(audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
      oscillator.stop(audioCtx.currentTime + 0.2);
      break;
  }
}

// Add sound to all buttons
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON' || e.target.classList.contains('btn')) {
    playSound('click');
  }
});

// Quiz logic
const questions = [
  {
    q: "Quel est l'objectif principal du 3FA ?",
    choices: [
      "Remplacer les mots de passe par des images",
      "Combiner plusieurs preuves d'identité pour sécuriser l'accès",
      "Utiliser un seul facteur mais très long",
      "Supprimer l'authentification"
    ],
    a: 1
  },
  {
    q: "Quelle est une attaque courante ciblant les mots de passe ?",
    choices: ["Phishing", "Mise à jour", "Compression", "Minification"],
    a: 0
  },
  {
    q: "Quel outil protège la confidentialité sur un réseau public ?",
    choices: ["VPN", "HTTP", "FTP", "Telnet"],
    a: 0
  },
  {
    q: "Quel élément n'est PAS une bonne pratique contre le phishing ?",
    choices: ["Vérifier les liens", "Ouvrir tous les emails", "Activer MFA", "Vérifier l'expéditeur"],
    a: 1
  }
];

let current = 0;
let score = 0;
let timer = null;
let timeLeft = 30;

const modal = document.getElementById('quiz-modal');
const closeBtn = document.getElementById('close-quiz');
const startBtn = document.getElementById('start-quiz');
const startBtn2 = document.getElementById('start-quiz-2');
const nextBtn = document.getElementById('next-btn');
const endBtn = document.getElementById('end-quiz');
const qIndexEl = document.getElementById('q-index');
const qCountEl = document.getElementById('q-count');
const qText = document.getElementById('question-text');
const choicesEl = document.getElementById('choices');
const timerEl = document.getElementById('timer');
const scoreEl = document.getElementById('score');
const resultEl = document.getElementById('result');

qCountEl.textContent = questions.length;

function openQuiz(){
  playSound('start');
  modal.classList.remove('hidden');
  resetQuiz();
  renderQuestion();
}

function closeQuiz(){
  playSound('click');
  modal.classList.add('hidden');
  stopTimer();
}

startBtn.addEventListener('click', openQuiz);
startBtn2.addEventListener('click', openQuiz);
closeBtn.addEventListener('click', closeQuiz);
endBtn.addEventListener('click', closeQuiz);

function resetQuiz(){
  current = 0;
  score = 0;
  scoreEl.textContent = score;
  resultEl.classList.add('hidden');
  nextBtn.classList.remove('hidden');
  endBtn.classList.add('hidden');
  nextBtn.textContent = 'SUIVANT ▶';
}

function renderQuestion(){
  const q = questions[current];
  qIndexEl.textContent = current + 1;
  qText.textContent = q.q;
  choicesEl.innerHTML = '';
  q.choices.forEach((c, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice';
    btn.textContent = c;
    btn.dataset.index = i;
    btn.addEventListener('click', onChoice);
    choicesEl.appendChild(btn);
  });
  startTimer();
}

function onChoice(e){
  const idx = Number(e.currentTarget.dataset.index);
  const correctIdx = questions[current].a;
  Array.from(choicesEl.children).forEach(ch => ch.disabled = true);
  
  if(idx === correctIdx){
    playSound('correct');
    e.currentTarget.classList.add('correct');
    score += 1;
    scoreEl.textContent = score;
  } else {
    playSound('wrong');
    e.currentTarget.classList.add('wrong');
    const correctBtn = Array.from(choicesEl.children).find(c => Number(c.dataset.index) === correctIdx);
    if(correctBtn) correctBtn.classList.add('correct');
  }
  
  stopTimer();
  
  if(current === questions.length - 1){
    nextBtn.textContent = 'TERMINER ▶';
  } else {
    nextBtn.textContent = 'SUIVANT ▶';
  }
}

nextBtn.addEventListener('click', () => {
  if(Array.from(choicesEl.children).some(c => !c.disabled)){
    stopTimer();
    const correctIdx = questions[current].a;
    const correctBtn = Array.from(choicesEl.children).find(c => Number(c.dataset.index) === correctIdx);
    if(correctBtn) correctBtn.classList.add('correct');
    Array.from(choicesEl.children).forEach(ch => ch.disabled = true);
  }
  
  if(current < questions.length - 1){
    current++;
    renderQuestion();
  } else {
    showResults();
  }
});

function showResults(){
  playSound('start');
  resultEl.classList.remove('hidden');
  resultEl.innerHTML = `<strong>★ RÉSULTAT: ${score}/${questions.length} ★</strong><p>${getMessage(score)}</p>`;
  nextBtn.classList.add('hidden');
  endBtn.classList.remove('hidden');
  stopTimer();
}

function getMessage(s){
  const pct = Math.round((s / questions.length) * 100);
  if(pct === 100) return 'EXCELLENT — TU MAÎTRISES BIEN!';
  if(pct >= 70) return 'BON TRAVAIL — ENCORE UN PEU!';
  if(pct >= 40) return 'MOYEN — RÉVISE BIEN!';
  return 'ENTRAÎNE-TOI ENCORE!';
}

function startTimer(){
  stopTimer();
  timeLeft = 30;
  timerEl.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if(timeLeft <= 5 && timeLeft > 0) {
      playSound('click');
    }
    if(timeLeft <= 0){
      playSound('wrong');
      Array.from(choicesEl.children).forEach(ch => ch.disabled = true);
      const correctIdx = questions[current].a;
      const correctBtn = Array.from(choicesEl.children).find(c => Number(c.dataset.index) === correctIdx);
      if(correctBtn) correctBtn.classList.add('correct');
      stopTimer();
      nextBtn.textContent = (current === questions.length - 1) ? 'TERMINER ▶' : 'SUIVANT ▶';
    }
  }, 1000);
}

function stopTimer(){
  if(timer){
    clearInterval(timer);
    timer = null;
  }
}