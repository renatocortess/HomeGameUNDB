// Variáveis globais
let questions = [];
let currentQuestion = 0;
let score = 0;
let timeLeft = 0;
let timer;
let selectedDifficulty = 'medium';
let selectedTime = 3;
let gameQuestions = [];

// Elementos da DOM
const configScreen = document.getElementById('config-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const newGameBtn = document.getElementById('new-game-btn');

// Event Listeners
startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartGame);
newGameBtn.addEventListener('click', newGame);

// Carrega as perguntas do arquivo JSON
async function loadQuestions() {
  try {
    const response = await fetch('perguntas.json');
    questions = await response.json();
    console.log('Perguntas carregadas com sucesso!');
  } catch (error) {
    console.error('Erro ao carregar perguntas:', error);
  }
}

// Inicia o jogo
function startGame() {
  // Obtém as configurações selecionadas
  selectedDifficulty = document.getElementById('difficulty').value;
  selectedTime = parseInt(document.getElementById('time-limit').value);
  
  // Filtra as perguntas pela dificuldade
  gameQuestions = questions.filter(q => {
    if (selectedDifficulty === 'easy') return true;
    if (selectedDifficulty === 'medium') return Math.random() > 0.3; // 70% das perguntas
    if (selectedDifficulty === 'hard') return Math.random() > 0.6; // 40% das perguntas
    return true;
  }).slice(0, 20); // Limita a 20 perguntas
  
  // Configura o tempo
  timeLeft = selectedTime === 0 ? 9999 : selectedTime * 60; // Converte para segundos
  
  // Reseta o jogo
  score = 0;
  currentQuestion = 0;
  
  // Atualiza a UI
  document.getElementById('score').textContent = score;
  document.getElementById('timer').textContent = formatTime(timeLeft);
  
  // Mostra a tela do jogo
  configScreen.classList.remove('active');
  gameScreen.classList.add('active');
  resultScreen.classList.remove('active');
  
  // Inicia o jogo
  showQuestion();
  startTimer();
}

// Mostra a pergunta atual
function showQuestion() {
  if (currentQuestion >= gameQuestions.length || timeLeft <= 0) {
    endGame();
    return;
  }
  
  const q = gameQuestions[currentQuestion];
  document.getElementById('question-text').textContent = q.text;
  
  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = '';
  
  // Embaralha as opções
  const shuffledOptions = [...q.options]
    .map((value, index) => ({ value, index }))
    .sort(() => Math.random() - 0.5);
  
  // Cria os botões de opção
  shuffledOptions.forEach((option, idx) => {
    const pre = document.createElement('pre');
    pre.className = 'code-option';
    pre.textContent = option.value;
    pre.onclick = () => checkAnswer(option.index, q.answer);
    optionsContainer.appendChild(pre);
  });
  
  // Esconde o botão "Próxima"
  nextBtn.style.display = 'none';
  document.getElementById('result').textContent = '';
}

// Verifica a resposta selecionada
function checkAnswer(selectedIndex, correctIndex) {
  clearInterval(timer);
  
  const options = document.querySelectorAll('.code-option');
  options.forEach(opt => opt.style.pointerEvents = 'none');
  
  if (selectedIndex === correctIndex) {
    score++;
    timeLeft += 10; // Bônus de tempo por acerto
    document.getElementById('result').textContent = '✅ Correto! +10s';
    options.forEach(opt => {
      if (opt.textContent === gameQuestions[currentQuestion].options[correctIndex]) {
        opt.classList.add('correct');
      }
    });
  } else {
    timeLeft = Math.max(0, timeLeft - 10); // Penalidade de tempo por erro
    document.getElementById('result').textContent = '❌ Errado! -10s';
    options.forEach(opt => {
      if (opt.textContent === gameQuestions[currentQuestion].options[selectedIndex]) {
        opt.classList.add('incorrect');
      }
      if (opt.textContent === gameQuestions[currentQuestion].options[correctIndex]) {
        opt.classList.add('correct');
      }
    });
  }
  
  document.getElementById('score').textContent = score;
  document.getElementById('timer').textContent = formatTime(timeLeft);
  nextBtn.style.display = 'block';
}

// Próxima pergunta
function nextQuestion() {
  currentQuestion++;
  showQuestion();
  startTimer();
}

// Inicia o temporizador
function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = formatTime(timeLeft);
    
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

// Finaliza o jogo
function endGame() {
  clearInterval(timer);
  gameScreen.classList.remove('active');
  resultScreen.classList.add('active');
  
  document.getElementById('final-score').textContent = score;
  document.getElementById('final-time').textContent = formatTime(timeLeft);
}

// Reinicia o jogo com as mesmas configurações
function restartGame() {
  resultScreen.classList.remove('active');
  gameScreen.classList.add('active');
  startGame();
}

// Volta para a tela de configuração
function newGame() {
  resultScreen.classList.remove('active');
  configScreen.classList.add('active');
}

// Formata o tempo (segundos para MM:SS)
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Inicializa o jogo
loadQuestions();
