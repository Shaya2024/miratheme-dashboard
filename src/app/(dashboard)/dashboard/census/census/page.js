"use client";

import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import {
  Grid,
  Stack,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@mui/material";
import { spacing } from "@mui/system";
import { green, red } from "@mui/material/colors";

import Actions from "@/components/myCustomWidgets/Actions";
import LineChart from "@/components/myCustomWidgets/LineChart";
import DoughnutChart from "@/components/myCustomWidgets/DoughnutChart";
import Stats from "@/components/myCustomWidgets/Stats";
import BarChartStacked from "@/components/myCustomWidgets/BarChartStacked";

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
    startDate: thirtyDaysAgo,
    endDate: today,
    state: ["All"],
    facility: ["All"],
    residentStatusPaid: 0,
    residentStatusUnpaid: 0,
    payors: [],
    splitMedicaidPending: 0,
  });

  console.log(`filters: ${JSON.stringify(filters)}`);
  // ✅ Shared query string builder
  const buildQueryString = (selectCommand) =>
    new URLSearchParams({
      selectCommand: selectCommand,
      startDate: formatDate(filters.startDate),
      endDate: formatDate(filters.endDate),
      facility: filters.facility[0] !== "" ? filters.facility : "All",
      /* If I want to change to multiple, change to facility: filters.facility[0] !== "" ? filters.facility.join(",") : "All", */ residentStatusPaid:
        filters.residentStatusPaid,
      residentStatusUnpaid: filters.residentStatusUnpaid,
      payors: JSON.stringify(filters.payors.length ? filters.payors : ["All"]),
      splitMedicaidPending: filters.splitMedicaidPending ? "1" : "0",
      state: filters.state[0] !== "" ? filters.state : "All", // If I want to change to multiple I need to change this to state: filters.state[0] !== "" ? filters.state.join(",") : "All",
    }).toString();

  // ✅ Shared fetcher
  const fetchProcedure = async (selectCommand, setterCallback) => {
    try {
      const query = buildQueryString(selectCommand);
      const res = await fetch(`/api/census/getWidgetData?${query}`);
      const data = await res.json();
      setterCallback(data.result);
    } catch (err) {
      console.error(`Failed to load ${selectCommand}`, err);
    }
  };

  // 🧠 Fetch state & facility options — unchanged
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

  // 🧠 Fetch all widget data via shared method
  useEffect(() => {
    fetchProcedure("SELECT * FROM funccensus_payorarry", (result) =>
      setAverageCensus(result[0]?.cnt)
    );

    fetchProcedure("SELECT occupancypct from funcoccupancy", (result) =>
      setTotalOccupancy(result[0]?.occupancypct ?? "N/A")
    );

    fetchProcedure("SELECT * FROM payorpie_new", setPayorDistribution);

    fetchProcedure("SELECT * from censustrend", setTrendData);

    {
      /*fetchProcedure("SELECT * FROM payorcensusbar_new", setBarChartData);*/
    }
  }, [filters]);

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
      <Stack justifyContent="space-between" spacing={6}>
        <Grid>
          <Typography variant="h3" gutterBottom>
            Census Dashboard
          </Typography>
          <Typography variant="h4" gutterBottom>
            Census
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
      </Stack>
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
                  title="Census"
                  amount={averageCensus}
                  chip="placeholder"
                  percentagetext="+26%"
                  percentagecolor={green[500]}
                />
              </Grid>
              <Grid item size={{ xs: 6 }}>
                <Stats
                  title="Occupancy %"
                  amount={totalOccupancy}
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
              dbData={payorDistribution}
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
            <LineChart dbData={trendData} title="Census Trend" />
          </div>

          {/* Bar Chart */}
          <div>
            <BarChartStacked
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
