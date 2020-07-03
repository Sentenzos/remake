import React, {useEffect, useRef, useState} from "react";
import particleAnimation from "./js/particleAnimation";
import {ReactComponent as Arrow} from "../../assets/images/arrowDown.svg";
import './HomePage.scss';


const HomePage = (props) => {
  const [windowHeight, setWindowHeight] = useState(null);
  const [arrowDirection, toggleArrowDirection] = useState('down');

  const originalTextArray = `Привет. На этом сайте ты можешь учить английские слова методом карточек. Это крайне эффективный способ увеличить свой словарный запас. Всего 30 минут в день, и за неделю ты будешь знать как минимум на 50 слов больше. В этом тебе поможет гибкий и простой функционал сайта. В базе уже находятся несколько тысяч английских слов с переводом, а так же есть возможность добавлять свои слова и перевод к ним. Все это доступно после простой регистрации.`.split(' ');

  const [wordsArray, setWordsArray] = useState(originalTextArray);
  const [wordsArrayForRender, setWordsArrayForRender] = useState([]);

  const canvasRef = useRef(null);

  useEffect(function autoScrollToTop() {
    setTimeout(() => window.scrollTo(0, 0), 500)
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    const [startAnimation, stopAnimation] =
      particleAnimation(canvasRef.current, 'encard.info');
    startAnimation();

    return () => {
      stopAnimation();
    }
  }, [])

  const scrollDown = (e) => {
    e.target.scrollIntoView(true);
    toggleArrowDirection('up');
  }

  const scrollUp = (e) => {
    window.scrollTo(0, 0)
    toggleArrowDirection('down');
  }

  useEffect(
    function alternatingLetters() {
      if (arrowDirection === "down") return;
      const wordsArrayIsEmpty = wordsArray[0] === undefined;
      if (wordsArrayIsEmpty) return;

      const nextWord = wordsArray[0];
      const remainingWords = wordsArray.slice(1);

      setTimeout(function addNewLetter() {
        setWordsArray(remainingWords);
        setWordsArrayForRender((wordsForRender) => [...wordsForRender, nextWord]);
      }, 300)
    }, [wordsArray, arrowDirection])


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
          wordsArrayForRender.map((word, index) => {
           const thereIsNextElem = wordsArrayForRender[index + 1] !== undefined;
           const itIsLastElem = index === originalTextArray.length - 1;
           const shouldDisplay = thereIsNextElem ? "display" : "";

           const addLastElem = (elem) => {
               setTimeout(() => elem?.classList.add("display"), 200);
           }

            return <span key={index} className={`introduction__letter ${shouldDisplay}`} ref={itIsLastElem ? addLastElem : null}> {word}</span>;
          })
        }
      </div>
    </div>
  )
}

export default HomePage;