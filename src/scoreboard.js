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

function findSinglePlayerURL(playersArr) {
    let playerID = -1
    let singlePlayerURL = ``

    playersArr.forEach((player) => {
        if (player.username === currentUser) {
            playerID = player.id
            singlePlayerURL = `http://localhost:3000/players/${playerID}`
        }
    })

    return singlePlayerURL
}

function toggleEditForm() {
    let pageContainer = document.querySelector(".page-container")
    let editButton = pageContainer.querySelector("#edit")
    let editPlayerForm = pageContainer.querySelector(".edit-user")
    let usernameInput = editPlayerForm.querySelector("input")

    editButton.addEventListener("click", () => {
        editPlayer = !editPlayer
        if (editPlayer) {
            editPlayerForm.style.display = "grid"
            usernameInput.value = currentUser
        } else {
            editPlayerForm.style.display = "none"
        }
    })
}

function editUsername(playersArr) {
    let pageContainer = document.querySelector(".page-container")
    let editPlayerForm = pageContainer.querySelector(".edit-user")
    let usernameInput = editPlayerForm.querySelector("input")

    toggleEditForm()
    editPlayerForm.style.display = "none"

    let singlePlayer = findSinglePlayerURL(playersArr)
    console.log(singlePlayer)

    editPlayerForm.addEventListener("submit", (event) => {
        event.preventDefault()

        fetch(singlePlayer, {
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
}

function deleteUsername(playersArr) {
    let pageContainer = document.querySelector(".page-container")
    let deleteButton = pageContainer.querySelector("#danger")

    let singlePlayer = findSinglePlayerURL(playersArr)
    let usersRow = findTableRow()
    console.log(singlePlayer, usersRow)

    deleteButton.addEventListener("click", () => {
        fetch(singlePlayer, {
            method: "DELETE"
        })
        .then(r => r.json())
        .then((emptyObj) => {
            console.log(emptyObj);
            usersRow.remove()
            })
        })
}

function findTableRow() {
    let scoreTable = document.getElementById("scoretable")
    let tableRows = scoreTable.getElementsByTagName("tr")
    let tableCells = scoreTable.getElementsByTagName("td")
    let usersCell = ""
    let rowID = ""
    let usersRow = ""

    Array.from(tableCells).forEach((cell) => { 
        if (cell.innerText === currentUser) {
            usersCell = cell
            rowID = usersCell.className
            console.log(usersCell)

            Array.from(tableRows).forEach((row) => {
                if (row.className === rowID) {
                    usersRow = row
                    console.log(usersRow)
                }
            })
        }
    })
    return usersRow
}