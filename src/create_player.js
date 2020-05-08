function loadAllPlayers() {
    fetch(playersURL)
        .then(r => r.json())
        .then((playersArr) => {
            createPlayerAction(playersArr)
        })
}

function createPlayerAction() {
    document.body.innerHTML = createPlayer
    learningModeLinkAction()
    quizTimeLinkAction()
    scoreboardLinkAction()

    let scoreKeeper = document.getElementById("score")
    scoreKeeper.innerText = `Score: ${scoreCount}`

    formAction()
}

function formAction() {
    let newUserForm = document.querySelector(".create-user")
    let usernameInput = document.getElementById("username-input")

    newUserForm.addEventListener("submit", (event) => {
        event.preventDefault()
        localStorage.setItem('username', usernameInput.value)
        let currentUser = localStorage.getItem('username')
        console.log(localStorage)

        fetch(playersURL, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                username: currentUser,
                highscore: scoreCount
            })
        })
        .then(r => r.json())
        .then((response) => {
            if (response.id) {
                loadScoreboard(playersArr) 
            } else {
                console.log("This did not save.")
            }
            event.target.reset()
        })
    })
}