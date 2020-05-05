const wordRandomize = (words) => {
  let lastNumbers = [];

  return () => {
    const totalWords = Object.keys(words).length;
    let word = getRandomNumber(totalWords);

    //если в списке больше 10 слов, то убрает повторения в течении 5 кликов
    if (totalWords > 10) {
      while (lastNumbers.includes(word)) {
        word = getRandomNumber(totalWords);
      }

      if (lastNumbers.length > 4) {
        lastNumbers = [word];
      } else {
        lastNumbers.push(word);
      }
    }

    return Object.entries(words)[word];
  }
};


const getRandomNumber = (max) => {
  return Math.floor(Math.random() * max);
};




export default wordRandomize;