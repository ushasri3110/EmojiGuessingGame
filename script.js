const emojis = [
    {
        emoji: '👍',
        description: 'Thumbs Up'
    },
    {
        emoji: '🎉',
        description: 'Party Popper'
    },
    {
        emoji: '🤗',
        description: 'Hugging Face'
    },
    {
        emoji: '😢',
        description: 'Crying Face'
    },
    {
        emoji: '😂',
        description: 'Face with Tears of Joy'
    }
];

const imgEle = document.getElementById('emoji-image');
const resultEle = document.getElementById('result');
const score = document.getElementById('score');
const timerEle= document.getElementById('timer');
const startButton = document.getElementById('start-button'); // Get the start button element

let currScore = 0;
let index = 0;
const totalScore=emojis.length;
let seconds=20;
let timer;

function endGame() {
    clearInterval(timer);
    document.getElementById("input-text").disabled = true;
    timerEle.textContent=`Time Is Up`
  }

function startTimer() {
    timer=setInterval(()=>{
        seconds--;
        timerEle.textContent=`Time: ${seconds}s`
        if (seconds<0){
            endGame();
        }
    },1000);
}

function displayEmoji() {
    const { emoji } = emojis[index];
    imgEle.textContent = emoji;
}

function nextEmoji() {
    index++;
    setTimeout(()=>{
        resultEle.textContent = "";
    },500)
    const inputEle = document.getElementById('input-text');
        inputEle.value = ''; 
        if (index >= emojis.length) {
            resultEle.textContent = "Quiz Completed";
            timerEle.remove();
            document.getElementById("input-text").disabled = true;
            score.textContent = `Score:${currScore}/${totalScore}`;
        }
    if (index < emojis.length) {
        displayEmoji();
    }
}


function handleInput(event) {
    if (event.key === 'Enter') {
        const inputText = event.target.value.trim();
        if (inputText !== '') {
            const { description } = emojis[index];
            if (inputText.toLowerCase() === description.toLowerCase()) {
                resultEle.textContent = "Correct Guess";
                currScore++;
            } else {
                resultEle.textContent = "Incorrect Guess";
            }
            score.textContent = `Score:${currScore}/${totalScore}`;
            nextEmoji();
        }
    }
}


startButton.addEventListener('click', () => {
    score.textContent = `Score:${currScore}/${totalScore}`;
    timerEle.textContent=`${seconds}`;
    const inputEl=document.createElement('input');
    inputEl.setAttribute('type','text');
    inputEl.setAttribute('id','input-text');
    inputEl.addEventListener('keydown', handleInput);
    const division=document.getElementById('input-div');
    division.appendChild(inputEl);
    displayEmoji();
    startTimer();
    startButton.remove();
});
