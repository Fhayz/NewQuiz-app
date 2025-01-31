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
  {
    question: "The average weight of 6 girls is 41kg. If the weight of 5 of them are 42kg, 44kg, 40kg, 38kg, and 40kg, what is the weight of the sixth girl?",
    options: ["42kg", "43kg", "44kg", "45kg"],
    correct: "42kg"
  },
  {
    question: "What is the area of a circle whose circumference is 44cm?",
    options: ["154cm²", "100cm²", "164cm²", "153cm²"],
    correct: "154cm²"
  },
  {
    question: "Daniel puts N300.00 in a bank which yields an interest at 4.5% per annum. What is his amount at the end of the one year?",
    options: ["N313.50", "N300.00", "N310.00", "N3.13"],
    correct: "N313.50"
  },
  {
    question: "A rectangular field is 15m wide and has an area of 5880m². What is the length?",
    options: ["392m", "382m", "390m", "390m"],
    correct: "392m"
  },
  {
    question: "Solve for p in 10/P + 3 = 5",
    options: ["4/5", "5", "1/5", "1 1/5"],
    correct: "5"
  },
  {
    question: "Solve the equation P + 1/2 = 3/2",
    options: ["-1", "2", "1", "2/3"],
    correct: "1"
  },
  {
    question: "Find the value of x + y from the simultaneous equation below: x - y = 4, x + y = 8",
    options: ["6", "2", "8", "4"],
    correct: "8"
  },
  {
    question: "Which of the following number is the smallest?",
    options: ["0.1234", "0.2341", "0.1229", "0.12197"],
    correct: "0.12197"
  },
  {
    question: "If today is Wednesday, what day of the week is 524 days time?",
    options: ["Tuesday", "Thursday", "Sunday", "Friday"],
    correct: "Thursday"
  },
  {
    question: "A car moves 50km in 50 minutes. What is its speed in kilometers per hour?",
    options: ["30km/hr", "60km/hr", "15km/hr", "25km/hr"],
    correct: "60km/hr"
  },
  { question: "Simplify (6x + 2)/2 - (5x + 1)/3", options: ["(9x + 1)/6", "(8x + 4)/6", "(8x + 8)/6", "(8x + 2)/6)"], correct: "(8x + 4)/6" },
  {
    question: "A car moves 50km in 50 minutes. What is its speed in kilometers per hour?",
    options: ["30km/hr", "60km/hr", "15km/hr", "25km/hr"],
    correct: "60km/hr"
  },
  {
    question: "The length of a rectangular field is four times its width. If its perimeter is 100m, find the difference between the length and the width.",
    options: ["10m", "40m", "30m", "50m"],
    correct: "30m"
  },
  {
    question: "Evaluate √8² + √(16/100)",
    options: ["8 1/5", "8 2/5", "7 2/5", "5 1/4"],
    correct: "8 2/5"
  },
  {
    question: "Solve the equation 60 – 2x = 20",
    options: ["20", "60", "-20", "40"],
    correct: "20"
  },
  {
    question: "Efe lost N150 by selling a shirt for N450. What is his percentage loss?",
    options: ["15%", "45%", "25%", "30%"],
    correct: "25%"
  },
  {
    image: "Screenshot 2025-01-30 104711.png",
    question: "What is the value of the angle marked ‘2y’ in the diagram below?",
    options: ["150°", "30°", "150°", "50°"],
    correct: "30°"
  },
  {
    question: "Working for 10 hours a day, a painter completes a job in 15 days. How long would it take him if he works for 6 hours a day?",
    options: ["4 days", "20 days", "25 days", "40 days"],
    correct: "25 days"
  },
  {
    question: "What must be added to the sum of 1 1/2 and 2 1/4 to make 5 1/2?",
    options: ["4 3/4", "3 3/4", "1 1/4", "1 3/4"],
    correct: "1 3/4"
  },
  {
    question: "Express 5/8 as a decimal",
    options: ["0.652", "0.625", "0.605", "0.265"],
    correct: "0.625"
  },
  {
    question: "Find the simple interest on N6000 for 9 months at 3% per annum.",
    options: ["N153.00", "N1,620.00", "N135.00", "N375.00"],
    correct: "N135.00"
  },
  {
    question: "Find the number which when divided by 0.7, gives 0.8 to two decimal place.",
    options: ["0.56", "1.14", "0.65", "0.68"],
    correct: "0.56"
  },
  {
    question: "Add up the following number 371 + 24 + 1078",
    options: ["4848", "1473", "1743", "1437"],
    correct: "1473"
  },
  
  {
    question: "Change 17/4 into a mixed fraction" , 
    options: ["4 3/4", "3 3/4", "4 1/4", "5 1/4"], 
    correct: "4 1/4"
  },
  {
    question: "Write the following in Hindu Arabic Numerals CCCLXXX", 
    options: ["٣٣", "358", "380","308"], 
    correct: "380"
  },
  {
    question: "Divide 412 by 4", 
    options: ["13", "103", "130", "206"],
    correct: "103"
  },
  {
    question: "Express 7/8 as a percentage",
    options: ["7/8%", "8.75%", "87.5%", "875%"],
    correct: "87.5%"
   },
  {
    question: "Express 4.5 as a mixed fraction",
    options: ["4 1/5", "4 1/2", "9/2", "45"],
    correct: "4 1/2"
  },
  {
    question: "By how much is 0.0851 less than 1", 
    options:["0.9419", "0.9149", "1.0851", "0.0919"],
    correct: "0.9149"
  },
  {
    question: "Increase 40 by 40%" ,
    options:["80", "65", "56", "75"], 
    correct: "56"

  },
  {
    question: "Which of the following is a proper fraction?", 
    options:["8/7", "1/2", "9/5", "11/4"], 
    correct: "1/2"

  },
  {
    question: "What is the product of 4.81 and 1.2?" ,
    options:["57.72", "577.2", "5.772", "5772"],
    correct: "5.772"
  },
  {
    question: "Express 0.07448 to 2 significant figures", 
    options: ["0.074", "0.075", "0.0745", "74"], 
    correct: "0.074"},
  {
    image: "Screenshot 2025-01-30 112117.png",
    question: "What fraction of the total area of the figure below is shaded?", 
    options: ["3/9", "4/9", "5/9", "7/9"],
    correct: "5/9"
  },
  {
    question: "Subtract 799 from 10001", 
    options:["1078", "9202", "9002", "9220"], 
    correct:"9202"
  },
  {
    question: "What is the product of 12 and 10 divided by 5?" , 
    options: ["36", "20", "72", "24"], 
    correct: "24"},

  {
    question: "What is the least common multiple of 4, 8 and 10" , 
    options:["20", "80", "40", "48"], 
    correct: "40"},
  {
    question: "What is the square root of 18/50", 
    options:["Not possible", "3/5", "9/25", "4/7"], 
    correct: "3/5"},
  {
    question: "What is the range of the following set of numbers: 0, 2, 9, 8, 7, 10, 6", 
    options:["6", "7", "9", "10"], 
    correct: "10"
  },
  {
    question: "Arrange the following fractions in ascending order : 1/2, 1/8, 1/4, 1/3", 
    options:["1/3,1/4, 1/8, 1/2", "1/3, 1/2, 1/3, 1/4 ", "1/8, 1/4, 1/3, 1/2", "1/2, 1/3, 1/4, 1/8"],
    correct: "1/8, 1/4, 1/3, 1/2"
  },
  {
    question: "Express 25cm as a fraction of 1 metre.", 
    options:["4", "1/4", "3/4", "2/5"], 
    correct: "1/4"
  },
  {
    question: "Three brothers shared 60 oranges in the ratio of their ages 1:2:3. How many oranges did the youngest get?", 
    options:["10", "20", "30", "5"], 
    correct: "10"},
  
  {
    question: "Express 0.75 as a fraction in its lowest term.",
    options: ["3/5", "3/4", "1/4", "2/5"],
    correct: "3/4"
  },

  {
    question: "Add up the following numbers: 1.781 + 0.981 + 721",
    options: ["348.3", "723762", "721.789", "723.762"],
    correct: "723.762"
  },
  {
    question: "Simplify ⁴√81 - √(32/50) + ³√27",
    options: ["5⅕", "3⅔", "7¼", "5⅖"],
    correct: "5⅕"
  },

  {
    question: "Add the following: 7hr 45min 35sec + 2hr 58min 40sec",
    options: ["9hr 44min 15sec", "10hr 44min 15sec", "11hr 34min 15sec", "8hr 54min 30sec"],
    correct: "10hr 44min 15sec"
  },

  {
    question: "Add 1.8m, 77cm, 210mm and give your answer in cm.",
    options: ["1,270.8cm", "278cm", "288.8cm", "97.1cm"],
    correct: "278cm"
  },

  {
    image: "Screenshot 2025-01-30 115038.png",
    question: "What is the perimeter of the shape which consists of a semicircle mounted on an equilateral triangle of sides 7cm?",
    options: ["26cm", "22cm", "24cm", "25cm"],
    correct: "25cm"
  },
  
  {
    question: "Express 17½% to its simplest form.",
    options: ["7/20", "7/40", "7/30", "5/9"],
    correct: "7/40"
  },
  {
    question: "Simplify (1½ + 5/3 ÷ 1⅑) of 5/12",
    options: ["1⁵/₄₈", "3⅖", "1¼", "3⅙"],
    correct: "1¼"
  },
  {
    question: "Express 0.025 as a fraction in its lowest term.",
    options: ["7/25", "28/1000", "1/40", "28/100"],
    correct: "1/40"
  },

  {
    question: "Divide 2.5 by 0.0025", 
    options:["0.100", "10.00", "100.0", "1000", "1005"], 
    correct: "1000"
  },
  {
    question: "Multiply 1.72 by 0.25", 
    options:["1.20", "0.84", "0.43", "0.33"], 
    correct: "0.43"
  },
  {
    question: "Divide 3075 by 15", 
    options: ["125", "175", "200", "205", "210"], 
    correct: "205"
  },
  {
    question: "Approximate 15974 to two significant figures", 
    options: ["15100", "16000", "15000", "15900", "16000"], 
    correct:"16000"
  },
  {
    question: "Simplify 15 - 42 ÷ 7 + 1", 
    options: ["8", "9", "10", "11", "12"], 
    correct: "10"
  },
  {
    question: "Simplify 1 1/3 - 2 1/12 + 1 1/6" , 
    options:["3/4", "4/7", "5/12", "7/12", "1/12"], 
    correct: "5/12"},
  {
    question:"Simplify (1 1/4 + 5/8) ÷ 2 1/2", 
    options: ["1/2", "1/3", "2/5", "3/4", "3/8"], 
    correct: "3/4"},
  {
    question:"A brand of tea is sold in packs containing 1/8 kilogram.How many packs can be obtained from a box containing 51 1/2 kilograms?", 
    options:["512", "412", "312","212","112"], 
    correct: "412"
  },
  {
    question:"Simplify 5² + 8² + 9²", 
    options:["25", "42", "64", "80", "86"], 
    correct: "42"
  },
  {
    question:"Evaluate ✓4 21/25", 
    options:["3 1/3", "3 3/4", "2 1/5" , "1 3/4", "1 1/2"], 
    correct: "2 1/5"
  },
  {
    question:"The average of five numbers is 15. What must a sixth number be if the average of the six numbers is to be 16?", 
    options:["18", "19", "20", "21", "22"], 
    correct: "21"},
  {
    question:"A train travels for 150km at an average speed of 50km/h, how long does it take?", 
    options:["1 1/2 hrs", "2 hrs", "2 1/2 hrs", "3 hrs", "3 1/2 hrs"], 
    correct: "3 hrs"},
  {
    image: "Screenshot 2025-01-29 112301.png" , 
    question:"Identify the shape below", 
    options: ["Rectangle", "Square", "Rhombus", "Ellipse","Parabola"], 
    correct: "Rhombus"
  },
  {
    image: "Screenshot 2025-01-29 112831.png", 
    question:"Identify the shape below", 
    options:["Cylinder", "Sphere","Cone", "Frustum", "Cuboid"], 
    correct: "Cone"
  },
  {
    question:"Given that ✓5 = 2.24, evaluate (✓5)³", 
    options:["6.2", "7.8", "8.2", "10.8", "11.2"], 
    correct: "11.2"
  },
  {
    question:"If a = 5, b = 2 find the value of ✓((a + b)² - 4ab)", 
    options:["3","4", "5", "6", "7"], 
    correct: "3"},
  {
    question:"If 2 1/2 of a sum of money is ₦15000, find the whole money", 
    options:["₦6000", "₦60 000", "₦600 000", "₦800 000", "₦900 000"], 
    correct: "₦600 000"
  },
  {
    image:"Screenshot 2025-01-29 115654.png", 
    question:"Find the area of the triangle below", 
    options:["300cm²", "250cm²", "90cm²", "84cm²", "74cm²"], 
    correct:"84cm²"
  },

  {
    question:"A spherical ball of diameter 7cm rotates five times on a horizontal ground; find the distance covered.", 
    options:["22cm", "44cm", "88cm", "99cm", "110cm"],
     correct: "110cm"
  },
  {
    question:"Solve the equation 2x - 1 = 7x - 11", 
    options:["1", "2", "3", "4", "5"], 
    correct:"2"
  },
  


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

  // To check for an image for this question, display it
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

// Calculate Score with Negative Marking
function calculateScore() {
  let score = 0; // Start with 0 marks

  questions.forEach((question, index) => {
    const selectedAnswer = selectedAnswers[index]?.answer;

    if (selectedAnswer === question.correct) {
      score += 1; // Add 1 mark for correct answer
    } else if (selectedAnswer === "No Answer") {
      score -= 1; // Deduct 1 mark for no answer
    } else {
      score -= 1; // Deduct 1 mark for incorrect answer
    }
  });

  return score;
}


// Show Results
function showResults() {
  clearInterval(timerInterval);

  const finalScore = calculateScore(); // Calculate the final score

  mainContent.innerHTML = `
    <h2>Quiz Results</h2>
    <p>Name: ${userName}</p>
    <p>ID: ${userId}</p>
    <p>Final Score: ${finalScore} / ${questions.length}</p>
  `;
}