const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Paris", "London", "Berlin", "Madrid"],
        correct: "Paris"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
        correct: "William Shakespeare"
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: ["Earth", "Jupiter", "Saturn", "Mars"],
        correct: "Jupiter"
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        answers: ["Oxygen", "Osmium", "Ozone", "Opium"],
        correct: "Oxygen"
    },
    {
        question: "Which year did the Titanic sink?",
        answers: ["1912", "1905", "1898", "1923"],
        correct: "1912"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const scoreText = document.getElementById("score");
const finalScore = document.getElementById("final-score");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = '';  // Clear previous answers
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('btn');
        button.addEventListener('click', () => checkAnswer(answer));
        answersContainer.appendChild(button);
    });

    nextButton.style.display = "none"; // Hide Next button until answer is chosen
}

function checkAnswer(answer) {
    const currentQuestion = questions[currentQuestionIndex];

    if (answer === currentQuestion.correct) {
        score++;
    }

    scoreText.textContent = `Score: ${score}`;
    nextButton.style.display = "block";  // Show Next button

    // Disable all answer buttons after selection
    const buttons = answersContainer.querySelectorAll('button');
    buttons.forEach(button => button.disabled = true);
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
});

function showFinalScore() {
    nextButton.style.display = "none"; // Hide next button
    finalScore.textContent = `Your Final Score: ${score}/${questions.length}`;
    finalScore.classList.remove("hidden");
}

// Initialize first question
loadQuestion();
