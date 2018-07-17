
var wordBank = ["beelzebub"];//"heathen","magic","float", "salem", 
var possible = "abcdefghijklmnopqrstuvwxyz";
var wins = 0;
var losses = 0;
var guesses = "";
var guessesLeft = 0;
var secretWord = "";
var userGuess;
var correctGuesses = []; //array for gathering the correct guesses
var wordBuild = [];     //array for collecting parts of the word as correct guesses
var badGuesses = [];
var allGuesses = [];

//conjunction junction, what's your FUNCTION?
function updatePage(){
    document.querySelector("#wins").innerHTML = wins; 
    document.querySelector("#losses").innerHTML = losses; 
    document.querySelector("#guessesLeft").innerHTML = guessesLeft;
    document.querySelector("#badGuesses").innerHTML = badGuesses;

     //collect both correct and bad arrays in one array
     allGuesses=[];
     allGuesses.push.apply(allGuesses, badGuesses);
     allGuesses.push.apply(allGuesses, correctGuesses);
};

function checkForWin(){
    if(wordBuild.length == secretWord.length){
        wins++;
        newWord();
        return wins;
    };
};

function clearDivs(){
    for (var i = 0; i < secretWord.length; i++){
        document.getElementById("charIndex"+i).remove();
    }
};

function newWord(){
    clearDivs();
    //get random word from array
    secretWord = wordBank[Math.floor(Math.random() * wordBank.length)];      
    // blank spaces for showing number of words
    var blanks = document.getElementById("character-blanks");
    blanks.textcontent = "_";
    for(var i = 0; i < secretWord.length; i++){
        var moreBlanks = document.createElement("div");
        moreBlanks.textContent = "_";
        //this gives each div an index and class to be able to be changed later in javascript and css
        moreBlanks.setAttribute("id", "charIndex" + i);
        moreBlanks.setAttribute("class", "indv");
        blanks.appendChild(moreBlanks);
    };
    //max number of guesses is always 4 more than the length of the word
    guessesLeft = secretWord.length + 4;

    //reset
    userGuess = "";
    correctGuesses = [];
    badGuesses = [];
    allGuesses=[];
    wordBuild=[];
    //update page with initialized values
    updatePage();
    return secretWord;
};

//initialize word selection if none
if(wordBank.indexOf(secretWord) == -1){
    newWord();
};

//*****************START*****************

document.onkeyup = function(event) {
// Determines which key was pressed.
    userGuess = event.key;
//determine a win
if(wordBuild.length == secretWord.length){
    wins++;
    newWord();
}
else if(guessesLeft < 2 && wordBuild.length !== secretWord.length){
    losses++;
    newWord();
}
else {
    //ONLY RUN if valid input and if not already guessed    
    if(possible.indexOf(userGuess) >-1 && allGuesses.indexOf(userGuess) == -1){
        //for all characters within the word
        for(var count = 0; count < secretWord.length; count++){
            //evaluate if the character is in the word or in the correct guess array
            if(secretWord.charAt(count) == userGuess)
            {
                //if the character is in the word, add the guess to correctGuesses array AS MANY TIMES AS THE LETTER APPEARS IN THE WORD
                wordBuild.push(userGuess);
                //update the div to have the letter instead of the blank space
                var foundIndex = "charIndex" + count;
                document.querySelector("#"+foundIndex+"").innerHTML = userGuess; 
            };

            if(secretWord.charAt(count) == userGuess && correctGuesses.indexOf(userGuess) == -1)
            {
                //if the character is in the word, add the guess to correctGuesses array ONCE
                correctGuesses.push(userGuess);
                
                
                guessesLeft--;
                updatePage();
                //check for win
                checkForWin();

            };
            
        };
        //add to badGuesses
        if (correctGuesses.indexOf(userGuess) == -1){
            badGuesses.push(userGuess);
            //update counter(s)
            if (userGuess){
                guessesLeft--;
                updatePage();
            }   
        };
      
       
        };//END - Only run IF valid input & not duplicate & have guesses left  
};
};

