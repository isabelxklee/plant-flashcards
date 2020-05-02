const plantsURL = `http://localhost:3000/plants`
const flashcardsURL = `http://localhost:3000/flashcards`
const body = document.querySelector("body")

fetch(flashcardsURL)
    .then(r => r.json())
    .then((flashcardsArr) => {
        renderFlashcard(flashcardsArr[0])
    })

function renderFlashcard(flash) {
    let flashcardContainer = document.createElement("div")
    flashcardContainer.classList.add("flip-card")

    let innerCard = document.createElement("div")
    innerCard.classList.add("flip-card-inner")

    body.append(flashcardContainer)
    flashcardContainer.append(innerCard)

    innerCard.innerHTML = ""

    let plantImage = document.createElement("img")
    // plantImage.classList.add("flip-card-front")
    plantImage.src = flash.plant_image

    let plantName = document.createElement("h2")
    plantName.classList.add("flip-card-front")
    plantName.innerText = flash.plant_name

    innerCard.append(plantImage, plantName)
    flashcardContainer.append(innerCard)

    // flashcardContainer.addEventListener("click", (event) => {
    //     flipFlashcard(flash)
    // })
}

// <div class="flip-card">

//   <div class="flip-card-inner">

//     <div class="flip-card-front">
//       {/* plant image */}
//       {/* plant name */}
//     </div>

//     <div class="flip-card-back">
//       {/* fact title */}
//       {/* fact content */}
//     </div>

//   </div>

// </div>

// function flipFlashcard(flash) {
//     console.log(flash)

//     let flashcardContainer = body.querySelector(".card")

//     flashcardContainer.innerHTML = ""

//     let factTitle = document.createElement("h4")
//     factTitle.classList.add("info-container")
//     factTitle.innerText = flash.fact_title

//     let factContent = document.createElement("p")
//     factContent.classList.add("info-container")
//     factContent.innerText = flash.fact_content

//     flashcardContainer.append(factTitle, factContent)

//     flashcardContainer.addEventListener("click", (event) => {
//         renderFlashcard(plant, flash)
//     })
// }