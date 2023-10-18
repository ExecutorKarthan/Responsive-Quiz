import data from "./questionBank.json" assert { type: "json"};

class questionObj{
    constructor(question, correctAnswer, options){
        this. question = question;
        this. correctAnswer = correctAnswer;
        this.options = shuffleAnswers(options)
    }
}

function shuffleAnswers(options){
    event.stopPropagation()
    for( var i = options.length-1; i > 0; i--){
        var tempEnd = options[i]
        var swapIndex = Math.floor(Math.random()*i)
        options[i] = options[swapIndex]
        options[swapIndex] = tempEnd
    }
}

function prepQuestions(){
    event.stopPropagation()
    var questionData = data
    for( var i = 1; i < Object.values(questionData).length+1; i++){
        questionArray.push(new questionObj(questionData[i][0], questionData[i][1], questionData[i].slice(1)))
    }
}

function changeBox(visibleBox){
    event.stopPropagation()
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
    if(visibleBox == "leaderLink"){
        highScore.style.display="Block";  
    }    
}

function runGame(){
    event.stopPropagation()
    prepQuestions()
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

var questionArray = []
var leaderText = document.querySelector("#leaderLink")
var timeText = document.querySelector("#startTime")
var timeVal = document.querySelector("#startTime").innerHTML
leaderText.addEventListener("click", function(){
    var itemClicked = leaderText.getAttribute("id")
    console.log(itemClicked)
    changeBox(itemClicked);
});