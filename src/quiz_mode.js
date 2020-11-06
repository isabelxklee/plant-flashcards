function quizTimeLinkAction() {
  let quizLink = document.getElementById("quiz-time")

  quizLink.addEventListener("click", () => {
    fetch(questionsURL)
    .then(r => r.json())
    .then((questionsArr) => {
      loadQuizMode(questionsArr)
      learningModeLinkAction()
      scoreboardLinkAction()
    })
  })
}

function loadQuizMode(questionsArr) {
  document.body.innerHTML = quizTime
  renderQuizElements(questionsArr)
  quizTimeLinkAction()
}

function renderQuizElements(questionsArr) {
  let answerOptions = document.querySelector(".answer-options")
  let answerStatus = document.getElementById("status")
  
  let questionStatement = document.getElementById("question")
  questionStatement.innerText = `${questionsArr[questionIndex].content}`

  let nextQuestion = document.getElementById("next-question")
  nextQuestion.classList.add("incorrect")

  let quizIntro = document.querySelector(".page-container")
  let numberOfQuestions = questionsArr.length
  let questionCount = quizIntro.querySelector("#plant-count")
  questionCount.innerText = `${questionIndex + 1} / ${numberOfQuestions} questions`

  answerOptionLoop(questionsArr[questionIndex], questionsArr)

  nextQuestion.addEventListener("click", () => {
    let quizIntro = document.querySelector(".page-container")
    let numberOfQuestions = questionsArr.length
    let questionCount = quizIntro.querySelector("#plant-count")

    questionIndex = questionIndex + 1

    answerOptions.innerHTML = ""
    questionStatement.innerText = `${questionsArr[questionIndex].content}`

    questionCount.innerText = `${questionIndex + 1} / ${numberOfQuestions} questions`

    answerStatus.innerText = ""

    answerOptionLoop(questionsArr[questionIndex], questionsArr)
  }) // end of continue button event listener
} // end of function

function answerOptionLoop(singleQuestion, questionsArr) {
  let quizIntro = document.querySelector(".page-container")

  let numberOfQuestions = questionsArr.length
  let lastIndexPosition = numberOfQuestions - 1

  let scoreKeeper = document.getElementById("score")
  
  let answerOptions = document.querySelector(".answer-options")
  let answerStatus = document.getElementById("status")

  let nextQuestion = document.getElementById("next-question")
  nextQuestion.classList.add("incorrect")

  singleQuestion.answers.forEach((answer) => {    
    let answerButton = document.createElement("button")
    answerButton.innerText = answer.content
    answerButton.className = "option"
    answerOptions.append(answerButton)

    answerButton.addEventListener("click", (event) => {
      console.log(answerOptions.children.length)

      if (answer.correct_answer === true) {
        answerButton.classList.toggle("correct")

        answerStatus.innerText = "Correct! 🎉"

        scoreCount = scoreCount + 50
        scoreKeeper.innerText = `Score: ${scoreCount}`
      } else {
        answerStatus.innerText = "Wrong answer 😔"
        answerButton.classList.toggle("wrong-answer")
      }

      let allAnswerButtons = answerOptions.children
      let i = 0

      for (i = 0; i < allAnswerButtons.length; i++) {
        allAnswerButtons[i].classList.add("incorrect")
        console.log(allAnswerButtons[i])
      }

      nextQuestion.classList.remove("incorrect")
    }) // end of answer button event listener
  }) // end of for each statement

  if (singleQuestion === questionsArr[lastIndexPosition]) {
    nextQuestion.remove()

    let saveScore = document.createElement("button")
    saveScore.classList.add("navigation")
    saveScore.id = "save"
    saveScore.innerText = "Save score"
    
    quizIntro.append(saveScore)

    saveScore.addEventListener("click", () => {
      loadAllPlayers()
    })
  } 
}

function redirectToQuiz() {
  let takeQuizButton = document.getElementById("take-quiz")

  takeQuizButton.addEventListener("click", () => {
    fetch(questionsURL)
    .then(r => r.json())
    .then((questionsArr) => {
      loadQuizMode(questionsArr)
      learningModeLinkAction()
      scoreboardLinkAction()
    })
  })
}