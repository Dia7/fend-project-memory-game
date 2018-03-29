/*
 * Create a list that holds all of your cards
 */
let oneCard = document.querySelectorAll(".card");

let cardList = [...oneCard];

// array for the open cards
var openedCards = [];

// declaring variable of matchedCards
let matchedCard = document.querySelector(".match");
// deck of all cards in game
const deck = document.querySelector("#card-deck");

// declaring move variable
let moves = 0;
let counter = document.querySelector(".moves");

// declare variables for star icons
const stars = document.querySelectorAll(".fa-star");

// * Open the cards on the page
var displayCard = $('.card').on('click', function(event) {
    $(event.target).toggleClass('show');
    $(event.target).toggleClass('open');
    $(event.target).toggleClass('disabled');
});

// whe the document is loaded, the game restarts
document.body.onload = startGame();

function startGame(){
    // *   - shuffle the list of cards using the provided "shuffle" method below
    cardList = shuffle(cardList);

    //reset timer
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);

     // reset moves
    moves = 0;
    counter.innerHTML = moves;

    // reset rating
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }

    // remove all existing classes from each card
    for (var i = 0; i < cardList.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cardList, function(item) {
            deck.appendChild(item);
        });
        cardList[i].classList.remove("show", "open", "match","disabled");
     }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
// *  - add the card to a OpenedCards *list* of "open" cards to see if the cards are matching (put this functionality in another function that you call from this one)
function cardOpen() {
    moveCounter();
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};

// *  - if the list already has another card, check to see if the two cards match

 // *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
function matched(){
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    openedCards[0].classList.remove("disabled");
    openedCards[1].classList.remove("disabled");
    openedCards = [];

}
 // *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");

    disable();

    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "unmatched");
        openedCards[1].classList.remove("show", "open", "unmatched");

        enable();

        openedCards = [];
    },1100);
}

//disable cards temporarily
function disable(){
    Array.prototype.filter.call(cardList, function(oneCard){
        oneCard.classList.add('disabled');
    });
}

//enable cardList and disable matched cardList
function enable(){
    Array.prototype.filter.call(cardList, function(oneCard){
        oneCard.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}
 // *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
function moveCounter(){
    moves++;
    counter.innerHTML = moves;

    //start timer on first move
    if(moves === 1){
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
       // setting rates based on moves
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

 // *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)


// loop to add event listeners to each card
for (var i = 0; i < cardList.length; i++){
    oneCard = cardList[i];
    oneCard.addEventListener("click", displayCard);
    oneCard.addEventListener("click", cardOpen);
}

// set the game timer
var second = 0, minute = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}
