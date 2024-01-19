var audioGreen = new Audio("sounds/green.mp3");
var audioRed = new Audio("sounds/red.mp3");
var audioYellow = new Audio("sounds/yellow.mp3");
var audioBlue = new Audio("sounds/blue.mp3");
var audioWrong = new Audio("sounds/wrong.mp3");
var audioWin = new Audio("sounds/victory.mp3");

var computer = [1, 2, 3, 4,];
var player = [];
var powerOn = false;
var i = 0;
var playerTurn = false;
var level = 1;
var intervalID = 0;
var mistake = false;
var win = false;
var correct;

var powerButton = $('#btn-bg');
var startButton = $(".start-btn");
var levelTitle = $("#level-title");
var heading = $("h1");
var greenID = $("#green");
var redID = $("#red");
var yellowID = $("#yellow");
var blueID = $("#blue");
var green = $(".green");
var red = $(".red");
var yellow = $(".yellow");
var blue = $(".blue");
var body = $("body");

powerButton.click(function(){
    powerButton.toggleClass('active');
    
    if(powerButton.hasClass("active")){
        startGame();
        powerOn = true;
        startButton.text("Start");
    }
    else{
        endGame();
        powerOn = false;
        clearInterval(intervalID);
    }
})

startButton.click(function(){
    startButton.fadeOut(700);
    letsPlay();
})

function letsPlay(){
    computer = [];
    player = [];
    i = 0;
    intervalID = 0;
    level = 1;
    playerTurn = false;
    fill();
}

function fill(){
    computer.push(Math.floor(Math.random()*4 + 1));
    setTimeout(function(){
        heading.fadeOut(1, function(){
            levelTitle.text("Level " + level).css("fontSize", "3rem").fadeIn(600)
        });
    }, 300);
    intervalID = setInterval(compTurn, 1000);
}

function compTurn(){
    if(i == level)
    {
        i = 0;
        playerTurn = true;
        clearInterval(intervalID);
    }

    if(powerOn && !playerTurn)
    {
        correct = true;
        setTimeout(function(){
            console.log(computer[i])
            if(computer[i] == 1)
                pressGreen();
            if(computer[i] == 2)
                pressRed();
            if(computer[i] == 3)
                pressYellow();
            if(computer[i] == 4)
                pressBlue();
            i++;
        }, 200)
    }
}

function pressGreen()
{
    if(correct)
        audioGreen.play();
    greenID.addClass("pressed");
    setTimeout(function(){greenID.removeClass("pressed");}, 300);
}

function pressRed()
{
    if(correct)
        audioRed.play();
    redID.addClass("pressed");
    setTimeout(function(){redID.removeClass("pressed");}, 300);
}

function pressYellow()
{
    if(correct)
        audioYellow.play();
    yellowID.addClass("pressed");
    setTimeout(function(){yellowID.removeClass("pressed");}, 300);
}

function pressBlue()
{
    if(correct)
        audioBlue.play();
    blueID.addClass("pressed");
    setTimeout(function(){blueID.removeClass("pressed");}, 300);
}

function startGame(){
    heading.fadeOut(300, function(){
        levelTitle.text("Click on start button whenever you are ready!").css("fontSize", "2rem").fadeIn(300)
    });
    $('#power-text strong').text('ON').css('color', '#31d660');
    colorsOn();
    startButton.fadeIn(1100);
}

function endGame(){
    heading.fadeOut(300, function(){
        levelTitle.text("Turn ON power to play").css("fontSize", "3rem").fadeIn(300)
    });
    $('#power-text strong').text('OFF').css('color', '#2a2a2a');
    colorsOff();
    startButton.fadeOut(600);
}

function colorsOn(){
    green.css("backgroundColor", "rgb(1, 252, 1)");
    red.css("backgroundColor", "red");
    blue.css("backgroundColor", "blue");
    yellow.css("backgroundColor", "yellow");
}

function colorsOff(){
    green.css("backgroundColor", "rgb(4, 82, 27)");
    red.css("backgroundColor", "darkred");
    blue.css("backgroundColor", "darkblue");
    yellow.css("backgroundColor", "rgb(122, 122, 9)");
}

greenID.click(function(){
    if(powerOn && playerTurn)
    {
        player.push(1);
        pressGreen();
        checkAnswer();
    }
});

redID.click(function(){
    if(powerOn && playerTurn)
    {
        player.push(2);
        pressRed();
        checkAnswer();
    }
});

yellowID.click(function(){
    if(powerOn && playerTurn)
    {
        player.push(3);
        pressYellow();
        checkAnswer();
    }
});

blueID.click(function(){
    if(powerOn && playerTurn)
    {
        player.push(4);
        pressBlue();
        checkAnswer();
    }
});

function checkAnswer(){
    if(player[player.length - 1] !== computer[player.length - 1])
    {
        mistake = true;
        win = false;
        correct = false;
        gameOver();
        return;
    }
    if(player.length == 10)
    {
        winGame();
        return;
    }
    if(player.length == level)
    {
        level++;
        playerTurn = false;
        player = [];
        fill();
    }
}

function gameOver(){
    // console.log("game over");
    playerTurn = false;
    body.addClass("game-over");
    setTimeout(function(){body.removeClass("game-over");}, 500);
    clearInterval(intervalID);
    startButton.text("Retry");
    startButton.fadeIn(700);
    levelTitle.text("Wrong move!!! click on Retry button to play again.").css("fontSize", "2rem");
    var flash = 0;
    var x = setInterval(() => {
        if(flash == 5 || !powerOn)
        {
            clearInterval(x);
        }
        levelTitle.css("visibility", "hidden");
        
        setTimeout(() => {
            levelTitle.css("visibility", "visible");
        }, 400);
        
        flash++;
    }, 800);
    audioWrong.play();
}

function winGame(){
    playerTurn = false;
    clearInterval(intervalID);
    var flash = 1;
    var x = setInterval(function(){
        if(flash == 3)
        {
            clearInterval(x);
        }
        colorsOff();
        setTimeout(colorsOn, 400);
        flash++;
    }, 800);
    audioWin.play();
    heading.fadeOut(300, function(){
        levelTitle.text("Congratulations!🎉 You Won🏆").css("fontSize", "3rem").fadeIn(700)
    });
    startButton.text("Replay");
    setTimeout(function(){
        startButton.fadeIn(1000);
    }, 500);
}