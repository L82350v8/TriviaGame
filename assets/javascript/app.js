// =========================================< variables >======================================== //

var questionsArr = ["What foreign country does Dilbert and Dogbert visit often?",
    "Who is the \"Preventer of Information Services\"?",
    "What character in the \"Dilbert\" comics wants to rule the world?",
    "Who is the intern?",
    "Who is the evil director of Human Resources?",
    "Who has undergone US Navy SEALs training?",
    "Who is the smartest man in the comic strip?",
    "Who was Dilbert's girlfriend?",
    "How many hairs does Wally have on his head?",
    "Who is the \"Prince of Insufficient Light\"?"];

var option1Arr = ["China",
    "Mordac",
    "Ratbert",
    "Alice",
    "Catbert",
    "Phil",
    "The Pointy Haired Boss",
    "Alice",
    "none",
    "Phil"];
var option2Arr = ["Turkey",
    "The Pointy Haired Boss",
    "Dogbert",
    "Wally",
    "Tina",
    "The Pointy Haired Boss",
    "The Garbage Man",
    "Carol",
    "6",
    "Ted"];
var option3Arr = ["Elbonia",
    "The Feature Creep",
    "Catbert",
    "Phil",
    "Ratbert",
    "Alice",
    "Wally",
    "Lena",
    "3",
    "Asok"];
var option4Arr = ["Albany",
    "Catbert",
    "The Pointy Haired Boss",
    "Asok",
    "Alice",
    "Loud Howard",
    "Dogbert",
    "Liz",
    "4",
    "Wally"];

var answersArr = ["c", "a", "b", "d", "a", "c", "b", "d", "b", "a"];

var incorrectMsgArr = ["Wrong.  Elbonia is a mud covered fourth world country that has a pig as a mayor.",
    "Wrong.   As the network administrator, Mordac strives to make the use of the company's computing resources as difficult and frustrating as possible.",
    "Wrong.   Dogbert is a intellectual dog, planning to one day conquer the world.",
    "Wrong.   Asok is naive to the politics in the business world and treated badly because he's only an intern.",
    "Wrong.   Catbert, evil H.R. Director, is commonly known for his sadistic policies.",
    "Wrong.   Alice uses her training to occasionally booby trap her cubicle.",
    "Wrong.   The Garbage Man is considered the world's smartest garbage man",
    "Wrong.   Liz was Dilbert's girlfriend from 1994 to 1996.",
    "Wrong.   Wally has a total of 6 hairs on his head.",
    "Wrong.   Phil is the Prince of Insufficient Light, the ruler of Heck."];

var correctMsgArr = ["Correct ! Elbonia is a mud covered fourth world country that has a pig as a mayor.",
    "Correct ! As the network administrator, Mordac strives to make the use of the company's computing resources as difficult and frustrating as possible.",
    "Correct ! Dogbert is a intellectual dog, planning to one day conquer the world. He once succeeded, but became bored with the ensuing peace, and quit.",
    "Correct ! Asok is naive to the politics in the business world and treated badly because he's only an intern. Wally and Alice are engineers.",
    "Correct ! Catbert, evil H.R. Director, is commonly known for his sadistic policies.",
    "Correct ! Alice uses her training to occasionally booby trap her cubicle.",
    "Correct ! The Garbage Man is considered the world's smartest garbage man, and he comes along to help Dilbert and Dogbert with difficult and complex problems.",
    "Correct ! Liz was Dilbert's girlfriend from 1994 to 1996. He met her at a soccer game, where she rebounded a ball off his head to score a goal.",
    "Correct ! One of the oldest engineers, Wally often carries a cup of coffee and does nothing. He has 6 hairs on his head.",
    "Correct ! Phil is the Prince of Insufficient Light, the ruler of Heck. He punishes you for minor infractions, sins that are not serious enough for Hell."];

var answerOpt = "";
var correctCnt = 0;
var wrongCnt = 0;
var unansweredCnt = 0;
var clockRunning = false;
var intervalId = "";

// =========================================< functions >======================================== //
function buildStartBtn() {
    var startBtn = $("<button>");
    startBtn.addClass("start-btn");
    startBtn.attr("type", "button");
    startBtn.attr("onclick", "startGame()");
    startBtn.text("Start Game");
    startBtn.css("font-size", "2em");
    $(".start-button-area").append(startBtn);
}

function buildNewGameBtn() {

    $(".new-game-button-area").empty();

    var newGameBtn = $("<button>");
    newGameBtn.addClass("new-game-btn");
    newGameBtn.attr("type", "button");
    newGameBtn.attr("onclick", "newGame()");
    newGameBtn.text("New Game");
    newGameBtn.css("font-size", "2em");
    $(".new-game-button-area").append(newGameBtn);
}

function startGame() {

    $(".start-button-area").empty();

    var timeRemainingEl = $("<h3>");
    timeRemainingEl.addClass("time-left");
    timeRemainingEl.text("Time Remaining: ")
    timeRemainingEl.append('<span id="timeLeft"> seconds');
    $(".time-area").append(timeRemainingEl);

    $("#timeLeft").text(10);

    $(".main-content").addClass("biege");
    $(".question-answer-area").addClass("biege");
    $(".answer-options-area").addClass("biege");

    newQuestion(0);
}

function newGame() {
    correctCnt = 0;
    wrongCnt = 0;
    unansweredCnt = 0;
    $(".new-game-button-area").empty();

    startGame();
}

function questionTimer(timerIdx) {

    clearInterval(intervalId);
    var clockRunning = false;
    var time = 10;
    $("#timeLeft").text("10")

    // declaring local timerCount function within the questionTimer function. //
    // setInterval will call the timerCount function.//
    function timerCount() {
        time--;
        $("#timeLeft").text(time);
        if (time === 0) {
            clearInterval(intervalId);
            clockRunning = false;

            expiredTime(timerIdx);
            return;
        }
    }
    if (!clockRunning) {
        intervalId = setInterval(timerCount, 1000);
        clockRunning = true;
    }
}

function expiredTime(expiredTimeIdx) {

    $(".answer-options-area").empty();
    $("#question-answer-msg").text("Times up! Please answer the next question.");

    unansweredCnt++

    setTimeout(newQuestion, 4000, expiredTimeIdx + 1);
}

function newQuestion(newQuestIdx) {

    if (newQuestIdx === questionsArr.length) {
        $("#timeLeft").text("0")

        gameOver();

        clearInterval(intervalId);
        return;
    }
    else {
        presentQuestion(newQuestIdx);

        presentAnswerOptions(newQuestIdx);

        questionTimer(newQuestIdx);
    }
}

function presentQuestion(questionIdx) {
    $("#question-answer-msg").text(questionsArr[questionIdx]);
}

function presentAnswerOptions(answerIdx) {

    $(".answer-options-area").empty();

    // -------------------- answer option 1 
    answerOpt = $("<h2>");
    answerOpt.addClass("answer-options");
    optName = "Q" + [answerIdx + 1] + "-opt1";
    answerOpt.addClass(optName);
    answerOpt.attr("data-value", "a");
    answerOpt.text(option1Arr[answerIdx]);
    $(".answer-options-area").append(answerOpt);
    var optClass = "." + optName;
    // -------------------- answer 1 onclick 
    $(optClass).on("click", function () {
        var clickClass = $(this).attr("class");
        var optVal = $(this).data("value");

        $(".Q2-opt2").off("click");
        $(".Q2-opt3").off("click");
        $(".Q2-opt4").off("click");

        checkAnswerCorrect(answerIdx, optVal);
    });
    // ---------------------- answer option 2 
    answerOpt = $("<h2>");
    answerOpt.addClass("answer-options");
    optName = "Q" + [answerIdx + 1] + "-opt2";
    answerOpt.addClass(optName);
    answerOpt.attr("data-value", "b");
    answerOpt.text(option2Arr[answerIdx]);
    $(".answer-options-area").append(answerOpt);
    var optClass = "." + optName;
    // -------------------- answer 2 onclick 
    $(optClass).on("click", function () {
        var clickClass = $(this).attr("class");
        var optVal = $(this).data("value");

        $(".Q2-opt1").off("click");
        $(".Q2-opt3").off("click");
        $(".Q2-opt4").off("click");

        checkAnswerCorrect(answerIdx, optVal);
    });
    // ---------------------- answer option 3 
    answerOpt = $("<h2>");
    answerOpt.addClass("answer-options");
    optName = "Q" + [answerIdx + 1] + "-opt3";
    answerOpt.addClass(optName);
    answerOpt.attr("data-value", "c");
    answerOpt.text(option3Arr[answerIdx]);
    $(".answer-options-area").append(answerOpt);
    var optClass = "." + optName;
    // -------------------- answer 3 onclick 
    $(optClass).on("click", function () {
        var clickClass = $(this).attr("class");
        var optVal = $(this).data("value");

        $(".Q2-opt1").off("click");
        $(".Q2-opt2").off("click");
        $(".Q2-opt4").off("click");

        checkAnswerCorrect(answerIdx, optVal);
    });
    // ---------------------- answer option 4 
    answerOpt = $("<h2>");
    answerOpt.addClass("answer-options");
    optName = "Q" + [answerIdx + 1] + "-opt4";
    answerOpt.addClass(optName);
    answerOpt.attr("data-value", "d");
    answerOpt.text(option4Arr[answerIdx]);
    $(".answer-options-area").append(answerOpt);
    var optClass = "." + optName;
    // -------------------- answer 4 onclick 
    $(optClass).on("click", function () {
        var clickClass = $(this).attr("class");
        var optVal = $(this).data("value");

        $(".Q2-opt1").off("click");
        $(".Q2-opt2").off("click");
        $(".Q2-opt3").off("click");

        checkAnswerCorrect(answerIdx, optVal);
    });
}

function checkAnswerCorrect(ansCorrectIdx, optVal) {

    clearInterval(intervalId);
    $("#timeLeft").text("0")

    $(".answer-options-area").empty();

    if (optVal === answersArr[ansCorrectIdx]) {
        $("#question-answer-msg").text(correctMsgArr[ansCorrectIdx]);
        correctCnt++
    }
    else {
        $("#question-answer-msg").text(incorrectMsgArr[ansCorrectIdx]);
        wrongCnt++
    }

    setTimeout(newQuestion, 5000, ansCorrectIdx + 1);
}

function gameOver() {

    $(".time-area").empty();
    $(".answer-options-area").empty();

    $("#question-answer-msg").text("Game Over");

    gameOverEl = $("<h2>");
    gameOverEl.addClass("game-stats");
    gameOverEl.text("Correct answers: ")
    gameOverEl.append('<span id="correct-total">');
    $(".answer-options-area").append(gameOverEl);

    $("#correct-total").text(correctCnt);

    gameOverEl = $("<h2>");
    gameOverEl.addClass("game-stats");
    gameOverEl.text("Incorrect answers: ");
    gameOverEl.append('<span id="incorrect-total">');
    $(".answer-options-area").append(gameOverEl);

    $("#incorrect-total").text(wrongCnt);

    gameOverEl = $("<h2>");
    gameOverEl.addClass("game-stats");
    gameOverEl.text("Unanswered questions: ");
    gameOverEl.append('<span id="unanswered-total">');
    $(".answer-options-area").append(gameOverEl);

    $("#unanswered-total").text(unansweredCnt);

    buildNewGameBtn();
}

// =========================================< main process >===================================== // 

buildStartBtn();   