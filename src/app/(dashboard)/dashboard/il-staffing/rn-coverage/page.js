"use client";

import React from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@mui/material";
import { spacing } from "@mui/system";
import { green, red } from "@mui/material/colors";

import Actions from "@/components/myCustomWidgets/Actions";
import LineChart from "@/components/myCustomWidgets/LineChart";
import DoughnutChart from "@/components/myCustomWidgets/DoughnutChart";
import Stats from "@/components/myCustomWidgets/Stats";
import BarChart from "@/components/myCustomWidgets/BarChartStacked";

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

function CensusDashboard() {
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const formatDate = (d) =>
    d.toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });

  const [averageCensus, setAverageCensus] = useState(null);
  const [totalOccupancy, setTotalOccupancy] = useState(null);
  const [payorDistribution, setPayorDistribution] = useState(null);
  const [trendData, setTrendData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  const [stateOptions, setStateOptions] = useState([]);
  const [facilityOptions, setFacilityOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    startDate: formatDate(thirtyDaysAgo),
    endDate: formatDate(today),
    state: "All",
    facility: "All",
    residentStatusPaid: 0,
    residentStatusUnpaid: 0,
    payors: [],
    splitMedicaidPending: 0,
  });

  const queryString = new URLSearchParams({
    startDate: filters.startDate,
    endDate: filters.endDate,
    facility: filters.facility[0] !== "" ? filters.facility : "All", // If I want to change to multiple I need to change this to facility: filters.facility[0] !== "" ? filters.facility.join(",") : "All",
    residentStatusPaid: filters.residentStatusPaid,
    residentStatusUnpaid: filters.residentStatusUnpaid,
    payors: filters.payors.length === 0 ? "All" : filters.payors.join(","),
    splitMedicaidPending: filters.splitMedicaidPending.toString(),
    state: filters.state[0] !== "" ? filters.state : "All", // If I want to change to multiple I need to change this to state: filters.state[0] !== "" ? filters.state.join(",") : "All",
  }).toString();

  console.log(`queryString: ${queryString}`);
  console.log(`filters: ${JSON.stringify(filters)}`);

  useEffect(() => {
    fetch(`/api/census/getStates`)
      .then((res) => res.json())
      .then((data) => setStateOptions(data.result))
      .catch((err) => console.error("Failed to load states", err));

    fetch(`/api/census/getFacilities`)
      .then((res) => res.json())
      .then((data) => setFacilityOptions(data.result))
      .catch((err) => console.error("Failed to load facilities", err));
  }, []);

  useEffect(() => {
    fetch(`/api/census/getAverageCensus?${queryString}`)
      .then((res) => res.json())
      .then((data) => setAverageCensus(data.result))
      .catch((err) => console.error("Failed to load average census", err));

    fetch(`/api/census/getTotalOccupancy?${queryString}`)
      .then((res) => res.json())
      .then((data) => setTotalOccupancy(data.totalOccupancy))
      .catch((err) => console.error("Failed to load total occupancy", err));

    /*fetch(`/api/census/getPayorDistribution?${queryString}`)
      .then((res) => res.json())
      .then((data) => setPayorDistribution(data.payorDistribution))
      .catch((err) => console.error("Failed to load payor distribution", err));*/

    fetch(`/api/census/getTrendData?${queryString}`)
      .then((res) => res.json())
      .then((data) => setTrendData(data.trendData))
      .catch((err) => console.error("Failed to load trend data", err));

    fetch(`/api/census/getBarChartData?${queryString}`)
      .then((res) => res.json())
      .then((data) => setBarChartData(data.barChartData))
      .catch((err) => console.error("Failed to load bar chart data", err));
  }, [filters]);

  useEffect(() => {
    console.log(`filters: ${JSON.stringify(filters)}`);
  }, [filters]);

  /*

  useEffect(() => {
    const fetchAverageCensus = async () => {
      fetch(`/api/census/getAverageCensus?${queryString}`)
        .then((res) => res.json())
        .then((data) => setAverageCensus(data.averageCensus))
        .catch((err) => console.error("Failed to load average census", err));
    };

    const fetchTotalOccupancy = async () => {
      fetch(`/api/census/getTotalOccupancy?${queryString}`)
        .then((res) => res.json())
        .then((data) => setTotalOccupancy(data.totalOccupancy))
        .catch((err) => console.error("Failed to load total occupancy", err));
    };

    const fetchPayorDistribution = async () => {
      fetch(`/api/census/getPayorDistribution?${queryString}`)
        .then((res) => res.json())
        .then((data) => setPayorDistribution(data.payorDistribution))
        .catch((err) =>
          console.error("Failed to load payor distribution", err)
        );
    };

    const fetchTrendData = async () => {
      fetch(`/api/census/getTrendData?${queryString}`)
        .then((res) => res.json())
        .then((data) => setTrendData(data.trendData))
        .catch((err) => console.error("Failed to load trend data", err));
    };

    const fetchBarChartData = async () => {
      fetch(`/api/census/getBarChartData?${queryString}`)
        .then((res) => res.json())
        .then((data) => setBarChartData(data.barChartData))
        .catch((err) => console.error("Failed to load bar chart data", err));
    };

    const fetchAll = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchAverageCensus(),
          fetchTotalOccupancy(),
          fetchPayorDistribution(),
          fetchTrendData(),
          fetchBarChartData(),
        ]);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [filters]);
*/
  console.log(`averageCensus: ${averageCensus}`);
  console.log(`startDate: ${filters.startDate}`);
  console.log(`endDate: ${filters.endDate}`);

  const { t } = useTranslation();

  const mockBarChartData = [
    {
      facility: "Gallatine Manor",
      payors: { "Medicare A": 25, HMO: 45, Medicaid: 10, Private: 5 },
      totalAverage: 100,
    },
    {
      facility: "Agawam",
      payors: { "Medicare A": 10, HMO: 20, Medicaid: 5, Private: 10 },
      totalAverage: 45,
    },
    {
      facility: "Springfield",
      payors: { "Medicare A": 15, HMO: 30, Medicaid: 10, Private: 5 },
      totalAverage: 60,
    },
  ];

  const mockDoughnutChartData = [
    {
      payer: "Medicare A",
      averagePercentage: 40,
      averageCount: 120,
    },

    {
      payer: "HMO",
      averagePercentage: 25,
      averageCount: 75,
    },
    {
      payer: "Medicaid",
      averagePercentage: 35,
      averageCount: 105,
    },
    {
      payer: "Private",
      averagePercentage: 10,
      averageCount: 30,
    },
    {
      payer: "VA",
      averagePercentage: 5,
      averageCount: 15,
    },
  ];

  const mockTrendData = [
    { Date: "2024-04-01", Count: 1358 },
    { Date: "2024-04-02", Count: 1348 },
    { Date: "2024-04-03", Count: 1352 },
    { Date: "2024-04-04", Count: 1341 },
    { Date: "2024-04-05", Count: 1347 },
    { Date: "2024-04-06", Count: 1341 },
    { Date: "2024-04-07", Count: 1337 },
    { Date: "2024-04-08", Count: 1341 },
    { Date: "2024-04-09", Count: 1357 },
    { Date: "2024-04-10", Count: 1341 },
  ];

  return (
    <React.Fragment>
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid>
          <Typography variant="h3" gutterBottom>
            Census Dashboard
          </Typography>
          <Typography variant="subtitle1">
            {t("Welcome back")}, Lucy! {t("We've missed you")}.{" "}
            <span role="img" aria-label="Waving Hand Sign">
              👋
            </span>
          </Typography>
        </Grid>

        <Grid>
          <Actions
            filters={filters}
            setFilters={setFilters}
            stateOptions={stateOptions}
            facilityOptions={facilityOptions}
          />
        </Grid>
      </Grid>
      {/*<Grid container spacing={6}>
         <Grid
          size={{
            xs: 12,
            md: 12,
          }}
        >
          <FilterBar filters={filters} setFilters={setFilters} />
        </Grid>
      </Grid>*/}

      <Divider my={3} />

      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid
          item
          size={{ xs: 12, lg: 4 }}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          {/* Stats section */}
          <div>
            <Grid container spacing={3}>
              <Grid item size={{ xs: 6 }}>
                <Stats
                  title="Average Census"
                  amount={averageCensus}
                  chip="placeholder"
                  percentagetext="+26%"
                  percentagecolor={green[500]}
                />
              </Grid>
              <Grid item size={{ xs: 6 }}>
                <Stats
                  title="Total Occupancy %"
                  amount="79%"
                  chip="placeholder"
                  percentagetext="-14%"
                  percentagecolor={red[500]}
                />
              </Grid>
            </Grid>
          </div>

          {/* Doughnut Chart section */}
          <div style={{ height: "100%" }}>
            <DoughnutChart
              dbData={mockDoughnutChartData}
              title="Payor Distribution"
              selected={filters.payors}
              onSelectPayor={(newPayors) =>
                setFilters((prev) => ({
                  ...prev,
                  payors: newPayors,
                }))
              }
            />
          </div>
        </Grid>

        {/* Right Column */}
        <Grid
          item
          size={{ xs: 12, lg: 8 }}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          {/* Line Chart */}
          <div>
            <LineChart dbData={mockTrendData} title="Census Trend" />
          </div>

          {/* Bar Chart */}
          <div>
            <BarChart
              dbData={mockBarChartData}
              title="Average Daily Census by Payor"
            />
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default CensusDashboard;
