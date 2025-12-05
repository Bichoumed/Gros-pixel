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
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime + i * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + i * 0.15 + 0.2);
        osc.start(audioCtx.currentTime + i * 0.15);
        osc.stop(audioCtx.currentTime + i * 0.15 + 0.2);
      });
      break;
    case 'fail':
      oscillator.frequency.value = 300;
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      oscillator.start(audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.5);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
      oscillator.stop(audioCtx.currentTime + 0.6);
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

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Event listeners
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
}

function closeQuiz() {
  playSound('click');
  modal.classList.add('hidden');
  stopTimer();
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
  
  // Désactiver tous les boutons
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
  
  // Si aucun choix n'a été fait, marquer comme incorrect
  const hasAnswered = Array.from(choicesEl.children).every(c => c.disabled);
  if (!hasAnswered) {
    const correctIdx = questions[current].a;
    const correctBtn = Array.from(choicesEl.children).find(
      c => Number(c.dataset.index) === correctIdx
    );
    if (correctBtn) correctBtn.classList.add('correct');
    Array.from(choicesEl.children).forEach(ch => ch.disabled = true);
  }
  
  // Passer à la question suivante ou afficher résultats
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
  nextBtn.classList.add('hidden');
  endBtn.classList.remove('hidden');
  
  const percentage = (score / questions.length) * 100;
  const passed = score >= 3; // Score minimum 3/6
  
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
// ÉCRAN RÉTRO GAME (VICTOIRE/DÉFAITE)
// ==========================
function showRetroGameScreen(isVictory) {
  // Créer l'overlay
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
    // VICTOIRE - Style Super Mario
    overlay.innerHTML = `
      <div style="text-align: center;">
        <div id="mario-char" style="font-size: 80px; margin-bottom: 20px;">
          <span style="display: inline-block; animation: marioJump 0.6s ease-in-out infinite;">🕹️</span>
        </div>
        <div id="flag-pole" style="position: relative; width: 60px; height: 300px; margin: 0 auto 30px;">
          <div style="width: 8px; height: 100%; background: linear-gradient(180deg, #888 0%, #888 100%); 
                      position: absolute; left: 26px; border: 2px solid #666;"></div>
          <div id="flag" style="position: absolute; top: 0; left: 34px; 
                               animation: flagRise 2s ease-out forwards;">
            <div style="width: 40px; height: 30px; background: var(--retro-accent); 
                        border: 3px solid #00cc33; position: relative;">
              <div style="position: absolute; top: 5px; left: 5px; right: 5px; bottom: 5px; 
                          border: 2px solid #00ff44;"></div>
            </div>
          </div>
        </div>
        <div style="font-family: 'Press Start 2P', monospace; color: var(--retro-accent); 
                    font-size: 28px; text-shadow: 4px 4px 0 #000, 6px 6px 0 var(--retro-secondary); 
                    margin-bottom: 20px; animation: textBlink 0.5s infinite;">
          BRAVO!
        </div>
        <div style="font-family: 'Press Start 2P', monospace; color: var(--retro-yellow); 
                    font-size: 14px; margin-top: 20px; line-height: 2;">
          MISSION ACCOMPLIE!<br>
          SECURITE: 100%
        </div>
      </div>
    `;
  } else {
    // DÉFAITE - Style Game Over
    overlay.innerHTML = `
      <div style="text-align: center;">
        <div style="font-size: 80px; margin-bottom: 30px; animation: fallDown 1s ease-in;">
          💀
        </div>
        <div style="position: relative; margin-bottom: 30px;">
          <div style="font-family: 'Press Start 2P', monospace; color: var(--retro-secondary); 
                      font-size: 36px; text-shadow: 4px 4px 0 #000, 6px 6px 0 #660000; 
                      animation: glitchText 0.3s infinite;">
            GAME OVER
          </div>
          <div style="width: 300px; height: 4px; background: var(--retro-secondary); 
                      margin: 20px auto; animation: lineExpand 1s ease-out;"></div>
        </div>
        <div style="font-family: 'Press Start 2P', monospace; color: var(--muted); 
                    font-size: 12px; margin-top: 20px; line-height: 2;">
          ESSAYEZ ENCORE<br>
          CONTINUE?
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

// Animations CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInScreen {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeOutScreen {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  @keyframes marioJump {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-30px); }
  }
  
  @keyframes flagRise {
    from { top: 270px; }
    to { top: 0; }
  }
  
  @keyframes textBlink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  @keyframes fallDown {
    from { transform: translateY(-200px) rotate(0deg); opacity: 0; }
    to { transform: translateY(0) rotate(360deg); opacity: 1; }
  }
  
  @keyframes glitchText {
    0%, 100% { transform: translate(0); }
    25% { transform: translate(-3px, 2px); }
    50% { transform: translate(3px, -2px); }
    75% { transform: translate(-2px, -2px); }
  }
  
  @keyframes lineExpand {
    from { width: 0; }
    to { width: 300px; }
  }
`;
document.head.appendChild(style);