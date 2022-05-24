// This is a Question class with input arguments (text (string), choices (an array of strings), answer (string) )
function Question(text, choice, answer) {
    this.text = text;
    this.choice = choice;
    this.answer = answer;
}
// This method isCorrectAnswer will accept an argument `choice` and returns true if choice matches the answer
Question.prototype.isCorrectAnswer = function (selection) {
    return this.answer === selection;
}
// This is a Quiz class with input argument question an array of Question objects
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

// Gets the current question
Quiz.prototype.getCurrentQuestion = function () {
    return this.questions[this.questionIndex];
};

// Checks the current question's answer with the answer passed as argument
Quiz.prototype.checkOptionWithAnswer = function (answer) {
    // if the answer is correct then the score will get incremented
    if (this.questions[this.questionIndex].isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}
// Checks if the Quiz has ended i.e. we have iterated thru all the available questions
Quiz.prototype.isEnded = function () {
    return this.questions.length === this.questionIndex;
}
// 
function showScore() {
    // selects the div with id #quiz and displays the final Result
    document.getElementById('quiz').innerHTML = `
    <h1>Result</h1>
    <div id="score">Your Score is: ${techQuiz.score} / ${techQuiz.questions.length}</div>
    `
}
// displays the current question and choices. Also sets up the necessary event handlers
function loadQuestion() {

    if (techQuiz.isEnded()) {
        showScore();
        return;
    }
    // This will select the #question DOM node and use textContent to populate the current question's text    
    var currentQuestion = techQuiz.getCurrentQuestion();

    document.getElementById('question').textContent = currentQuestion.text;

    for (var i = 0; i < currentQuestion.choice.length; i++) {
        document.getElementById('choice' + i).textContent = currentQuestion.choice[i];
        handleOptionButtonClick('btn' + i, currentQuestion.choice[i]);
    }

    showProgress();

}
// create a function on click of a button and compare the selected option with the answer and load the next question
function handleOptionButtonClick(btnId, selection) {
    var button = document.querySelector('#' + btnId);
    button.onclick = function () {

        //  alert('Option '+ selection + ' is selected.');

        techQuiz.checkOptionWithAnswer(selection);

        loadQuestion();

    };
}
// This function will populate the footer to show the progress of the Quiz like "Question 1 of 5"
function showProgress() {
    document.querySelector('#progress').textContent = 'Question ' + (techQuiz.questionIndex + 1) + ' of ' + techQuiz.questions.length;
}

// This is an Array of Question Objects
var questions = [
    new Question("JavaScript supports", ["Functions", "XHTML", "CSS", "HTML"], "Functions"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery", "Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
];

//console.log( questions );

var techQuiz = new Quiz(questions);

loadQuestion();   