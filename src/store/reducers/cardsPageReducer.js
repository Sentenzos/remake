import {setServerError, toggleIsProcessing, toggleIsInitializing} from "./mainReducer";
import {cardsPageAPI} from "../../API/API";

const SET_WORDS = "cardsPageReducer/SET_WORDS";
const SET_BASE_NAME = "cardsPageReducer/SET_BASE_NAME";
const SET_ALL_BASES_NAMES = "cardsPageReducer/SET_ALL_BASES_NAMES ";
const SET_RANDOM_WORD = "cardsPageReducer/SET_RANDOM_WORD";
const TOGGLE_WORD_STAGE = "cardsPageReducer/TOGGLE_WORD_STAGE";


const initialState = {
  currentBaseName: "",
  words: {},
  allBases: ['common', 'repeat', 'learned'],
  //массив вида [word, перевод]
  randomWord: [],
  wordStage: "eng"
};


export const cardsPageReducer = (state = initialState, action) => {
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
        allBases: ['common', ...action.names]
      };

    case SET_RANDOM_WORD:
      return {
        ...state,
        randomWord: [...action.word]
      };

    case TOGGLE_WORD_STAGE:
      return {
        ...state,
        wordStage: state.wordStage === "eng" ? "rus" : "eng"
      };

    default:
      return state
  }
};


export const setWords = (words) => ({type: SET_WORDS, words});
export const setBaseName = (baseName) => ({type: SET_BASE_NAME, baseName});
export const setAllBasesNames = (names) => ({type: SET_ALL_BASES_NAMES, names});
export const setRandomWord = (word) => ({type: SET_RANDOM_WORD, word});
export const toggleWordStage = () =>({type: TOGGLE_WORD_STAGE});


export const getAllBasesNames = () => async (dispatch) => {
  dispatch(toggleIsProcessing(true));

  try {
    //Должен прийти объект, чьи ключи являются именами баз, а значения равны пустой строке.
    //У него так же может быть ключ selectedBase, значением которого является имя последней выбранной базы.
    const res = await cardsPageAPI.getAllBasesNames();
    if (!res.data.warn && !res.data.err) {
      dispatch(setAllBasesNames([...Object.keys(res.data.names)
        .filter(b => b !== "selectedBase")]));
      if (res.data.names.selectedBase) {
        dispatch(setBaseName(res.data.names.selectedBase));
      } else {
        dispatch(setBaseName("common"));
      }
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
    const res = await cardsPageAPI.getInitBase();

    if (!res.data.warn && !res.data.err) {
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