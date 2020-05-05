const flashcardsURL = `http://localhost:3000/flashcards`
const body = document.querySelector("body")

fetch(flashcardsURL)
    .then(r => r.json())
    // .then((flashcardsArr) => {
    //     loadLearningMode()
    //     createCardContainer(flashcardsArr)
    //     renderFrontFlashcard(flashcardsArr[0])
    // })
    .then(loadLearningMode())

function renderFrontFlashcard(flash) {
    frontCardInfo(flash)
}

function createCardContainer(flashcardsArr) {
    let header = document.createElement("h1")
    header.innerText = "Click on the card to flip it."

    let cardCount = document.createElement("p")
    cardCount.classList.add("content")
    cardCount.id = "card-count"
    cardCount.innerText = `1 / ${flashcardsArr.length} cards`

    let flashcardContainer = document.createElement("div")
    flashcardContainer.classList.add("flip-card")

    let innerCard = document.createElement("div")
    innerCard.classList.add("flip-card-inner")

    let buttonGroup = document.createElement("div")
    buttonGroup.classList.add("btn-group")

    let nextButton = document.createElement("button")
    nextButton.classList.add("navigation")
    nextButton.id = "next-button"
    nextButton.innerText = "Next"

    let backButton = document.createElement("button")
    backButton.classList.add("navigation")
    backButton.id = "back-button"
    backButton.innerText = "Previous"

    body.append(header, flashcardContainer)
    buttonGroup.append(backButton, nextButton)
    flashcardContainer.append(innerCard, cardCount, buttonGroup)

    navigationActions(flashcardsArr)
}

function navigationActions(flashcardsArr) {
    let flashcardContainer = body.querySelector(".flip-card")
    let nextButton = flashcardContainer.querySelector("#next-button")
    let backButton = flashcardContainer.querySelector("#back-button")
    let cardCount = flashcardContainer.querySelector("#card-count")

    let indexPosition = 0

    backButton.addEventListener("click", (event) => {
        indexPosition = indexPosition - 1
        renderFrontFlashcard(flashcardsArr[indexPosition])
        cardCount.innerText = `${indexPosition + 1} / ${flashcardsArr.length} cards`

        console.log(`Index position: ${indexPosition}`)
    })

    nextButton.addEventListener("click", (event) => {
        indexPosition = indexPosition + 1
        renderFrontFlashcard(flashcardsArr[indexPosition])
        cardCount.innerText = `${indexPosition + 1} / ${flashcardsArr.length} cards`

        console.log(`Index position: ${indexPosition}`)
    })
}

function frontCardInfo(flash) {
    let plantImage = document.createElement("img")
    plantImage.classList.add("flip-card-front")
    plantImage.src = flash.plant_image

    let plantName = document.createElement("h2")
    plantName.classList.add("flip-card-front")
    plantName.innerText = flash.plant_name

    let flashcardContainer = body.querySelector(".flip-card")
    let innerCard = flashcardContainer.querySelector(".flip-card-inner")

    innerCard.innerHTML = ""

    innerCard.append(plantImage, plantName)

    innerCard.addEventListener("click", (event) => {
        innerCard.innerHTML = ""
        backCardInfo(flash)
    })
}

function backCardInfo(flash) {
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

    let flashcardContainer = body.querySelector(".flip-card")
    let innerCard = flashcardContainer.querySelector(".flip-card-inner")

    innerCard.append(emojiRating, lineBreak, factTitle, factContent)

    innerCard.addEventListener("click", (event) => {
        innerCard.innerHTML = ""
        frontCardInfo(flash)
    })
}

function loadLearningMode() {
    document.body.innerHTML = learningMode
}