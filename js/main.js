/* ---Step 1--- */

/* In this project, you'll create a word guessing game. Players will click letters from an onscreen keyboard to try to guess a random phrase. The player’s goal is to guess all the letters in the phrase. A player can keep choosing letters until they make five incorrect guesses. Letters guessed correctly will appear in the phrase. Letters guessed incorrectly will be counted at the bottom of the screen. */

/* ---Step 2--- */

// Get the element with the ID of qwerty and save it to a variable
const qwerty = document.getElementById("qwerty");

// Get the element with the ID of phrase and save it to a variable.
const phrase = document.getElementById("phrase");

// Create a missed variable, initialized to 0.
let missed = 0;

/* ---Step 3--- */

// Attach a event listener to the “Start Game” button to hide the start screen overlay.
const startButton = document.querySelector(".btn__reset");
startButton.addEventListener("click", () => {
  overlay.style.display = "none";
});

/* ---Step 4--- */

// Create a phrases array that contains at least 5 different phrases as strings.
const phrases = [
  "the elephant in the room",
  "the cat in the hat",
  "the dog ate my homework",
  "the cow jumped over the moon",
  "the fox in the forest",
];

/* ---Step 5--- */

// Create a getRandomPhraseAsArray function.
// This function should randomly choose a phrase from the phrases array and split that phrase into a new array of characters.
// The function should return the new array.
function getRandomPhraseAsArray(arr) {
  const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
  return randomPhrase.split("");
}

getRandomPhraseAsArray(phrases);

/* ---Step 6--- */

// Create a addPhraseToDisplay function that loops through an array of characters.
// For each character, create a list item with the character inside of it.
// Add each list item to the #phrase ul element.
// If the character in the array is a letter and not a space, the function should add the class “letter” to the list item.
// If the character in the array is a space, the function should add the class “space” to the list item.
function addPhraseToDisplay(arr) {
  const phraseUl = document.querySelector("#phrase ul");
  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement("li");
    li.textContent = arr[i];
    if (arr[i] === " ") {
      li.className = "space";
    } else {
      li.className = "letter";
    }
    phraseUl.appendChild(li);
  }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

/* ---Step 7--- */

// Create a checkLetter function.
// This function should have one parameter: the button the player has clicked when guessing a letter.
// The function should get all of the elements with a class of “letter”
// The function should loop over the letters and check if they match the letter in the button the player has chosen.
// If the letter in the button matches a letter in the phrase, the function should add the “show” class to the list item containing that letter.
// Store the matching letter inside of a variable, and return that letter.
function checkLetter(button) {
  const letter = button.textContent;
  const letterList = document.querySelectorAll(".letter");
  let match = null;
  for (let i = 0; i < letterList.length; i++) {
    if (letterList[i].textContent === letter) {
      letterList[i].classList.add("show");
      match = letter;
    }
  }
  return match;
}

/* ---Step 8--- */

// Add an event listener to the qwerty keyboard.
// Use event delegation to listen only to button events from the keyboard.
// When a player chooses a letter, add the “chosen” class to that button so the same letter can’t be chosen twice.
// Pass the button to the checkLetter function
// If the letter was found, store the letter returned inside of a variable called letterFound.
qwerty.addEventListener("click", (e) => {
  const button = e.target;
  if (button.tagName === "BUTTON") {
    button.className = "chosen";
    const letterFound = checkLetter(button);
  } else {
    return null;
  } // end of if statement
});

/* ---Step 9--- */

// Count the missed guesses in the game.
// If the checkLetter function returns a null value, the player has guessed the wrong letter.
// In the keyboard event listener, after checkLetter is called, write a statement to check the value of the letterFound variable.
// If the value is null, remove one of the tries from the scoreboard.
// When you remove a try from the scoreboard, make sure to increase the missed count by 1. Then change a liveHeart.png image to a lostHeart.png image.
function removeLife() {
  const liveHearts = document.querySelectorAll(".tries img");
  liveHearts[missed].src = "images/lostHeart.png";
  missed++;
}

qwerty.addEventListener("click", (e) => {
  const button = e.target;
  if (button.tagName === "BUTTON") {
    const letterFound = checkLetter(button);
    if (letterFound === null) {
      removeLife();
    }
  }
  checkWin();
});

/* ---Step 10--- */

// Each time the player guesses a letter, this function will check whether the game has been won or lost. At the very end of the keyboard event listener, you’ll run this function to check if the number of letters with class “show” is equal to the number of letters with class “letters”. If they’re equal, show the overlay screen with the “win” class and appropriate text. Otherwise, if the number of misses is equal to or greater than 5, show the overlay screen with the “lose” class and appropriate text.
function checkWin() {
  const letterShown = document.querySelectorAll(".show");
  const letterTotal = document.querySelectorAll(".letter");
  if (letterShown.length === letterTotal.length) {
    overlay.className = "win";
    overlay.style.display = "flex";
    overlay.children[1].textContent = "You Win!";
  } else if (missed >= 5) {
    overlay.className = "lose";
    overlay.style.display = "flex";
    overlay.children[1].textContent = "You Lose!";
  }
}
