// Originally from components/pages/charts/chartjs/DoughnutChart
import React from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { Doughnut } from "react-chartjs-2";

import { CardContent, Card as MuiCard, Typography } from "@mui/material";
import { orange, red } from "@mui/material/colors";
import { spacing } from "@mui/system";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Card = styled(MuiCard)(spacing, {
  height: "100%",
  margin: "0 auto",
});

const Spacer = styled.div(spacing);

const ChartWrapper = styled.div`
  height: 500px;
  width: 100%;
  margin: 0 auto;
`;

function DoughnutChart({ theme, dbData, title }) {
  const payorColors = {
    "Medicare A": theme.palette.warning.main,
    Medicaid: theme.palette.primary.main,
    HMO: theme.palette.success.main,
    Private: theme.palette.secondary.main,
    VA: theme.palette.info.main,
  };
  const labels = dbData.map((d) => d.payer);
  const percentages = dbData.map((d) => d.averagePercentage);

  const data = {
    labels: labels,
    datasets: [
      {
        data: percentages,
        backgroundColor: labels.map(
          (payer) => payorColors[payer] || theme.palette.grey[300]
        ),
        borderColor: "transparent",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    cutout: "55%",
    plugins: {
      datalabels: {
        color: "#fff",
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

  return (
    <Card mb={1}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        <Spacer mb={6} />

        <ChartWrapper>
          <Doughnut data={data} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
}

export default withTheme(DoughnutChart);
