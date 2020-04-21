
//Сначала определяет язык текста оригинала, а потом проверяет соответствует ли этому языку новый текст.
//Возвращает true, если языки не совпали и false, если совпали
export const matchLanguage = (originalText, newText) => {
  const notOnlyCyrillic = /[^а-яё,.()\|/ ]/i;
  const notOnlyLatin = /[^a-z,.()\|/ ]/i;
  //выбрано слово на русском
  if (!notOnlyCyrillic.test(originalText)) {
    if (notOnlyCyrillic.test(newText)) return true

    //выбрано слово на английском
  } else {
    if (notOnlyLatin.test(newText)) return true;
  }
  return false;
};



export const checkLanguage = (language, text) => {
  if (language === "russian") {
    return  !/[^а-яё,.()\|/ ]/i.test(text);
  } else if (language === "english") {
    return  !/[^a-z,.()\|/ ]/i.test(text);
  }
};