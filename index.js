const plantsURL = `http://localhost:3000/plants`
const flashcardsURL = `http://localhost:3000/flashcards`
const body = document.querySelector("body")

fetch(flashcardsURL)
    .then(r => r.json())
    .then((flashcardsArr) => {
        renderFrontFlashcard(flashcardsArr[0])
    })

function renderFrontFlashcard(flash) {
    createCardContainer()
    frontCardInfo(flash)
}

function createCardContainer() {
    let flashcardContainer = document.createElement("div")
    flashcardContainer.classList.add("flip-card")

    let innerCard = document.createElement("div")
    innerCard.classList.add("flip-card-inner")

    body.append(flashcardContainer)
    flashcardContainer.append(innerCard)
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

    innerCard.append(plantImage, plantName)

    innerCard.addEventListener("click", (event) => {
        innerCard.innerHTML = ""
        backCardInfo(flash)
    })
}

function backCardInfo(flash) {
    let factTitle = document.createElement("h4")
    factTitle.classList.add("flip-card-back", "title")
    factTitle.innerText = flash.fact_title

    let factContent = document.createElement("p")
    factContent.classList.add("flip-card-back", "content")
    factContent.innerText = flash.fact_content

    let flashcardContainer = body.querySelector(".flip-card")
    let innerCard = flashcardContainer.querySelector(".flip-card-inner")

    innerCard.append(factTitle, factContent)

    innerCard.addEventListener("click", (event) => {
        innerCard.innerHTML = ""
        frontCardInfo(flash)
    })
}