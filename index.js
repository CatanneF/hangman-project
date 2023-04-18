import prompt from "readline-sync";
import wordBank from "./word-bank.js";


let guessesLeft = 6;
let correctWord;
let playerWord; 
let playerGuessedLetter;
let guessedLetters = [];
let displayHangman;



const getWord = () => {
    let randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    correctWord = Array.from(randomWord);
    displayWord(correctWord, playerWord);
    
};


const displayWord = (correctWord, playerWord) => {
    playerWord = [`_ `.repeat(correctWord.length)]
    for (let i = 0; i < playerWord.length; i++) {
        console.log(playerWord[i]);
    } 
    console.log(correctWord + "--answer")
    isGameOver();
    
}; 




const isAlreadyGuessed = (playerGuessedLetter, guessedLetters) => {
    
    if (guessedLetters.includes(playerGuessedLetter)) {
        console.log("Letter already guessed")
        isGameOver();

       } else if (playerGuessedLetter.length > 1 || playerGuessedLetter.length < 1 ) {
            console.log("Guess only one letter");
            isGameOver();
        } else { 
            console.log("not guessed")
                guessedLetters.push(playerGuessedLetter);
                isGuessCorrect(playerGuessedLetter, correctWord);
       }
    }; 


const isGuessCorrect = (playerGuessedLetter, correctWord) => {
    console.log(guessedLetters + "--guessed letters");
    if (correctWord.includes(playerGuessedLetter)) {
        console.log("Correct")
       //buildWord(playerGuessedLetter, playerWord, correctWord);
    }  else {
            console.log("Wrong")
            triesRemaining();
    };
    
};

const buildWord = (playerGuessedLetter, playerWord, correctWord) => {
   for (let j = 0; j < correctWord.length; j++) {
    if(correctWord[j] === playerGuessedLetter) {
        console.log(correctWord.indexOf(playerGuessedLetter) + "--index")
    }
    console.log(playerWord);
   }
} ;


const triesRemaining = () => {   
        guessesLeft--; 
        console.log(`Guesses Remaining: ${guessesLeft}`);
        addHangman(guessesLeft, displayHangman);
};


const addHangman = (guessesLeft, displayHangman) => {
    let hangman = [`  \\`, `\n/`, `\n  |\n  |`, `  /`, `\n\\`, `  O`];
    for (let i = 0; i < 1; i++) { 
        displayHangman += hangman[guessesLeft];
    }; 
    console.log(displayHangman);  
    isGameOver(guessesLeft);
};
    

const isGameOver = (guessesLeft) => {
    if (guessesLeft === 0)  {
        console.log("You lost. Try again?");
        guessLetter();
        return false;

    } else if (guessedLetters === correctWord) {
       console.log(`You win! The answer was: ${correctWord}`);
        return true;
    } else {
        guessLetter();
        return true;        
    }; 
}; 

const guessLetter = () => {
    while (isGameOver) {  
        playerGuessedLetter = prompt.question("\nPlease guess a letter: ");
        playerGuessedLetter = playerGuessedLetter.toLowerCase();
        console.log(`You guessed ${playerGuessedLetter}`);
        isAlreadyGuessed(playerGuessedLetter, guessedLetters);         
    };
};


const startGame = () => {
    while (isGameOver) {
        console.log("Welcome to Hangman!\nPlease press Ctrl + c to stop");
        getWord();       
    };  
};

startGame();



 



