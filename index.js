const plantsURL = `http://localhost:3000/plants`
const flashcardsURL = `http://localhost:3000/flashcards`
const body = document.querySelector("body")

fetch(flashcardsURL)
    .then(r => r.json())
    .then((flashcardsArr) => {
        renderFrontFlashcard(flashcardsArr[0])
    })

function renderFrontFlashcard(flash) {
    let flashcardContainer = document.createElement("div")
    flashcardContainer.classList.add("flip-card")

    let innerCard = document.createElement("div")
    innerCard.classList.add("flip-card-inner")

    body.append(flashcardContainer)
    flashcardContainer.append(innerCard)

    let plantImage = document.createElement("img")
    plantImage.classList.add("flip-card-front")
    plantImage.src = flash.plant_image

    let plantName = document.createElement("h2")
    plantName.classList.add("flip-card-front")
    plantName.innerText = flash.plant_name

    // slap it on the DOM
    innerCard.append(plantImage, plantName)
    flashcardContainer.append(innerCard)

    renderBackFlashcard(flash)
}

function renderBackFlashcard(flash) {
    let innerCard = body.querySelector(".flip-card-inner")

    let factTitle = document.createElement("h4")
    factTitle.classList.add("flip-card-back")
    factTitle.innerText = flash.fact_title

    let factContent = document.createElement("p")
    factContent.classList.add("flip-card-back")
    factContent.innerText = flash.fact_content

    innerCard.append(factTitle, factContent)
}