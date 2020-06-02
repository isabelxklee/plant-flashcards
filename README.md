Plant Flashcards
========================

Plant Flashcards is a full-stack web application where you can flip through flashcards to learn about plants and test your knowledge.

Live demo: https://plant-flashcards.netlify.app

![Learning Mode on Plant Flashcards](https://i.imgur.com/F643LUN.png)

## Features

### Asynchronous fetches
* Pulls in data about plants from the Rails backend API

### CRUD Operations
* Users can save their high scores, edit their usernames, and delete their scores
* All scores are displayed on a scoreboard

### ActiveRecord Associations
* There are 6 models that have `has_many`, `belongs_to` and `has_many through` associations
* Uses ActiveModelSerializers, which turns model attributes into JSON object keys
* Regex validations for username input

### Other Features
* 100% custom CSS
* Flip through flashcards to learn plant facts
* Play a quiz game to test your knowledge on plants

![Quiz Time on Plant Flashcards](https://i.imgur.com/BsmKc9m.png)

## Domain Model
Coming soon...

## Tech Stack

* Vanilla JavaScript (Frontend)
* Ruby on Rails API (Backend: https://github.com/isabelxklee/plant-flashcards-backend)
* PostgreSQL
* HTML/CSS
* Active Record

## Tools

* [Rack CORS](https://github.com/cyu/rack-cors)
* [ActiveModel::Serializer](https://github.com/rails-api/active_model_serializers)
