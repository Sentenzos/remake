import React, {useState, useEffect} from 'react';
import styles from "./CustomSelect.module.css";
import {ReactComponent as Arrow} from "./assets/arrow-bottom.svg";
import {Transition} from "react-transition-group";




//Тут каждый элемент по завершении своей анимации вызывает коллбек функцию меняющую стейт,
//в результате чего срабатывает запуск анимации следующего элемента
const CustomSelect = (props) => {

  const {options} = props;
  const [selected, setSelected] = useState(props.selected || options[0]);

  useEffect(() => {
    setSelected(props.selected);
  }, [props.selected]);

  //служит для обозначения конца анимации раскрытия
  const [onEntered, setOnEntered] = useState(false);

  //вся анимация начинается с клика по стрелке
  const [arrowState, setArrowState] = useState(false);

  //после того как стрелка повернулась, происходит событие onEntered
  //которое устанавливает setSelectState(true)
  //и запускается анимация раскрытия select'а
  const [selectState, setSelectState] = useState(false);
  const width = "7rem";

  //после того как select полностью раскрылся происходит событие
  //onEntered которое устанавливает setOptionsState(true)
  //и запускается анимация раскрытия options
  //теперь элемент полностью отыграл анимацию раскрытия и
  //устанавливается setOnEntered(true)
  //теперь при клике по select начнет проигрываться анимация закрытия
  //производящая те же операции в обратном порядке
  const [optionsState, setOptionsState] = useState(false);
  const height = (options?.length - 1) * 1.6 + "rem";


  //если не пришел массив с опциями, то не отображать select
  if (!options) return null;

  const startAnimation = () => {
    setArrowState(true);
  };

  const endAnimation = () => {
    setArrowState(false);
    setOnEntered(false);
  };

  const showSelect = () => {
    setSelectState(true);
  };

  const hideSelect = () => {
    setSelectState(false);
  };

  const showOptions = () => {
    //setTimeout так как react-css-transition неверно синхронизирует timeout
        setTimeout(() => {
          setOptionsState(true);
          setOnEntered(true);
        }, 100)
  };

  const hideOptions = () => {
      setOptionsState(false);
  };


  const optionControl = (e) => {
    if(!props.onClick) return;
    props.onClick(e.target.innerHTML);
  };


  const optionsDefStyles = {
    transition: `height 300ms, opacity 300ms, margin-top 300ms`
  };

  const optionsTransStyles = {
    entering: {
      height: 0,
      marginTop: 0,
      opacity: 0
    },
    entered: {
      height: height,
      marginTop: "0.3rem",
      opacity: 1
    },
    exiting: {
      height: 0,
      opacity: 0
    },
    exited: {
      height: 0,
      opacity: 0
    }
  };


  const selectDefStyles = {
    width: 0,
    transition: `width 300ms, paddingLeft 300ms`,
  };

  const selectTransStyles = {
    entering: {
      width: 0,
      paddingLeft: 0
    },
    entered: {
      width: width,
      paddingLeft: "0.5rem"
    },
    exiting: {
      width: 0,
      paddingLeft: 0
    },
    exited: {
      width: 0,
      paddingLeft: 0
    }
  };



  const arrowDefStyles = {
    transition: `transform 200ms`,
    transform: "rotate(90deg)"
  };

  const arrowTransStyles = {
    entering: {
      transform: "rotate(90deg)",
    },
    entered: {
      transform: "rotate(0deg)",
    },
    exiting: {
      transform: "rotate(90deg)",
    },
    exited: {
      transform: "rotate(90deg)",
    }
  };


  return (
    //если onEntered=true, то при клике по select запустится анимация закрытия
    <div className={`${styles.select} ${props.className}`} onClick={onEntered ? hideOptions : null}>
      <div className={styles.button}>
        <Transition in={selectState} timeout={300}
                    onEntered={showOptions}
                    onExited={endAnimation}
        >
          {
            state => {
              return (
                <div className={styles.chosenOption} style={{
                  ...selectDefStyles,
                  ...selectTransStyles[state]
                }}>
                  {selected}
                </div>
             )
           }
          }
        </Transition>
        <div className={styles.arrowContainer} onClick={startAnimation}>
          <Transition in={arrowState} timeout={200} onEntered={showSelect}>
            {
              state => {
                return (
                  <Arrow className={styles.arrow} style={{
                    ...arrowDefStyles,
                    ...arrowTransStyles[state]
                  }}/>
                )
              }
            }
          </Transition>
        </div>
      </div>

      <Transition in={optionsState} timeout={300} unmountOnExit={true} onExited={hideSelect}>
        {
          state => {
            return (
              <div className={styles.options} style={{
                ...optionsDefStyles,
                ...optionsTransStyles[state]}}>
                {
                  options.map((opt, i) => {
                    return (
                      <div key={i} className={styles.option + " " + (opt === selected && styles.selected)}
                           onClick={optionControl}>
                        {opt}
                      </div>
                    )
                  })
                }
              </div>
            )
          }
        }
      </Transition>
    </div>
  )
};

export default CustomSelect