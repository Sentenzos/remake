import React from "react";
import {NavLink, Route} from "react-router-dom";
import "./Header.scss"
import WordSearch from "./WordSearch";
import {clearSelectedWords, setBaseToTransferTo, setMode, setSelectedWord} from "../../store/reducers/tablePageReducer";


function Header(props) {
  return (
    <header className="header">
      <div className="header-menu">
        <div className="header-menu__left">
          <NavLink to="/" className="header-menu__item">
            Home
          </NavLink>
          <NavLink to="/cards" className="header-menu__item">
            Cards
          </NavLink>
          <NavLink to="/tables" className="header-menu__item">
            Word List
          </NavLink>
        </div>
        <div className="header-menu__right">
          <div className="header-menu__feature-container">
            <div className="header-menu__feature">
              <Route path="/cards" render={() => <div>SKANDIY</div>}/>
              <Route path="/tables" render={() => <WordSearch
                searchEngWord={props.searchEngWord}
                searchRusWord={props.searchRusWord}
                setMode={props.setMode}
                clearSelectedWords={props.clearSelectedWords}
                setBaseToTransferTo={props.setBaseToTransferTo}
                setSelectedWord={props.setSelectedWord}
                getBase={props.getBase}
                currentBaseName={props.currentBaseName}
                isSearching={props.isSearching}
              />}
              />
            </div>
            <span className="header-menu__delimiter"/>
          </div>
        </div>
      </div>
    </header>
  )
}


export default Header;