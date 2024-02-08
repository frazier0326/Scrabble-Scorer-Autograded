// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

// let word = '';


function oldScrabbleScorer(word) {
	 word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }
// console.log(oldScrabbleScorer("hello"));
// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let question = input.question("Let's play some scrabble!\n\nEnter a word to score: ");
   let word = question;
   // console.log(word);
   // return word;
   let result = oldScrabbleScorer(word);
   console.log(result);
};
// console.log(initialPrompt("hello"));
function simpleScorer(word) {
   word = word.toUpperCase();
   let simpleScorerTotal = 0;
      for (let i=0; i<word.length; i++) {
         simpleScorerTotal++
      }
   return simpleScorerTotal;
   // return word.length;
}

function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let vowelBonusScorerTotal = 0;
   let vowels = ['A', 'E', 'I', 'O', 'U'];
      for (let i=0; i<word.length; i++) {
         if (vowels.includes(word[i])) {
            vowelBonusScorerTotal += 3
         } else {
            vowelBonusScorerTotal++
         }
      }
   return vowelBonusScorerTotal;
}

function scrabbleScorer(word) {
   word = word.toLowerCase();
   let scrabbleScorerTotal = 0;
   for (let i=0; i<word.length; i++) {
      scrabbleScorerTotal += newPointStructure[word[i]];
   }
   return scrabbleScorerTotal;
}

// console.log(scrabbleScorer("hello"));
let simple = {
   name: 'Simple Score',
   description: 'Each letter is worth 1 point.',
   scorerFunction: simpleScorer
}

let bonus = {
   name: 'Bonus Vowels',
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
}

let scrabble = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
}

const scoringAlgorithms = [simple, bonus, scrabble];
// console.log("algorithm name: ", scoringAlgorithms[0].name);
//   console.log("scoringFunction result: ", scoringAlgorithms[0].scoringFunction("JavaScript"));
function scorerPrompt() {
   let word = input.question("Let's play some scrabble!\n\nEnter a word to score: ");
   console.log("Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system");
  let i = Number(input.question('Enter 0, 1, or 2: '));
  return {
   userWord: word,
   userNum: i,
  }
//   return scoringAlgorithms[i].scorerFunction();
   // console.log(word);
}

// function transform() {};
function transform(oldPointStructure) {
   let points = {};
   for (item in oldPointStructure) {
      let pointsArray = oldPointStructure[item]
      for (let i=0; i<pointsArray.length; i++) {
         points[pointsArray[i].toLowerCase()] = Number(item);
      }
   }
   return points;
};
console.log(transform(oldPointStructure));

let newPointStructure = transform(oldPointStructure);
   // letterA: 1,
   // letterB: 3,
   // letterC: 3,
   // letterD: 2,
   // letterE: 1,
   // letterF: 4,
   // letterG: 2,
   // letterH: 4,
   // letterI: 1,
   // letterJ: 8,
   // letterK: 5,
   // letterL: 1,
   // letterM: 3,
   // letterN: 1,
   // letterO: 1,
   // letterP: 3,
   // letterQ: 10,
   // letterR: 1,
   // letterS: 1,
   // letterT: 1,
   // letterU: 1,
   // letterV: 4,
   // letterW: 4,
   // letterX: 8,
   // letterY: 4,
   // letterZ: 10

// console.log("letter a: ", newPointStructure.letterA);
function runProgram() {
   // let word = initialPrompt();
   // // console.log(word);
   // scorerPrompt(word);
   initialPrompt();
   let selectedObject = scorerPrompt();
   let selectedWord = selectedObject.userWord;
   let selectedNum = selectedObject.userNum;
   let userScore = scoringAlgorithms[selectedNum].scorerFunction(selectedWord);
   console.log(`Score for '${selectedWord}': ${userScore}`);
}


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
