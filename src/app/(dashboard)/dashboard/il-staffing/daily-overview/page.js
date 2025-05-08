"use client";

import React from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Container } from "@mui/material";

import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@mui/material";
import { spacing } from "@mui/system";
import { green, red } from "@mui/material/colors";

import Actions from "@/components/myCustomWidgets/Actions";
import BarChartNotStacked from "@/components/myCustomWidgets/BarChartNotStacked";
const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

function IlStaffingDailyOverview() {
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
  const { t } = useTranslation();

  const mockBarChartNotStackedData1 = [
    { facility: "Agawam", value: -3, total: 9 },
    { facility: "Springfield", value: 5, total: 12 },
    { facility: "ABC", value: 5, total: 12 },
    { facility: "Carmi", value: -2 },
    { facility: "Robinson", value: 2 },
    { facility: "Gallatin", value: 8 },
    { facility: "Agawam East", value: -6 },
    { facility: "Agwam North", value: 4 },
    { facility: "Agwam Wwest", value: 9 },
  ];
  const mockBarChartNotStackedData2 = [
    { facility: "Agawam", value: -3, total: 9 },
    { facility: "Springfield", value: 5, total: 12 },
    { facility: "ABC", value: 5, total: 12 },
    { facility: "Carmi", value: -2 },
    { facility: "Robinson", value: 2 },
    { facility: "Gallatin", value: 8 },
    { facility: "Agawam East", value: -6 },
    { facility: "Agwam North", value: 4 },
    { facility: "Agwam Wwest", value: 9 },
  ];
  const mockBarChartNotStackedData3 = [
    { facility: "Agawam", value: -3, total: 9 },
    { facility: "Springfield", value: 5, total: 12 },
    { facility: "ABC", value: 5, total: 12 },
    { facility: "Carmi", value: -2 },
    { facility: "Robinson", value: 2 },
    { facility: "Gallatin", value: 8 },
    { facility: "Agawam East", value: -6 },
    { facility: "Agwam North", value: 4 },
    { facility: "Agwam Wwest", value: 9 },
  ];

  return (
    <React.Fragment>
      <Grid justifyContent="space-between" container spacing={6}>
        <Grid>
          <Typography variant="h3" gutterBottom>
            IL Staffing Dashboard
          </Typography>
          <Typography variant="h4" gutterBottom>
            Daily Overview
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

      <Divider my={3} />

      <BarChartNotStacked
        dbData={mockBarChartNotStackedData1}
        title="Total Hours"
      />
      <BarChartNotStacked
        dbData={mockBarChartNotStackedData2}
        title="Nursing Hours
"
      />
      <BarChartNotStacked
        dbData={mockBarChartNotStackedData3}
        title="RN Hours"
      />
    </React.Fragment>
  );
}

export default IlStaffingDailyOverview;
