function createPlayerAction() {
    document.body.innerHTML = createPlayer
    learningModeLinkAction()
    quizTimeLinkAction()
    scoreboardLinkAction()

    let scoreKeeper = document.getElementById("score")
    scoreKeeper.innerText = `Score: ${scoreCount}`

    let newUserForm = document.querySelector(".create-user")
    let usernameInput = document.getElementById("username-input")

    newUserForm.addEventListener("submit", (event) => {
        event.preventDefault()

        console.log(usernameInput.value)

        fetch(playersURL, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                username: usernameInput.value,
                highscore: scoreCount
            })
        })
        .then(r => r.json())
        .then(() => {
            loadScoreboard()
        })
    })
}