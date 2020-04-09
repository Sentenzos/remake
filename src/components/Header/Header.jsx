import React from "react";
import {NavLink} from "react-router-dom";
import "./Header.scss"

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
            <div className="header-menu__feature">SKANDIY</div>
            <span className="header-menu__delimiter"/>
          </div>
        </div>
      </div>
    </header>
  )
}


export default Header;