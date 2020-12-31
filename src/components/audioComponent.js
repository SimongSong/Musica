import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateTimer } from "../store/mainReducer";
import musicfile1 from "../resources/music/musicsample.mp3";
import musicfile2 from "../resources/music/musicsample2.mp3";

const AudioComponent = ({ songtitle, status }) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const musicMap = {
    song1: musicfile1,
    song2: musicfile2,
  };
  useEffect(() => {
    ref.current.addEventListener("timeupdate", (e) =>
      dispatch(updateTimer(e.target.currentTime))
    );

    console.log(status, ref.current.paused);

    if (status) ref.current.play();
    else ref.current.pause();
    return () => {
      ref.current.removeEventListener("timeupdate", () => {});
    };
  }, [songtitle, status]);
  return <audio ref={ref} preload="auto" src={musicMap[songtitle]} autoPlay />;
};

export default AudioComponent;
