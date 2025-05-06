// Originally from components/pages/dashboard/default/LineChart
import React from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { Line } from "react-chartjs-2";
import { MoreVertical } from "lucide-react";

import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import { spacing } from "@mui/system";
import { alpha } from "@mui/material/styles";

// Crosshair vertical line plugin
const verticalLinePlugin = {
  id: "verticalLine",
  afterDraw: (chart) => {
    if (chart.tooltip?._active?.length) {
      const ctx = chart.ctx;
      const activePoint = chart.tooltip._active[0];
      const x = activePoint.element.x;

      // ✅ Use a dynamic way to get the Y scale
      const yScale = Object.values(chart.scales).find(
        (scale) => scale.axis === "y"
      );
      if (!yScale) return;

      const topY = yScale.top;
      const bottomY = yScale.bottom;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 0.5;
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = "#aaa";
      ctx.stroke();
      ctx.restore();
    }
  },
};

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// REGISTER Chart.js modules + the vertical line plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  verticalLinePlugin // 👈 register this plugin
);

const Card = styled(MuiCard)(spacing);

const ChartWrapper = styled.div`
  height: 100%;
`;

function LineChart({ theme, dbData, title }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const data = {
    labels: dbData.map((d) => formatDate(d.Date)),
    datasets: [
      {
        label: title,
        fill: true,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }

          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, alpha(theme.palette.secondary.main, 0.0875));
          gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

          return gradient;
        },
        borderColor: theme.palette.secondary.main,
        tension: 0.4,
        pointRadius: 4,
        data: dbData.map((d) => d.Count),
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        mode: "index", // <-- triggers tooltip for all datasets at the same x
        intersect: false, // <-- allows hover even when not on a point
      },
      legend: {
        display: false,
        labels: {
          color: theme.palette.text.primary,
        },
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        id: "x",
        grid: {
          color: "rgba(0,0,0,0.0)",
        },
        ticks: {
          color: theme.palette.text.primary,
        },
      },
      y: {
        id: "y",
        grid: {
          color: "rgba(0,0,0,0.0375)",
          fontColor: "#fff",
        },
        ticks: {
          color: theme.palette.text.primary,
        },
      },
    },
  };

  return (
    <Card mb={0}>
      <CardHeader
        action={
          <IconButton aria-label="settings" size="large">
            <MoreVertical />
          </IconButton>
        }
        title={title}
      />
      <CardContent>
        <ChartWrapper>
          <Line data={data} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
}
export default withTheme(LineChart);
