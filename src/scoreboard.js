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
    newRow.classList.add(`user-${player.id}`)
    let rankingCell = document.createElement("td")
    let usernameCell = document.createElement("td")
    usernameCell.id = `user-${player.id}`
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

function addNewPlayer(player) {
  let scoreTable = document.getElementById("scoretable")
  let ranking = 5

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
}

function findCurrentPlayer(playersArr) {
  let currentID = 0

  playersArr.forEach((player) => {
    if (player.username === localStorage.username) {
      currentID = player.id
    }
  })

  return currentID
}

function findTableRow() {
  let scoreTable = document.getElementById("scoretable")
  let tableRows = scoreTable.getElementsByTagName("tr")
  let usersRow = ""
  let rowID = findUsersCell()[0]

  Array.from(tableRows).forEach((row) => {
    if (row.className === rowID) {
      usersRow = row
    }
  })

  return usersRow
}

function findUsersCell() {
  let scoreTable = document.getElementById("scoretable")
  let tableCells = scoreTable.getElementsByTagName("td")
  let usersCell = ""
  let rowID = ""

  if (localStorage.username) {
    Array.from(tableCells).forEach((cell) => { 
      if (cell.innerText === localStorage.username) {
        usersCell = cell
        rowID = usersCell.className
      }
    })

    let usersArr = [rowID, usersCell]
    return usersArr
  }
}

function toggleEditForm() {
  let pageContainer = document.querySelector(".page-container")
  let editButton = pageContainer.querySelector("#edit")
  let editPlayerForm = pageContainer.querySelector(".edit-user")
  let usernameInput = editPlayerForm.querySelector("input")
  usernameInput.setAttribute("autocomplete","off")

  if (localStorage.length === 0) {
    editButton.classList.add("incorrect")
  } else {
    editButton.classList.remove("incorrect")
  }

  editButton.addEventListener("click", () => {
    editPlayer = !editPlayer
    if (editPlayer) {
      editPlayerForm.style.display = "grid"
      usernameInput.value = localStorage.username
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

  let singlePlayerURL = `${playersURL}/${findCurrentPlayer(playersArr)}`

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
      updateUsername(response)
      event.target.reset()
    })
  })
}

function updateUsername(player) {
  let scoreTable = document.getElementById("scoretable")
  localStorage.setItem('username', player.username)
  let userCell = scoreTable.querySelector(`#user-${player.id}`)
  userCell.innerText = player.username
}

function deleteUsername(playersArr) {
  let pageContainer = document.querySelector(".page-container")
  let deleteButton = pageContainer.querySelector("#danger")
  let editButton = pageContainer.querySelector("#edit")
  let scoreTable = document.getElementById("scoretable")

  let userID = findCurrentPlayer(playersArr)
  let userRow = scoreTable.querySelector(`tr.user-${userID}`)

  let singlePlayerURL = `${playersURL}/${userID}`

  if (localStorage.length === 0) {
    deleteButton.classList.add("incorrect")
  } else {
    deleteButton.classList.remove("incorrect")
  }

  deleteButton.addEventListener("click", () => {
    fetch(singlePlayerURL, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(() => {
      userRow.remove()
      localStorage.clear()
      deleteButton.classList.add("incorrect")
      editButton.classList.add("incorrect")
    })
  })
}