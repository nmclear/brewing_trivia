//DOCUMENT READY
$(document).ready(function() {

//========================================================================================================================
//VARIABLES
//========================================================================================================================
    //  Variable to hold setInterval that runs timer
    var intervalId;
    var timerRunning = false;

    var SECOND = 1000;
    var time = 30;

    var totalCorrect = 0;
    var totalWrong = 0;
    var totalNoAnswer = 0;

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
        time: 10,

        reset: function() {
            timer.time = 10;
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
        timer.reset();
        
       if(questionNum === questionBankArr.length){
           endGame();
       }
       else {
            $('#displayCorrectAnswer').text("");
            $('#roundExtras').hide();
            $('#shuffle').show();    
            $('.answerButton').prop('disabled', false);
            timer.start();
            shuffleShuffle();

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

    function checkAnswer(userAnswer, correct) {
        if(userAnswer === correct){
            totalCorrect++;
            console.log("Correct");
            $('#roundQuestion').text("Correct!");
            $('.wrongImage').hide();
            $('.correctImage').show();
            
        }
        else {
            totalWrong++;
            console.log("Wrong");
            $('#roundQuestion').text("Wrong!");
            $('#displayCorrectAnswer').text("Correct Answer: " + correct);
            $('.correctImage').hide();
            $('.wrongImage').show();
        }
        $('#roundExtras').show();
        $("#timerDisplay").text(""); 
        setTimeout(nextQuestion, SECOND * 4);
    }



    function noTimeLeft() {
        timer.stop();

        questionNum++;
        totalNoAnswer++;

        $('#shuffle').hide();
        $('.correctImage').hide();
        $('#roundExtras').show(); 

        $("#timerDisplay").text("");
        $('.answerButton').prop('disabled', true);
        $('#roundQuestion').text("Out of time!");
        setTimeout(nextQuestion, SECOND * 4);
    }


    function endGame() {
        timer.stop();
        $("#timerDisplay").text("");
        //Display results after the game is over
        // $('.answerButton').prop('disabled', true);
        $('#shuffle').hide();
        $('#roundExtras').hide(); 
        $('#displayResults').show();

        //print results
        $('.resultFinish').text("Game Over!");
        $('.resultCorrect').text("Correct: " + totalCorrect);
        $('.resultWrong').text("Wrong: " + totalWrong);
        $('.resultNoAnswer').text("No Answer: " + totalNoAnswer);

        //display new game button
        $('#roundQuestion').html('<button type="button" id="newGame" class="btn btn-light">New Game</button>');
        
        //Resets the game on click
        $('#newGame').click(function(){
            resetVars();
            $('#displayResults').hide();
            nextQuestion();
        });

    }

    function resetVars(){
        $('.answerButton').prop('disabled', false);
        totalCorrect = 0;
        totalWrong = 0;
        totalNoAnswer = 0;
        questionNum = 0;
    }

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
    $('#shuffle').hide();
    $('#roundExtras').hide();


    $('#startGame').click(function(){
        nextQuestion();
    });

    $('.answerButton').click(function(){
         var userAnswer = $(this).text();
         var correct = nextQuestion();
         questionNum++;
         timer.stop();
         $('.answerButton').prop('disabled', true);
        $('#shuffle').hide();
        checkAnswer(userAnswer, correct);
    });

});

