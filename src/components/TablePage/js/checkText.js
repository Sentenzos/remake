import {checkLanguage} from "./checkLanguage";

//возвращает строку с ошибкой, если есть
const checkText = (data) => {
  return ((!data.engWord || !data.rusWord) && "Заполните поля!") ||
    ((data.engWord.length < 1 || data.rusWord.length < 1) && "Заполните поля!") ||
    (data.engWord.length > 30  && "Максимум 30 символов!") ||
    (data.rusWord.length > 40  && "Максимум 40 символов!") ||
    ((!checkLanguage("russian", data.rusWord) ||
      !checkLanguage("english", data.engWord)) && "Язык не соответствует полю!");
};

export default checkText;