let counter = 1;
let word = '55555';
let enteredWord = '';
let enteredWords = 0;

const resultContainer = document.querySelector('.result');

const url =
  'https://random-words5.p.rapidapi.com/getMultipleRandom?count=2&wordLength=5';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'f66bbf2ce0msh4fd6557b9728fe7p15fc5bjsn200450253a61',
    'X-RapidAPI-Host': 'random-words5.p.rapidapi.com',
  },
};

let wordProps = {
  a: 0,
  b: 0,
  c: 0,
  d: 0,
  e: 0,
  f: 0,
  g: 0,
  h: 0,
  i: 0,
  j: 0,
  k: 0,
  l: 0,
  m: 0,
  n: 0,
  o: 0,
  p: 0,
  q: 0,
  r: 0,
  s: 0,
  t: 0,
  u: 0,
  v: 0,
  w: 0,
  x: 0,
  y: 0,
  z: 0,
};

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

async function fetchAPI() {
  try {
    const response = await fetch(url, options);
    const result = await response.json();

    word = result[0];
    console.log(word);

    countLetters(word);
  } catch (error) {
    console.error(error);
  }
}

fetchAPI();

const countLetters = (value) => {
  const splitedWord = value.split('');

  splitedWord.map((letter) => {
    wordProps[letter]++;
  });
};

const updateLetter = (letter) => {
  if (counter < 31) {
    document.querySelector(`.box-${counter}`).innerText = letter;
    counter++;
    enteredWord += letter;
  }
};

const removeLetter = () => {
  let minCounter = 5 * enteredWords;
  if (counter > 1) {
    if (enteredWords === 0) {
      document.querySelector(`.box-${counter - 1}`).innerText = '';
      counter--;
      enteredWord = enteredWord.slice(0, -1);
    } else if (enteredWords > 0 && minCounter + 2 <= counter) {
      document.querySelector(`.box-${counter - 1}`).innerText = '';
      counter--;
      enteredWord = enteredWord.slice(0, -1);
    }
  }
};

const checkWord = (value) => {
  console.log(enteredWords, counter);
  let correctLetters = 0;
  value = value.toLowerCase();
  const wordLetters = value.split('');

  const localProps = { ...wordProps };

  console.log(localProps, wordProps);

  wordLetters.map((letter, index) => {
    console.log('GREEN: ', letter, index);
    if (localProps[letter] > 0 && letter === word[index]) {
      document
        .querySelector(`.box-${index + 5 * (enteredWords - 1) + 1}`)
        .classList.add('green');
      localProps[letter]--;
      correctLetters++;
    }
  });

  wordLetters.map((letter, index) => {
    if (localProps[letter] === 0) {
      console.log('GRAY: ', letter, index + 5 * (enteredWords - 1) + 1);
      document
        .querySelector(`.box-${index + 5 * (enteredWords - 1) + 1}`)
        .classList.add('gray');
    } else if (localProps[letter] > 0) {
      if (letter !== word[index]) {
        console.log('YELLOW: ', letter, index + 5 * (enteredWords - 1) + 1);
        document
          .querySelector(`.box-${index + 5 * (enteredWords - 1) + 1}`)
          .classList.add('orange');
      }
    }
  });
  enteredWord = '';
  console.log(enteredWords);
  if (correctLetters === 5) {
    resultContainer.innerText = 'You won!';
  } else if (enteredWords === 6) {
    resultContainer.innerText = 'You Lost! Refresh the page to try again!';
  }
};

window.addEventListener('keydown', (e) => {
  if (isLetter(e.key)) {
    if ((enteredWords + 1) * 5 >= counter) {
      updateLetter(e.key);
    }
  } else if (e.key === 'Backspace') {
    removeLetter();
  } else if (e.key === 'Enter') {
    console.log(enteredWords, counter);
    if ((counter - 1) % 5 === 0) {
      enteredWords++;
      checkWord(enteredWord);
    }
  }
});
