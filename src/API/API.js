import axios from "axios";

//сервер написан давно и на коленке, по этому API страшный
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
  }
};