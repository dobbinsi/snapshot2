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

const TrendsProp = () => {
  const [propsMonthly, setPropsMonthly] = useState([]);
  const [propsWeekly, setPropsWeekly] = useState([]);
  const [weekState, setWeekState] = useState(false);
  const [monthState, setMonthState] = useState(true);
  const [loading, setLoading] = useState(false);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(true);

  const propChartDates = propsMonthly.map((item) => {
    return item["MONTH"].slice(0, 7);
  });
  const propChartAmounts = propsMonthly.map((item) => {
    return item["PROPOSAL_COUNT"];
  });
  const propChartDates2 = propsWeekly.map((item) => {
    return item["WEEK"].slice(0, 10);
  });
  const propChartAmounts2 = propsWeekly.map((item) => {
    return item["PROPOSAL_COUNT"];
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

  const propChartOptions = {
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

  const propChartData = {
    labels: propChartDates,
    datasets: [
      {
        label: "Proposals",
        data: propChartAmounts,
        backgroundColor: "#ffab33",
        borderColor: ["#4b423f"],
        borderWidth: 0.75,
      },
    ],
  };

  const propChartData2 = {
    labels: propChartDates2,
    datasets: [
      {
        label: "Proposals",
        data: propChartAmounts2,
        backgroundColor: "#ffab33",
        borderColor: ["#4b423f"],
        borderWidth: 0.75,
      },
    ],
  };

  useEffect(() => {
    axios
      .get(
        "https://api.flipsidecrypto.com/api/v2/queries/f00d9cde-698a-4b88-8e4a-eb34fa28b27d/data/latest"
      )
      .then((res) => {
        setPropsMonthly(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(
        "https://api.flipsidecrypto.com/api/v2/queries/f1c49424-6347-4628-932a-0f947a661d55/data/latest"
      )
      .then((res) => {
        setPropsWeekly(res.data);
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
              <h1>Trends: Unique Proposals</h1>
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
          {monthState && (
            <div className="chart-area">
              <Bar options={propChartOptions} data={propChartData} />
            </div>
          )}
          {weekState && (
            <div className="chart-area">
              <Bar options={propChartOptions} data={propChartData2} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TrendsProp;
