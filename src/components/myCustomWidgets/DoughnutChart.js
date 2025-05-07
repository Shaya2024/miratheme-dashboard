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

  const colorPalette = getPayorColors(theme);

  const labels = dbData.map((d) => d.payer);
  const percentages = dbData.map((d) => d.averagePercentage);

  const backgroundColor = labels.map((payer, index) =>
    selected.length === 0 || selected.includes(payer)
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
    plugins: {
      datalabels: {
        color: "#ffffff",
        formatter: (value) => `${value}%`,
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
            const count = dbData[index].averageCount;
            const percent = dbData[index].averagePercentage;
            const payer = dbData[index].payer;
            return [`${payer}`, `Count: ${count}`, `Percent: ${percent}%`];
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
        // remove
        onSelectPayor(selected.filter((p) => p !== clickedPayor));
      } else {
        // add
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
