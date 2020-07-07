import React, {useEffect, useMemo, useRef, useState} from "react";
import particleAnimation from "./js/particleAnimation";
import {ReactComponent as Arrow} from "../../assets/images/arrowDown.svg";
import './HomePage.scss';
import Particles from "react-particles-js";


const HomePage = (props) => {
  const [windowHeight, setWindowHeight] = useState(null);
  const [arrowDirection, toggleArrowDirection] = useState('down');
  const [imgIndex, setImgIndex] = useState(null);

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

  const allLettersAreShown = numberToShow === lettersArray.length;

  useEffect(
    function alternatingLetters() {
      if (arrowDirection === "down") return;
      if (allLettersAreShown) return;

      setTimeout(function addNewLetter() {
        setNumberToShow(numberToShow => numberToShow + 1);
      }, 0);
    }, [lettersArray, numberToShow, arrowDirection, allLettersAreShown]);


  return (
    <div className="home-page">
      <Particles className="prtcls home-page__prtcls"
                 params={{
                   "particles": {
                     "number": {
                       "value": 50
                     },
                     "size": {
                       "value": 3
                     }
                   },
                 }} />
      <div className="particle-animation__container">
        <canvas className="particle-animation" ref={canvasRef}/>
        <Arrow className={`home-page__arrow ${arrowDirection}`}
               onClick={arrowDirection === "down" ? scrollDown : scrollUp}
        />
      </div>
      <div className="home-page__introduction" style={{height: windowHeight}}>
        {
          imgIndex === null &&
          <div className="introduction-text">
            {
              lettersArray.map((letter, letterIndex) => {
                const shouldDisplay = letterIndex <= numberToShow ? "display" : "";
                return <span key={letterIndex} className={`introduction__letter ${shouldDisplay}`}>{letter}</span>;
                // return <span key={letterIndex} className={`introduction__letter display`}>{letter}</span>;
              })
            }
          </div>
        }
        <PresentationImages setImgIndex={setImgIndex}
                            imgIndex={imgIndex}
                            shouldDisplay={allLettersAreShown}
        />
      </div>
    </div>
  )
}


const PresentationImages = (props) => {
  const imgLinksArr = [
    "https://i.imgur.com/nWM54x4.png",
    "https://i.imgur.com/Trz1gl5.png"
  ]

  const stretchImage = (imgIndex) => {
    props.setImgIndex(imgIndex);
  }

  const resetImageSize = () => {
    props.setImgIndex(null);
  }

  return (
    <div className={`presentation-images-container ${props.shouldDisplay ? 'display' : ''} ${props.imgIndex === null ? '' : 'stretch'}`}>
      {
        imgLinksArr.map((imgLink, index) => {
          return <img src={imgLink}
                      key={index}
                      className={`presentation-image ${props.imgIndex === index ? 'stretch' : ''}`}
                      onClick={props.imgIndex === null ? () => stretchImage(index) : resetImageSize}/>
        })
      }
    </div>
  )
}

export default HomePage;