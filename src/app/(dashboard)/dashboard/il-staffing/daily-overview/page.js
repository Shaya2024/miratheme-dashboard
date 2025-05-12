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
import BarChartNotStacked from "@/components/myCustomWidgets/BarChartNotStacked";

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
