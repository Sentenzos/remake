
//Сам класс принимает объект слов, а его экземпляр
//принимает название метода для сортировки в виде строки
class SortList  {
  constructor(words) {
    this.words = words;
  }

  sort = (method) => {
    return this[method].apply(this);
  };

  engAZ = () => {
    let words = Object.entries(this.words);
    words.sort((a, b) => {
      return a[0] > b[0] ? 1 : -1;
    });

    return words;
  };

  engZA = () => {
    let words = Object.entries(this.words);
    words.sort((a, b) => {
      return a[0] < b[0] ? 1 : -1;
    });

    return words;
  }
}

export default SortList;