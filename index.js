var gamePattern=[];
var color=["green","red","yellow","blue"];
var userClickedPattern=[];
var level=0;

function nextSequence(){
    userClickedPattern=[];
    var randomNumber= Math.floor(Math.random()*4);
    level++;

    var randomChosenColour= color[randomNumber];
    gamePattern.push(randomChosenColour);

    $("h1").text("Level: "+level);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColour);

    
       
}

$(".btn").click(function(){
    var userChosenColor= $(this).attr("id");
    
    userClickedPattern.push(userChosenColor);
    makeSound(userChosenColor);
    //console.log(userClickedPattern);
    pressAnimate(userChosenColor);
    var ind=userClickedPattern.length-1;
    checkAnswer(ind);
    
});

function makeSound(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function pressAnimate(color){
    $("#"+color).addClass("pressed").delay(100);
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(currentLevel===gamePattern.length-1){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        gameOver();
    }
    
}



function gameOver(){
    var wrong =new Audio("sounds/wrong.mp3");
    wrong.play();
    $("h1").text("Game Over,press any key to restart");
    $("body").addClass("game-over");

    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    startOver();
    // $(document).keypress(function(event){
    //     startOver();
    // });

}

function startOver(){
    
    level=0;
    gamePattern=[];
    
}

$(document).keypress(function(event){
    nextSequence();
});

