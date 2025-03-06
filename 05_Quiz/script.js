document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");

  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");

  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  startBtn.addEventListener("click", startQuiz); //start quiz is a function but we are passing a reffernce of start quiz that means when start butti will be cicked then this function will be executed

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    startQuiz();
  });

  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
  }

  function showQuestion() {

    nextBtn.classList.add("hidden");
    questionText.textContent = questions[currentQuestionIndex].question;
    choicesList.innerHTML = ""; //clear previous choices
    
    questions[currentQuestionIndex].choices.forEach((choice) => {

      const li = document.createElement("li");
      li.textContent = choice;
      li.classList.add("ch");  //simply Added class 
      //many changes are being done by me from here to....line no 119(select answer function)
      li.addEventListener("click", (e) => {
        console.log(e.target);
        if(!document.querySelector(".correct, .wrong")){
          selectAnswer(choice, e.target);
        }
        // li.style.backgroundColor = "green";  --> for this i will add class wrong or right and add bgc in styling
        
      }); //calback func--> () =>  if we use only this -->selectAnswer(choice)  then it will get execute without getting clicked 
      // so we need to use calback func which states when the option is clicked then only we should execute it
      
      choicesList.appendChild(li);
    });
  }


  function selectAnswer(choice, selectedoption) {   // selected option mai li aa rha hai i.e e.target
    
    const correctAnswer = questions[currentQuestionIndex].answer;

    // document.querySelectorAll(".choice").forEach(option => {
    //   option.classList.remove("correct", "wrong");
    // });

    if (choice === correctAnswer) {

      selectedoption.classList.add("correct");
      score++;
      
    }else{
      selectedoption.classList.add("wrong");
    }
    nextBtn.classList.remove("hidden");
    
  }

  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} out of ${questions.length}`;
  }
});
