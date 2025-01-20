// Timer
const timerElement = document.getElementById('timer');
let timeLeft = 60 * 60; // 1 hour in seconds
let timerInterval;

// Elements
const userInfoForm = document.getElementById('user-info-form');
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.createElement('button'); // Create "Previous" Button
const submitBtn = document.getElementById('submit-btn');
const confirmationPage = document.getElementById('confirmation-page');
const confirmSubmit = document.getElementById('confirm-submit');
const cancelSubmit = document.getElementById('cancel-submit');
const mainContent = document.getElementById('main-content');

// User Info
let userName = "";
let userId = "";

// Quiz Questions
const questions = [
  { question: "Add up the following numbers 147 + 18 + 2874?", options: ["1396", "3216", "3639", "3039"], correct: "" },
  { question: "What us the product of 1.34 and 12.1?", options: ["1.6214", "16412", "16.214", "162.14"], correct: "" },
  { question: "Divide 612 𝑏𝑦 3", options: ["24", "204", "32", "274"], correct: "" },
  { question: "Simplify 3 1/2 - 3/4 x  2 2/3", options: ["1 1/2", "1 2/3", "2 1/2", "1 1/4"], correct: "6" },
  { question: "What is the  L.C.M of 4, 8 and 12", options: ["12", "24", "36", "18"], correct: "" },
  { question: "Multiply 24 by 12 and divide you answer by 3", options: ["69", "36", "288", "96"], correct: "" },
  { image: 'Screenshot 2025-01-20 114456.png', question: "What is the area of the triangle below", options: ["12cm", "9cm", "6cm", "10cm"], correct: "" },
  {question: "Simplify ∛8 - √25 + ∜81" , options: ["2", "3", "0", "6"], correct: ""},
  {question: "Subtract 15 from 100 and divide your answer by 5", options: ["12", "16", "17","20"]},
  {question: "What is the square root of 32/50", options: ["5/4", "4/5", "3/4", "2/5"]},
  {question: "Which is the smallest number",options: ["0.0101", "0.17", "0.87", "0.024"] },
  {question: "Change 13/5 to mixed fraction",options: ["1 8/5", "3 2/5", "5/13", "2 3/5"]},
  {question: "Arrange 1/3, 2/3, 3/5, 3/2 in ascending order", options:["3/5, 1/3, 2/3, 3/2", "1/3, 2/3, 3/5, 3/2", "1/3, 3/5, 2/3, 3/2", "3/2, 3/5, 3/2, 1/3"]},
  {question: "Mary and joseph shared 32 oranges in the ratio 3: 5. How many more oranges does Joseph have than Mary?" ,options:["12", "20", "8", "10"]},
  {question: "What is 𝐶𝑀𝑋𝐶𝐼𝑋 in Hindu Arabic?", options:["979", "999", "899", "1099"]},
  {question: "By how much is [3/4 + 1/12 + 2/3] greater than 1?" ,options:["1/12", "2/3", "1/2", "3/4"]},
  {question: "Subtract 297 from 1007", options: ["710", "810", "650", "727"]},
  {question: "What is the length of a square whose area is 36cm²", options: ["4cm", "5cm", "8cm", "6cm"]},
  {question: "Some mangoes were shared between David and Sani in the ratio 3:5 respectively. If David's share was 120, how many oranges were shared between them?", options:["320", "200", "900", "192"]},
  {question: "Arrange the number below in order of size, beginning with the smallest 0.3, 0.268, 0.075, 0.0079" , options: ["0.3, 0.075, 0.268, 0.0079", "0.0079, 0.075, 0.268, 0.3", "0.3, 0.075, 0.0079, 0.268","0.075, 0.268, 0.0079,0.3"]},
  {question: "What is the product of the four smallest prime numbers that are greater than one?" , options:["270", "371", "210", "30"]},
  {question: "The sum of four lengths is 4.36cm. if three of the lengths are 1 1/2m, 25cm and 2.10m, what is the fourth length in metres?", options:["0.75m", "0.15m", "0.96m", "1.51m"]},
  {question: "Express 45.726 correct to the nearest whole number", options:["45.7", "45.73", "46", "50"]},
  {question: "Express 2/5 as percentage", options:["20%", "50%", "70%", "40%"]},
  {question: "What is the averages of the following numbers 9,7,4,6,3,1", options:["8", "5", "6", "9"]},
  {question: "How many tables each weighing 18𝑔 would weigh a total of 18kg", options:["10", "100", "1000", "1"]},
  {question: "Find x if 4x -12=36", options:["7", "9", "50", "12"]},
  {question: "Express 8% as a decimal", options:["0.8", "0.008", "80", "0.08"]},
  {question: "If it took 4 𝑚𝑒𝑛 6𝑑𝑎𝑦𝑠 to get a job done, how long will it 𝑡𝑎𝑘𝑒 3 𝑚𝑒𝑛 to get the job done if they all work at the same rate?", options:["8 days", "9 days", "4 days", "10 days"]},
  {question:"Gimba travelled 360 𝑘𝑚 at an average speed of 80 𝑘𝑚 an hour. How long did the journey take him?", options:["4 hours 40 minutes", "4 hours 50 minutes","4 hours 30 minutes", "2 hours 30 minutes"]},
  {question: "Express 250 as a fraction of 2000", options: ["2/7", "1/8", "5/8", "3/8"]},
  {question: "If 5 books cost ₦16.40, what would be the cost of 8 books if all the books are the same", options:["₦26.24", "₦47.2", "₦52.00", "₦720.00"]},
  {question: "Decrease 30 by 30%", options:["9", "21", "39", "15"]},
  {question: "By how much is 0.078 less than 4?", options:["3.922","4.078","3.219", "3.292"]},
  {question: "What is the perimeter of a circle whose area is 154cm²", options:["6cm", "5cm", "4cm", "8cm"]},
  {question: "What is the distance between the parallel sides of a trapezium given that their lengths are 9cm and 6cm, if the area of the trapezium is 30cm²", options: ["6cm", "5cm", "4cm", "8cm"]},
  {image: "Screenshot 2025-01-20 130110.png", question: "What is the perimeter of the shape below?", options:["48cm", "38cm", "40cm", "24cm"]},
  {question: "Which of the following is not a proper fraction?", options: ["2/3", "1/18", "4/5", "8/7"]},
  {question: "Subtract", image: "Screenshot 2025-01-20 130506.png", options: ["1hr 5 min 35sec", "2hr 8min 25sec", "1hr 26 min 35 sec", "1 hr 26 min 40 sec"]},
  {question: "What is the perimeter of the shape below? (take π = 3.14)", image: "Screenshot 2025-01-20 130839.png", options: ["31.4cm", "41.4cm", "51.4cm ","10cm"]},
  {question: "Express 12 1/2% to its simplest form,", options:["2/13", "2/15", "1/8", "7/15"]},
  {question: "Express 7/4 as a percentage", options:["175%", "120%", "35%", "45%"]},
  {question: "What is the smallest number that is divided by 2,3 and 5 without remainder", options:["20", "15", "30", "45"]},
  {question: "What is the difference between the L.C.M of 6,8,10 and 12 ans its H.C.F", options:["120", "118", "240", "125"]},
  {question: "What is 3/4 of 8024", options:["5016", "4018", "6018", "7018"]}

];

let currentQuestionIndex = 0;
const selectedAnswers = [];

// Start Quiz
userInfoForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission

  userName = document.getElementById("name").value.trim();
  userId = document.getElementById("id").value.trim();

  // Validate input fields
  if (!userName || !userId) {
    alert("Please enter your name and ID to start the quiz.");
    return;
  }

  // Hide user info form and show quiz
  document.getElementById("user-info").style.display = "none";
  quizContainer.style.display = "block";

  // Start the timer and display the first question
  startTimer();
  showQuestion(currentQuestionIndex);
});

// Timer Function
function startTimer() {
  timerInterval = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `Time Left: ${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timerInterval);
      showResults();
    }
  }, 1000);
}

// Show Question
function showQuestion(index) {
  const question = questions[index];
  let questionHtml = `
    <h2>${index + 1}. ${question.question}</h2>
  `;

  // If there is an image for this question, display it
  if (question.image) {
    questionHtml += `
      <img src="${question.image}" alt="Question Image" style="max-width: 100%; height: auto; margin-bottom: 10px;">
    `;
  }

  // Display options
  questionHtml += question.options
    .map(
      (option) =>
        `<label>
          <input type="radio" name="question${index}" value="${option}" ${
          selectedAnswers[index]?.answer === option ? "checked" : ""
        }>
          ${option}
        </label>`
    )
    .join('');

  questionContainer.innerHTML = questionHtml;

  // Handle button visibility
  prevBtn.style.display = index === 0 ? "none" : "inline-block"; // Hide "Previous" on the first question
  nextBtn.style.display = index === questions.length - 1 ? "none" : "inline-block"; // Hide "Next" on the last question
  submitBtn.style.display = index === questions.length - 1 ? "inline-block" : "none"; // Show "Submit" on the last question
}


// Add Previous Button to DOM
//prevBtn.id = "prev-btn";
//prevBtn.textContent = "Previous";
//prevBtn.style.display = "none"; // Initially hidden
//quizContainer.insertBefore(prevBtn, nextBtn);

// Navigation Buttons
nextBtn.addEventListener("click", () => {
  saveAnswer();
  currentQuestionIndex++;
  showQuestion(currentQuestionIndex);
});

prevBtn.addEventListener("click", () => {
  saveAnswer();
  currentQuestionIndex--;
  showQuestion(currentQuestionIndex);
});

// Save Answer
function saveAnswer() {
  const selectedOption = quizContainer.querySelector(
    `input[name="question${currentQuestionIndex}"]:checked`
  );
  if (selectedOption) {
    selectedAnswers[currentQuestionIndex] = {
      question: questions[currentQuestionIndex].question,
      answer: selectedOption.value,
    };
  } else {
    selectedAnswers[currentQuestionIndex] = {
      question: questions[currentQuestionIndex].question,
      answer: "No Answer",
    };
  }
}

// Submit Button
submitBtn.addEventListener("click", () => {
  quizContainer.style.display = "none";
  confirmationPage.style.display = "block";
});

// Confirmation Page Buttons
confirmSubmit.addEventListener("click", showResults);
cancelSubmit.addEventListener("click", () => {
  confirmationPage.style.display = "none";
  quizContainer.style.display = "block";
});

// Show Results
function showResults() {
  clearInterval(timerInterval);

  mainContent.innerHTML = `
    <h2>Quiz Results</h2>
    <p>Name: ${userName}</p>
    <p>ID: ${userId}</p>
    <ul>
      ${questions
        .map(
          (q, index) =>
            `<li>${q.question} - <strong>${
              selectedAnswers[index]?.answer || "No Answer"
            }</strong></li>`
        )
        .join("")}
    </ul>
  `;
}
