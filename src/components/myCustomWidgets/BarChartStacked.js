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
import { getPayorColors } from "@/components/MyCustomUtils/colorPalette";

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

function BarChart({ theme, dbData, title }) {
  if (!Array.isArray(dbData)) {
    return <div>Loading...</div>;
  }
  const payors = Array.from(
    new Set(dbData.flatMap((f) => Object.keys(f.payors)))
  );
  const categories = dbData.map((f) => f.facility);

  const colorPalette = getPayorColors(theme);
  const payorColors = {};
  payors.forEach((payor, index) => {
    payorColors[payor] = colorPalette[index % colorPalette.length];
  });

  const chartData = {
    labels: categories,
    datasets: payors.map((payor) => ({
      label: payor,
      data: dbData.map((f) => f.payors[payor] || 0),
      backgroundColor: payorColors[payor] || "#ccc",
      borderWidth: 1,
    })),
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: theme.palette.text.primary,
        },
        grid: {
          color: "rgba(0,0,0,0.1)",
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: theme.palette.text.primary,
          callback: function (value, index) {
            const label = categories[index];
            const total = dbData[index].totalAverage ?? ""; // assumes you have totalAverage in dbData
            return [`${label}`, `Total: ${total}`]; // Multi-line label
          },
        },
        grid: {
          color: "rgba(0,0,0,0.05)",
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: theme.palette.text.primary,
          usePointStyle: true,
          pointStyle: "rect",
          padding: 20,
        },
      },
      tooltip: {
        enabled: true,
        mode: "nearest",
        intersect: true,
      },
      datalabels: {
        color: "#ffffff",
        font: {
          weight: "regular",
          size: 12,
        },
        formatter: function (value) {
          return value > 0 ? value : "";
        },
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

export default withTheme(BarChart);
