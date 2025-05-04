// Originally from components/pages/charts/apexcharts/BarChart
import React from "react";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import dynamic from "next/dynamic";

import { CardContent, Card as MuiCard, Typography } from "@mui/material";
import { fontWeight, spacing } from "@mui/system";

const Chart = dynamic(() => import("@/vendor/react-apexcharts"), {
  ssr: false,
});

const Card = styled(MuiCard)(spacing);

const Spacer = styled.div(spacing);

const ChartWrapper = styled.div`
  height: 350px;
  width: 100%;
`;

const BarChart = ({ theme, dbData, title }) => {
  const payors = Array.from(
    new Set(dbData.flatMap((f) => Object.keys(f.payors)))
  );
  const categories = dbData.map((f) => f.facility);

  const series = payors.map((payor) => ({
    name: payor,
    data: dbData.map((f) => f.payors[payor] || 0),
  }));


  const options = {
    chart: {
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: false,
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: "#444",
        },
      },
      max: Math.max(...dbData.map((f) => f.totalAverage))*.85,
    },
    yaxis: {
      labels: {
        style: {
          colors: "#444",
          fontWeight: "bold",
        },
        formatter: (facilityLabel) => {
          const matched = dbData.find((f) => f.facility === facilityLabel);
          const total = matched?.totalAverage ?? "N/A";
          return [facilityLabel, `Total: ${total}`];
        },
      },
    },
    tooltip: {
      y: {
        shared: true,
        intersect: false,
        formatter: (val) => `${val}`, // Only show the value for that segment
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
    colors: payors.map((payor) => {
      const payorColors = {
        Medicaid: theme.palette.primary.main,
        Private: theme.palette.success.main,
        HMO: theme.palette.warning.main,
        "Medicare A": theme.palette.info.main,
        VA: theme.palette.error.main,
        Paid_Bed: theme.palette.info.main,
        Unpaid_Bed: theme.palette.info.main,
        "Medicaid Pending": theme.palette.info.main,
      };
      return payorColors[payor] || "#ccc";
    }),
  };

  return (
    <Card mb={1}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        <Spacer mb={0.1} />

        <ChartWrapper>
          <Chart options={options} series={series} type="bar" height="350" />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
};

export default withTheme(BarChart);
