var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){

    if(!started){
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
    }
});

$(".btn").click(function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game over, Press Any Key to Restart");

        startOver();
    }
}


function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level" + level);
    //generate random from 0 to 3
    var randomNumber = Math.floor(Math.random()*4);
    //choose colour from buttonColour Array using randomNumber
    var randomChosenColour = buttonColours[randomNumber];
    //push chosen colout to gamePattern Empty array
    gamePattern.push(randomChosenColour);

    //give animation to particular id
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    //play audio according to id selected
    playSound(randomChosenColour);
}

function playSound(name) {
    
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
}

function startOver() {

    level = 0;
    gamePattern = [];
    started = false;
  }
