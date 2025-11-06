// Sample questions array
const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        answer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 1
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["O2", "H2O", "CO2", "HO"],
        answer: 1
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "Leo Tolstoy", "Jane Austen"],
        answer: 0
    },
    {
        question: "Which element has the atomic number 1?",
        options: ["Oxygen", "Hydrogen", "Nitrogen", "Helium"],
        answer: 1
    },
    {
        question: "In which year did the Titanic sink?",
        options: ["1905", "1912", "1923", "1898"],
        answer: 1
    },
    {
        question: "Who was the first person to walk on the moon?",
        options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "John Glenn"],
        answer: 0
    },
    {
        question: "Which is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        answer: 2
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Diamond", "Iron", "Graphite"],
        answer: 1
    },
    {
        question: "Which country is home to the kangaroo?",
        options: ["India", "Australia", "South Africa", "Brazil"],
        answer: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent Van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        answer: 2
    },
    {
        question: "Which is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        answer: 2
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// Function to show the current question
function showQuestion() {
    const questionEl = document.getElementById('question');
    const options = document.querySelectorAll('.option-btn');
    questionEl.textContent = questions[currentQuestion].question;

    options.forEach((option, index) => {
        option.textContent = questions[currentQuestion].options[index];
        option.disabled = false;
        option.classList.remove('selected');
    });

    document.getElementById('next-btn').disabled = true;
}

// Function to handle answer selection
function selectAnswer(index) {
    selectedAnswer = index;
    const options = document.querySelectorAll('.option-btn');
    options.forEach(option => option.classList.remove('selected'));
    options[index].classList.add('selected');
    document.getElementById('next-btn').disabled = false;
}

// Function to move to the next question
function nextQuestion() {
    if (selectedAnswer === questions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// Function to display results
function showResults() {
    document.querySelector('.quiz-container').classList.add('hidden');
    document.getElementById('result-container').classList.remove('hidden');
    document.getElementById('score').textContent = `${score} / ${questions.length}`;
    updateLeaderboard(score);
}

// Function to restart the quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.querySelector('.quiz-container').classList.remove('hidden');
    document.getElementById('result-container').classList.add('hidden');
    document.getElementById('leaderboard-container').classList.add('hidden');
    showQuestion();
}

// Leaderboard functions
let leaderboard = [];

function updateLeaderboard(score) {
    leaderboard.push(score);
}

function showLeaderboard() {
    document.getElementById('result-container').classList.add('hidden');
    document.getElementById('leaderboard-container').classList.remove('hidden');
    const leaderboardEl = document.getElementById('leaderboard');
    leaderboardEl.innerHTML = leaderboard
        .map((score, index) => `<li>Player ${index + 1}: ${score} / ${questions.length}</li>`)
        .join('');
}

// Initialize the first question on load
window.onload = showQuestion;
