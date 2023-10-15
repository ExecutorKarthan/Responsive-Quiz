function changeBox(visibleBox){
    var welcomePage = document.querySelector("#welcomePage");
    var questionBox = document.querySelector("#questionBox");
    var highScore = document.querySelector("#highScore");
    welcomePage.style.display="None";
    questionBox.style.display="None";
    highScore.style.display="None";    
    if(visibleBox == "#welcomePage"){
        welcomePage.style.display="Block";  
    }
    if(visibleBox == "#questionBox"){
        questionBox.style.display="Block";
    }
    if(visibleBox == "#highScore"){
        welcomePage.style.display="Block";  
    }    
}

function startGame(){
    changeBox("#questionBox")
    var timerInterval = setInterval(function() {
    timeVal--;
    timeText.textContent = timeVal;
    if(timeVal == 0){
        clearInterval(timerInterval)
    }
    }, 1000)
}

function enterAnswer(){

}

var leaderText = document.querySelector("#leaderLink")
var timeText = document.querySelector("#startTime")
var timeVal = document.querySelector("#startTime").innerHTML
leaderText.addEventListener("click", function(){
    changeBox("#highScore");
});