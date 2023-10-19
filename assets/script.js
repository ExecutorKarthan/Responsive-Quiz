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

function prepQuestions(questionArray){
    for( var i = 1; i < Object.values(questionDatabase).length+1; i++){
        questionArray.push(new questionObj(questionDatabase[i][0], 
            questionDatabase[i][1], 
            questionDatabase[i].slice(1)))
    }
    return questionArray
}
class questionObj{
    constructor(question, correctAnswer, options){
        this. question = question;
        this. correctAnswer = correctAnswer;
        this.options = shuffleAnswers(options)
    }
}

function shuffleAnswers(options){
    for( var i = options.length-1; i > 0; i--){
        var tempEnd = options[i]
        var swapIndex = Math.floor(Math.random()*i)
        options[i] = options[swapIndex]
        options[swapIndex] = tempEnd
    }
    return options
}

function formateQuestion(questionArray){
    var selectedQuestion = questionArray[Math.floor(Math.random()*questionArray.length)]
    document.querySelector("#question").textContent = selectedQuestion.question;
    var responseLocations = document.getElementById("responses").children;
    for(var i = 0; i < selectedQuestion.options.length; i++){
        responseLocations[i].textContent = String(i+1) + ")  " + selectedQuestion.options[i];
    }
}

function enterAnswer(){

}

function runGame(){
    changeBox("#questionBox");
    formateQuestion(questionArray);
    var timerInterval = setInterval(function() {
    timeVal--;
    timeText.textContent = timeVal;
    enterAnswer();
    if(timeVal == 0){
        clearInterval(timerInterval)
    }
    }, 1000)
}

var questionDatabase = {
    "1": [
        "Which of the following will call the 3rd item of an array?",
        "array[2]",
        "array[3]", 
        "array.get(3rdPlace)",
        "tarray.pop()"
    ],
    "2": [
        "A for loop is composed of",
        "all of these are true",
        "a variable declaration",
        "a conditional to continue to run",
        "an incrementer"
    ],
    "3": [
        "If statements execute code",
        "when their conditions evaluate as true",
        "when their conditions evaluate as false",
        "under all conditions",
        "when conditions change from false to true"
    ],
    "4": [
        "The variable \"age\" is best represented by",
        "an int",
        "a float",
        "a string",
        "an array"
    ],
    "5": [
        "Functions can be created",
        "by declaring the \"function\" keyword",
        "by using \"def_functionName\"",
        "only in classes in Javascript",
        "None of these are true"
    ]
}
var questionArray = [];
prepQuestions(questionArray);
var leaderText = document.querySelector("#leaderLink")
var timeText = document.querySelector("#startTime")
var timeVal = document.querySelector("#startTime").innerHTML
leaderText.addEventListener("click", function(){
    var itemClicked = leaderText.getAttribute("id")
    console.log(itemClicked)
    changeBox(itemClicked);
});