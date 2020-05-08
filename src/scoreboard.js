function renderPlayers() {
    fetch(playersURL)
        .then(r => r.json())
        .then((playersArr) => {
            loadScoreboard(playersArr)
            learningModeLinkAction()
            quizTimeLinkAction()
        })
}

function scoreboardLinkAction() {
    let scoreboardLink = document.getElementById("scoreboard")
    scoreboardLink.addEventListener("click", () => {
        renderPlayers(playersURL)
    })
}

function loadScoreboard(playersArr) {
    document.body.innerHTML = scoreboard

    editUsername(playersArr)

    let scoreTable = document.getElementById("scoretable")
    let ranking = 0

    playersArr.sort(function(a, b) {
        return (a['highscore'] < b['highscore']) ? 1 : ((a['highscore'] > b['highscore']) ? -1 : 0)
    })

    playersArr.forEach((player) => {
        ranking = ranking + 1

        let newRow = document.createElement("tr")
        let rankingCell = document.createElement("td")
        let usernameCell = document.createElement("td")
        let scoreCell = document.createElement("td")

        rankingCell.innerText = `${ranking}`
        usernameCell.innerText = player.username
        scoreCell.innerText = player.highscore

        newRow.append(rankingCell, usernameCell, scoreCell)
        scoreTable.append(newRow)

        if (ranking === 1) {
            usernameCell.innerText = `👑 ${player.username} 👑`
        }
    })
}

function editUsername(playersArr) {
    let pageContainer = document.querySelector(".page-container")
    let editButton = pageContainer.querySelector("#edit")
    let editPlayerForm = pageContainer.querySelector(".edit-user")
    let usernameInput = editPlayerForm.querySelector("input")
    let currentUser = localStorage.getItem('username')

    editPlayerForm.style.display = "none"

    playersArr.forEach((player) => {
        if (player.username === currentUser) {
            let playerID = player.id
            let singlePlayerURL = `http://localhost:3000/players/${playerID}`

            editButton.addEventListener("click", () => {
                editPlayer = !editPlayer
                if (editPlayer) {
                    editPlayerForm.style.display = "grid"
                    usernameInput.value = currentUser
        
                    editPlayerForm.addEventListener("submit", (event) => {
                        event.preventDefault()

                        fetch(singlePlayerURL, {
                            method: "PATCH",
                            headers: {
                                "Content-type": "application/json",
                            },
                            body: JSON.stringify({
                                username: usernameInput.value
                            })
                        })
                        .then(r => r.json())
                        .then((response) => {
                            if (response.id) {
                                console.log("Success!")
                                localStorage.setItem('username', usernameInput.value)
                                usernameInput.value = currentUser
                                console.log(currentUser)
                            } else {
                                console.log("This did not save.")
                            }
                            event.target.reset()
                        })
                    })
                } else {
                    editPlayerForm.style.display = "none"
                }
            })
        }
    })
}

///////////////////////////////////
function redirectToQuiz() {
    let takeQuizButton = document.getElementById("take-quiz")

    takeQuizButton.addEventListener("click", () => {
        fetch(questionsURL)
            .then(r => r.json())
            .then((questionsArr) => {
                loadQuizMode(questionsArr)
                learningModeLinkAction()
                scoreboardLinkAction()
            })
    })
}