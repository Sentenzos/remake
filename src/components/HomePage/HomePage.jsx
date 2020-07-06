import React, {useEffect, useRef, useState, useMemo} from "react";
import particleAnimation from "./js/particleAnimation";
import {ReactComponent as Arrow} from "../../assets/images/arrowDown.svg";
import './HomePage.scss';


const HomePage = (props) => {
  const [windowHeight, setWindowHeight] = useState(null);
  const [arrowDirection, toggleArrowDirection] = useState('down');

  const lettersArray = useMemo(() => [...props.introductionText], [props.introductionText]);
  const [numberToShow, setNumberToShow] = useState(0);

  const canvasRef = useRef(null);

  useEffect(function autoScrollToTop() {
    setTimeout(() => window.scrollTo(0, 0), 500)
  }, []);

  useEffect(
    function updateWindowHeight() {
      const getWindowHeight = () => {
        const windowHeight = Math.max(window.innerHeight,
          window.innerWidth) + 'px';
        setWindowHeight(windowHeight);
      }

      getWindowHeight();
      window.addEventListener('resize', getWindowHeight);

      return () => {
        window.removeEventListener('resize', getWindowHeight);
      }
    }, []);

  useEffect(
    function particleAnimationControl() {
      const [startAnimation, stopAnimation] =
        particleAnimation(canvasRef.current, 'encard.info');
      startAnimation();

      return () => {
        stopAnimation();
      }
    }, [])

  const scrollDown = (e) => {
    let elemTopCoord = e.target.getBoundingClientRect().top;
    window.scrollTo(0, elemTopCoord);
    // e.target.scrollIntoView(true);
    toggleArrowDirection('up');
  }

  const scrollUp = (e) => {
    window.scrollTo(0, 0)
    toggleArrowDirection('down');
  }

  useEffect(
    function alternatingLetters() {
      if (arrowDirection === "down") return;
      if (numberToShow === lettersArray.length) return;

      setTimeout(function addNewLetter() {
        setNumberToShow(numberToShow => numberToShow + 1);
      }, 0);
    }, [lettersArray, numberToShow, arrowDirection])


  return (
    <div className="home-page">
      <div className="particle-animation__container">
        <canvas className="particle-animation" ref={canvasRef}/>
        <Arrow className={`home-page__arrow ${arrowDirection}`}
               onClick={arrowDirection === "down" ? scrollDown : scrollUp}
        />
      </div>
      <div className="home-page__introduction" style={{height: windowHeight}}>
        {
          lettersArray.map((letter, letterIndex) => {
            const shouldDisplay = letterIndex <= numberToShow ? "display" : "";
            return <span key={letterIndex} className={`introduction__letter ${shouldDisplay}`}>{letter}</span>;
          })
        }
      </div>
    </div>
  )
}

export default HomePage;