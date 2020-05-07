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

    answerOptionLoop(questionsArr[questionIndex], questionsArr)

    nextQuestion.addEventListener("click", (event) => {
        questionIndex = questionIndex + 1
        console.log(`Question #${questionIndex + 1}`)

        answerOptions.innerHTML = ""
        questionStatement.innerText = `${questionsArr[questionIndex].content}`

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
        answerOptions.append(answerButton)
    
        answerButton.addEventListener("click", (event) => {
    
            if (answer.correct_answer === true) {
                console.log("This is correct!")
                answerButton.classList.toggle("correct")
    
                answerStatus.innerText = "Correct! 🎉"
    
                scoreCount = scoreCount + 100
                scoreKeeper.innerText = `Score: ${scoreCount}`
    
                nextQuestion.classList.remove("incorrect")
            } else {
                console.log("WRONG!")
                answerStatus.innerText = "Wrong answer 😔"
                answerButton.classList.toggle("incorrect")
            }
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
            createPlayerAction()
        })
    } 
}