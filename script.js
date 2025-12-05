// ==========================
// AUDIO RÉTRO
// ==========================
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  switch(type){
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
    case 'victory':
      // Son Super Mario Level Complete - Plus fidèle à l'original
      const victoryMelody = [
        {freq: 659, time: 0, duration: 0.15},        // Mi
        {freq: 659, time: 0.15, duration: 0.15},     // Mi
        {freq: 659, time: 0.3, duration: 0.15},      // Mi
        {freq: 523, time: 0.5, duration: 0.1},       // Do
        {freq: 659, time: 0.65, duration: 0.15},     // Mi
        {freq: 784, time: 0.8, duration: 0.4},       // Sol
        {freq: 392, time: 1.3, duration: 0.4}        // Sol grave
      ];
      victoryMelody.forEach(note => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'square';
        osc.frequency.value = note.freq;
        gain.gain.setValueAtTime(0.25, audioCtx.currentTime + note.time);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + note.time + note.duration);
        osc.start(audioCtx.currentTime + note.time);
        osc.stop(audioCtx.currentTime + note.time + note.duration);
      });
      break;
    case 'fail':
      // Son Super Mario Game Over - Plus fidèle à l'original
      const gameOverMelody = [
        {freq: 523, time: 0, duration: 0.25},        // Do
        {freq: 494, time: 0.25, duration: 0.25},     // Si
        {freq: 466, time: 0.5, duration: 0.25},      // La#
        {freq: 440, time: 0.75, duration: 0.4},      // La
        {freq: 349, time: 1.2, duration: 0.25},      // Fa
        {freq: 440, time: 1.5, duration: 0.25},      // La
        {freq: 392, time: 1.8, duration: 0.25},      // Sol
        {freq: 349, time: 2.1, duration: 0.25},      // Fa
        {freq: 330, time: 2.4, duration: 0.25},      // Mi
        {freq: 294, time: 2.7, duration: 0.25},      // Ré
        {freq: 262, time: 3.0, duration: 0.6}        // Do
      ];
      gameOverMelody.forEach(note => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'square';
        osc.frequency.value = note.freq;
        gain.gain.setValueAtTime(0.25, audioCtx.currentTime + note.time);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + note.time + note.duration);
        osc.start(audioCtx.currentTime + note.time);
        osc.stop(audioCtx.currentTime + note.time + note.duration);
      });
      break;
  }
}

// ==========================
// CONTENUS DES CHAPITRES
// ==========================
const chapters = {
  1: { 
    title: "Introduction à la cybersécurité", 
    icon: "🛡️", 
    content: `
      <div class="lesson-box">
        <h3>Qu'est-ce que la cybersécurité ?</h3>
        <p>La cybersécurité consiste à protéger les systèmes, données et réseaux contre les attaques numériques.</p>
      </div>
      <div class="lesson-box">
        <h3>Menaces courantes</h3>
        <ul>
          <li>Virus et malwares</li>
          <li>Ransomware</li>
          <li>Phishing</li>
          <li>Attaques DDoS</li>
          <li>Violations de données</li>
        </ul>
      </div>
      <div class="tip-box">
        <p>La cybersécurité est l'affaire de tous ! Chaque utilisateur doit adopter de bonnes pratiques.</p>
      </div>
    `
  },
  2: { 
    title: "Authentification et 3FA", 
    icon: "🔐", 
    content: `
      <div class="lesson-box">
        <h3>Les trois facteurs d'authentification</h3>
        <ul>
          <li><strong>Ce que vous savez</strong> - Mot de passe, code PIN</li>
          <li><strong>Ce que vous possédez</strong> - Téléphone, carte, clé de sécurité</li>
          <li><strong>Ce que vous êtes</strong> - Empreinte digitale, reconnaissance faciale</li>
        </ul>
      </div>
      <div class="tip-box">
        <p>💡 Mot de passe fort : 12+ caractères avec majuscules, minuscules, chiffres et symboles.</p>
      </div>
      <div class="warning-box">
        <p>Ne réutilisez jamais le même mot de passe sur plusieurs sites !</p>
      </div>
    `
  },
  3: { 
    title: "Cryptographie", 
    icon: "🔒", 
    content: `
      <div class="lesson-box">
        <h3>Qu'est-ce que la cryptographie ?</h3>
        <p>La cryptographie permet de transformer les données pour les protéger contre les accès non autorisés.</p>
      </div>
      <div class="lesson-box">
        <h3>Types de chiffrement</h3>
        <ul>
          <li><strong>Symétrique</strong> - Une seule clé pour chiffrer et déchiffrer</li>
          <li><strong>Asymétrique</strong> - Paire de clés publique/privée</li>
        </ul>
      </div>
      <div class="tip-box">
        <p>Le HTTPS utilise le chiffrement pour sécuriser vos communications web.</p>
      </div>
    `
  },
  4: { 
    title: "Phishing et ingénierie sociale", 
    icon: "🎣", 
    content: `
      <div class="lesson-box">
        <h3>Qu'est-ce que le phishing ?</h3>
        <p>Tentative d'escroquerie en se faisant passer pour une entité de confiance pour voler vos informations.</p>
      </div>
      <div class="lesson-box">
        <h3>Signes d'alerte</h3>
        <ul>
          <li>Urgence artificielle</li>
          <li>Fautes d'orthographe</li>
          <li>URLs suspectes</li>
          <li>Demandes d'informations sensibles</li>
        </ul>
      </div>
      <div class="warning-box">
        <p>⚠ Vérifiez toujours l'expéditeur et ne cliquez jamais sur des liens suspects !</p>
      </div>
    `
  },
  5: { 
    title: "Sécurité réseau", 
    icon: "🌐", 
    content: `
      <div class="lesson-box">
        <h3>Dangers des réseaux publics</h3>
        <p>Le Wi-Fi public est pratique mais dangereux. Vos données peuvent être interceptées.</p>
      </div>
      <div class="lesson-box">
        <h3>Protection recommandée</h3>
        <ul>
          <li>Utilisez un VPN</li>
          <li>Évitez les transactions sensibles</li>
          <li>Désactivez le partage de fichiers</li>
          <li>Utilisez HTTPS</li>
        </ul>
      </div>
      <div class="tip-box">
        <p>Un VPN chiffre votre trafic et protège votre vie privée en ligne.</p>
      </div>
    `
  }
};

// ==========================
// NAVIGATION DES CHAPITRES
// ==========================
const homeView = document.getElementById('home-view');
const chapterView = document.getElementById('chapter-view');
const chapterBtns = document.querySelectorAll('.chapter-btn');

chapterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    playSound('click');
    const chapterId = Number(btn.dataset.chapter);
    loadChapter(chapterId);
  });
});

function loadChapter(id) {
  const chapter = chapters[id];
  if (!chapter) return;

  homeView.classList.add('hidden');
  chapterView.classList.remove('hidden');
  
  chapterView.innerHTML = `
    <div class="chapter-content">
      <div class="chapter-header">
        <h1>${chapter.icon} ${chapter.title}</h1>
      </div>
      ${chapter.content}
      <div class="chapter-nav">
        <button class="btn btn-secondary" id="back-home">← RETOUR ACCUEIL</button>
        ${id < Object.keys(chapters).length ? 
          `<button class="btn" id="next-chapter">CHAPITRE SUIVANT →</button>` : 
          '<button class="btn" id="start-quiz">🎮 COMMENCER LE QUIZ</button>'
        }
      </div>
    </div>
  `;

  window.scrollTo({ top: 0, behavior: 'smooth' });

  document.getElementById('back-home').addEventListener('click', () => {
    playSound('click');
    chapterView.classList.add('hidden');
    homeView.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const nextBtn = document.getElementById('next-chapter');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      playSound('click');
      loadChapter(id + 1);
    });
  }

  const startQuizBtn = document.getElementById('start-quiz');
  if (startQuizBtn) {
    startQuizBtn.addEventListener('click', openQuiz);
  }
}

// ==========================
// QUESTIONS QUIZ
// ==========================
const questions = [
  {
    q: "Quel est l'objectif principal du 3FA ?",
    choices: [
      "Remplacer les mots de passe",
      "Combiner trois types de preuves",
      "Utiliser un facteur très long",
      "Supprimer l'authentification"
    ],
    a: 1
  },
  {
    q: "Quelle attaque cible souvent les mots de passe ?",
    choices: [
      "Phishing",
      "Mise à jour système",
      "Compression de données",
      "Minification de code"
    ],
    a: 0
  },
  {
    q: "Quel outil protège sur un réseau public ?",
    choices: ["VPN", "HTTP", "FTP", "Telnet"],
    a: 0
  },
  {
    q: "Quelle est une mauvaise pratique contre le phishing ?",
    choices: [
      "Vérifier les liens",
      "Ouvrir tous les emails",
      "Activer MFA",
      "Vérifier l'expéditeur"
    ],
    a: 1
  },
  {
    q: "Que signifie HTTPS ?",
    choices: [
      "Hyper Text Protocol Secure",
      "HTTP Sécurisé",
      "Haute Performance",
      "Aucune de ces réponses"
    ],
    a: 1
  },
  {
    q: "Quel est le meilleur type de chiffrement ?",
    choices: [
      "Pas de chiffrement",
      "Chiffrement faible",
      "Chiffrement fort (AES-256)",
      "Chiffrement inversé"
    ],
    a: 2
  }
];

// ==========================
// VARIABLES QUIZ
// ==========================
let current = 0;
let score = 0;
let timer = null;
let timeLeft = 30;
let birdInterval = null;

const modal = document.getElementById('quiz-modal');
const closeBtn = document.getElementById('close-quiz');
const startBtnGlobal = document.getElementById('start-quiz-global');
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

// ==========================
// QUIZ LOGIC
// ==========================
function openQuiz() {
  playSound('start');
  modal.classList.remove('hidden');
  resetQuiz();
  renderQuestion();
  startBirdAnimation();
}

function closeQuiz() {
  playSound('click');
  modal.classList.add('hidden');
  stopTimer();
  stopBirdAnimation();
}

startBtnGlobal.addEventListener('click', openQuiz);
closeBtn.addEventListener('click', closeQuiz);
endBtn.addEventListener('click', closeQuiz);

function resetQuiz() {
  current = 0;
  score = 0;
  scoreEl.textContent = score;
  resultEl.classList.add('hidden');
  nextBtn.classList.remove('hidden');
  endBtn.classList.add('hidden');
  nextBtn.textContent = 'SUIVANT ▶';
}

function renderQuestion() {
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

function onChoice(e) {
  const idx = Number(e.currentTarget.dataset.index);
  const correctIdx = questions[current].a;
  
  Array.from(choicesEl.children).forEach(ch => {
    ch.disabled = true;
    ch.style.cursor = 'not-allowed';
  });

  if (idx === correctIdx) {
    playSound('correct');
    e.currentTarget.classList.add('correct');
    score++;
    scoreEl.textContent = score;
  } else {
    playSound('wrong');
    e.currentTarget.classList.add('wrong');
    const correctBtn = Array.from(choicesEl.children).find(
      c => Number(c.dataset.index) === correctIdx
    );
    if (correctBtn) correctBtn.classList.add('correct');
  }

  stopTimer();
  nextBtn.textContent = (current === questions.length - 1) ? 'TERMINER ▶' : 'SUIVANT ▶';
}

nextBtn.addEventListener('click', () => {
  playSound('click');
  stopTimer();
  
  const hasAnswered = Array.from(choicesEl.children).every(c => c.disabled);
  if (!hasAnswered) {
    const correctIdx = questions[current].a;
    const correctBtn = Array.from(choicesEl.children).find(
      c => Number(c.dataset.index) === correctIdx
    );
    if (correctBtn) correctBtn.classList.add('correct');
    Array.from(choicesEl.children).forEach(ch => ch.disabled = true);
  }
  
  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  } else {
    showResults();
  }
});

function startTimer() {
  stopTimer();
  timeLeft = 30;
  timerEl.textContent = timeLeft;
  
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    
    if (timeLeft <= 5 && timeLeft > 0) {
      playSound('click');
    }
    
    if (timeLeft <= 0) {
      playSound('wrong');
      Array.from(choicesEl.children).forEach(ch => ch.disabled = true);
      const correctIdx = questions[current].a;
      const correctBtn = Array.from(choicesEl.children).find(
        c => Number(c.dataset.index) === correctIdx
      );
      if (correctBtn) correctBtn.classList.add('correct');
      stopTimer();
      nextBtn.textContent = (current === questions.length - 1) ? 'TERMINER ▶' : 'SUIVANT ▶';
    }
  }, 1000);
}

function stopTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

function showResults() {
  stopTimer();
  stopBirdAnimation();
  nextBtn.classList.add('hidden');
  endBtn.classList.remove('hidden');
  
  const percentage = (score / questions.length) * 100;
  const passed = score >= 3;
  
  if (passed) {
    playSound('victory');
    showRetroGameScreen(true);
  } else {
    playSound('fail');
    showRetroGameScreen(false);
  }
  
  resultEl.classList.remove('hidden');
  resultEl.innerHTML = `
    <strong>RESULTAT: ${score}/${questions.length} (${percentage.toFixed(0)}%)</strong>
    <p>${passed ? 
      'MISSION ACCOMPLIE! VOUS ETES UN EXPERT EN SECURITE!' : 
      'CONTINUER A APPRENDRE. REESSAYEZ!'
    }</p>
  `;
}

// ==========================
// ANIMATION DES OISEAUX PENDANT LE QUIZ
// ==========================
function startBirdAnimation() {
  stopBirdAnimation();
  
  // Créer un oiseau immédiatement
  createFlyingBird();
  
  // Puis un oiseau toutes les 3 secondes
  birdInterval = setInterval(() => {
    createFlyingBird();
  }, 3000);
}

function stopBirdAnimation() {
  if (birdInterval) {
    clearInterval(birdInterval);
    birdInterval = null;
  }
  // Supprimer tous les oiseaux existants
  document.querySelectorAll('.flying-bird').forEach(bird => bird.remove());
}

function createFlyingBird() {
  const bird = document.createElement('div');
  bird.className = 'flying-bird';
  bird.textContent = '🦅';
  
  const size = Math.random() * 20 + 30; // Taille entre 30px et 50px (plus petits)
  const topPosition = Math.random() * 70 + 10; // Position entre 10% et 80%
  const duration = Math.random() * 2 + 4; // Durée entre 4s et 6s
  
  bird.style.cssText = `
    position: fixed;
    font-size: ${size}px;
    left: -80px;
    top: ${topPosition}%;
    z-index: 9999;
    animation: flyBirdLeftToRight ${duration}s linear;
    pointer-events: none;
    filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
    transform: scaleX(-1);
  `;
  
  document.body.appendChild(bird);
  
  // Supprimer l'oiseau après l'animation
  setTimeout(() => bird.remove(), duration * 1000 + 100);
}

// ==========================
// ÉCRAN RÉTRO GAME (VICTOIRE/DÉFAITE)
// ==========================
function showRetroGameScreen(isVictory) {
  const overlay = document.createElement('div');
  overlay.id = 'retro-game-screen';
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: #000;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: fadeInScreen 0.5s;
  `;
  
  if (isVictory) {
    // VICTOIRE - Drapeau qui monte style Super Mario
    overlay.innerHTML = `
      <div style="text-align: center;">
        <div style="position: relative; width: 80px; height: 450px; margin: 0 auto 40px;">
          <!-- Poteau -->
          <div style="width: 12px; height: 100%; background: linear-gradient(180deg, #666 0%, #333 100%); 
                      position: absolute; left: 34px; border: 2px solid #222; 
                      box-shadow: inset 0 0 10px rgba(0,0,0,0.5), 2px 2px 8px rgba(0,0,0,0.7);"></div>
          
          <!-- Drapeau qui monte -->
          <div id="flag" style="position: absolute; top: 400px; left: 46px; 
                               animation: flagClimbUp 2s ease-out forwards;">
            <div style="width: 70px; height: 50px; 
                        background: linear-gradient(135deg, #00ff41 0%, #00dd33 50%, #00bb22 100%); 
                        border: 4px solid #009922; 
                        position: relative; 
                        box-shadow: 4px 4px 15px rgba(0,255,65,0.6);
                        clip-path: polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%);">
              <div style="position: absolute; top: 10px; left: 10px; right: 20px; bottom: 10px; 
                          border: 3px solid rgba(255,255,255,0.5); border-radius: 3px;"></div>
            </div>
          </div>
        </div>
        
        <div style="font-family: 'Press Start 2P', monospace; color: #00ff41; 
                    font-size: 48px; text-shadow: 6px 6px 0 #000, 8px 8px 0 #004400; 
                    margin-bottom: 30px; animation: textGlow 1s infinite; letter-spacing: 3px;">
          BRAVO!
        </div>
        
        <div style="font-family: 'Press Start 2P', monospace; color: #ffee00; 
                    font-size: 18px; margin-top: 20px; line-height: 2.8; 
                    text-shadow: 3px 3px 0 #000; animation: pulse 2s infinite;">
          ★ MISSION ACCOMPLIE! ★<br>
          EXPERT EN SECURITE
        </div>
      </div>
    `;
  } else {
    // DÉFAITE - Style rétrogaming pur
    overlay.innerHTML = `
      <div style="text-align: center;">
        <div style="position: relative; margin-bottom: 50px;">
          <div style="font-family: 'Press Start 2P', monospace; color: #ff0066; 
                      font-size: 52px; text-shadow: 6px 6px 0 #000, 8px 8px 0 #660000; 
                      animation: glitchShake 0.3s infinite; letter-spacing: 6px;">
            GAME OVER
          </div>
          
          <div style="width: 400px; height: 8px; 
                      background: linear-gradient(90deg, transparent 0%, #ff0066 20%, #ff0066 80%, transparent 100%); 
                      margin: 30px auto; 
                      animation: lineGrow 1.2s ease-out;
                      box-shadow: 0 0 20px #ff0066, 0 0 40px #ff0066;"></div>
        </div>
        
        <div style="font-family: 'Press Start 2P', monospace; color: #888; 
                    font-size: 16px; margin-top: 40px; line-height: 3; 
                    animation: blinkSlow 1.5s infinite; text-shadow: 2px 2px 0 #000;">
          ▼ PRESS START ▼<br>
          TO CONTINUE
        </div>
      </div>
    `;
  }
  
  document.body.appendChild(overlay);
  
  // Supprimer après 4 secondes
  setTimeout(() => {
    overlay.style.animation = 'fadeOutScreen 0.5s';
    setTimeout(() => overlay.remove(), 500);
  }, 4000);
}

// ==========================
// ANIMATIONS CSS
// ==========================
const style = document.createElement('style');
style.textContent = `
  @keyframes flyBirdLeftToRight {
    0% { 
      left: -80px; 
      transform: scaleX(-1) translateY(0);
    }
    100% { 
      left: 110vw; 
      transform: scaleX(-1) translateY(-30px);
    }
  }
  
  @keyframes fadeInScreen {
    from { opacity: 0; transform: scale(0.85); }
    to { opacity: 1; transform: scale(1); }
  }
  
  @keyframes fadeOutScreen {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  @keyframes flagClimbUp {
    0% { top: 400px; }
    100% { top: 0; }
  }
  
  @keyframes textGlow {
    0%, 100% { 
      text-shadow: 6px 6px 0 #000, 8px 8px 0 #004400, 0 0 30px #00ff41; 
    }
    50% { 
      text-shadow: 6px 6px 0 #000, 8px 8px 0 #004400, 0 0 50px #00ff41, 0 0 80px #00ff41; 
    }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.9; }
  }
  
  @keyframes glitchShake {
    0%, 100% { transform: translate(0, 0); filter: hue-rotate(0deg); }
    20% { transform: translate(-4px, 3px); filter: hue-rotate(90deg); }
    40% { transform: translate(4px, -3px); filter: hue-rotate(180deg); }
    60% { transform: translate(-3px, -4px); filter: hue-rotate(270deg); }
    80% { transform: translate(3px, 4px); filter: hue-rotate(360deg); }
  }
  
  @keyframes lineGrow {
    0% { width: 0; opacity: 0; }
    100% { width: 400px; opacity: 1; }
  }
  
  @keyframes blinkSlow {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
`;
document.head.appendChild(style);