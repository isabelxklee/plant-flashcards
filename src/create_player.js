function createPlayerAction() {
    document.body.innerHTML = createPlayer
    learningModeLinkAction()
    quizTimeLinkAction()
    scoreboardLinkAction()

    let scoreKeeper = document.getElementById("score")
    scoreKeeper.innerText = `Score: ${scoreCount}`

    let newUserForm = document.querySelector(".create-user")
    let usernameInput = document.getElementById("username-input")
    usernameInput.value = localStorage.username

    // use `localStorage` to store the inputted username
    // since localStorage is universal, call this variable to edit and delete?
    // grab localStorage and use it on different pages

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
        .then((newPlayer) => {
            // push the new player into the players array
            // call a function like renderPlayersArray
            // playersArr.push(newPlayer)
            renderPlayersArr()
            loadScoreboard(playersArr)
        })
    })
}

function renderPlayersArr() {

}