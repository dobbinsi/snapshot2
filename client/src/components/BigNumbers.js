import React, { useState, useEffect } from "react";
import { Flipside } from "@flipsidecrypto/sdk";
import ScaleLoader from "react-spinners/ScaleLoader";

const API_KEY = `${process.env.REACT_APP_API_KEY}`;

const BigNumbers = () => {
  const [activeSpaces, setActiveSpaces] = useState([]);
  const [totalProps, setTotalProps] = useState([]);
  const [uniqueVoters, setUniqueVoters] = useState([]);
  const [propAuthors, setPropAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const flipside = new Flipside(API_KEY, "https://api-v2.flipsidecrypto.xyz");

    const queryBigNumbers = {
      sql: "SELECT count(DISTINCT space_ID) AS Active_Spaces, count(DISTINCT proposal_id) AS total_proposals, count(DISTINCT proposal_author) AS proposal_authors, count(DISTINCT voter) AS unique_voters FROM ethereum.core.ez_snapshot",
      ttlMinutes: 60,
    };

    try {
      const resultBigNumbers = flipside.query
        .run(queryBigNumbers)
        .then((records) => {
          setActiveSpaces(records.rows[0][0]);
          setTotalProps(records.rows[0][1]);
          setPropAuthors(records.rows[0][2]);
          setUniqueVoters(records.rows[0][3]);
          setLoading(false);
        });
    } catch (error) {
      console.log("error in BigNumbers");
      console.log(error);
    }
  }, []);

  return (
    <div className="triple">
      {loading ? (
        <div className="loader-main">
          <ScaleLoader height={50} color={"#ffab33"} className="offset-main" />
        </div>
      ) : (
        <>
          <div className="big-numbers">
            <h1>{activeSpaces.toLocaleString()}</h1>
            <h2>Active Spaces</h2>
          </div>
          <div className="big-numbers">
            <h1>{totalProps.toLocaleString()}</h1>
            <h2>Total Proposals</h2>
          </div>
          <div className="big-numbers">
            <h1>{propAuthors.toLocaleString()}</h1>
            <h2>Proposal Authors</h2>
          </div>
          <div className="big-numbers">
            <h1>{uniqueVoters.toLocaleString()}</h1>
            <h2>Unique Voters</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default BigNumbers;
