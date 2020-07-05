$( document ).ready(function() {
    alert( "Get ready to Watch 👀, Remember🤯, Repeat😎! 'Simon' is an exciting game in which players must repeat randomly generated sequences by pressing the buttons in the correct order. Experience the fun and advance to higher levels. Best of Luck!👍" );
});

var buttonColours = ["red", "blue", "green", "yellow"]

// Starting Values
var gamePattern = [];

var userClickedPattern = [];

var level = 0;

// Random Sequence Generation

function nextSequence() {
    var randomNumber = (Math.random() * 4);
    randomNumber = Math.floor(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Changing time on each level
    level = level + 1;
    var sent = "level " + level;
    $("h1").text(sent);
    $("h3").text("Your Score : " + (level - 1));
    showSequence();

    // Setting userClickedPattern to Empty each time
    userClickedPattern = [];

}

// Show Sequence
function showSequence() {

    //  set your counter to 1
    var i = 0;
    //  create a loop function
    function myLoop() {
         //  call a setTimeout each time the loop is called
        setTimeout(function () {
            // Code to execute
            var num = gamePattern[i];
            $("#" + num).fadeOut(100).fadeIn(100);
            var sound = new Audio(num + ".mp3");
            sound.play();
            //  Increment of the counter each time
            i++;
            //  if the counter < length, call the loop function again
            if (i < gamePattern.length) {myLoop();}
        }, 400)
        // Closing the setTimeout
    }
    // Calling the loop Function first time so that it triggers the loop
    myLoop();
}

$(".btn").click(function () {
    // Detect and append color clicked
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    // Play Sound Whne Clicked
    var sound = new Audio(userChosenColour + ".mp3");
    sound.play();

    // Animating the button clicked
    animate(userChosenColour);

    // Passing index of last clicked button each time & checking answer
    checkAnswer(userClickedPattern.length - 1);

})

// Animating The Buttons -  Function
function animate(inp) {
    document.getElementById(inp).classList.add("pressed");
    setTimeout(function () {
        document.getElementById(inp).classList.remove("pressed")
    }, 250);
}


// First Key Press
var started_to_toggle = false;
document.getElementById("level-title").addEventListener("click", function () {
    if (started_to_toggle == false) {
        nextSequence();
        $("h3").removeClass("score");
        started_to_toggle = true;
    }
})

// Checking answer and calling next if correct & Game over if False

function checkAnswer(currentLabel) {
    if (userClickedPattern[currentLabel] == gamePattern[currentLabel]) {
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }
    } else {
        var sound = new Audio("wrong.mp3");
        sound.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
            // alert("Your Score : " + level)
            $("h1").text("Game Over! Touch Anywhere to Restart")
            startOver();
        }, 300);
    }
}

function startOver() {
    document.addEventListener("click", function () {
        location.reload();
    })
}