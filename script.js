const questions = [
    {
        question: "What is Infinity?",
        options: ["A number", "A concept", "Endless", "All of the above"],
        correct: 3
    },
    {
        question: "Which is the strongest domain expansion in Jujutsu Kaisen?",
        options: ["Infinite Void", "Malevolent Shrine", "Unlimited Void", "Coffin of the Iron Mountain"],
        correct: 2
    },
    {
        question: "What is the primary color of Gojo's hair?",
        options: ["White", "Silver", "Blue", "Gray"],
        correct: 0
    },
    {
        question: "What is the capital of Japan?",
        options: ["Osaka", "Kyoto", "Tokyo", "Nagoya"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Ag", "Fe", "Au", "Cu"],
        correct: 2
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correct: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: 3
    },
    {
        question: "Which is the fastest land animal?",
        options: ["Lion", "Cheetah", "Leopard", "Tiger"],
        correct: 1
    },
    {
        question: "What is the main ingredient in sushi?",
        options: ["Fish", "Rice", "Seaweed", "Vegetables"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 300; // 5 minutes in seconds
let timer;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const currentQuestionEl = document.getElementById('current-question');
const scoreEl = document.getElementById('score');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const retryBtn = document.getElementById('retry-btn');
const rewardMessageEl = document.getElementById('reward-message');

function startQuiz() {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    loadQuestion();
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
}

function loadQuestion() {
    const question = questions[currentQuestion];
    questionEl.textContent = question.question;
    currentQuestionEl.textContent = currentQuestion + 1;
    
    optionsEl.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('div');
        button.className = 'option';
        button.textContent = option;
        button.addEventListener('click', () => selectOption(index));
        optionsEl.appendChild(button);
    });
}

function selectOption(selectedIndex) {
    const question = questions[currentQuestion];
    const options = document.querySelectorAll('.option');
    
    options.forEach(option => option.style.pointerEvents = 'none');
    
    if (selectedIndex === question.correct) {
        options[selectedIndex].classList.add('correct');
        score++;
    } else {
        options[selectedIndex].classList.add('wrong');
        options[question.correct].classList.add('correct');
    }
    
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    scoreEl.textContent = score;
    
    if (score >= 7) {
        rewardMessageEl.innerHTML = `
            <p>Congratulations! You've won!</p>
            <p>Join our Discord server for your reward:</p>
            <a href="https://discord.gg/tdrrizu" target="_blank" 
               style="color: #3498db; text-decoration: none; display: inline-block; margin-top: 10px;">
                Join TDR Rizu Discord
            </a>
        `;
    } else {
        rewardMessageEl.innerHTML = `
            <p>Keep practicing! Try to score 7 or higher to win rewards.</p>
        `;
    }
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 300;
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
}

startBtn.addEventListener('click', startQuiz);
retryBtn.addEventListener('click', resetQuiz);