import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./SongSelection.css";

function SongSelection({ updateStatus }) {
console.log(updateStatus)
  return (
    <div id="SongSelection">
      <h2>Song Selection</h2>
      <div className="SongWrapper">
        <span className="Song">
          <span className="Cover"></span>
          <p className="Title">Song name 1</p>
        </span>
        <span className="Song">
          <span className="Cover"></span>
          <p className="Title">Song name 2</p>
        </span>
        <span className="Song">
          <span className="Cover"></span>
          <p className="Title">Song name 3</p>
        </span>
      </div>
      <button onClick={() => updateStatus()}>Close Menu and continue playing</button>
    </div>
  );
}

export default SongSelection;
