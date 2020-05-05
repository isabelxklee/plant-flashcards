fetch(flashcardsURL)
    .then(r => r.json())
    .then((flashcardsArr) => {
        loadLearningMode(flashcardsArr)
        learningModeNavLink(flashcardsArr)
    })

function learningModeNavLink(flashcardsArr) {
    let learningModeLink = document.getElementById("learning-mode")

    learningModeLink.addEventListener("click", () => {
        console.log("It's time to learn!")
        loadLearningMode(flashcardsArr)
    })
}

function loadLearningMode(flashcardsArr) {
    document.body.innerHTML = learningMode
    renderFrontFlashcard(flashcardsArr[0])
    renderPageElements(flashcardsArr)
    learningModeNavLink(flashcardsArr)
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

fetch(questionsURL)
    .then(r => r.json())
    .then((questionsArr) => {
        loadQuizMode(questionsArr)
        quizTimeLinkAction(questionsArr)
    })

function quizTimeLinkAction(questionsArr) {
    let quizLink = document.getElementById("quiz-time")

    quizLink.addEventListener("click", () => {
        loadQuizMode(questionsArr)
    })
}

function loadQuizMode(questionsArr) {
    document.body.innerHTML = quizTime
    renderQuizElements(questionsArr)
    quizTimeLinkAction(questionsArr)
}

function renderQuizElements(questionsArr) {
    let scoreKeeper = document.getElementById("score")
    let scoreCount = 0
    scoreKeeper.innerText = `Score: ${scoreCount}`

    let questionIndex = 0
    
    let question = document.getElementById("question")
    question.innerText = `${questionsArr[questionIndex].content}`

    console.log(questionsArr)



    // nextButton.addEventListener("click", (event) => {
    //     indexPosition = indexPosition + 1
    //     renderFrontFlashcard(flashcardsArr[indexPosition])
    //     cardCount.innerText = `${indexPosition + 1} / ${flashcardsArr.length} cards`

    //     console.log(`Index position: ${indexPosition}`)
    // })

    // backButton.addEventListener("click", (event) => {
    //     indexPosition = indexPosition - 1
    //     renderFrontFlashcard(flashcardsArr[indexPosition])
    //     cardCount.innerText = `${indexPosition + 1} / ${flashcardsArr.length} cards`

    //     console.log(`Index position: ${indexPosition}`)
    // })
}