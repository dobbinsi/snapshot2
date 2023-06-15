import React, { useState, useEffect } from "react";
import axios from "axios";
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
import Footer from "./Footer";


const TrendsVote = () => {
  const [votesMonthly, setVotesMonthly] = useState([]);
  const [votesWeekly, setVotesWeekly] = useState([]);
  const [weekState, setWeekState] = useState(false);
  const [monthState, setMonthState] = useState(true);
  const [loading, setLoading] = useState(false);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(true);

  const voteChartDates = votesMonthly.map((item) => {
    return item["MONTH"].slice(0, 7);
  });
  const voteChartAmounts = votesMonthly.map((item) => {
    return item["VOTER_COUNT"];
  });
  const voteChartDates2 = votesWeekly.map((item) => {
    return item["WEEK"].slice(0, 10);
  });
  const voteChartAmounts2 = votesWeekly.map((item) => {
    return item["VOTER_COUNT"];
  });

  const weekHandler = () => {
    setMonthState(false);
    setWeekState(true);
    setActive1(true);
    setActive2(false);
  };

  const monthHandler = () => {
    setWeekState(false);
    setMonthState(true);
    setActive2(true);
    setActive1(false);
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

  const voteChartOptions = {
    responsive: true,
    scales: {
      x: {
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
        text: "Unique Proposals",
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

  const voteChartData2 = {
    labels: voteChartDates2,
    datasets: [
      {
        label: "Voters",
        data: voteChartAmounts2,
        backgroundColor: "#ffab33",
        borderColor: ["#4b423f"],
        borderWidth: 0.75,
      },
    ],
  };

  useEffect(() => {
    axios
      .get(
        "https://api.flipsidecrypto.com/api/v2/queries/080e9681-f25a-409e-8bf4-4c979897db8b/data/latest"
      )
      .then((res) => {
        setVotesMonthly(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.flipsidecrypto.com/api/v2/queries/041452ee-766f-4654-9a2f-2006526257b3/data/latest"
      )
      .then((res) => {
        setVotesWeekly(res.data);
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
              <h1>Trends: Unique Voters</h1>
            </div>
            <div className="date-toggle">
              <button
                style={{ color: active1 ? "#418ade" : "#ffffff" }}
                onClick={weekHandler}
              >
                Weekly
              </button>
              <button
                style={{ color: active2 ? "#418ade" : "#ffffff" }}
                onClick={monthHandler}
              >
                Monthly
              </button>
            </div>
          </div>
          {weekState && (
            <div className="chart-area">
              <Bar options={voteChartOptions} data={voteChartData2} />
            </div>
          )}
          {monthState && (
            <div className="chart-area">
              <Bar options={voteChartOptions} data={voteChartData} />
            </div>
          )}
          <div className="loaded-footer">
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default TrendsVote;
