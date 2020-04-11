import React from "react";
import "./TablePage.scss"
import WordList from "./WordList";
import AddWordForm from "./AddWordForm";
import WordsBases from "./WordBases";


const arr = [
  "common",
  "learned",
  "repeat",
  "forgiven",
  "something",
  "just",
  "name",
  "eleven",
  "symbols",
];

function TablePage(props) {
  return (
    <div className="tables-page">
      <div className="table-page__content">
        <WordList bases={arr}/>
        <div className="list-control">
          <div className="add-word_wrapper">
            <AddWordForm/>
          </div>
            <WordsBases bases={arr}/>
        </div>
      </div>
    </div>
  )
}


export default TablePage;