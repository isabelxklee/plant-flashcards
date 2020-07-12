let URL = `https://plant-flashcards-test.herokuapp.com`
// let URL = `http://localhost:3000`

let plantsURL = `${URL}/plants`
let flashcardsURL = `${URL}/flashcards`
let questionsURL = `${URL}/questions`
let playersURL = `${URL}/players`

let body = document.querySelector("body")
let scoreCount = 0
let questionIndex = 0
let editPlayer = false

let currentUser = localStorage.getItem('username')