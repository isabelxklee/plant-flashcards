function loadAllPlayers() {
  fetch(playersURL)
  .then(r => r.json())
  .then((playersArr) => {
    createPlayerAction(playersArr)
  })
}

function createPlayerAction(playersArr) {
  document.body.innerHTML = createPlayer
  learningModeLinkAction()
  quizTimeLinkAction()
  scoreboardLinkAction()

  let scoreKeeper = document.getElementById("score")
  scoreKeeper.innerText = `Score: ${scoreCount}`

  formAction(playersArr)
}

function formAction(playersArr) {
  let newUserForm = document.querySelector(".create-user")
  let usernameInput = document.getElementById("username-input")
  usernameInput.setAttribute("autocomplete","off")

  newUserForm.addEventListener("submit", (event) => {
    event.preventDefault()
    localStorage.setItem('username', usernameInput.value)

    fetch(playersURL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: usernameInput.value,
        highscore: scoreCount
      })
    })
    .then(r => r.json())
    .then((player) => {
      if (player.id) {
        loadScoreboard(playersArr)
        addNewPlayer(player)
      }
      event.target.reset()
    })
  })
}