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

function BarLineComboChart({ theme, barData, lineData, title }) {
  const labels = Array.isArray(barData)
    ? barData.map((item) => item.datekey)
    : [];
  const workedValues = Array.isArray(barData)
    ? barData.map((item) => item.hours_worked)
    : [];
  const requiredValues = Array.isArray(lineData)
    ? labels.map((date) => {
        const match = lineData.find((r) => r.datekey === date);
        return match ? match.sum_total : 0;
      })
    : [];

  const chartData = {
    labels,
    datasets: [
      {
        type: "bar",
        label: "Worked",
        data: workedValues,
        backgroundColor: workedValues.map((val, i) =>
          val < requiredValues[i]
            ? theme.palette.error.main
            : theme.palette.success.main
        ),
      },
      {
        type: "line",
        label: "Required",
        data: requiredValues,
        borderColor: theme.palette.info.main,
        borderWidth: 2,
        fill: false,
        tension: 0.3,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
