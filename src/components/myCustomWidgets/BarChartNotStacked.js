// components/pages/charts/chartjs/BarChart.js
"use client";

import React from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { Bar } from "react-chartjs-2";
import { Card as MuiCard, CardContent, Typography } from "@mui/material";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { spacing } from "@mui/system";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartDataLabels
);

const Card = styled(MuiCard)(spacing);
const ChartWrapper = styled.div`
  height: 350px;
  width: 100%;
`;

function BarChartNotStacked({ theme, dbData, title }) {
  const chartData = {
    labels: dbData.map((f) => f.facility),
    datasets: [
      {
        label: title,
        data: dbData.map((f) => f.value),
        backgroundColor: dbData.map((f) => (f.value >= 0 ? "green" : "red")),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: theme.palette.text.primary,
        },
        grid: {
          color: "rgba(0,0,0,0.1)",
        },
      },
      y: {
        ticks: {
          color: theme.palette.text.primary,
          callback: function (value, index) {
            const label = dbData[index]?.facility || value;
            const total = dbData[index]?.total ?? "";
            return [`${label}`, `Total: ${total}`];
          },
        },
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            return `${title}: ${value}`;
          },
        },
      },
      datalabels: {
        color: "#fff",
        font: {
          size: 12,
          weight: "bold",
        },
        formatter: (value) => (value !== 0 ? value : ""),
        anchor: "center",
        align: "center",
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
          <Bar data={chartData} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
}

export default withTheme(BarChartNotStacked);
