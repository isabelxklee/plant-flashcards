const plantsURL = `http://localhost:3000/plants`
const body = document.querySelector("body")

fetch(plantsURL)
    .then(r => r.json())
    .then((plantsArray) => {
        plantsArray.forEach((plant) => {
            plant.flashcards.forEach((flash) => {
                renderFlashcards(plant, flash)
            })
        })
    })

function renderFlashcards(plant, flash) {
    let flashcardContainer = document.createElement("div")
    flashcardContainer.classList.add("card")

    body.append(flashcardContainer)

    flashcardContainer.innerHTML = ""

    let plantImage = document.createElement("img")
    plantImage.src = plant.image

    let plantName = document.createElement("h2")
    plantName.classList.add("info-container")
    plantName.innerText = plant.name

    flashcardContainer.append(plantImage, plantName)

    flashcardContainer.addEventListener("click", (event) => {
        flipFlashcard(plant, flash)
    })
}

function flipFlashcard(plant, flash) {
    console.log(flash)
    
    let flashcardContainer = body.querySelector(".card")

    flashcardContainer.innerHTML = ""

    let factTitle = document.createElement("h4")
    factTitle.classList.add("info-container")
    factTitle.innerText = flash.fact_title

    let factContent = document.createElement("p")
    factContent.classList.add("info-container")
    factContent.innerText = flash.fact_content

    flashcardContainer.append(factTitle, factContent)

    flashcardContainer.addEventListener("click", (event) => {
        renderFlashcards(plant, flash)
    })
}