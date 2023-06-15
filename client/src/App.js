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
  const [oneState, setOneState] = useState(false);

  return (
    <div className="wrapper">
      <div className="header-main">
        <div className="logo">
          <a
            href="https://snapshot.org/#/"
            target="_blank"
            rel="noopener noreferrer"
          >
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
        <div className="txt-main">
          <h3
            className={`tab ${!oneState ? "active" : ""}`}
            onClick={() => setOneState(false)}
          >
            Macro Trends
          </h3>
          <span className="tab-divider">|</span>
          <h3
            className={`tab ${oneState ? "active" : ""}`}
            onClick={() => setOneState(true)}
          >
            Search Spaces
          </h3>
        </div>
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
