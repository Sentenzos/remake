import {tablePageAPI} from "../../API/API";

const SET_WORDS = "tablePageReducer/SET_WORDS";
const SET_BASE_NAME = "tablePageReducer/SET_BASE_NAME";
const SET_ALL_BASES_NAMES = "tablePageReducer/SET_ALL_BASES_NAMES ";
const ADD_SELECTED_WORD = "tablePageReducer/ADD_SELECTED_WORD";
const CLEAR_SELECTED_WORDS = "tablePageReducer/CLEAR_SELECTED_WORDS";
const SET_BASE_TO_TRANSFER_TO = "tablePageReducer/SET_BASE_TO_TRANSFER_TO";
const SET_SELECTED_WORD = "tablePageReducer/SET_SELECTED_WORD";
const SET_SORTING_METHOD = "tablePageReducer/SET_SORTING_METHOD";
const TOGGLE_IS_PROCESSING =  "tablePageReducer/IS_PROCESSING";
const SET_MODE = "tablePageReducer/SET_MODE";


const initialState = {
  currentBaseName: "",
  words: {},
  allBases: ['common', 'repeat', 'learned'],
  wordsOnPage: 18,

  isProcessing: false,
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
  selectedWords: [],
  baseToTransferTo: "",
  sortingMethod: "engAZ",
  //режим всплывающего меню (deleting, editing, transfer)
  mode: null
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

    case TOGGLE_IS_PROCESSING:
      return {
        ...state,
        isProcessing: action.state
      };

    case SET_MODE:
      return {
        ...state,
        mode: action.mode
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
export const toggleIsProcessing = (state) => ({type: TOGGLE_IS_PROCESSING, state});
export const setMode = (mode) => ({type: SET_MODE, mode});



export const getAllBasesNames = () => async (dispatch) => {
  try {
    const res = await tablePageAPI.getAllBasesNames();

    if (res.statusText === "OK") {
      dispatch(setAllBasesNames([...res.data.names]));
    } else {
      console.log("ERROR")
    }
  } catch (e) {
    console.log(e);
  }
};

//при входе на страницу получает последнюю выбранную пользователем базу слов
export const getInitBase = () => async (dispatch) => {
  try {
    const res = await tablePageAPI.getInitBase();

    if (!res.data.warn && !res.data.err) {
      dispatch(setBaseName(res.data.baseName));
      dispatch(setWords(res.data.words));
    } else {
      res.data.warn ?
        console.log(res.data.warn) :
        console.log("На сервере произошла ошибка!");
    }
  } catch (e) {
    console.log(e);
  }
};

export const getBase = (baseName) => async (dispatch) => {
  try {
    dispatch(toggleIsProcessing(true));
    const res = await tablePageAPI.getBase(baseName);

    if (!res.data.warn && !res.data.err) {
      dispatch(setBaseName(res.data.baseName));
      dispatch(setWords(res.data.words));
    } else {
      res.data.warn ?
        console.log(res.data.warn) :
        console.log("На сервере произошла ошибка!");
    }
    dispatch(toggleIsProcessing(false));
  } catch (e) {
    console.log(e);
  }
};

export const addNewBase = (baseName) => async (dispatch) => {
  try {
    dispatch(toggleIsProcessing(true));
    const res = await tablePageAPI.addNewBase(baseName);

    if (!res.data.warn && !res.data.err) {
      dispatch(getAllBasesNames());
    } else {
      res.data.warn ?
        console.log(res.data.warn) :
        console.log("На сервере произошла ошибка!");
    }
    dispatch(toggleIsProcessing(false));
  } catch (e) {
    console.log(e);
  }
};

export const deleteBase = (baseName) => async (dispatch) => {
  try {
    dispatch(toggleIsProcessing(true));
    const res = await tablePageAPI.deleteBase(baseName);

    if (!res.data.warn && !res.data.err) {
      dispatch(getAllBasesNames());
    } else {
      res.data.warn ?
        console.log(res.data.warn) :
        console.log("На сервере произошла ошибка!");
    }
    dispatch(toggleIsProcessing(false));
  } catch (e) {
    console.log(e);
  }
};

export const changeWord = () => async (dispatch, getState) => {
  try {
    dispatch(toggleIsProcessing(true));

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
      //Так что нужно произвести изменения в state
      if (key === 0) {
        //если слово на английском
        const thisValue = words[engWord];
        delete words[engWord];
        words[value] = thisValue;
      } else if (key === 1) {
        //если слово на русском
        words[engWord] = value
      }
      dispatch(setWords({
        ...words
      }));

    } else {
      res.data.warn ?
        console.log(res.data.warn) :
        console.log("На сервере произошла ошибка!");
    }
    dispatch(toggleIsProcessing(false));
  } catch (e) {
    console.log(e);
  }
};
