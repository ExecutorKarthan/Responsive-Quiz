//Create a function to change between boxes/screens
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
/*Create a function to prepare the questions for use. It will create a question array with question objects that hold the question, 
the correct answer and a randomly generated order of responses*/
function prepQuestions(questionArray){
    for( var i = 1; i < Object.values(questionDatabase).length+1; i++){
        questionArray.push(new questionObj(questionDatabase[i][0], 
            questionDatabase[i][1], 
            questionDatabase[i].slice(1)))
    }
    return questionArray
}
/*Create a question class for easy access of the question data*/
class questionObj{
    constructor(question, correctAnswer, options){
        this. question = question;
        this. correctAnswer = correctAnswer;
        this.options = shuffleAnswers(options)
    }
}
/*Function to randomize the order of answers displayed. This is based on the Fisher-Yates Shuffle Algorithm
https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle*/
function shuffleAnswers(options){
    for( var i = options.length-1; i > 0; i--){
        var tempEnd = options[i]
        var swapIndex = Math.floor(Math.random()*i)
        options[i] = options[swapIndex]
        options[swapIndex] = tempEnd
    }
    return options
}
//Create a function to take the question object and display its possible answers in question box.
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
//Create a function to check if the selected answer is indeed correct or not
function answerVerification(){
    //Compare to see if the answer is correct. If so, update the score. Regardless of correctness, style the text.
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
    //Load the next question
    formateQuestion(questionArray);
}
/*Create a function to run the game. */
function runGame(){
    //Changes screen for the player
    changeBox(questionBox);
    //Formats and loads the first question
    formateQuestion(questionArray);
    //Start a timer that counts down by ones
    var timerInterval = setInterval(function() {
    timeVal--;
    timeText.textContent = timeVal;
    //Listen for player responses, then verify said answer for correctness
    document.getElementById('a1').onclick = answerVerification;
    document.getElementById('a2').onclick = answerVerification;
    document.getElementById('a3').onclick = answerVerification;
    document.getElementById('a4').onclick = answerVerification;
    if(timeVal == 0){
        //Clear the timer to reset it
        clearInterval(timerInterval);
        //Display final score
        document.querySelector("#finalScoreVal").textContent = "Final Score: " + score;
        //Change to the completion screen
        changeBox(quizCompleted)
    }
    }, 1000)
}
//Create a function to take values entered into the leader form to test if they should be added to the leader board.
function saveLeader(event){
    event.preventDefault();
    var currentValues = [score, document.getElementById("userName").value]
    processResults(currentValues);
}
/*Create a function to update the leader board*/
function processResults(currentValues){
    var leaderArray = []
    var localStorageValues = localStorage.getItem("leaderArray");
    //Check to see if there is a current stored leader board. If not, just the current values into the array
    if (localStorageValues == null){
        leaderArray.push(currentValues)
    }
    //If a current leader board exists, process the string data into 2 element arrays, then push them to to the leader array
    else{
        var tempArray = localStorageValues.split(",");
        while(tempArray.length > 0){
            var tempName = tempArray.pop()
            var tempScore = parseInt(tempArray.pop())
            leaderArray.push([tempScore, tempName])
        }
        leaderArray.push(currentValues);
    }
    //If the array has more than 1 value, sort the values by size - largest to smallest
    if (leaderArray.length > 1){
        //This code was researched and copied from: https://stackoverflow.com/questions/50415200/sort-an-array-of-arrays-in-javascript
        leaderArray.sort(function(a, b){
            return b[0] - a[0];
        })
        //Original code begins again here
    }
    //If there are more than 5 items in the leader array pop the last element, which will be the smallest
    while (leaderArray.length > 5){
        leaderArray.pop()
    }
    //Clear the previous leader board if data exists there
    var leadersOnBoard = document.querySelector("#topScores").children
    while (leadersOnBoard.length > 0){
        for (var item of leadersOnBoard){
            item.remove();
        }
    }
    //Create new elements with the leader board data
    leaderArray.forEach(score =>{
        var scoreItem = document.createElement("li");
        scoreItem.textContent = score[1] + ": " + score[0];
        scoreItem.setAttribute("class", "leaders")
        document.querySelector("#topScores").appendChild(scoreItem)
    })
    //Update the elements in local storage
    localStorage.setItem("leaderArray", leaderArray)    
    //Reset variables for next use
    score = 0;
    timeVal = 60;
    timeText.textContent = timeVal;
    document.querySelector("#resultText").textContent = "If you were right or wrong will pop up here";
    document.querySelector("#resultText").style.color = "black";
    changeBox(leaderText)
}

//Create a function to clear the leader board and its local storage
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
//Use a JSON structure to serve as a question database
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
//Create variables for reference
var questionArray = [];
//Convert the JSON data into question objects and stor them in an array
prepQuestions(questionArray);
var leaderText = document.querySelector("#leaderLink");
var timeText = document.querySelector("#startTime");
var welcomePage = document.querySelector("#welcomePage");
var questionBox = document.querySelector("#questionBox");
var highScore = document.querySelector("#highScore");
var quizCompleted = document.querySelector("#quizCompleted");
var timeVal = document.querySelector("#startTime").innerHTML;
var score = 0;
//Add an event listener so the user can gain click-access to the leader board
leaderText.addEventListener("click", function(event){
    event.preventDefault(event);
    var localStorageValues = localStorage.getItem("leaderArray");
    //Check to see if there is a current stored leader board. If not, update the leader board
    if (localStorageValues != null){
        //Clear the board in the event of a 2 time click
        var leadersOnBoard = document.querySelector("#topScores").children
        while (leadersOnBoard.length > 0){
            for (var item of leadersOnBoard){
                item.remove();
            }
        }
        //Retrieve leader data and update the array with that data
        leaderArray = []
        var tempArray = localStorageValues.split(",");
        while(tempArray.length > 0){
            var tempName = tempArray.pop()
            var tempScore = parseInt(tempArray.pop())
            leaderArray.push([tempScore, tempName])
        }
        //Arrange the leader board members from highest score to lowest
        if (leaderArray.length > 1){
            //This code was researched and copied from: https://stackoverflow.com/questions/50415200/sort-an-array-of-arrays-in-javascript
            leaderArray.sort(function(a, b){
                return b[0] - a[0];
            })
            //Create new elements with the leader board data
            leaderArray.forEach(score =>{
            var scoreItem = document.createElement("li");
            scoreItem.textContent = score[1] + ": " + score[0];
            scoreItem.setAttribute("class", "leaders")
            document.querySelector("#topScores").appendChild(scoreItem)
            })
        }
    }
    changeBox(leaderText);
});