fetch(plantsURL)
    .then(r => r.json())
    .then((plantsArr) => {
        loadLearningMode(plantsArr)
    })

function learningModeLinkAction() {
    let learningModeLink = document.getElementById("learning-mode")

    learningModeLink.addEventListener("click", () => {
        fetch(plantsURL)
            .then(r => r.json())
            .then((plantsArr) => {
                loadLearningMode(plantsArr)
            })
    })
}

function loadLearningMode(plantsArr) {
    document.body.innerHTML = learningMode
    learningModeLinkAction()
    quizTimeLinkAction()
    scoreboardLinkAction()
    plantFlashcard(plantsArr[0])
    renderPageElements(plantsArr)
}

function renderPageElements(plantsArr) {
    let plantCount = document.getElementById("plant-count")
    plantCount.innerText = `1 / ${plantsArr.length} plants`

    let backButton = document.getElementById("back-button")
    let nextButton = document.getElementById("next-button")

    let indexPosition = 0

    if (indexPosition === 0) {
        console.log("This is the 1st plant")
        backButton.classList.add("incorrect")   
    } 

    nextButton.addEventListener("click", () => {
        backButton.classList.remove("incorrect")

        let lastPlant = plantsArr.length - 2

        if (indexPosition === lastPlant) {
            console.log("This is the 4th plant")
            nextButton.classList.add("incorrect")
        }

        indexPosition = indexPosition + 1
        plantFlashcard(plantsArr[indexPosition])
        plantCount.innerText = `${indexPosition + 1} / ${plantsArr.length} plants`
        console.log(`Index position: ${indexPosition}`)
    })

    backButton.addEventListener("click", () => {
        nextButton.classList.remove("incorrect")

        indexPosition = indexPosition - 1
        plantFlashcard(plantsArr[indexPosition])
        plantCount.innerText = `${indexPosition + 1} / ${plantsArr.length} plants`

        if (indexPosition === 0) {
            console.log("This is the 1st plant")
            backButton.classList.add("incorrect")   
        }

        console.log(`Index position: ${indexPosition}`)
    })
}

function plantFlashcard(plant) {
    let pageContainer = document.querySelector(".card-intro")
    
    let innerCard = pageContainer.querySelector("#plant-info")
    innerCard.innerHTML = ""

    let plantName = document.createElement("h1")
    plantName.innerText = plant.name

    let plantImage = document.createElement("img")
    plantImage.src = plant.image
    innerCard.append(plantName, plantImage)

    loadFront(plant)
}

function loadFront(plant) {
    let pageContainer = document.querySelector(".card-intro")    
    let flashcard_1 = pageContainer.querySelector("#flash-1")    

    flashcard_1.innerHTML = ""

    let factTitle = document.createElement("h2")
    factTitle.classList.add("flip-card-front", "title")
    factTitle.innerText = plant.flashcards[0].fact_title

    flashcard_1.append(factTitle)

    flashcard_1.addEventListener("click", () => {
        flashcard_1.innerHTML = ""
        loadBack(plant)
    })
}

function loadBack(plant) {
    let pageContainer = document.querySelector(".card-intro")    
    let flashcard_1 = pageContainer.querySelector("#flash-1")    

    let emojiRating = document.createElement("p")
    emojiRating.classList.add("flip-card-back", "rating")
    emojiRating.innerText = plant.flashcards[0].emoji_rating

    let lineBreak = document.createElement("br")

    let factContent = document.createElement("p")
    factContent.classList.add("flip-card-back", "content")
    factContent.innerText = plant.flashcards[0].fact_content

    flashcard_1.append(emojiRating, lineBreak, factContent)

    flashcard_1.addEventListener("click", () => {
        flashcard_1.innerHTML = ""
        loadFront(plant)
    })
}