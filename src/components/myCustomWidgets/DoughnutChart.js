// Originally from components/pages/charts/chartjs/DoughnutChart
import React, { useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { Doughnut } from "react-chartjs-2";

import { CardContent, Card as MuiCard, Typography } from "@mui/material";
import { spacing } from "@mui/system";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getPayorColors } from "@/components/MyCustomUtils/colorPalette";

// At the top of your file, outside the component
const leaderLinePlugin = {
  id: "leaderLine",
  afterDatasetsDraw: (chart) => {
    const ctx = chart.ctx;
    const meta = chart.getDatasetMeta(0);

    chart.config.data.datasets[0].data.forEach((value, index) => {
      if (parseFloat(value) < 2) {
        const arc = meta.data[index];
        if (!arc) return;

        const angle = (arc.startAngle + arc.endAngle) / 2;
        const outerRadius = arc.outerRadius;

        // Get color from the dataset
        const wedgeColor = chart.config.data.datasets[0].backgroundColor[index];

        // Draw line
        const x1 = arc.x + Math.cos(angle) * outerRadius;
        const y1 = arc.y + Math.sin(angle) * outerRadius;
        const x2 = arc.x + Math.cos(angle) * (outerRadius + 10); // Match datalabel offset
        const y2 = arc.y + Math.sin(angle) * (outerRadius + 10);

        ctx.save();
        ctx.strokeStyle = wedgeColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.restore();
      }
    });
  },
};

// Register it once at the top level
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels,
  leaderLinePlugin
);

const Card = styled(MuiCard)(spacing, {
  height: "100%",
  width: "100%",
  margin: "0 auto",
});

const Spacer = styled.div(spacing);

const ChartWrapper = styled.div`
  min-height: 400px;
  margin: 0 auto;
`;

function DoughnutChart({ theme, dbData, title, onSelectPayor, selected }) {
  const chartRef = useRef();

  // Force chart update after initial render
  useEffect(() => {
    if (chartRef.current) {
      setTimeout(() => {
        chartRef.current.update();
      }, 100);
    }
  }, [dbData]);

  if (!Array.isArray(dbData)) {
    return <div>Loading...</div>;
  }

  const colorPalette = getPayorColors(theme);

  const labels = dbData.map((d) => d.payor);
  const indexOfMedicaidPending = labels.indexOf("Medicaid Pending");
  if (indexOfMedicaidPending !== -1) {
    labels.push(...labels.splice(indexOfMedicaidPending, 1));
  }

  const counts = dbData.map((d) => d.cnt);
  if (indexOfMedicaidPending !== -1) {
    counts.push(...counts.splice(indexOfMedicaidPending, 1));
  }
  const total = counts.reduce((sum, current) => sum + Number(current), 0);
  const percentages = counts.map((count) => ((count / total) * 100).toFixed(1));

  const backgroundColor = labels.map((payor, index) =>
    selected.length === 0 || selected.includes(payor)
      ? colorPalette[index % colorPalette.length]
      : "#ddd"
  );

  const data = {
    labels: labels,
    datasets: [
      {
        data: percentages,
        backgroundColor,
        borderColor: "transparent",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    cutout: "55%",
    layout: {
      padding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      },
    },
    animation: {
      duration: 0, // Disable animation
    },
    plugins: {
      datalabels: {
        formatter: (value) => `${value}%`,
        font: {
          weight: "regular",
          size: 14,
        },
        display: true,
        clip: false,
        anchor: function (context) {
          const value = parseFloat(context.dataset.data[context.dataIndex]);
          return value < 2 ? "end" : "center";
        },
        align: function (context) {
          const value = parseFloat(context.dataset.data[context.dataIndex]);
          if (value < 2) {
            const meta = context.chart.getDatasetMeta(context.datasetIndex);
            const element = meta.data[context.dataIndex];
            const startAngle = element.startAngle;
            const endAngle = element.endAngle;
            const angle = (startAngle + endAngle) / 2;

            if (angle >= 0 && angle < Math.PI / 2) return "start";
            if (angle >= Math.PI / 2 && angle < Math.PI) return "end";
            if (angle >= Math.PI && angle < (3 * Math.PI) / 2) return "end";
            return "start";
          }
          return "center";
        },
        offset: function (context) {
          const value = parseFloat(context.dataset.data[context.dataIndex]);
          return value < 2 ? 3 : 0; // Changed to proper offset value
        },
        color: function (context) {
          const value = parseFloat(context.dataset.data[context.dataIndex]);
          return value < 2 ? theme.palette.text.primary : "#ffffff";
        },
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 16,
          color: theme.palette.text.primary,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const count = counts[index];
            const percent = percentages[index];
            const payor = labels[index];
            return [`${payor}`, `Count: ${count}`, `Percent: ${percent}%`];
          },
        },
      },
    },
  };

  return (
    <Card mb={1}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        <Spacer mb={6} />

        <ChartWrapper>
          <Doughnut
            ref={chartRef}
            data={data}
            options={options}
            onClick={(event) => {
              const chart = chartRef.current;
              if (!chart) return;

              const elements = chart.getElementsAtEventForMode(
                event.nativeEvent,
                "nearest",
                { intersect: true },
                true
              );

              if (!elements || elements.length === 0) {
                console.log("No elements found");
                return;
              }

              const idx = elements[0].index;
              const clickedPayor = data.labels[idx];

              if (onSelectPayor) {
                if (selected.includes(clickedPayor)) {
                  onSelectPayor(selected.filter((p) => p !== clickedPayor));
                } else {
                  onSelectPayor([...selected, clickedPayor]);
                }
              }
            }}
          />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
}

export default withTheme(DoughnutChart);
