import React from "react";
import "./TablesPage.scss"

const obj = {
  "abomination": "мерзость",
  "absorb": "поглощать",
  "abundance": "изобилие",
  "accelerate": "ускорять",
  "accomplice": "соучастник",
  "accomplish": "выполнять",
  "accustom": "приучать",
  "accustomedaaaaaaaaa": "привыкший",
  "ache": "болеть, ныть",
  "acrid": "едкий, резкий",
  "adequate": "адекватный",
  "adjective": "прилагательное",
  "admission": "вход, прием, признание",
  "admit": "признавать",
  "adopt": "принимать",
  "adore": "обожать",
  "affect": "влиять",
  "affectionate": "любящий",
};


function WordsList(props) {
  return (
    <table className="words-list">
      <thead className="words-list__head">
      <tr className="words-list__tr">
        <td className="words-list__left-column">COMMON :</td>
        <td className="words-list__right-column">3341</td>
      </tr>
      </thead>
      <tbody className="words-list__body">
      {
        Object.entries(obj).map(item => {
          const [key, value] = item;
          return (
            <tr className="words-list__tr">
              <td className="words-list__left-column">{key}</td>
              <td className="words-list__right-column">{value}</td>
            </tr>
          )
        })
      }
      </tbody>
    </table>
  )
}


export default WordsList;