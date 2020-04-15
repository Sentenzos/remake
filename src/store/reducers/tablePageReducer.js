import {tablePageAPI} from "../../API/API";

const SET_WORDS = "tablePageReducer/SET_WORDS";
const SET_BASE_NAME = "tablePageReducer/SET_BASE_NAME";
const SET_ALL_BASES_NAMES = "tablePageReducer/SET_ALL_BASES_NAMES ";
const ADD_SELECTED_WORD = "tablePageReducer/ADD_SELECTED_WORD";
const CLEAR_SELECTED_WORDS = "tablePageReducer/CLEAR_SELECTED_WORDS";
const SET_BASE_TO_TRANSFER_TO = "tablePageReducer/SET_BASE_TO_TRANSFER_TO";


const initialState = {
  currentBaseName: "",
  words: {},
  allBases: ['common', 'repeat', 'learned'],
  wordsOnPage: 18,

  selectedWords: [],
  baseToTransferTo: ""
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
    const res = await tablePageAPI.getBase(baseName);

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
