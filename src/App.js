import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import MainView from "./components/MainView";
import { clearTimer, incrementTimer } from "./store/mainReducer";
import { escFunction } from "./gameManager/inputUtils";
import AudioComponent from "./components/audioComponent";



function App() {
  const [song, setSong] = useState("song1");
  const [playing, setPlaying] = useState(true);
  const timer = useSelector((state) => state.main.timer);
  const score = useSelector((state) => state.main.score);


  useEffect(() => {
    window.addEventListener("keydown", escFunction);
    return () => {
      window.removeEventListener("keydown", escFunction);
    };
  }, []);


  return (
    <div className="App">
      <AudioComponent songtitle={song} status={playing}></AudioComponent>
      <button onClick={() => setPlaying(!playing)}>test</button>
      <button onClick={() => setSong("song1")}>test load song 1</button>
      <button onClick={() => setSong("song2")}>test load song 2</button>
      
      time {timer} score {score}
      <MainView></MainView>
    </div>
  );
}

export default App;
