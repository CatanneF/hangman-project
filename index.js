import prompt from "readline-sync";
import wordBank from "./word-bank.js";


console.log("Welcome to Hangman!\nPlease press Ctrl + c to stop");

let letter = prompt.question("Please guess a letter: ");
console.log(`You guessed ${letter}`);

