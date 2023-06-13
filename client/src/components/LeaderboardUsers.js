import React, { useState, useEffect } from "react";
import { Flipside } from "@flipsidecrypto/sdk";

const API_KEY = `${process.env.REACT_APP_API_KEY}`;

const LeaderboardUsers = () => {
  const [sevenData, setSevenData] = useState([]);
  const [thirtyData, setThirtyData] = useState([]);
  const [ninetyData, setNinetyData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [sevenDataProps, setSevenDataProps] = useState([]);
  const [thirtyDataProps, setThirtyDataProps] = useState([]);
  const [ninetyDataProps, setNinetyDataProps] = useState([]);
  const [yearDataProps, setYearDataProps] = useState([]);
  const [sevenState, setSevenState] = useState(false);
  const [thirtyState, setThirtyState] = useState(true);
  const [ninetyState, setNinetyState] = useState(false);
  const [yearState, setYearState] = useState(false);
  const [voterSort, setVoterSort] = useState(true);
  const [propSort, setPropSort] = useState(false);
  const [loading, setLoading] = useState(true);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(true);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);

  const sevenHandler = () => {
    setNinetyState(false);
    setThirtyState(false);
    setYearState(false);
    setSevenState(true);
    setActive1(true);
    setActive2(false);
    setActive3(false);
    setActive4(false);
  };

  const thirtyHandler = () => {
    setSevenState(false);
    setNinetyState(false);
    setYearState(false);
    setThirtyState(true);
    setActive2(true);
    setActive1(false);
    setActive3(false);
    setActive4(false);
  };

  const ninetyHandler = () => {
    setSevenState(false);
    setThirtyState(false);
    setYearState(false);
    setNinetyState(true);
    setActive3(true);
    setActive1(false);
    setActive2(false);
    setActive4(false);
  };

  const yearHandler = () => {
    setSevenState(false);
    setThirtyState(false);
    setNinetyState(false);
    setYearState(true);
    setActive4(true);
    setActive2(false);
    setActive3(false);
    setActive1(false);
  };

  const propSortHandler = () => {
    setVoterSort(false);
    setPropSort(true);
  };

  const voterSortHandler = () => {
    setPropSort(false);
    setVoterSort(true);
  };

  useEffect(() => {
    const flipside = new Flipside(API_KEY, "https://api-v2.flipsidecrypto.xyz");

    const querySeven = {
      sql: "SELECT voter, count(DISTINCT space_id) AS spaces, count(DISTINCT proposal_id) AS proposals FROM ethereum.core.ez_snapshot WHERE proposal_start_time >= CURRENT_DATE - 7 GROUP BY voter ORDER BY proposals DESC LIMIT 10",
      ttlMinutes: 60,
    };

    try {
      const resultSeven = flipside.query.run(querySeven).then((records) => {
        setSevenData(records.rows);
        setLoading(false);
      });
    } catch (error) {
      console.log("error in SEVENJAWN2");
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const flipside = new Flipside(API_KEY, "https://api-v2.flipsidecrypto.xyz");

    const queryThirty = {
      sql: "SELECT voter, count(DISTINCT space_id) AS spaces, count(DISTINCT proposal_id) AS proposals FROM ethereum.core.ez_snapshot WHERE proposal_start_time >= CURRENT_DATE - 30 GROUP BY voter ORDER BY proposals DESC LIMIT 10",
      ttlMinutes: 60,
    };

    try {
      const resultThirty = flipside.query.run(queryThirty).then((records) => {
        setThirtyData(records.rows);
      });
    } catch (error) {
      console.log("error in THIRTYJAWN2");
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const flipside = new Flipside(API_KEY, "https://api-v2.flipsidecrypto.xyz");

    const queryNinety = {
      sql: "SELECT voter, count(DISTINCT space_id) AS spaces, count(DISTINCT proposal_id) AS proposals FROM ethereum.core.ez_snapshot WHERE proposal_start_time >= CURRENT_DATE - 90 GROUP BY voter ORDER BY proposals DESC LIMIT 10",
      ttlMinutes: 60,
    };

    try {
      const resultNinety = flipside.query.run(queryNinety).then((records) => {
        setNinetyData(records.rows);
      });
    } catch (error) {
      console.log("error in NINETYJAWN2");
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const flipside = new Flipside(API_KEY, "https://api-v2.flipsidecrypto.xyz");

    const queryYear = {
      sql: "SELECT voter, count(DISTINCT space_id) AS spaces, count(DISTINCT proposal_id) AS proposals FROM ethereum.core.ez_snapshot WHERE proposal_start_time >= CURRENT_DATE - 365 GROUP BY voter ORDER BY proposals DESC LIMIT 10",
      ttlMinutes: 60,
    };

    try {
      const resultYear = flipside.query.run(queryYear).then((records) => {
        setYearData(records.rows);
      });
    } catch (error) {
      console.log("error in YEARJAWN1");
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const flipside = new Flipside(API_KEY, "https://api-v2.flipsidecrypto.xyz");

    const querySevenProps = {
      sql: "SELECT voter, count(DISTINCT space_id) AS spaces, count(DISTINCT proposal_id) AS proposals FROM ethereum.core.ez_snapshot WHERE proposal_start_time >= CURRENT_DATE - 7 GROUP BY voter ORDER BY spaces DESC LIMIT 10",
      ttlMinutes: 60,
    };

    try {
      const resultSevenProps = flipside.query
        .run(querySevenProps)
        .then((records) => {
          setSevenDataProps(records.rows);
        });
    } catch (error) {
      console.log("error in SEVENJAWN");
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const flipside = new Flipside(API_KEY, "https://api-v2.flipsidecrypto.xyz");

    const queryThirtyProps = {
      sql: "SELECT voter, count(DISTINCT space_id) AS spaces, count(DISTINCT proposal_id) AS proposals FROM ethereum.core.ez_snapshot WHERE proposal_start_time >= CURRENT_DATE - 30 GROUP BY voter ORDER BY spaces DESC LIMIT 10",
      ttlMinutes: 60,
    };

    try {
      const resultThirtyProps = flipside.query
        .run(queryThirtyProps)
        .then((records) => {
          setThirtyDataProps(records.rows);
        });
    } catch (error) {
      console.log("error in THIRTYJAWN");
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const flipside = new Flipside(API_KEY, "https://api-v2.flipsidecrypto.xyz");

    const queryNinetyProps = {
      sql: "SELECT voter, count(DISTINCT space_id) AS spaces, count(DISTINCT proposal_id) AS proposals FROM ethereum.core.ez_snapshot WHERE proposal_start_time >= CURRENT_DATE - 90 GROUP BY voter ORDER BY spaces DESC LIMIT 10",
      ttlMinutes: 60,
    };

    try {
      const resultNinetyProps = flipside.query
        .run(queryNinetyProps)
        .then((records) => {
          setNinetyDataProps(records.rows);
        });
    } catch (error) {
      console.log("error in NINETYJAWN");
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const flipside = new Flipside(API_KEY, "https://api-v2.flipsidecrypto.xyz");

    const queryYearProps = {
      sql: "SELECT voter, count(DISTINCT space_id) AS spaces, count(DISTINCT proposal_id) AS proposals FROM ethereum.core.ez_snapshot WHERE proposal_start_time >= CURRENT_DATE - 365 GROUP BY voter ORDER BY spaces DESC LIMIT 10",
      ttlMinutes: 60,
    };

    try {
      const resultYearProps = flipside.query
        .run(queryYearProps)
        .then((records) => {
          setYearDataProps(records.rows);
        });
    } catch (error) {
      console.log("error in YEARJAWN");
      console.log(error);
    }
  }, []);

  return (
    <div className="single-main">
      {loading ? (
        <div className="loader-blank"></div>
      ) : (
        <>
          <div className="title-date">
            <div className="table-title">
              <h1>Leaderboard: Most Active Voters</h1>
            </div>
            <div className="date-toggle">
              <button
                style={{ color: active1 ? "#418ade" : "#ffffff" }}
                onClick={sevenHandler}
              >
                7d
              </button>
              <button
                style={{ color: active2 ? "#418ade" : "#ffffff" }}
                onClick={thirtyHandler}
              >
                30d
              </button>
              <button
                style={{ color: active3 ? "#418ade" : "#ffffff" }}
                onClick={ninetyHandler}
              >
                90d
              </button>
              <button
                style={{ color: active4 ? "#418ade" : "#ffffff" }}
                onClick={yearHandler}
              >
                365d
              </button>
            </div>
          </div>
          {voterSort ? (
            <div className="table-wrapper">
              <div className="table-scroll">
                <table className="table-main-mav">
                  <thead>
                    <tr>
                      <th className="first-column">Wallet Address</th>
                      <th className="sorter" onClick={propSortHandler}>
                        Unique Spaces
                      </th>
                      <th className="sorter" onClick={voterSortHandler}>
                        Proposals Voted
                      </th>
                    </tr>
                  </thead>
                  {sevenState && (
                    <tbody>
                      {sevenData.map((space, index) => (
                        <tr>
                          <td>
                            <a
                              href={"https://etherscan.io/address/".concat(
                                space[0]
                              )}
                              className="table-links"
                            >
                              {space[0]}
                            </a>
                          </td>
                          <td className="validator-voters">{space[1]}</td>
                          <td className="validator-shares">
                            {space[2].toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                  {thirtyState && (
                    <tbody>
                      {thirtyData.map((space, index) => (
                        <tr>
                          <td>
                            <a
                              href={"https://etherscan.io/address/".concat(
                                space[0]
                              )}
                              className="table-links"
                            >
                              {space[0]}
                            </a>
                          </td>
                          <td className="validator-voters">{space[1]}</td>
                          <td className="validator-shares">
                            {space[2].toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                  {ninetyState && (
                    <tbody>
                      {ninetyData.map((space, index) => (
                        <tr>
                          <td>
                            <a
                              href={"https://etherscan.io/address/".concat(
                                space[0]
                              )}
                              className="table-links"
                            >
                              {space[0]}
                            </a>
                          </td>
                          <td className="validator-voters">{space[1]}</td>
                          <td className="validator-shares">
                            {space[2].toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                  {yearState && (
                    <tbody>
                      {yearData.map((space, index) => (
                        <tr>
                          <td>
                            <a
                              href={"https://etherscan.io/address/".concat(
                                space[0]
                              )}
                              className="table-links"
                            >
                              {space[0]}
                            </a>
                          </td>
                          <td className="validator-voters">{space[1]}</td>
                          <td className="validator-shares">
                            {space[2].toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          ) : (
            <div className="table-wrapper">
              <div className="table-scroll">
                <table className="table-main">
                  <thead>
                    <tr>
                      <th className="first-column">Wallet Address</th>
                      <th className="sorter" onClick={propSortHandler}>
                        Unique Spaces
                      </th>
                      <th className="sorter" onClick={voterSortHandler}>
                        Proposals Voted
                      </th>
                    </tr>
                  </thead>
                  {sevenState && (
                    <tbody>
                      {sevenDataProps.map((space, index) => (
                        <tr>
                          <td>
                            <a
                              href={"https://etherscan.io/address/".concat(
                                space[0]
                              )}
                              className="table-links"
                            >
                              {space[0]}
                            </a>
                          </td>
                          <td className="validator-voters">{space[1]}</td>
                          <td className="validator-shares">
                            {space[2].toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                  {thirtyState && (
                    <tbody>
                      {thirtyDataProps.map((space, index) => (
                        <tr>
                          <td>
                            <a
                              href={"https://etherscan.io/address/".concat(
                                space[0]
                              )}
                              className="table-links"
                            >
                              {space[0]}
                            </a>
                          </td>
                          <td className="validator-voters">{space[1]}</td>
                          <td className="validator-shares">
                            {space[2].toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                  {ninetyState && (
                    <tbody>
                      {ninetyDataProps.map((space, index) => (
                        <tr>
                          <td>
                            <a
                              href={"https://etherscan.io/address/".concat(
                                space[0]
                              )}
                              className="table-links"
                            >
                              {space[0]}
                            </a>
                          </td>
                          <td className="validator-voters">{space[1]}</td>
                          <td className="validator-shares">
                            {space[2].toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                  {yearState && (
                    <tbody>
                      {yearDataProps.map((space, index) => (
                        <tr>
                          <td>
                            <a
                              href={"https://etherscan.io/address/".concat(
                                space[0]
                              )}
                              className="table-links"
                            >
                              {space[0]}
                            </a>
                          </td>
                          <td className="validator-voters">{space[1]}</td>
                          <td className="validator-shares">
                            {space[2].toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LeaderboardUsers;