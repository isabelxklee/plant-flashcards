function renderPlayers(playersURL) {
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
    let scoreTable = document.getElementById("scoretable")
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

    let ranking = 0

    // sort the players by highscore
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