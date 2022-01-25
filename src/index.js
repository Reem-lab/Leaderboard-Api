import './style.css';

const inputName = document.querySelector('.input-name');
const inputScore = document.querySelector('.input-score');
const scoresDiv = document.querySelector('.scores');
const submit = document.querySelector('.btn');

let arrayOfScores = [];

// ckeck if there is any thing in local storage
if (localStorage.getItem('Scores')) {
  arrayOfScores = JSON.parse(localStorage.getItem('Scores'));
}

// function to add data on local storage
const addDataToLocal = (arrayOfScores) => {
  window.localStorage.setItem('Scores', JSON.stringify(arrayOfScores));
};

function addElementsToPageFrom(arrayOfScores) {
  // empty score div if has any data
  scoresDiv.innerHTML = ' ';

  // looping arryof scores
  arrayOfScores.forEach((score) => {
    // create main div
    const div = document.createElement('div');
    div.className = 'score';
    div.setAttribute('data-id', score.id);

    const nameWithScore = document.createElement('p');
    const title = `${score.name} : ${score.scr}`;
    nameWithScore.textContent = title;
    div.appendChild(nameWithScore);

    scoresDiv.appendChild(div);
  });
}

addElementsToPageFrom(arrayOfScores);

const addScoreToArray = (nameText, num) => {
  const score = {
    id: Date.now(), // make it quall to time to be different
    name: nameText,
    scr: num,
  };
  // push my scores to array
  arrayOfScores.push(score);

  // Add elemnt to my page
  addElementsToPageFrom(arrayOfScores);

  // add to local storage
  addDataToLocal(arrayOfScores);
};

submit.onclick = (e) => {
  e.preventDefault();
  if (inputName !== ' ' && inputScore !== ' ') addScoreToArray(inputName.value, inputScore.value);
  inputName.value = ''; // empty the input
  inputScore.value = ' ';
  inputName.focus();
};
