var highscores = [
  {
    initials:"Player",
    scores:""
  }
];

var initials = localStorage.getItem("initials")
var score = localStorage.getItem("score")
var highscoresList = document.getElementById("highscores")
var reseto = document.getElementById("reseto");
var highscoresArray;
window.onunload = function(event) {
  localStorage.removeItem("initials")
  localStorage.removeItem("score")
};

function addScore() {
  var newScore= [{"initials": initials, "scores":score}]
  var oldHighscores= (localStorage.getItem("storedHighscores")) || "[]"
  var recoveredHighscores = JSON.parse(oldHighscores)
  highscores = recoveredHighscores.concat(newScore)
  localStorage.setItem("storedHighscores", JSON.stringify(highscores))
  renderHighscores();
}

function renderHighscores(){
  highscoresList.innerHTML = "";
  var highscoreSort = highscores.sort(function (x,y){
    return y.scores -x.scores});
  for (let i = 0; i < highscoreSort.length; i++) {
    var newLine = document.createElement("li")
    newLine.textContent = highscoreSort[i].initials + " " + highscoreSort[i].scores
    highscoresList.appendChild(newLine);
  }
}

function renderOldScores(){
  highscoresList.innerHTML = "";
  var oldHighscores= (localStorage.getItem("storedHighscores")) || "[]"
  var highscores = JSON.parse(oldHighscores)
  var highscoreSort = highscores.sort(function (x,y){
    return y.scores -x.scores});
  for (let i = 0; i < highscoreSort.length; i++) {
    var newLine = document.createElement("li")
    newLine.textContent = highscoreSort[i].initials + " " + highscoreSort[i].scores
    highscoresList.appendChild(newLine);
  }
}

reseto = addEventListener("click", function(event) {
  event.preventDefault();
  localStorage.removeItem("storedHighscores")
  highscoresList.textContent = "";
})

if (initials != null) {
  addScore();
} else {
  renderOldScores();
}
