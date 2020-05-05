import {tablePageAPI} from "../../API/API";
import {stopSubmit} from "redux-form";
import {resetAddWord} from "./reduxFormReducer";
import {setServerError, toggleIsProcessing, toggleIsInitializing} from "./mainReducer";

const SET_WORDS = "tablePageReducer/SET_WORDS";
const SET_BASE_NAME = "tablePageReducer/SET_BASE_NAME";
const SET_ALL_BASES_NAMES = "tablePageReducer/SET_ALL_BASES_NAMES ";
const ADD_SELECTED_WORD = "tablePageReducer/ADD_SELECTED_WORD";
const CLEAR_SELECTED_WORDS = "tablePageReducer/CLEAR_SELECTED_WORDS";
const SET_BASE_TO_TRANSFER_TO = "tablePageReducer/SET_BASE_TO_TRANSFER_TO";
const SET_SELECTED_WORD = "tablePageReducer/SET_SELECTED_WORD";
const SET_SORTING_METHOD = "tablePageReducer/SET_SORTING_METHOD";
const SET_MODE = "tablePageReducer/SET_MODE";
const SET_PAGE_NUMBER = "tablePageReducer/SET_PAGE_NUMBER";
const SET_WORD_IS_ALREADY = "tablePageReducer/SET_WORD_IS_ALREADY";
const SET_IS_SEARCHING = "tablePageReducer/SET_IS_SEARCHING";


const initialState = {
  currentBaseName: "",
  words: {},
  allBases: ['common', 'repeat', 'learned'],
  wordsOnPage: 18,
  serverError: {
    message: "",
    state: false
  },
  selectedWord: {
    //value нужен инпуту для value, так же в него onChange записывает новые значения
    value: "",
    //originValue служит для сброса value к исходному значению
    originValue: "",
    //index служит key для React и позволяет всплывающему меню висеть у верной строки таблицы.
    index: null,
    //key позволяет отличать левое слово от правого и подсвечивать нужное после дабл клика
    key: null
  },
  //массив объектов {word, value}
  selectedWords: [],
  baseToTransferTo: "",
  sortingMethod: "engAZ",
  //режим всплывающего меню (deleting, editing, transfer)
  mode: null,
  pageNumber: 1,
  wordIsAlready: false,
  isSearching: false
};


export const tablePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BASE_NAME:
      return {
        ...state,
        currentBaseName: action.baseName
      };

    case SET_WORDS:
      return {
        ...state,
        words: {...action.words}
      };

    case SET_ALL_BASES_NAMES:
      return {
        ...state,
        allBases: ['common', 'repeat', 'learned', ...action.names]
      };

    case ADD_SELECTED_WORD:
      return {
        ...state,
        selectedWords: [...state.selectedWords, action.word]
      };

    case CLEAR_SELECTED_WORDS:
      return {
        ...state,
        selectedWords: []
      };

    case SET_BASE_TO_TRANSFER_TO:
      return {
        ...state,
        baseToTransferTo: action.baseName
      };

    case SET_SELECTED_WORD:
      return {
        ...state,
        selectedWord: action.wordData
      };

    case SET_SORTING_METHOD:
      return {
        ...state,
        sortingMethod: action.sortingMethod
      };

    case SET_MODE:
      return {
        ...state,
        mode: action.mode
      };

    case SET_PAGE_NUMBER:
      return {
        ...state,
        pageNumber: action.pageNumber
      };

    case SET_WORD_IS_ALREADY:
      return {
        ...state,
        wordIsAlready: action.state
      };

    case SET_IS_SEARCHING:
      return {
        ...state,
        isSearching: action.state
      };

    default:
      return state
  }
};


export const setWords = (words) => ({type: SET_WORDS, words});
export const setBaseName = (baseName) => ({type: SET_BASE_NAME, baseName});
export const setAllBasesNames = (names) => ({type: SET_ALL_BASES_NAMES, names});
export const addSelectedWord = (word) => ({type: ADD_SELECTED_WORD, word});
export const clearSelectedWords = () => ({type: CLEAR_SELECTED_WORDS});
export const setBaseToTransferTo = (baseName) => ({type: SET_BASE_TO_TRANSFER_TO, baseName});
export const setSelectedWord = (wordData) => ({type: SET_SELECTED_WORD, wordData});
export const setSortingMethod = (sortingMethod) => ({type: SET_SORTING_METHOD, sortingMethod});
export const setMode = (mode) => ({type: SET_MODE, mode});
export const setPageNumber = (pageNumber) => ({type: SET_PAGE_NUMBER, pageNumber});
export const setWordIsAlready = (state) => ({type: SET_WORD_IS_ALREADY, state});
export const setIsSearching = (state) => ({type: SET_IS_SEARCHING, state});


//НЕ ЗАБЫТЬ ПРОИЗВЕСТИ РЕФАКТОРИНГ САНОК!
export const getAllBasesNames = () => async (dispatch) => {
  dispatch(toggleIsProcessing(true));

  try {
    const res = await tablePageAPI.getAllBasesNames();
    if (!res.data.warn && !res.data.err) {
      dispatch(setAllBasesNames([...res.data.names]));
    } else {
      res.data.warn ?
        dispatch(setServerError(res.data.warn)) :
        dispatch(setServerError("На сервере произошла ошибка!"));
    }
  } catch (e) {
    dispatch(setServerError(e.message));
  }

  dispatch(toggleIsProcessing(false));
};

//получает последнюю выбранную пользователем базу слов
export const getInitBase = () => async (dispatch) => {
  dispatch(toggleIsInitializing(true));

  try {
    const res = await tablePageAPI.getInitBase();

    if (!res.data.warn && !res.data.err) {
      dispatch(setBaseName(res.data.baseName));
      dispatch(setWords(res.data.words));
    } else {
      res.data.warn ?
        dispatch(setServerError(res.data.warn)) :
        dispatch(setServerError("На сервере произошла ошибка!"));
    }
  } catch (e) {
    dispatch(setServerError(e.message));
  }

  dispatch(toggleIsInitializing(false));
};

export const getBase = (baseName) => async (dispatch) => {
  dispatch(toggleIsProcessing(true));

  try {
    const res = await tablePageAPI.getBase(baseName);

    if (!res.data.warn && !res.data.err) {
      dispatch(setBaseName(res.data.baseName));
      dispatch(setWords(res.data.words));
      dispatch(setIsSearching(false));
    } else {
      res.data.warn ?
        dispatch(setServerError(res.data.warn)) :
        dispatch(setServerError("На сервере произошла ошибка!"));
    }
  } catch (e) {
    dispatch(setServerError(e.message));
  }

  dispatch(toggleIsProcessing(false));
};

export const addNewBase = (baseName) => async (dispatch) => {
  dispatch(toggleIsProcessing(true));

  try {
    const res = await tablePageAPI.addNewBase(baseName);

    if (!res.data.warn && !res.data.err) {
      await dispatch(getAllBasesNames());
    } else {
      res.data.warn ?
        dispatch(setServerError(res.data.warn)) :
        dispatch(setServerError("На сервере произошла ошибка!"));
    }
  } catch (e) {
    dispatch(setServerError(e.message));
  }

  dispatch(toggleIsProcessing(false));
};

export const deleteBase = (baseName) => async (dispatch) => {
  dispatch(toggleIsProcessing(true));

  try {
    const res = await tablePageAPI.deleteBase(baseName);

    if (!res.data.warn && !res.data.err) {
      await dispatch(getAllBasesNames());
    } else {
      res.data.warn ?
        dispatch(setServerError(res.data.warn)) :
        dispatch(setServerError("На сервере произошла ошибка!"));
    }
  } catch (e) {
    dispatch(setServerError(e.message));
  }

  dispatch(toggleIsProcessing(false));
};

export const addWord = (wordData) => async (dispatch, getState) => {
  dispatch(toggleIsProcessing(true));

  try {
    if (wordData.errorMessage) {
      const action = stopSubmit("addWord", {_error: wordData.errorMessage});
      dispatch(action);
      dispatch(toggleIsProcessing(false));
      return
    }

    const baseName = getState().tablePage.currentBaseName;
    const res = await tablePageAPI.addWord({
      baseName,
      engWord: wordData.engWord,
      rusWord: wordData.rusWord
    });

    if (!res.data.warn && !res.data.err) {
      //если слово уже есть, то вывести окно подтверждения о изменении
      if (res.data.accept) {
        dispatch(toggleIsProcessing(false));
        dispatch(setWordIsAlready(true));
        return
      }

      const words = getState().tablePage.words;
      dispatch(setWords({
        ...words,
        [wordData.engWord]: wordData.rusWord
      }));
      //очистка полей
      dispatch(resetAddWord());
    } else {
      res.data.warn ?
        dispatch(setServerError(res.data.warn)) :
        dispatch(setServerError("На сервере произошла ошибка!"));
    }
  } catch (e) {
    dispatch(setServerError(e.message));
  }

  dispatch(toggleIsProcessing(false));
};

export const addWordConfirm = () => async (dispatch, getState) => {
  dispatch(setWordIsAlready(false));
  dispatch(toggleIsProcessing(true));
  try {
    const baseName = getState().tablePage.currentBaseName;
    const {engWord, rusWord} = getState().form.addWord.values;

    const res = await tablePageAPI.addWordConfirm({baseName, engWord, rusWord});

    if (!res.data.warn && !res.data.err) {
      const words = getState().tablePage.words;
      dispatch(setWords({
        ...words,
        [engWord]: rusWord
      }));
      //очистка полей
      dispatch(resetAddWord());
    } else {
      res.data.warn ?
        dispatch(setServerError(res.data.warn)) :
        dispatch(setServerError("На сервере произошла ошибка!"));
    }
  } catch (e) {
    dispatch(setServerError(e.message));
  }
  dispatch(toggleIsProcessing(false));
};


export const changeWord = () => async (dispatch, getState) => {
  dispatch(toggleIsProcessing(true));

  try {
    const baseName = getState().tablePage.currentBaseName;
    const selectedWord = getState().tablePage.selectedWord;
    const {originValue, value, key, engWord} = selectedWord;

    let res;

    //Отправка запроса в зависимости от того английское слово или русское.
    if (key === 0) {
      res = await tablePageAPI.changeEngWord({
        baseName,
        oldEngWord: originValue,
        newEngWord: value,
      })
    } else if (key === 1) {
      res = await tablePageAPI.changeRusWord({
        baseName,
        engWord,
        newRusWord: value,
      })
    }

    if (!res.data.warn && !res.data.err) {
      const words = {...getState().tablePage.words};
      //В случае успеха сервер не присылает базу слов заново.
      //Так что нужно произвести изменения в state.

      //Если слово на английском
      if (key === 0) {
        const thisValue = words[engWord];
        delete words[engWord];
        words[value] = thisValue;
        //Если слово на русском
      } else if (key === 1) {
        words[engWord] = value
      }
      dispatch(setSelectedWord(null));
      dispatch(setMode(null));
      dispatch(setWords({
        ...words
      }));

    } else {
      res.data.warn ?
        dispatch(setServerError(res.data.warn)) :
        dispatch(setServerError("На сервере произошла ошибка!"));
    }
  } catch (e) {
    dispatch(setServerError(e.message));
  }

  dispatch(toggleIsProcessing(false));
};


export const transferWords = () => async (dispatch, getState) => {
  dispatch(toggleIsProcessing(true));

  try {
    const currentBaseName = getState().tablePage.currentBaseName;
    const baseToTransferTo = getState().tablePage.baseToTransferTo;
    const wordsForTransfer = getState().tablePage.selectedWords.map(obj => obj.word);

    const res = await tablePageAPI.transferWords({
      fromBaseName: currentBaseName,
      toBaseName: baseToTransferTo,
      words: wordsForTransfer
    });

    if (!res.data.warn && !res.data.err) {
      //удаление из стора перенесенных в другую базу слов
      let words = {...getState().tablePage.words};
      for (let word of wordsForTransfer) {
        if (words[word]) delete words[word];
      }
      dispatch(setSelectedWord(null));
      dispatch(setBaseToTransferTo(""));
      dispatch(clearSelectedWords());
      dispatch(setMode(null));
      dispatch(setWords(words));
    } else {
      res.data.warn ?
        dispatch(setServerError(res.data.warn)) :
        dispatch(setServerError("На сервере произошла ошибка!"));
    }
  } catch (e) {
    dispatch(setServerError(e.message));
  }

  dispatch(toggleIsProcessing(false));
};

export const deleteWords = () => async (dispatch, getState) => {
  dispatch(toggleIsProcessing(true));

  try {
    const baseName = getState().tablePage.currentBaseName;
    const wordsForDeleting = getState().tablePage.selectedWords.map(obj => obj.word);

    const res = await tablePageAPI.deleteWords({
      baseName,
      words: wordsForDeleting
    });

    if (!res.data.warn && !res.data.err) {
      //удаление слов из стора
      let words = {...getState().tablePage.words};
      for (let word of wordsForDeleting) {
        if (words[word]) delete words[word];
      }
      dispatch(setSelectedWord(null));
      dispatch(clearSelectedWords());
      dispatch(setMode(null));
      dispatch(setWords(words));
    } else {
      res.data.warn ?
        dispatch(setServerError(res.data.warn)) :
        dispatch(setServerError("На сервере произошла ошибка!"));
    }
  } catch (e) {
    dispatch(setServerError(e.message));
  }

  dispatch(toggleIsProcessing(false));
};

export const searchEngWord = (data) => async (dispatch) => {
  dispatch(toggleIsProcessing(true));
  try {
    const res = await tablePageAPI.searchEngWord(data);

    if (!res.data.warn && !res.data.err) {
      //массив объектов со словами
      const wordArray = res.data.words;
      //делаю из него объект
      const words = {};
      for (const object of wordArray) {
        words[Object.keys(object)[0]] = Object.values(object)[0];
      }
      dispatch(setWords(words));
      dispatch(setIsSearching(true));
    } else {
      res.data.warn ?
        dispatch(setServerError(res.data.warn)) :
        dispatch(setServerError("На сервере произошла ошибка!"));
    }
  } catch (e) {
    dispatch(setServerError(e.message));
  }

  dispatch(toggleIsProcessing(false));
};

export const searchRusWord = (data) => async (dispatch) => {
  dispatch(toggleIsProcessing(true));
  try {
    const res = await tablePageAPI.searchRusWord(data);

    if (!res.data.warn && !res.data.err) {
      //массив объектов со словами
      const wordArray = res.data.words;
      //делаю из него объект
      const words = {};
      for (const object of wordArray) {
        words[Object.keys(object)[0]] = Object.values(object)[0];
      }
      dispatch(setWords(words));
      dispatch(setIsSearching(true));
    } else {
      res.data.warn ?
        dispatch(setServerError(res.data.warn)) :
        dispatch(setServerError("На сервере произошла ошибка!"));
    }
  } catch (e) {
    dispatch(setServerError(e.message));
  }

  dispatch(toggleIsProcessing(false));
};