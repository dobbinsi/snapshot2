import React, { useState } from "react";
import "./App.css";
import BigNumbers from "./components/BigNumbers";
import LeaderboardSpaces from "./components/LeaderboardSpaces";
import LeaderboardUsers from "./components/LeaderboardUsers";
import TrendsProp from "./components/TrendsProp";
import TrendsVote from "./components/TrendsVote";
import Breakdown from "./components/Breakdown";
import snapjawn from "./logos/snapshot.svg";
import { motion } from "framer-motion";

function App() {
  const [allState, setAllState] = useState({
    checkedA: false,
  });
  const [oneState, setOneState] = useState(false);

  const allHandler = (e) => {
    setAllState({ ...allState, [e.target.name]: e.target.checked });
    setOneState(!oneState);
  };

  return (
    <div className="wrapper">
      <div className="header-main">
        <div className="logo">
          <a href="https://snapshot.org/#/">
            {" "}
            <motion.img
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              src={snapjawn}
              className="snapshot-logo"
              alt="snapshot"
            />{" "}
          </a>
          <h1>Snapshot Analytics</h1>
        </div>
        <div className="txt-main"></div>
      </div>
      {oneState ? (
        <Breakdown />
      ) : (
        <>
          <BigNumbers />
          <LeaderboardSpaces />
          <LeaderboardUsers />
          <TrendsProp />
          <TrendsVote />
        </>
      )}
    </div>
  );
}

export default App;
