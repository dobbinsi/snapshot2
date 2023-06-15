import React, { useState, useEffect } from "react";
import axios from "axios";

const LeaderboardSpaces = () => {
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
        "https://api.flipsidecrypto.com/api/v2/queries/faf10d6b-2cbe-4424-a3ac-618a7c3f16ba/data/latest"
      )
      .then((res) => {
        setSevenData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.flipsidecrypto.com/api/v2/queries/01aedd84-8788-41db-ab17-767c2ff36d1c/data/latest"
      )
      .then((res) => {
        setThirtyData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.flipsidecrypto.com/api/v2/queries/e58293ea-0123-4602-80a7-5ecde3892774/data/latest"
      )
      .then((res) => {
        setNinetyData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.flipsidecrypto.com/api/v2/queries/a34e5ea3-c481-4946-9e71-e73346318693/data/latest"
      )
      .then((res) => {
        setYearData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.flipsidecrypto.com/api/v2/queries/2e246d9b-cbc6-4f81-b7e8-56196a6e5288/data/latest"
      )
      .then((res) => {
        setSevenDataProps(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.flipsidecrypto.com/api/v2/queries/36094d45-e587-4e49-a335-7143664be2df/data/latest"
      )
      .then((res) => {
        setThirtyDataProps(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.flipsidecrypto.com/api/v2/queries/cd2824f3-5b76-4e8f-bd70-bb3c0e51b794/data/latest"
      )
      .then((res) => {
        setNinetyDataProps(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.flipsidecrypto.com/api/v2/queries/bad31efa-3fd4-4fe1-895f-637b756c7fbb/data/latest"
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
              <h1>Leaderboard: Most Active Spaces</h1>
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
                <table className="table-main-mas">
                  <thead>
                    <tr>
                      <th className="first-column">Space ID</th>
                      <th className="sorter" onClick={propSortHandler}>
                        Proposals
                      </th>
                      <th className="sorter" onClick={voterSortHandler}>
                        Unique Voters
                      </th>
                    </tr>
                  </thead>
                  {sevenState && (
                    <tbody>
                      {sevenData.map((space, index) => (
                        <tr>
                          <td>
                            <a
                              href={"https://snapshot.org/#/".concat(
                                space["SPACE_ID"]
                              )}
                              className="table-links"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {space["SPACE_ID"]}
                            </a>
                          </td>
                          <td className="validator-voters">
                            {space["PROPOSALS"].toLocaleString()}
                          </td>
                          <td className="validator-shares">
                            {space["UNIQUE_VOTERS"].toLocaleString()}
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
                              href={"https://snapshot.org/#/".concat(
                                space["SPACE_ID"]
                              )}
                              className="table-links"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {space["SPACE_ID"]}
                            </a>
                          </td>
                          <td className="validator-voters">
                            {space["PROPOSALS"].toLocaleString()}
                          </td>
                          <td className="validator-shares">
                            {space["UNIQUE_VOTERS"].toLocaleString()}
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
                              href={"https://snapshot.org/#/".concat(
                                space["SPACE_ID"]
                              )}
                              className="table-links"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {space["SPACE_ID"]}
                            </a>
                          </td>
                          <td className="validator-voters">
                            {space["PROPOSALS"].toLocaleString()}
                          </td>
                          <td className="validator-shares">
                            {space["UNIQUE_VOTERS"].toLocaleString()}
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
                              href={"https://snapshot.org/#/".concat(
                                space["SPACE_ID"]
                              )}
                              className="table-links"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {space["SPACE_ID"]}
                            </a>
                          </td>
                          <td className="validator-voters">
                            {space["PROPOSALS"].toLocaleString()}
                          </td>
                          <td className="validator-shares">
                            {space["UNIQUE_VOTERS"].toLocaleString()}
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
                      <th className="first-column">Space ID</th>
                      <th className="sorter" onClick={propSortHandler}>
                        Proposals
                      </th>
                      <th className="sorter" onClick={voterSortHandler}>
                        Unique Voters
                      </th>
                    </tr>
                  </thead>
                  {sevenState && (
                    <tbody>
                      {sevenDataProps.map((space, index) => (
                        <tr>
                          <td>
                            <a
                              href={"https://snapshot.org/#/".concat(
                                space["SPACE_ID"]
                              )}
                              className="table-links"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {space["SPACE_ID"]}
                            </a>
                          </td>
                          <td className="validator-voters">
                            {space["PROPOSALS"].toLocaleString()}
                          </td>
                          <td className="validator-shares">
                            {space["UNIQUE_VOTERS"].toLocaleString()}
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
                              href={"https://snapshot.org/#/".concat(
                                space["SPACE_ID"]
                              )}
                              className="table-links"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {space["SPACE_ID"]}
                            </a>
                          </td>
                          <td className="validator-voters">
                            {space["PROPOSALS"].toLocaleString()}
                          </td>
                          <td className="validator-shares">
                            {space["UNIQUE_VOTERS"].toLocaleString()}
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
                              href={"https://snapshot.org/#/".concat(
                                space["SPACE_ID"]
                              )}
                              className="table-links"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {space["SPACE_ID"]}
                            </a>
                          </td>
                          <td className="validator-voters">
                            {space["PROPOSALS"].toLocaleString()}
                          </td>
                          <td className="validator-shares">
                            {space["UNIQUE_VOTERS"].toLocaleString()}
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
                              href={"https://snapshot.org/#/".concat(
                                space["SPACE_ID"]
                              )}
                              className="table-links"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {space["SPACE_ID"]}
                            </a>
                          </td>
                          <td className="validator-voters">
                            {space["PROPOSALS"].toLocaleString()}
                          </td>
                          <td className="validator-shares">
                            {space["UNIQUE_VOTERS"].toLocaleString()}
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

export default LeaderboardSpaces;
