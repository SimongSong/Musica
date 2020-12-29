import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import MainView from "./components/MainView";
import { clearTimer, incrementTimer } from "./store/mainReducer";

function App() {
  const dispatch = useDispatch();
  const timer = useSelector((state) => state.main.timer);
  const score = useSelector((state) => state.main.score);

  useEffect(() => {
    var interval = setInterval(() => dispatch(incrementTimer()), 100);
    const escFunction = (event) => {
      if (event.keyCode === 81) {
        //Q pressed
        console.log("Q")
      }
      else if (event.keyCode === 87) {
        //W pressed
        console.log("W")
      }
      else if (event.keyCode === 69) {
        //E pressed
        console.log("E")
      }
      else if (event.keyCode === 82) {
        //R pressed
        console.log("R")
      }
      else if (event.keyCode === 27) {
        //Esc pressed        
        console.log("Esc")
      }
    };
    window.addEventListener("keydown", escFunction);
    return () => {
      dispatch(clearTimer());
      clearInterval(interval);
      window.removeEventListener("keydown", escFunction);
    };
  }, []);
  return (
    <div className="App">
      time {timer} score {score}
      <MainView></MainView>
    </div>
  );
}

export default App;
