//DOCUMENT READY
$(document).ready(function() {

//========================================================================================================================
//VARIABLES
//========================================================================================================================
    //  Variable to hold setInterval that runs timer
    var intervalId;

    // prevents the timer from being sped up unnecessarily
    var timerRunning = false;

    var SECOND = 1000;
    var time = 30;

    var totalCorrect = 0;
    var totalWrong = 0;

    questionNum = 0;

    var answerBankArr = [];

//========================================================================================================================
//TRIVIA QUESTION BANK
//========================================================================================================================

var questionBankArr = [

    question1 = {
        question: "Which is NOT one of the four main beer ingredients?",
        correctAnswer: "Grapes",
        wrongAnswer1: "Hops",
        wrongAnswer2: "Barley",
        wrongAnswer3: "Yeast"
    },

    question2 = {
        question: "What does the beer style I.P.A. stand for?",
        correctAnswer: "India Pale Ale",
        wrongAnswer1: "International Pale Ale",
        wrongAnswer2: "Inner Pacific Ale",
        wrongAnswer3: "Indigenous Pacific Ale"
    },

    question3 = {
        question: "What is the largest craft brewery in the United States?",
        correctAnswer: "Yuengling & Son",
        wrongAnswer1: "Sierra Nevada Brewing Co.",
        wrongAnswer2: "Stone Brewing Co.",
        wrongAnswer3: "Bell's Brewery"
    },

    question4 = {
        question: "How many pints in a keg?",
        correctAnswer: "124 pints",
        wrongAnswer1: "236 pints",
        wrongAnswer2: "52 pints",
        wrongAnswer3: "98 pints"
    }

];


//========================================================================================================================
//TIMER OBJECT
//========================================================================================================================

    var timer = {
        time: 30,

        reset: function() {
            timer.time = 30;
            $("#timerDisplay").text("30");
        },

        start: function() {
            if (!timerRunning) {
            intervalId = setInterval(timer.count, SECOND);
            timerRunning = true;
            }
        },

        stop: function() {
            clearInterval(intervalId);
            timerRunning = false;
        },

        count: function() {
            if (timer.time > 0){
                timer.time--;
                $("#timerDisplay").text("Time Remaining: " + timer.time + " seconds");
                console.log(timer.time);
            }
            else {
                noTimeLeft();
            }
        }
    };

//========================================================================================================================
//FUNCTIONS
//========================================================================================================================

    function nextQuestion() {
        timer.start();

        for(var i = questionNum; i < questionBankArr.length; i++){
            $('#roundQuestion').text(questionBankArr[i].question);
            $('.answer1').text(questionBankArr[i].correctAnswer);
            $('.answer2').text(questionBankArr[i].wrongAnswer1);
            $('.answer3').text(questionBankArr[i].wrongAnswer2);
            $('.answer4').text(questionBankArr[i].wrongAnswer3);

            return questionBankArr[i].correctAnswer;
        }
    }

    function checkAnswer(userAnswer, answer) {
        if(userAnswer === answer){
            totalCorrect++;
            alert("Correct");
        }
        else {
            totalWrong++;
            alert("Wrong");
        }
        timer.reset();
        nextQuestion();
    }

    function noTimeLeft() {
        timer.stop();
        alert("Time's Up!");
    }

//========================================================================================================================
// PLAY GAME
//========================================================================================================================

    $('#startGame').click(function(){
        nextQuestion();
    });

    $('.answerButton').click(function(){
         var userAnswer = $(this).text()
         var correct = nextQuestion();
         questionNum++;
        checkAnswer(userAnswer, correct);
    });




});