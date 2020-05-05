const flashcardsURL = `http://localhost:3000/flashcards`
const body = document.querySelector("body")

fetch(flashcardsURL)
    .then(r => r.json())
    .then((flashcardsArr) => {
        loadLearningMode(flashcardsArr)
        loadQuizTime()
    })

function loadFlashcardNavigation(flashcardsArr) {
    let cardCount = document.getElementById("card-count")
    cardCount.innerText = `1 / ${flashcardsArr.length} cards`
    console.log(cardCount)

    let indexPosition = 0
    let backButton = document.getElementById("back-button")
    let nextButton = document.getElementById("next-button")
    
    backButton.addEventListener("click", (event) => {
        indexPosition = indexPosition - 1
        loadLearningMode(flashcardsArr[indexPosition])
        cardCount.innerText = `${indexPosition + 1} / ${flashcardsArr.length} cards`

        console.log(`Index position: ${indexPosition}`)
    })

    nextButton.addEventListener("click", (event) => {
        indexPosition = indexPosition + 1
        loadLearningMode(flashcardsArr[indexPosition])
        cardCount.innerText = `${indexPosition + 1} / ${flashcardsArr.length} cards`

        console.log(`Index position: ${indexPosition}`)
    })
}

function loadLearningMode(flashcardsArr) {
    document.body.innerHTML = learningMode
    innerCard = document.querySelector("div.flip-card-inner")
    let firstFlash = flashcardsArr[0]

    let plantImage = document.createElement("img")
    plantImage.classList.add("flip-card-front")
    plantImage.id = "plant-image"
    plantImage.src = firstFlash.plant_image

    let plantName = document.createElement("h2")
    plantName.classList.add("flip-card-front")
    plantName.id = "plant-name"
    plantName.innerText = firstFlash.plant_name

    innerCard.append(plantImage, plantName)

    innerCard.addEventListener("click", (event) => {
        innerCard.innerHTML = ""
        backCardInfo(flashcardsArr)
    })

    loadFlashcardNavigation(flashcardsArr)
    navLinkActions()
}

function backCardInfo(flashcardsArr) {
    let firstFlash = flashcardsArr[0]

    let emojiRating = document.createElement("p")
    emojiRating.classList.add("flip-card-back", "rating")
    emojiRating.innerText = firstFlash.emoji_rating

    let lineBreak = document.createElement("br")

    let factTitle = document.createElement("h4")
    factTitle.classList.add("flip-card-back", "title")
    factTitle.innerText = firstFlash.fact_title

    let factContent = document.createElement("p")
    factContent.classList.add("flip-card-back", "content")
    factContent.innerText = firstFlash.fact_content

    let flashcardContainer = body.querySelector(".flip-card")
    let innerCard = flashcardContainer.querySelector(".flip-card-inner")

    innerCard.append(emojiRating, lineBreak, factTitle, factContent)

    innerCard.addEventListener("click", (event) => {
        innerCard.innerHTML = ""
        loadLearningMode(flashcardsArr)
    })
}

function loadQuizTime() {
    navLinkActions()
}

function navLinkActions() {
    let quizLink = document.getElementById("quiz-time")

    quizLink.addEventListener("click", (event) => {
        console.log("It's quiz time!")
        body.innerHTML = quizTime
        loadQuizTime(event)
    })

    let learningModeLink = document.getElementById("learning-mode")

    learningModeLink.addEventListener("click", (event) => {
        console.log("It's time to learn!")
        body.innerHTML = learningMode
        loadLearningMode()
    })
}