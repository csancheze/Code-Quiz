var questionsNormal = [
  {
  id: 1,
  question:"Which is NOT a Javacript Data type?",
  answers:["number", "string", "boolean", "function"],
  rightAnswer:"function"
},
{
  id: 2,
  question:"Which symbol is used to comment on Javascript?",
  answers:["//", "#", "<!-", "°"],
  rightAnswer:"//"
},
{
  id: 3,
  question:"Which would you use to evaluate strict equality?",
  answers:["=","==","===","!="],
  rightAnswer:"==="
},
{
  id: 4,
  question:"Which is NOT used for looping structures?",
  answers:["for","while","do","loop"],
  rightAnswer:"loop"
},
{
  id: 5,
  question:"Which is NOT a type of Pop up boxes?",
  answers:["prompt", "confirm", "pop", "alert"],
  rightAnswer:"pop"
}
];

var questionsMagic = [
  {
  id: 1,
  question:"What spell would you use to reflect an attack",
  answers:["Diffindo", "Crucio", "Protego", "Stupefy"],
  rightAnswer:"Protego"
},
{
  id: 2,
  question:"Which healing spell would heal a broken nose but not a leg?",
  answers:["Episkey", "Brackium Emendo", "Reparifors", "Vulnera Sanentur"],
  rightAnswer:"Episkey"
},
{
  id: 3,
  question:"Which would NOT help you escape from an Unforgivable Curse?",
  answers:["Expelliarmus","Stupefy","Dodging it","Protego"],
  rightAnswer:"Protego"
},
{
  id: 4,
  question:"Which ingredient is needed to make a Polyjuice potion?",
  answers:["sopophorous bean","snake fangs","fluxweed","bezoar"],
  rightAnswer:"fluxweed"
},
{
  id: 5,
  question:"Which spell which you NOT use to move objects?",
  answers:["Accio", "Ascendio", "Descendo", "Wingardium Leviosa"],
  rightAnswer:"Ascendio"
}
];

var questions = questionsNormal;

var rightFeedback = ["“I am a wizard, not a baboon brandishing a stick.”","“Have a biscuit, Potter.”","“It is our choices, Harry, that show what we truly are, far more than our abilities.”"];
var wrongFeedback = ["“Books! And cleverness! There are more important things — friendship and bravery”","“When in doubt, go to the library.”","“It's leviOsa, not levioSA!”"] ;

var start = document.getElementById("start");
var magic = document.getElementById("magic");
var timer = document.getElementById("timer");
var seconds = 60;
var magicact = document.getElementById("magicact");
var welcome = document.getElementById("welcome");
var questionBox = document.getElementById("questionbox");
var done = document.getElementById("done");
var questionTitle = document.getElementById("question");
var answerButtons = document.getElementsByClassName("answer");
var scoreText = document.getElementById("score");
var score = 0;
var n = 0;
var feedback = document.getElementById("feedback");
feedback.textContent= "";
var countToFinish = 0;
var submit = document.getElementById("submit");
var initials = document.getElementById("initials");

var highscoresList = document.getElementById("highscores")
var reset = document.getElementById("reset");
var highscoresArray;
var back = document.getElementById("back");
var highscoreDiv = document.getElementById("highscorediv");
var highscoreButton = document.getElementById("highscorebutton");


// Buttons for starting
magic.addEventListener("click", function(event) {
  event.preventDefault();
    if (questions == questionsNormal) {
      questions = questionsMagic
      magicact.setAttribute("style", "display: block")
    } else {
      questions = questionsNormal
      magicact.setAttribute("style", "display: none")
    } 

});

start.addEventListener("click", function(event) {
    event.preventDefault();
    showWelcome();
    showQuestionBox();
    startTimer();
    startQuiz();
})



//Timer

function startTimer() {
  timer.textContent = 60;
    seconds = 60;
    timerInterval = setInterval(function() {
        seconds--;
        timer.textContent = seconds;
        if(seconds <= 0) {
          clearInterval(timerInterval);
          finishGame();
        }
      }, 1000);
}

//Hide and Show Divs 
function showQuestionBox() {
  var none = "display:none"
  if (questionBox.getAttribute("style")== none) {
    questionBox.setAttribute("style", "display:block")
  } else {
    questionBox.setAttribute("style", "display:none")
  } 
}

function showDone() {
  timer.textContent = 0;
  var none = "display:none"
  if (done.getAttribute("style")== none) {
    done.setAttribute("style", "display:block")
  } else {
    done.setAttribute("style", "display:none")
  } 
}

function showWelcome() {
  var none = "display:none"
  if (welcome.getAttribute("style")== none) {
    welcome.setAttribute("style", "display:block")
  } else {
    welcome.setAttribute("style", "display:none")
  } 
}

//Game functions

  //Start
function startQuiz() {
  score = 0;
  renderQuestions();
}

function renderQuestions() {
  countToFinish += 1
  questionTitle.textContent = questions[n].question
  let randomAnswers = questions[n].answers.sort(function(a,b){
    return 0.5-Math.random()})
  for (let i = 0; i < randomAnswers.length ; i++) {
    answerButtons[i].textContent = randomAnswers[i]}
}

  //Buttons for answer

for (let i = 0; i < answerButtons.length; i++) {
  answerButtons[i].addEventListener("click", function(event) {
    event.preventDefault();
    if (answerButtons[i].textContent == questions[n].rightAnswer) {
      score += 20;
      let y = Math.floor(Math.random() * rightFeedback.length)
      feedback.innerHTML = "Correct!!"+"<br>"+ rightFeedback[y]
    } else {
      seconds -= 20;
      let y = Math.floor(Math.random() * wrongFeedback.length)
      feedback.innerHTML = "Wrong!!"+"<br>"+ wrongFeedback[y];
    }
    if (n < questions.length -1) {
      n += 1
    }
    checkFinish();
    renderQuestions();
})}

  //Finish
function checkFinish() {
  if (countToFinish === questions.length) {
    finishGame();
  }
}

function finishGame() {
  clearInterval(timerInterval)
  scoreText.textContent = score;
  showQuestionBox();
  showDone();
}

//Submit Highscore

submit.addEventListener("click", function(event) {
  event.stopPropagation();
  localStorage.setItem("initials", initials.value )
  localStorage.setItem("score", score )
});


