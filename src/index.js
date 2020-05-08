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
    loadFront(plantsArr[0])
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

        let pageContainer = document.querySelector(".card-intro")
        if (pageContainer.querySelector("#plant-info")) {
            let plantInfo = pageContainer.querySelector("#plant-info")
            plantInfo.innerHTML = ""
        }

        loadFront(plantsArr[indexPosition])

        plantCount.innerText = `${indexPosition + 1} / ${plantsArr.length} plants`
        console.log(`Index position: ${indexPosition}`)
    })

    backButton.addEventListener("click", () => {
        nextButton.classList.remove("incorrect")

        indexPosition = indexPosition - 1
        loadFront(plantsArr[indexPosition])
        plantCount.innerText = `${indexPosition + 1} / ${plantsArr.length} plants`

        if (indexPosition === 0) {
            console.log("This is the 1st plant")
            backButton.classList.add("incorrect")   
        }

        console.log(`Index position: ${indexPosition}`)
    })
}

function loadFront(plant) {
    let pageContainer = document.querySelector(".card-intro")

    let allDivs = pageContainer.getElementsByClassName("flashcard")

    if (allDivs.length > 0) {
        pageContainer.innerHTML = ""
    }

    let plantInfo = document.createElement("div")
    plantInfo.classList.add("card")
    plantInfo.id = "plant-info"

    let plantName = document.createElement("h1")
    plantName.innerText = plant.name

    let plantImage = document.createElement("img")
    plantImage.src = plant.image

    plantInfo.append(plantName, plantImage)
    pageContainer.append(plantInfo)

    plant.flashcards.forEach((flashcard) => {
        let flashcardContainer = document.createElement("div")
        flashcardContainer.classList.add("card", "flashcard")

        let factTitle = document.createElement("h2")
        factTitle.classList.add("title", "flip-card-front")
        factTitle.innerText = flashcard.fact_title

        flashcardContainer.append(factTitle)
        pageContainer.append(flashcardContainer)

        console.log(flashcard)
    })
}

// load the back of the card
// flashcard_1.addEventListener("click", () => {
//     flashcard_1.innerHTML = ""
//     loadBack(plant)
// })