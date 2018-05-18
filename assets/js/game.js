//DOCUMENT READY
$(document).ready(function() {

//========================================================================================================================
//VARIABLES
//========================================================================================================================
    //  Variable to hold setInterval that runs timer
    var intervalId;
    var timerRunning = false;
    var SECOND = 1000;

    //result variables
    var totalCorrect = 0;
    var totalWrong = 0;
    var totalNoAnswer = 0;

    //tracks what question in questionBankArr
    var questionNum = 0;

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
        correctAnswer: "Yuengling Brewery",
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
            $("#timerDisplay").text("30 seconds");
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
                $("#timerDisplay").text(timer.time + " seconds");
            }
            else {
                noTimeLeft();
            }
        }
    };

//========================================================================================================================
//FUNCTIONS
//========================================================================================================================

    //displays first question and advances to next question after userGuesses.
    function nextQuestion() {
        timer.reset();
        
       if(questionNum === questionBankArr.length){
           endGame();
       }
       else {
            // resets/hides the post question specific items.
            $('#displayCorrectAnswer').text("");
            $('#roundExtras').hide();
            $('#shuffle').show();
            timer.start();
            shuffleShuffle();

            // loops through questionBank
            for(var i = questionNum; i < questionBankArr.length; i++){
                $('#roundQuestion').text(questionBankArr[i].question);
                $('.answer1').text(questionBankArr[i].correctAnswer);
                $('.answer2').text(questionBankArr[i].wrongAnswer1);
                $('.answer3').text(questionBankArr[i].wrongAnswer2);
                $('.answer4').text(questionBankArr[i].wrongAnswer3);

                return questionBankArr[i].correctAnswer;
            }
        }
    }

    //checks if user answer is correct or wrong.
    function checkAnswer(userAnswer, correct) {
        if(userAnswer === correct){
            totalCorrect++;
            $('#roundQuestion').text("Correct!");
            //blocks wrong/noTime GIF, displays correct GIF
            $('.wrongImage').hide();
            $('.noTimeImage').hide();
            $('.correctImage').show();
            
        }
        else {
            totalWrong++;
            $('#roundQuestion').text("Wrong!");
            $('#displayCorrectAnswer').text("Correct Answer: " + correct);
            //blocks correct/noTime GIF, displays wrongGuess GIF
            $('.correctImage').hide();
            $('.noTimeImage').hide();
            $('.wrongImage').show();
        }
        $('#roundExtras').show();
        $("#timerDisplay").text(""); 
        setTimeout(nextQuestion, SECOND * 3);
    }


    //skips to next question if user runs out of question time.
    function noTimeLeft() {
        timer.stop();

        questionNum++;
        totalNoAnswer++;

        //hides answers and display correct GIF
        $('#shuffle').hide();
        $('.wrongImage').hide();
        $('.correctImage').hide();
        $('#roundExtras').show();
        $('.noTimeImage').show(); 

        //hides timer and displays out of time.
        $("#timerDisplay").text("");
        $('#roundQuestion').text("Out of time!");

        //advances to next question after 4 seconds
        setTimeout(nextQuestion, SECOND * 3);
    }

    // ends game and displays round results.
    function endGame() {
        timer.stop();

        //hides game qeustion, answer, images (unwanted at game end)
        $("#timerDisplay").text("");
        $('#shuffle').hide();
        $('#roundExtras').hide();

        //displays results of round
        $('#displayResults').show();
        $('.resultFinish').text("Game Over!");
        $('.resultCorrect').text("Correct: " + totalCorrect);
        $('.resultWrong').text("Wrong: " + totalWrong);
        $('.resultNoAnswer').text("No Answer: " + totalNoAnswer);

        //display new game button
        $('#roundQuestion').html('<button type="button" id="newGame" class="btn btn-light">New Game</button>');
        
        //Resets the game on newGame click
        $('#newGame').click(function(){
            resetVars();
            $('#displayResults').hide();
            nextQuestion();
        });

    }

    // resets values to restart game without page refresh
    function resetVars(){
        $('.answerButton').prop('disabled', false);
        totalCorrect = 0;
        totalWrong = 0;
        totalNoAnswer = 0;
        questionNum = 0;
    }

    // shuffles the answer options in a different order each time.
    function shuffleShuffle(){
        var parent = $("#shuffle");
        var divs = parent.children();
        while (divs.length) {
            parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
        }
    }

//========================================================================================================================
// PLAY GAME
//========================================================================================================================
    
    //at page load, hide shuffle and roundExtras divs.
    $('#shuffle').hide();
    $('#roundExtras').hide();


    $('#startGame').click(function(){
        nextQuestion();
    });

    $('.answerButton').click(function(){
         var userAnswer = $(this).text();
         //saves the correctAnswer from question[i] as correct.
         var correct = nextQuestion();
         questionNum++;
         timer.stop();
        $('#shuffle').hide();
        checkAnswer(userAnswer, correct);
    });

});

