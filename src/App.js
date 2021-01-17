import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import MainView from "./components/MainView";
import {
  clearTimer,
  incrementTimer,
  updatePlayingStatus,
} from "./store/mainReducer";
import AudioComponent from "./components/audioComponent";
import SongSelection from "./components/SongSelection";

function App() {
  const [song, setSong] = useState("song1");
  const [menuOpen, setMenuOpen] = useState(true);

  const dispatch = useDispatch();
  const timer = useSelector((state) => state.main.timer);
  const score = useSelector((state) => state.main.tempo);

  const playing = useSelector((state) => state.main.playing);


  function updatePlaying() {
    setMenuOpen(!menuOpen)
    dispatch(updatePlayingStatus(!playing));
  }

  return (
    <div className="App">
      <div className="TempHolder">
        <AudioComponent songtitle={song}></AudioComponent>
        <button onClick={() => updatePlaying()}>Play/Pause</button>
        <button onClick={() => setSong("song1")}>test load song 1</button>
        <button onClick={() => setSong("song2")}>test load song 2</button>
        time {timer} score {score} playing {playing ? "playing" : "paused"}
      </div>
      {menuOpen && <SongSelection updateStatus={updatePlaying}></SongSelection>}
      <MainView></MainView>
    </div>
  );
}

export default App;
