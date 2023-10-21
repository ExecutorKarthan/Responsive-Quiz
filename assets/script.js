function changeBox(visibleBox){
    var visibleBox = visibleBox.getAttribute("id")
    welcomePage.style.display="None";
    questionBox.style.display="None";
    highScore.style.display="None";    
    quizCompleted.style.display="None";    
    if(visibleBox == "welcomePage"){
        welcomePage.style.display="flex";  
    }
    if(visibleBox == "questionBox"){
        questionBox.style.display="block";
    }
    if(visibleBox == "leaderLink"){
        highScore.style.display="block";  
    }
    if(visibleBox == "quizCompleted"){
        quizCompleted.style.display="flex";    
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
    var responseLocations = document.querySelector("#responses").children;
    for(var i = 0; i < selectedQuestion.options.length; i++){
        responseLocations[i].textContent = String(i+1) + ")  " + selectedQuestion.options[i];
        if(selectedQuestion.options[i] == selectedQuestion.correctAnswer){
            responseLocations[i].setAttribute('name', 'correct');
        }
        else{
            responseLocations[i].setAttribute('name', 'incorrect');
        }
    }
}

function answerVerification(){
    if(this.getAttribute('name') == 'correct'){
        var resultText = document.querySelector("#resultText");
        resultText.textContent = "Correct!";
        resultText.style.color = 'green';
        score +=10
    }
    else{
        var resultText = document.querySelector("#resultText");
        resultText.textContent = "Incorrect.";
        resultText.style.color = 'red';
    }
    formateQuestion(questionArray);
}

function runGame(){
    changeBox(questionBox);
    formateQuestion(questionArray);
    var timerInterval = setInterval(function() {
    timeVal--;
    timeText.textContent = timeVal;
    document.getElementById('a1').onclick = answerVerification;
    document.getElementById('a2').onclick = answerVerification;
    document.getElementById('a3').onclick = answerVerification;
    document.getElementById('a4').onclick = answerVerification;
    if(timeVal == 0){
        clearInterval(timerInterval);
        document.querySelector("#finalScoreVal").textContent = "Final Score: " + score;
        changeBox(quizCompleted)
    }
    }, 1000)
}

function saveLeader(event){
    event.preventDefault();
    var currentValues = [score, document.getElementById("userName").value]
    processResults(currentValues);
}

function processResults(currentValues){
    var leaderArray = []
    var localStorageValues = localStorage.getItem("leaderArray");
    if (localStorageValues == null){
        leaderArray.push(currentValues)
    }
    else{
        var tempArray = localStorageValues.split(",");
        while(tempArray.length > 0){
            var tempName = tempArray.pop()
            var tempScore = parseInt(tempArray.pop())
            leaderArray.push([tempScore, tempName])
        }
        leaderArray.push(currentValues);
    }
    if (leaderArray.length > 1){
        //This code was researched and copied from: https://stackoverflow.com/questions/50415200/sort-an-array-of-arrays-in-javascript
        leaderArray.sort(function(a, b){
            return b[0] - a[0];
        })
        //Original code begins again here
    }
    while (leaderArray.length > 5){
        leaderArray.pop()
    }

    var leadersOnBoard = document.querySelector("#topScores").children

    while (leadersOnBoard.length > 0){
        for (var item of leadersOnBoard){
            item.remove();
        }
    }
    leaderArray.forEach(score =>{
        var scoreItem = document.createElement("li");
        scoreItem.textContent = score[1] + ": " + score[0];
        scoreItem.setAttribute("class", "leaders")
        document.querySelector("#topScores").appendChild(scoreItem)
    })
    localStorage.setItem("leaderArray", leaderArray)    
    score = 0;
    timeVal = 10;
    timeText.textContent = timeVal;
    document.querySelector("#resultText").textContent = "If you were right or wrong will pop up here";
    document.querySelector("#resultText").style.color = "black";
    changeBox(leaderText)
}

function clearBoard(event){
    event.preventDefault();
    localStorage.clear();
    var leadersOnBoard = document.querySelector("#topScores").children
    while (leadersOnBoard.length > 0){
        for (var item of leadersOnBoard){
            item.remove();
        }
    }
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
var leaderText = document.querySelector("#leaderLink");
var timeText = document.querySelector("#startTime");
var welcomePage = document.querySelector("#welcomePage");
var questionBox = document.querySelector("#questionBox");
var highScore = document.querySelector("#highScore");
var quizCompleted = document.querySelector("#quizCompleted");
var timeVal = document.querySelector("#startTime").innerHTML;
var score = 0;
leaderText.addEventListener("click", function(event){
    event.preventDefault(event);
    changeBox(leaderText);
});