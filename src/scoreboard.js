function renderPlayers() {
    fetch(playersURL)
        .then(r => r.json())
        .then((playersArr) => {
            loadScoreboard(playersArr)
            deleteUsername(playersArr)
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
        newRow.classList.add(`row-${ranking}`)
        let rankingCell = document.createElement("td")
        let usernameCell = document.createElement("td")
        usernameCell.classList.add(`row-${ranking}`)
        let scoreCell = document.createElement("td")

        rankingCell.innerText = `${ranking}`
        usernameCell.innerText = player.username
        scoreCell.innerText = player.highscore

        newRow.append(rankingCell, usernameCell, scoreCell)
        scoreTable.append(newRow)

        if (ranking === 1) {
            usernameCell.innerText = `👑 ${player.username} 👑`
            usernameCell.classList.add("number-one")
            rankingCell.classList.add("number-one")
            scoreCell.classList.add("number-one")
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
            }) // end of edit button event listener
        } // end of if statement
    }) // end of foreach statement
} // end of function

function deleteUsername(playersArr) {
    let pageContainer = document.querySelector(".page-container")
    let deleteButton = pageContainer.querySelector("#danger")
    let currentUser = localStorage.getItem('username')

    let scoreTable = document.getElementById("scoretable")
    let tableRows = scoreTable.getElementsByTagName("tr")
    let tableCells = scoreTable.getElementsByTagName("td")

    Array.from(tableCells).forEach((cell) => { 
        if (cell.innerText === currentUser) {
            let usersCell = cell
            let rowID = usersCell.className
            console.log(usersCell)

            Array.from(tableRows).forEach((row) => {
                if (row.className === rowID) {
                    let usersRow = row
                    console.log(usersRow)
                }
            })

            playersArr.forEach((player) => {
            if (player.username === currentUser) {
                let playerID = player.id
                let singlePlayerURL = `http://localhost:3000/players/${playerID}`

                deleteButton.addEventListener("click", (event) => {
                    fetch(singlePlayerURL, {
                        method: "DELETE"
                    })
                    .then(r => r.json())
                    .then((emptyObj) => {
                        console.log(emptyObj);
                        usersRow.remove()
                        })
                    })
                }
            }) // end of for each statement   
        } // end of if statement
    }) // end of foreach statement    
} // end of function






///////////////////////////////////
function redirectToQuiz() {
    let takeQuizButton = document.getElementById("take-quiz")
    takeQuizButton.style.display = "block"

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