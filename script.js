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
        resultText.innerText = `正しくは: ${wordList[questionCount].en}`;
        resultText.style.color = "red";
        incorrectCount++;
    }

    // Update stats
    document.getElementById("stats").innerText = `合計: ${correctCount + incorrectCount}, 正解: ${correctCount}, 不正解: ${incorrectCount}`;

    // Prepare next word
    questionCount++;
    if (questionCount < 20) {  // We only want 20 questions
        document.getElementById("wordToSpell").innerText = wordList[questionCount].ja;
        document.getElementById("answer").value = "";  // Clear the answer box
    } else {
        document.getElementById("wordToSpell").innerText = "ゲーム終了！";
        document.getElementById("answer").disabled = true;
        document.getElementById("submit").disabled = true;  // Disable the submit button
    }
}
