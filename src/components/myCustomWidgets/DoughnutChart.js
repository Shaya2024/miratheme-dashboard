// Originally from components/pages/charts/chartjs/DoughnutChart
import React, { useRef } from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { Doughnut, getElementAtEvent } from "react-chartjs-2";

import { CardContent, Card as MuiCard, Typography } from "@mui/material";
import { spacing } from "@mui/system";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getPayorColors } from "@/components/MyCustomUtils/colorPalette";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

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

  if (!Array.isArray(dbData)) {
    return <div>Loading...</div>;
  }

  console.log(`dbData for DoughnutChart: ${dbData}`);

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
  console.log(`total ${total}`);
  const percentages = counts.map((count) => ((count / total) * 100).toFixed(1));

  const backgroundColor = labels.map((payor, index) =>
    selected.length === 0 || selected.includes(payor)
      ? colorPalette[index % colorPalette.length]
      : "#ddd"
  );
  console.log(`backgroundColor: ${backgroundColor}`);

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
    plugins: {
      datalabels: {
        color: "#ffffff",
        formatter: (value, context) => {
          // value is already percentage string like "1.4"
          const numericValue = parseFloat(value);
          return numericValue >= 2 ? `${value}%` : null;
        },
        font: {
          weight: "regular",
          size: 14,
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

  const handleClick = (event) => {
    const elements = getElementAtEvent(chartRef.current, event);
    if (!elements.length) return;

    const idx = elements[0].index;
    const clickedPayor = data.labels[idx];

    if (onSelectPayor) {
      if (selected.includes(clickedPayor)) {
        // Remove clicked payor
        onSelectPayor(selected.filter((p) => p !== clickedPayor));
      } else {
        // Add clicked payor
        onSelectPayor([...selected, clickedPayor]);
      }
    }
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
            onClick={handleClick}
          />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
}

export default withTheme(DoughnutChart);
