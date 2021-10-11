import React, { useState } from "react";
import {
  LineChart,
  PieChart,
  Pie,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

import Chart from "./Chart";

export default function App() {
  const [Data, setData] = useState([
    {
      date: "Page A",
      uv: 4000,
      USD: 2400,
      amt: 2400
    },
    {
      date: "Page B",
      USD: 3000,
      pv: 1398,
      amt: 2210
    },
    {
      date: "Page C",
      USD: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      date: "Page D",
      USD: 2780,
      pv: 3908,
      amt: 2000
    },
    {
      date: "Page E",
      USD: 1890,
      pv: 4800,
      amt: 2181
    },
    {
      date: "Page F",
      USD: 2390,
      pv: 3800,
      amt: 2500
    },
    {
      day: "Page G",
      USD: 3490,
      pv: 4300,
      amt: 2100
    }
  ]);
  //const [data, setData] = useState([]);
  const [Title, setTitle] = useState("Name of graph");
  function add() {
    setData([
      {
        date: "Page A",
        uv: 4000,
        USD: 2400,
        amt: 2400
      },
      {
        date: "Page B",
        USD: 3000,
        pv: 1398,
        amt: 2210
      },
      {
        date: "Page C",
        USD: 10000,
        pv: 9800,
        amt: 2290
      },
      {
        date: "Page D",
        USD: 3000,
        pv: 3908,
        amt: 2000
      },
      {
        date: "Page E",
        USD: 1890,
        pv: 4800,
        amt: 2181
      },
      {
        date: "Page F",
        USD: 2390,
        pv: 3800,
        amt: 2500
      },
      {
        day: "Page G",
        USD: 3490,
        pv: 4300,
        amt: 2100
      }
    ]);
  }
  return (
    <div id="pie">
      <button onClick={() => add()}> Click </button>
      <Chart />
      <h1>{Title}</h1>
      <LineChart
        width={500}
        height={300}
        data={Data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="USD" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}

