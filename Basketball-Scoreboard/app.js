let homeScore = 0;
let guestScore = 0;
let homeScoreDisplay = document.getElementById("home-score");
let guestScoreDisplay = document.getElementById("guest-score");
// let homeButton1 = document.getElementById("home-btn1");
// let homeButton2 = document.getElementById("home-btn2");
// let homeButton3 = document.getElementById("home-btn3");

function addOnePointToHome() {
    homeScore += 1;
    homeScoreDisplay.innerHTML = homeScore;
};

function addTwoPointsToHome() {
    homeScore += 2;
    homeScoreDisplay.innerHTML = homeScore;
};

function addThreePointsToHome() {
    homeScore += 3;
    homeScoreDisplay.innerHTML = homeScore;
};

function addOnePointToGuest() {
    guestScore += 1;
    guestScoreDisplay.innerHTML = guestScore;
};
function addTwoPointsToGuest() {
    guestScore += 2;
    guestScoreDisplay.innerHTML = guestScore;
};
function addThreePointsToGuest() {
    guestScore += 3;
    guestScoreDisplay.innerHTML = guestScore;
};



