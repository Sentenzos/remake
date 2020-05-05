
//Сам класс принимает объект слов, а метод sort его экземпляра
//принимает название метода (строка) для сортировки
export class SortList {
  constructor(words) {
    this.words = words;
  }

  sort = (method) => {
    console.log("method: " + method)
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
  };

  rusAZ = () => {
    let words = Object.entries(this.words);
    words.sort((a, b) => {
      return a[1] > b[1] ? 1 : -1;
    });

    return words;
  };

  rusZA = () => {
    let words = Object.entries(this.words);
    words.sort((a, b) => {
      return a[1] < b[1] ? 1 : -1;
    });

    return words;
  };
}

//поочередно возвращает строку с именами методов сортировки
export const changeSortingMethod = (() => {
  const sortingMethods = ['engAZ', 'engZA', 'rusAZ', "rusZA"];
  let i = 0;

  return () => {
    if (i < sortingMethods.length - 1) {
       ++i;
    } else {
      i = 0;
    }

    return sortingMethods[i]
  }
})();
