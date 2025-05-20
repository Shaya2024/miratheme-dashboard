// components/pages/charts/chartjs/BarLineComboChart.js
"use client";

import React from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart as ChartComponent } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Card as MuiCard, CardContent, Typography } from "@mui/material";
import { spacing } from "@mui/system";
import { red, green } from "@mui/material/colors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

const Card = styled(MuiCard)(spacing);
const ChartWrapper = styled.div`
  height: 350px;
  width: 100%;
`;

function formatDate(value) {
  // Handle values like 20250209
  if (typeof value === "number" && value.toString().length === 8) {
    const str = value.toString();
    const year = parseInt(str.slice(0, 4));
    const month = parseInt(str.slice(4, 6)) - 1; // Month is 0-indexed in JS
    const day = parseInt(str.slice(6, 8));
    const date = new Date(year, month, day);
    return date.toLocaleDateString("en-US");
  }
}

function BarLineComboChart({ theme, barData, lineData, title }) {
  const labels = Array.isArray(barData) // bar data looks like this [{"datekey":20250131,"hours_worked":"2744"},{"datekey":20250201,"hours_worked":"1984"},
    ? barData.map((item) => formatDate(item.datekey))
    : [];
  const workedValues = Array.isArray(barData)
    ? barData.map((item) => item.hours_worked)
    : [];
  const requiredValues = Array.isArray(lineData)
    ? lineData.map((item) => item.sum_total)
    : [];

  console.log(`labels: ${JSON.stringify(labels)}`);
  console.log(`workedValues: ${JSON.stringify(workedValues)}`);
  console.log(`requiredValues: ${JSON.stringify(requiredValues)}`);

  const chartData = {
    labels,
    datasets: [
      {
        type: "line",
        label: "Required",
        data: requiredValues,
        borderColor: "black",
        borderWidth: 2,
        fill: false,
        tension: 0.3,
        pointRadius: 1,
      },
      {
        type: "bar",
        label: "Worked",
        data: workedValues,
        backgroundColor: workedValues.map((val, i) =>
          parseFloat(val).toFixed(1) < parseFloat(requiredValues[i]).toFixed(1)
            ? red[500]
            : green[500]
        ),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: theme.palette.text.primary,
        },
        grid: {
          color: "rgba(0,0,0,0.1)",
        },
      },
      x: {
        ticks: {
          color: theme.palette.text.primary,
          maxTicksLimit: 12,
        },
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: theme.palette.text.primary,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.raw;
            return `${label}: ${parseFloat(value).toFixed(1)}`;
          },
        },
      },
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <Card mb={1}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <ChartWrapper>
          <ChartComponent type="bar" data={chartData} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
}

export default withTheme(BarLineComboChart);
