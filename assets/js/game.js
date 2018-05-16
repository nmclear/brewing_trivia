//DOCUMENT READY
$(document).ready(function() {


//========================================================================================================================
//VARIABLES
//========================================================================================================================

    var intervalId;
    var SECOND = 1000;
    var time = 30;


    var totalCorrect = 0;
    var totalWrong = 0;

    var questionBankArr = [];
    var answerBankArr = [];

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

    var question4 = {
        question: "How many pints in a keg?",
        correctAnswer: "124 pints",
        wrongAnswer1: "236 pints",
        wrongAnswer2: "52 pints",
        wrongAnswer3: "98 pints"
    };




//========================================================================================================================
//FUNCTIONS
//========================================================================================================================

    function startGame() {
        console.log("game started");
        intervalId = setInterval(countdown, SECOND);

    }



    function countdown() {
        if (time >= 0) {
            console.log(time);
            $("#timer").text(time + " seconds");
            time--;
        }
        else {
            clearInterval(countdown);
        }
    }







    function nextQuestion() {

    }


    function checkAnswer() {
        if(userAnswer === correctAnswer){
            totalCorrect++;
        }
        else {
            totalWrong++;
        }
        nextQuestion();
    }





//========================================================================================================================
// PLAY GAME
//========================================================================================================================

    $('#startGame').click(function(){
        startGame();
    });

    $('.answerButton').click(function(){
        checkAnswer();
    });




});