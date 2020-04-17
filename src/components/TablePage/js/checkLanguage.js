const checkLanguage = (originalText, newText) => {
  const notOnlyCyrillic = /[^а-я,\s()]/i;
  const notOnlyLatin = /[^a-z,\s()]/i;
  //выбрано слово на русском
  if (!notOnlyCyrillic.test(originalText)) {
    if (notOnlyCyrillic.test(newText)) return true

    //выбрано слово на английском
  } else {
    if (notOnlyLatin.test(newText)) return true;
  }
};

export default checkLanguage;