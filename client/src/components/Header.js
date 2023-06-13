import React, { useState, useEffect } from "react";
import snapjawn from "../logos/snapshot.svg";
import { motion } from "framer-motion";

const Header = () => {
  const [allState, setAllState] = useState(true);
  const [oneState, setOneState] = useState(false);
  const [active1, setActive1] = useState(true);
  const [active2, setActive2] = useState(false);

  const allHandler = () => {
    setOneState(false);
    setAllState(true);
    setActive1(true);
    setActive2(false);
  };

  const oneHandler = () => {
    setAllState(false);
    setOneState(true);
    setActive2(true);
    setActive1(false);
  };

  return (
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
      <div className="txt-main">
        <button
          style={{ color: active1 ? "#418ade" : "#ffffff" }}
          onClick={allHandler}
        >
          All Spaces
        </button>
        <button
          style={{ color: active2 ? "#418ade" : "#ffffff" }}
          onClick={oneHandler}
        >
          Individual
        </button>
      </div>
    </div>
  );
};

export default Header;
