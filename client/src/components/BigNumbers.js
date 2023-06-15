import React, { useState, useEffect } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from "axios";

const BigNumbers = () => {
  const [activeSpaces, setActiveSpaces] = useState([]);
  const [totalProps, setTotalProps] = useState([]);
  const [uniqueVoters, setUniqueVoters] = useState([]);
  const [propAuthors, setPropAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [thirtyData, setThirtyData] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.flipsidecrypto.com/api/v2/queries/8913a680-dd26-42d1-a8ff-df6890566c8e/data/latest"
      )
      .then((res) => {
        setActiveSpaces(res.data[0]["ACTIVE_SPACES"]);
        setTotalProps(res.data[0]["TOTAL_PROPOSALS"]);
        setPropAuthors(res.data[0]["PROPOSAL_AUTHORS"]);
        setUniqueVoters(res.data[0]["UNIQUE_VOTERS"]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
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
