import React from "react";
import "./TablesPage.scss"
import WordsList from "./WordsList";
import AddWordForm from "./AddWordForm";
import WordsBases from "./WordBases";


function TablesPage(props) {
  return (
    <div className="tables-page">
      <div className="table-page__content">
        <WordsList/>
        <div className="list-control">
          <div className="add-word_wrapper">
            <AddWordForm/>
          </div>
            <WordsBases/>
        </div>
      </div>
    </div>
  )
}


export default TablesPage;