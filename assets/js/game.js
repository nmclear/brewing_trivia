//DOCUMENT READY
$(document).ready(function() {


//========================================================================================================================
//VARIABLES
//========================================================================================================================

    var SECOND = 1000;

    var questionArr = [];
    var answerArr = [];

    var question1 = {
        question: "Which is NOT one of the four main beer ingredients?",
        correctAnswer: "",
        wrongAnswer1: "Hops",
        wrongAnswer2: "Barley",
        wrongAnswer3: "Yeast"
    };

    var question2 = {
        question: "What does the beer style I.P.A. stand for?",
        correctAnswer: "India Pale Ale",
        wrongAnswer1: "International Pale Ale",
        wrongAnswer2: "Inner Pacific Ale",
        wrongAnswer3: "Indigenous Pacific Ale"
    };

    var question3 = {
        question: "What is the largest craft brewery in the United States?",
        correctAnswer: "Yuengling & Son",
        wrongAnswer1: "Sierra Nevada Brewing Co.",
        wrongAnswer2: "Stone Brewing Co.",
        wrongAnswer3: "Bell's Brewery"
    };




//========================================================================================================================
//FUNCTIONS
//========================================================================================================================

    function startGame() {
        console.log("game started");
    }









//========================================================================================================================
// PLAY GAME
//========================================================================================================================

    $('#startGame').click(function(){
        startGame();
    });






});