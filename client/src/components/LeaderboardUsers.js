import React, { useState, useEffect } from "react";
import axios from "axios";

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
  const [loading, setLoading] = useState(false);
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
    axios
      .get(
        "https://api.flipsidecrypto.com/api/v2/queries/d74f27fd-7f92-479b-b886-e3f5790e81ea/data/latest"
      )
      .then((res) => {
        setSevenData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.flipsidecrypto.com/api/v2/queries/c0978b81-aee1-4d18-ae13-698a6d2deaab/data/latest"
      )
      .then((res) => {
        setThirtyData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.flipsidecrypto.com/api/v2/queries/889dc6b7-e7f7-4685-a4c0-033afe510a8f/data/latest"
      )
      .then((res) => {
        setNinetyData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.flipsidecrypto.com/api/v2/queries/39f43365-604a-4b3f-ab2c-efca5d4e3e75/data/latest"
      )
      .then((res) => {
        setYearData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.flipsidecrypto.com/api/v2/queries/f5a01d15-e8ba-4cd4-a951-bf70de31d460/data/latest"
      )
      .then((res) => {
        setSevenDataProps(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.flipsidecrypto.com/api/v2/queries/45d58a82-2112-4508-9b03-1221af49e5d4/data/latest"
      )
      .then((res) => {
        setThirtyDataProps(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.flipsidecrypto.com/api/v2/queries/71c7483d-6b03-474a-a3e6-93003ddba987/data/latest"
      )
      .then((res) => {
        setNinetyDataProps(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.flipsidecrypto.com/api/v2/queries/efb8b829-f10c-44ca-8753-641f66da88a2/data/latest"
      )
      .then((res) => {
        setYearDataProps(res.data);
      })
      .catch((err) => console.log(err));
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
                                space["VOTER"]
                              )}
                              className="table-links"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {space["VOTER"]}
                            </a>
                          </td>
                          <td className="validator-voters">
                            {space["SPACES"]}
                          </td>
                          <td className="validator-shares">
                            {space["PROPOSALS"].toLocaleString()}
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
                                space["VOTER"]
                              )}
                              className="table-links"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {space["VOTER"]}
                            </a>
                          </td>
                          <td className="validator-voters">
                            {space["SPACES"]}
                          </td>
                          <td className="validator-shares">
                            {space["PROPOSALS"].toLocaleString()}
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
                                space["VOTER"]
                              )}
                              className="table-links"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {space["VOTER"]}
                            </a>
                          </td>
                          <td className="validator-voters">
                            {space["SPACES"]}
                          </td>
                          <td className="validator-shares">
                            {space["PROPOSALS"].toLocaleString()}
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
                                space["VOTER"]
                              )}
                              className="table-links"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {space["VOTER"]}
                            </a>
                          </td>
                          <td className="validator-voters">
                            {space["SPACES"]}
                          </td>
                          <td className="validator-shares">
                            {space["PROPOSALS"].toLocaleString()}
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
                                space["VOTER"]
                              )}
                              className="table-links"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {space["VOTER"]}
                            </a>
                          </td>
                          <td className="validator-voters">
                            {space["SPACES"]}
                          </td>
                          <td className="validator-shares">
                            {space["PROPOSALS"].toLocaleString()}
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
                                space["VOTER"]
                              )}
                              className="table-links"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {space["VOTER"]}
                            </a>
                          </td>
                          <td className="validator-voters">
                            {space["SPACES"]}
                          </td>
                          <td className="validator-shares">
                            {space["PROPOSALS"].toLocaleString()}
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
                                space["VOTER"]
                              )}
                              className="table-links"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {space["VOTER"]}
                            </a>
                          </td>
                          <td className="validator-voters">
                            {space["SPACES"]}
                          </td>
                          <td className="validator-shares">
                            {space["PROPOSALS"].toLocaleString()}
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
                                space["VOTER"]
                              )}
                              className="table-links"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {space["VOTER"]}
                            </a>
                          </td>
                          <td className="validator-voters">
                            {space["SPACES"]}
                          </td>
                          <td className="validator-shares">
                            {space["PROPOSALS"].toLocaleString()}
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
