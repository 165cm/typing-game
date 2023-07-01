let wordList = [];  // We will load this from the JSON file
let questionCount = 0;  // This will keep track of how many questions have been asked
let correctCount = 0;
let incorrectCount = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

fetch('wordList.json')
    .then(response => response.json())
    .then(json => {
        wordList = shuffle(json);  // Shuffle the word list
        document.getElementById("wordToSpell").innerText = wordList[questionCount].ja;
        document.getElementById("answer").value = wordList[questionCount].en.charAt(0);  // Pre-fill the first character
        document.getElementById("answer").focus(); // Pre-focus
    });

document.getElementById("submit").onclick = function() {
    let userAnswer = document.getElementById("answer").value;
    let resultText = document.getElementById("resultText");
    let correctSpelling = document.getElementById("correctSpelling");

    if (userAnswer === wordList[questionCount].en) {
        resultText.innerText = "正解！";
        resultText.style.color = "black";  // Reset color to black
        correctCount++;
        correctSpelling.innerText = "";  // Clear the correct spelling if it's a correct answer
    } else {
        resultText.innerText = `正解は: ${wordList[questionCount].en}`;
        resultText.style.color = "red";
        incorrectCount++;
    }

    // Prepare next word
    questionCount++;
    if (questionCount >= 1) { // After the second question
        document.getElementById("title").classList.add("hidden"); // Hide the title
      }
    if (questionCount < 20) {  // We only want 20 questions
        document.getElementById("wordToSpell").innerText = wordList[questionCount].ja;
        document.getElementById("answer").value = wordList[questionCount].en.charAt(0);  // Pre-fill the first character
        document.getElementById("answer").focus(); // Pre-focus
    } else {
        document.getElementById("wordToSpell").innerText = "ゲーム終了！";
        document.getElementById("answer").disabled = true;
        document.getElementById("submit").disabled = true;  // Disable the submit button

        // Calculate and display the score
        let score = Math.round((correctCount / (correctCount + incorrectCount)) * 100);
        document.getElementById("stats").innerText = `正解率: ${score}点`;
    }
}
