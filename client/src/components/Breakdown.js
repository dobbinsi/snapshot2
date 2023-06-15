import React, { useState } from "react";
import { Flipside } from "@flipsidecrypto/sdk";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ScaleLoader from "react-spinners/ScaleLoader";
import Footer from "./Footer";

const API_KEY = `${process.env.REACT_APP_API_KEY}`;

const getQuery1 = (space) => {
  const query = {
    sql: `SELECT count(DISTINCT space_ID) AS Active_Spaces, count(DISTINCT proposal_id) AS total_proposals, count(DISTINCT proposal_author) AS proposal_authors, count(DISTINCT voter) AS unique_voters FROM ethereum.core.ez_snapshot WHERE space_id = '${space}'`,
    ttlMinutes: 60,
  };
  return query;
};

const getQuery2 = (space) => {
  const query = {
    sql: `select 
    proposal_title, 
    count(distinct(id)) as vote_count
    from ethereum.core.ez_snapshot 
    where space_id = '${space}' 
    group by proposal_title 
    order by vote_count 
    desc limit 10`,
    ttlMinutes: 60,
  };
  return query;
};

const getQuery3 = (space) => {
  const query = {
    sql: `with base as (
        select
          space_id,
          voter,
          min(proposal_start_time) as first_tx
          from ethereum.core.ez_snapshot
            where space_id = '${space}'
          group by 
              space_id, 
              voter
      ),
      base2 as (
        select 
          space_id,
          voter,
          date_trunc('month', first_tx) as month,
          1 as counts
      from base
      )
      select 
        month,
        sum(counts) as monthly_new_voters
      from base2
      group by  
          month
          order by month asc`,
    ttlMinutes: 60,
  };
  return query;
};

const getQuery4 = (space) => {
  const query = {
    sql: `SELECT voter, 
    min(vote_timestamp) as first_vote, 
    count(DISTINCT id) as total_votes 
    from ethereum.core.ez_snapshot 
    where space_id = '${space}'
    group by voter 
    order by total_votes 
    desc limit 10`,
    ttlMinutes: 60,
  };
  return query;
};

const getQuery5 = (space) => {
  const query = {
    sql: `WITH prop_turnout AS (
        SELECT 
            space_id, 
            proposal_id, 
            count(DISTINCT voter) as turnout
        FROM ethereum.core.ez_snapshot
        WHERE space_id = '${space}'
        GROUP BY space_id, proposal_id
        )
        SELECT 
            space_id, 
            avg(turnout) as avg_turnout
        FROM prop_turnout
        GROUP BY space_id`,
    ttlMinutes: 60,
  };
  return query;
};

const Breakdown = () => {
  const [totalProps, setTotalProps] = useState([]);
  const [uniqueVoters, setUniqueVoters] = useState([]);
  const [propAuthors, setPropAuthors] = useState([]);
  const [propsMonthly, setPropsMonthly] = useState([]);
  const [votesMonthly, setVotesMonthly] = useState([]);
  const propChartDesc = propsMonthly.map((item) => {
    return item[0];
  });
  const propChartLabels = propsMonthly.map((item) => {
    return item[0].slice(0, 7);
  });
  const propChartAmounts = propsMonthly.map((item) => {
    return item[1];
  });
  const voteChartDates = votesMonthly.map((item) => {
    return item[0].slice(0, 7);
  });
  const voteChartAmounts = votesMonthly.map((item) => {
    return item[1];
  });
  const [topTen, setTopTen] = useState([]);
  const [avgTurnout, setAvgTurnout] = useState([]);

  const [search, setSearch] = useState("space id");
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runSDKApi1(search);
    runSDKApi2(search);
    runSDKApi3(search);
    runSDKApi4(search);
    runSDKApi5(search);
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    Title,
    Tooltip,
    Legend
  );

  const propChartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          font: {
            family: "'Roboto', sans-serif",
          },
          color: "#8b949e",
          minRotation: 45,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          font: {
            family: "'Roboto', sans-serif",
          },
          color: "#8b949e",
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "",
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            return `${propChartDesc[context[0].dataIndex]}`;
          },
        },
      },
      title: {
        display: false,
        text: "Top 10 Proposals by Number of Voters",
        font: {
          size: 18,
          family: "'Roboto', sans-serif",
          weight: "bold",
        },
        color: "#ffffff",
      },
    },
  };

  const propChartData = {
    labels: propChartLabels,
    datasets: [
      {
        label: "Voters",
        data: propChartAmounts,
        backgroundColor: "#ffab33",
        borderColor: ["#4b423f"],
        borderWidth: 0.75,
      },
    ],
  };

  const voteChartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          font: {
            family: "'Roboto', sans-serif",
          },
          color: "#8b949e",
          minRotation: 45,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          font: {
            family: "'Roboto', sans-serif",
          },
          color: "#8b949e",
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        position: "",
      },
      title: {
        display: false,
        text: "New Voters by Month",
        font: {
          size: 18,
          family: "'Roboto', sans-serif",
          weight: "bold",
        },
        color: "#ffffff",
      },
    },
  };

  const voteChartData = {
    labels: voteChartDates,
    datasets: [
      {
        label: "Voters",
        data: voteChartAmounts,
        backgroundColor: "#ffab33",
        borderColor: ["#4b423f"],
        borderWidth: 0.75,
      },
    ],
  };

  const runSDKApi1 = async (space) => {
    try {
      const flipside = new Flipside(
        API_KEY,
        "https://api-v2.flipsidecrypto.xyz"
      );
      const query = getQuery1(space);
      const result = flipside.query.run(query).then((records) => {
        setTotalProps(records.rows[0][1]);
        setPropAuthors(records.rows[0][2]);
        setUniqueVoters(records.rows[0][3]);
      });
    } catch (error) {
      console.log("error in API1");
      console.log(error);
    }
  };

  const runSDKApi2 = async (space) => {
    try {
      const flipside = new Flipside(
        API_KEY,
        "https://api-v2.flipsidecrypto.xyz"
      );
      const query = getQuery2(space);
      const result = flipside.query.run(query).then((records) => {
        setPropsMonthly(records.rows);
      });
    } catch (error) {
      console.log("error in API2");
      console.log(error);
    }
  };

  const runSDKApi3 = async (space) => {
    try {
      const flipside = new Flipside(
        API_KEY,
        "https://api-v2.flipsidecrypto.xyz"
      );
      const query = getQuery3(space);
      const result = flipside.query.run(query).then((records) => {
        setVotesMonthly(records.rows);
      });
    } catch (error) {
      console.log("error in API3");
      console.log(error);
    }
  };

  const runSDKApi4 = async (space) => {
    try {
      const flipside = new Flipside(
        API_KEY,
        "https://api-v2.flipsidecrypto.xyz"
      );
      const query = getQuery4(space);
      const result = flipside.query.run(query).then((records) => {
        setTopTen(records.rows);
      });
    } catch (error) {
      console.log("error in API4");
      console.log(error);
    }
  };

  const runSDKApi5 = async (space) => {
    try {
      const flipside = new Flipside(
        API_KEY,
        "https://api-v2.flipsidecrypto.xyz"
      );
      const query = getQuery5(space);
      const result = flipside.query.run(query).then((records) => {
        setAvgTurnout(records.rows[0][1]);
        setLoading(false);
      });
    } catch (error) {
      console.log("error in API5");
      console.log(error);
    }
  };

  return (
    <div className="breakdown">
      <div className="title-date">
        <div className="breakdown-title">
          <h1>Breakdown: &nbsp;{search}</h1>
          <form className="search-form" onSubmit={handleSubmit}>
            <div className="search-form">
              <input
                className="space-input"
                type="text"
                name="search"
                placeholder="ex: aave.eth"
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
      </div>
      {loading ? (
        <>
          <div className="loader-bottom">
            <ScaleLoader
              height={50}
              color={"#ffab33"}
              className="offset-bottom"
            />
          </div>
          <div className="reminder">
            <p>This may take a few seconds.</p>
            <p>
              If your results don't look right, try typing your search again!
            </p>
          </div>
          <div className="breakdown-footer">
            <Footer />
          </div>
        </>
      ) : (
        <>
          <>
            <div className="triple-indi">
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
              <div className="big-numbers">
                <h1>
                  {avgTurnout.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </h1>
                <h2>Average Turnout</h2>
              </div>
            </div>
            <div className="title-date">
              <div className="table-title">
                <h2>Most Active Voters</h2>
              </div>
            </div>
            <div className="table-wrapper">
              <div className="table-scroll">
                <table className="table-main-mam">
                  <thead>
                    <tr>
                      <th className="first-column">Wallet Address</th>
                      <th>First Vote</th>
                      <th>Total Votes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topTen.map((voter, index) => (
                      <tr>
                        <td>
                          <a
                            href={"https://etherscan.io/address/".concat(
                              voter[0]
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="table-links"
                          >
                            {voter[0]}
                          </a>
                        </td>
                        <td className="validator-voters">
                          {voter[1].slice(0, 10)}
                        </td>
                        <td className="validator-shares">
                          {voter[2].toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="chart-area-breakdown">
              <h2>Top 10 Proposals by Number of Voters</h2>
              <Bar
                className="top-props"
                options={propChartOptions}
                data={propChartData}
              />
            </div>
            <div className="chart-area-breakdown">
              <h2>New Voters by Month</h2>
              <Bar options={voteChartOptions} data={voteChartData} />
            </div>
            <div className="loaded-footer">
              <Footer />
            </div>
          </>
        </>
      )}
    </div>
  );
};

export default Breakdown;
