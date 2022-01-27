import './style.css';

const inputName = document.querySelector('.input-name');
const inputScore = document.querySelector('.input-score');
const scoresDiv = document.querySelector('.scores');
const formDiv = document.querySelector('.form-div');

const getScoreArr = async () => {
  const response = await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/bktuJZxafpQXjsz0DsIy/scores/',
  );
  return response.json();
};

const displayElemnt = (arrayOfScores) => {
  // empty score div if has any data
  scoresDiv.innerHTML = ' ';

  // looping arryof scores
  arrayOfScores.forEach((elemnt) => {
    // create main div
    const div = document.createElement('div');
    div.className = 'score';
    // div.setAttribute('data-id', score.id);

    const nameWithScore = document.createElement('p');
    const title = `${elemnt.user} : ${elemnt.score}`;
    nameWithScore.textContent = title;
    div.appendChild(nameWithScore);

    scoresDiv.appendChild(div);
  });
};

const addElementsToPageFrom = async () => {
  await getScoreArr().then((scores) => {
    displayElemnt(scores.result);
  });
};

const addScoreToArray = async (nameText, num) => {
  await fetch(
    'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/bktuJZxafpQXjsz0DsIy/scores/',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: `${nameText}`,
        score: `${num}`,
      }),
    },
  );
};

formDiv.addEventListener('submit', (e) => {
  e.preventDefault();
  if (inputName !== ' ' && inputScore !== ' ') {
    const name = document.getElementById('name').value;
    const score = document.getElementById('score').value;
    addScoreToArray(name, score);
    inputName.value = '';
    inputScore.value = '';
    inputName.focus();
  }
});

const refBtn = document.querySelector('.refresh');

refBtn.addEventListener('click', addElementsToPageFrom);
