import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTimer, loadTab } from "../store/mainReducer";
import musicfile1 from "../resources/music/musicsample.mp3";
import musicfile2 from "../resources/music/musicsample2.mp3";
import tab1 from "../resources/tabs/tab1";
import tab2 from "../resources/tabs/tab2";

const AudioComponent = ({ songtitle }) => {
  const [titleCache, setCache] = useState("");
  const playing = useSelector((state) => state.main.playing);

  const dispatch = useDispatch();
  const ref = useRef();
  const musicMap = {
    song1: {
      audio: musicfile1,
      tempo: 0.5,
      tab: tab1,
    },
    song2: {
      audio: musicfile2,
      tempo: 1,
      tab: tab2,
    },
  };
  useEffect(() => {
    // Dispatch time update
    ref.current.addEventListener("timeupdate", (e) =>
      dispatch(updateTimer(e.target.currentTime))
    );
    if (titleCache !== songtitle) {
      setCache(songtitle);
      dispatch(
        loadTab({
          tab: musicMap[songtitle].tab,
          tempo: musicMap[songtitle].tempo,
        })
      );
    }

    if (playing) ref.current.play();
    else ref.current.pause();
    return () => {
      ref.current.removeEventListener("timeupdate", () => {});
    };
  }, [songtitle, playing]);
  return (
    <audio ref={ref} preload="auto" src={musicMap[songtitle].audio} />
  );
};

export default AudioComponent;
