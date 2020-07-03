import axios from "axios";


export const tablePageAPI = {
  getAllBasesNames: () => {
    return axios.get('/getAllBasesNames');
  },
  getInitBase: () => {
    return axios.get('/getInitBaseForTable');
  },
  getBase: (baseName) => {
    return axios.put('/getDirectBase', {baseName});
  },
  changeEngWord: (wordData) => {
    return axios.put('/changeEngWord', wordData);
  },
  changeRusWord: (wordData) => {
    return axios.put('/changeRusWord', wordData);
  },
  addNewBase: (baseName) => {
    return axios.post('/newBaseName', {baseName});
  },
  deleteBase: (baseName) => {
    return axios.delete('/deleteBase', {data: {baseName}});
  },
  addWord: (wordData) => {
    return axios.put('/addNewWord', wordData);
  },
  addWordConfirm: (wordData) => {
    return axios.put('/addNewWordAccept', wordData);
  },
  transferWords: (wordData) => {
    return axios.put('/transferWordsFromBase', wordData);
  },
  deleteWords: (wordData) => {
    return axios.delete('/deleteWordsFromBase', {data: wordData})
  },
  searchEngWord: ({baseName, word}) => {
    return axios.get(`/getEngWord/${baseName}/${word}`)
  },
  searchRusWord: ({baseName, word}) => {
    return axios.get(`/getRusWord/${baseName}/${word}`)
  },
};


export const cardsPageAPI = {
  getAllBasesNames: () => {
    return axios.get('/getBasesNames');
  },
  getInitBase: () => {
    return axios.get('/getBase');
  },
  getBase: (baseName) => {
    return axios.put('/queryAnotherBase', {baseName});
  },
  repeatTransfer: (word, baseName) => {
    return axios.put('/repeatTransfer', {word, selected: baseName});
  },
  learnedTransfer: (word, baseName) => {
    return axios.put('/learnedTransfer', {word, selected: baseName});
  },
};


export const homePageAPI = {
  login: ({login, password}) => {
    return axios.post('/login', {name: login, pass: password});
  },
};
