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
  renderPageElements(plantsArr)
  learningModeLinkAction()
  quizTimeLinkAction()
  scoreboardLinkAction()
  loadFront(plantsArr[0])
}

function renderPageElements(plantsArr) {
  let plantCount = document.getElementById("plant-count")
  plantCount.innerText = `1 / ${plantsArr.length} plants`

  let takeQuizButton = document.getElementById("take-quiz")
  takeQuizButton.style.display = "none"

  let backButton = document.getElementById("back-button")
  let nextButton = document.getElementById("next-button")

  let indexPosition = 0

  if (indexPosition === 0) {
    backButton.classList.add("incorrect")   
  } 

  nextButton.addEventListener("click", () => {
    backButton.classList.remove("incorrect")

    let lastPlant = plantsArr.length - 2

    if (indexPosition === lastPlant) {
      nextButton.classList.add("incorrect")
      redirectToQuiz()
    }

    indexPosition = indexPosition + 1

    let pageContainer = document.querySelector(".card-intro")
    if (pageContainer.querySelector("#plant-info")) {
        let plantInfo = pageContainer.querySelector("#plant-info")
        plantInfo.innerHTML = ""
    }

    loadFront(plantsArr[indexPosition])

    plantCount.innerText = `${indexPosition + 1} / ${plantsArr.length} plants`
  })

  backButton.addEventListener("click", () => {
    nextButton.classList.remove("incorrect")

    indexPosition = indexPosition - 1
    loadFront(plantsArr[indexPosition])
    plantCount.innerText = `${indexPosition + 1} / ${plantsArr.length} plants`

    if (indexPosition === 0) {
      backButton.classList.add("incorrect")   
    }
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

    flashcardContainer.addEventListener("click", () => {
      flashcardContainer.innerHTML = ""

      let emojiRating = document.createElement("p")
      emojiRating.classList.add("rating", "flip-card-back")
      emojiRating.innerText = flashcard.emoji_rating

      let linebreak = document.createElement("br")
      
      let factContent = document.createElement("p")
      factContent.classList.add("flip-card-back", "content")
      factContent.innerText = flashcard.fact_content

      flashcardContainer.append(emojiRating, linebreak, factContent)

      flashcardContainer.addEventListener("click", () => {
        loadFront(plant)
      })
    })
  })
}