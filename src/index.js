fetch(flashcardsURL)
    .then(r => r.json())
    .then((flashcardsArr) => {
        loadLearningMode(flashcardsArr)
        learningModeLinkAction()
        quizTimeLinkAction()
        scoreboardLinkAction()
    })

function learningModeLinkAction() {
    let learningModeLink = document.getElementById("learning-mode")

    learningModeLink.addEventListener("click", () => {
        fetch(flashcardsURL)
            .then(r => r.json())
            .then((flashcardsArr) => {
                loadLearningMode(flashcardsArr)
            })
    })
}

function loadLearningMode(flashcardsArr) {
    document.body.innerHTML = learningMode
    renderFrontFlashcard(flashcardsArr[0])
    renderPageElements(flashcardsArr)
    learningModeLinkAction()
    quizTimeLinkAction()
    scoreboardLinkAction()
}

function renderPageElements(flashcardsArr) {
    let cardCount = document.getElementById("card-count")
    cardCount.innerText = `1 / ${flashcardsArr.length} cards`

    let backButton = document.getElementById("back-button")
    let nextButton = document.getElementById("next-button")

    let indexPosition = 0

    nextButton.addEventListener("click", (event) => {
        indexPosition = indexPosition + 1
        renderFrontFlashcard(flashcardsArr[indexPosition])
        cardCount.innerText = `${indexPosition + 1} / ${flashcardsArr.length} cards`

        console.log(`Index position: ${indexPosition}`)
    })

    backButton.addEventListener("click", (event) => {
        indexPosition = indexPosition - 1
        renderFrontFlashcard(flashcardsArr[indexPosition])
        cardCount.innerText = `${indexPosition + 1} / ${flashcardsArr.length} cards`

        console.log(`Index position: ${indexPosition}`)
    })
}

function renderFrontFlashcard(flash) {
    let innerCard = document.querySelector(".flip-card")
    innerCard.innerHTML = ""

    let plantImage = document.createElement("img")
    plantImage.classList.add("flip-card-front")
    plantImage.id = "plant-image"
    plantImage.src = flash.plant_image

    let plantName = document.createElement("h2")
    plantName.classList.add("flip-card-front")
    plantName.id = "plant-name"
    plantName.innerText = flash.plant_name

    innerCard.append(plantImage, plantName)

    innerCard.addEventListener("click", (event) => {
        innerCard.innerHTML = ""
        renderBackCardInfo(flash)
    })
}

function renderBackCardInfo(flash) {
    let innerCard = document.querySelector(".flip-card")

    let emojiRating = document.createElement("p")
    emojiRating.classList.add("flip-card-back", "rating")
    emojiRating.innerText = flash.emoji_rating

    let lineBreak = document.createElement("br")

    let factTitle = document.createElement("h4")
    factTitle.classList.add("flip-card-back", "title")
    factTitle.innerText = flash.fact_title

    let factContent = document.createElement("p")
    factContent.classList.add("flip-card-back", "content")
    factContent.innerText = flash.fact_content

    innerCard.append(emojiRating, lineBreak, factTitle, factContent)

    innerCard.addEventListener("click", (event) => {
        innerCard.innerHTML = ""
        renderFrontFlashcard(flash)
    })
}

//////////////////////////////////////////////////////////////////////////////////////////

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
    let quizIntro = document.querySelector(".quiz-intro")

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
        console.log("LAST QUESTION!!!")
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
} // end of function

////////////////////////////////////////////////////////////////////////////////////// 

function createPlayerAction() {
    document.body.innerHTML = createPlayer
    learningModeLinkAction()
    quizTimeLinkAction()
    scoreboardLinkAction()
}

////////////////////////////////////////////////////////////////////////////////////// 

function scoreboardLinkAction() {
    let scoreboardLink = document.getElementById("scoreboard")

    scoreboardLink.addEventListener("click", () => {
        fetch(playersURL)
            .then(r => r.json)
            .then( () => {
                loadScoreboard()
                learningModeLinkAction()
                quizTimeLinkAction()
            })
    })
}

function loadScoreboard() {
    document.body.innerHTML = scoreboard
}
