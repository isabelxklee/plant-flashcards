let header = `
  <div class="header">
    <a href="#default" class="logo" id="learning-mode">🌿 Plant Flashcards</a>
    <a href="#default" id="quiz-time">✏️ Quiz time</a>
    <a href="#default" id="scoreboard">🏀 Scoreboard</a>
  </div>
`

let footer = `
  <div class="footer">
    <a href="https://github.com/isabelxklee/plant-flashcards" target="blank">🐸 Made by Isabel</a>
  </div>
`

let learningMode = `
  ${header}
  <div class="card-intro" id="flashcards">
  </div>

  <div id="flashcard-navigation">
    <p id="plant-count"></p><br>
    <div class="btn-group">
      <button class="navigation" id="back-button">Previous</button>
      <button class="navigation" id="next-button">Next</button>
    </div>
  </div>
  ${footer}
`

let quizTime = `
  ${header}
  <div class="page-container">
    <p id="plant-count"></p><br>
    
    <h1 id="question"></h1>
    <div class="answer-options">
    </div><br>

    <h2 id="status"></h2>
    <h2 id="score">Score: 0</h2>

    <button class="navigation" id="next-question">Continue</button>
  </div>
  ${footer}
`

let createPlayer = `
  ${header}
  <div class="page-container">
    <h1>Save your score</h1>
    <h2 id="score"></h2>

    <form class="create-user">
      <label for="username">Enter a new username</label><br>
      <input type="text" name="username" id="username-input"/><br>
      <button class="navigation" type="submit" id="create-user">Save</button>
    </form>
  </div>
  ${footer}
`

let scoreboard = `
  ${header}
  <div class="page-container">
    <h1>All scores</h1>
    <table id="scoretable">
      <tr id="headers">
        <th>Ranking</th>
        <th>Username</th> 
        <th>Score</th>
      </tr>
    </table>

    <button class="navigation" id="edit">Edit username</button>
    <button class="navigation" id="danger">Delete score</button>

    <form class="edit-user">
      <label for="username">Edit username</label><br>
      <input type="text" name="username" id="username-input"/><br>
      <button class="navigation" type="submit" id="create-user">Save</button>
    </form>
  </div>
  ${footer}
`