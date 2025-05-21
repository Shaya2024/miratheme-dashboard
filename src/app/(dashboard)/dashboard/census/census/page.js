"use client";

import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import useAuth from "@/hooks/useAuth";
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
  const { user } = useAuth();
  const fullName = user?.displayName || "User";
  const firstName = fullName.split(" ")[0];
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

  console.log(`facilityOptions: ${JSON.stringify(facilityOptions)}`);
  console.log(`barChartData: ${JSON.stringify(barChartData)}`);

  const [filters, setFilters] = useState({
    startDate: today,
    endDate: today,
    state: "All",
    facility: "All",
    residentStatusPaid: 0,
    residentStatusUnpaid: 0,
    payors: [],
    splitMedicaidPending: false,
  });

  console.log(`filters: ${JSON.stringify(filters)}`);
  // ✅ Shared query string builder
  const buildQueryString = (selectCommand, args = {}) => {
    return new URLSearchParams({
      selectCommand,
      ...Object.fromEntries(
        Object.entries(args).map(([key, val]) => [
          key,
          key === "payors" ? JSON.stringify(val) : val,
        ])
      ),
    }).toString();
  };

  const fetchProcedure = async (selectCommand, setterCallback, args) => {
    try {
      const query = buildQueryString(selectCommand, args);
      const res = await fetch(`/api/census/getWidgetData3?${query}`);
      const data = await res.json();
      setterCallback(data.result);
    } catch (err) {
      console.error(`Failed to load ${selectCommand}`, err);
    }
  };

  useEffect(() => {
    fetchProcedure(
      "SELECT DISTINCT state FROM stern_portfolio_location_info",
      setStateOptions
    );
    fetchProcedure(
      'SELECT DISTINCT "Facility Name" FROM stern_portfolio_location_info',
      setFacilityOptions
    );
  }, []);

  // 🧠 Fetch all widget data via shared method
  useEffect(() => {
    const toMDY = (d) =>
      d.toLocaleDateString("en-US", {
        year: "2-digit",
        month: "numeric",
        day: "numeric",
      });

    const args = {
      startDate: toMDY(filters.startDate),
      endDate: toMDY(filters.endDate),
      facility: filters.facility,
      residentStatusPaid: filters.residentStatusPaid,
      residentStatusUnpaid: filters.residentStatusUnpaid,
      payors: filters.payors.length ? filters.payors : ["All"],
      splitMedicaidPending: filters.splitMedicaidPending ? "1" : "0",
      state: filters.state,
    };

    fetchProcedure(
      "SELECT * FROM funccensus_payorarry",
      (result) => setAverageCensus(result[0]?.cnt),
      args
    );

    fetchProcedure(
      "SELECT occupancypct from funcoccupancy_payorarry",
      (result) => setTotalOccupancy(result[0]?.occupancypct ?? "N/A"),
      args
    );

    fetchProcedure("SELECT * FROM payorpie_new", setPayorDistribution, args);
    fetchProcedure("SELECT * FROM censustrend_payorarry", setTrendData, args);
    fetchProcedure("SELECT * from bar_census", setBarChartData, args);
  }, [filters]);

  const { t } = useTranslation();

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
            {t("Welcome back")}, {firstName}! {t("We've missed you")}.{" "}
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
              dbData={barChartData}
              title="Average Daily Census by Payor"
            />
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default CensusDashboard;
