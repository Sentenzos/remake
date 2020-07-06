import React from 'react';
import HomePage from "./HomePage";
import {connect} from "react-redux";


const HomePageContainer = (props) => {
  return <HomePage {...props}/>
}

const mapStateToProps = (state) => ({
  introductionText: state.homePage.introductionText
});
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)
(HomePageContainer);

