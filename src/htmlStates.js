// load a single flashcard
// fill the inner card div with the correct flashcard information

let header = `
<div class="header">
    <a href="#default" class="logo">🌿 Plant Flashcards 🌿</a>
    <div class="header-right">
        <a href="#default" id="learning-mode">Learning mode</a>
        <a href="#default" id="quiz-time">Quiz time</a>
    </div>
</div>`

let learningMode =
`${header}

<h1>Click on the card to flip it.</h1>
<div class="flip-card">
</div>

<div id="flashcard-navigation">
    <p id="card-count"></p>
    <div class="btn-group">
        <button class="navigation" id="back-button">Previous</button>
        <button class="navigation" id="next-button">Next</button>
    </div>
</div>
`

let quizTime = `
${header}
<h1>Let's test your knowledge on plants!</h1>
`