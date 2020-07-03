import React, {useEffect} from "react";
import "./CardsPage.scss"
import ToggleButton from "../../common/components/ToggleButton/ToggleButton";
import CustomSelect from "../../common/components/CustomSelect/CustomSelect";
import {CSSTransition} from "react-transition-group";
import CardsPage from "./CardsPage";
import {connect} from "react-redux";
import {getAllBasesNames, getInitBase, setRandomWord, toggleWordStage, changeBase, getOtherBase,
  toggleMode, resetWordData, repeatTransfer, learnedTransfer} from "../../store/reducers/cardsPageReducer";
import {homePageAPI} from "../../API/API";


function CardsPageContainer(props) {

  useEffect(() => {
    props.resetWordData();
    props.getAllBasesNames();
    props.getInitBase();

  }, []);

  return (
    <CardsPage {...props}/>
  )
}

const mapStateToProps = (state) => ({
  serverError: state.main.serverError,
  allBases: state.cardsPage.allBases,
  currentBaseName: state.cardsPage.currentBaseName,
  words: state.cardsPage.words,
  randomWord: state.cardsPage.randomWord,
  wordStage: state.cardsPage.wordStage,
  isProcessing: state.main.isProcessing,
  mode: state.cardsPage.mode,
  isTransferring: state.cardsPage.isTransferring
});

const mapDispatchToProps = {
  getAllBasesNames,
  getInitBase,
  setRandomWord,
  toggleWordStage,
  changeBase,
  getOtherBase,
  toggleMode,
  resetWordData,
  repeatTransfer,
  learnedTransfer
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsPageContainer);
