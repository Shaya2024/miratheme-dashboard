"use client";

import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import CustomSingleDatePicker from "@/components/myCustomWidgets/CustomSingleDatePicker";
import {
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@mui/material";

import BarChartNotStacked from "@/components/myCustomWidgets/BarChartNotStacked";

import {
  Button as MuiButton,
  FormControlLabel,
  MenuItem,
  Grid,
  FormControl as MuiFormControl,
  Select,
  Stack,
} from "@mui/material";

import {
  Loop as LoopIcon,
  FilterList as FilterListIcon,
  FileDownload as FileDownloadIcon,
} from "@mui/icons-material";

import { spacing } from "@mui/system";

const Divider = styled(MuiDivider)(spacing);
const Typography = styled(MuiTypography)(spacing);

const FormControlSpacing = styled(MuiFormControl)(spacing);

const FormControl = styled(FormControlSpacing)`
  display: flex;
  justify-content: center;
`;

const Button = styled(MuiButton)(spacing);

const SmallButton = styled(Button)`
  padding: 4px;
  min-width: 0;

  svg {
    width: 0.9em;
    height: 0.9em;
  }
`;

const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: "white",
  borderRadius: 4,
  height: 36,
  fontSize: "0.875rem",
  paddingLeft: 12,
  paddingRight: 12,
  display: "flex",
  alignItems: "center",
  ".MuiSelect-select": {
    display: "flex",
    alignItems: "center",
    padding: "0 !important",
    height: "100%",
  },
  ".MuiSelect-icon": {
    color: "white",
  },
  "& fieldset": {
    border: "none",
  },
}));

function IlStaffingDailyOverview() {
  const today = new Date();

  const formatDate = (d) =>
    d.toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });

  const [query1, setQuery1] = useState([]);
  const [query2, setQuery2] = useState([]);
  const [query3, setQuery3] = useState([]);
  const [query4, setQuery4] = useState([]);
  const [regionOptions, setRegionOptions] = useState([]);
  const [facilityOptions, setFacilityOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(`query1: ${JSON.stringify(query1)}`);
  console.log(`query2: ${JSON.stringify(query2)}`);
  console.log(`query3: ${JSON.stringify(query3)}`);
  console.log(`query4: ${JSON.stringify(query4)}`);

  const [filters, setFilters] = useState({
    date: today,
    region: "All",
    facility: "All",
  });

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

  // ✅ Shared fetcher
  const fetchProcedure = async (selectCommand, handleData, args = {}) => {
    try {
      const query = buildQueryString(selectCommand, args);
      const res = await fetch(`/api/census/getWidgetData3?${query}`);
      const data = await res.json();
      handleData(data.result); // let the caller decide what to do with result
    } catch (err) {
      console.error(`Failed to load ${selectCommand}`, err);
    }
  };

  // 🧠 Fetch all widget data via shared method
  useEffect(() => {
    const args = {
      facility: filters.facility,
      date: formatDate(filters.date),
      region: filters.region,
    };

    fetchProcedure(
      "SELECT * FROM total_hours_page1",
      (result) => {
        setQuery1(result);
      },
      args
    );

    fetchProcedure(
      "SELECT * FROM total_hours_worked_page1",
      (result) => {
        setQuery2(result);
      },
      args
    );

    fetchProcedure(
      "SELECT * FROM total_nursing_hours_worked_page1",
      (result) => {
        setQuery3(result);
      },
      args
    );

    fetchProcedure(
      "SELECT * FROM total_rn_hours_worked_page1",
      (result) => {
        setQuery4(result);
      },
      args
    );
  }, [filters]);

  useEffect(() => {
    fetchProcedure(
      "SELECT DISTINCT \"Facility_Name\" FROM census_staffing WHERE state = 'IL'",
      setFacilityOptions
    );

    fetchProcedure(
      "SELECT DISTINCT region FROM census_staffing WHERE state = 'IL'",
      setRegionOptions
    );
  }, []);

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

  const chart1Data =
    Array.isArray(query1) && Array.isArray(query2)
      ? query1.map((q1) => {
          const q2 = query2.find((q) => q.facility_name === q1.facility_name);
          const rawValue =
            (parseFloat(q2?.hours_worked) || 0) -
            (parseFloat(q1?.sum_total) || 0);

          return {
            facility: q1.facility_name,
            value: parseFloat(rawValue.toFixed(2)), // ✅ limit to 2 decimals
          };
        })
      : [];

  const chart2Data =
    Array.isArray(query1) && Array.isArray(query3)
      ? query1.map((q1) => {
          const q3 = query3.find((q) => q.facility_name === q1.facility_name);
          const rawValue =
            (parseFloat(q3?.hours_worked) || 0) -
            (parseFloat(q1?.sum_total) || 0) * 0.25;

          return {
            facility: q1.facility_name,
            value: parseFloat(rawValue.toFixed(2)), // ✅ limit to 2 decimals
          };
        })
      : [];

  const chart3Data =
    Array.isArray(query1) && Array.isArray(query4)
      ? query1.map((q1) => {
          const q4 = query4.find((q) => q.facility_name === q1.facility_name);
          const rawValue =
            (parseFloat(q4?.hours_worked) || 0) -
            (parseFloat(q1?.sum_total) || 0) * 0.1;

          return {
            facility: q1.facility_name,
            value: parseFloat(rawValue.toFixed(2)), // ✅ limit to 2 decimals
          };
        })
      : [];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  /* For multiselect 
    const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFilters((prev) => ({
      ...prev,
      [field]: value.includes("All") ? [] : value,
    }));
  };
  */

  const handleChange = (field) => (event) => {
    setFilters((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  return (
    <React.Fragment>
      <Stack justifyContent="space-between" spacing={6}>
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
          <Grid container spacing={2}>
            <Grid item>
              <CustomSingleDatePicker
                value={filters.date}
                onChange={(date) =>
                  setFilters((prev) => ({
                    ...prev,
                    date,
                  }))
                }
              />
            </Grid>

            {/* This is for MultiSelect 
        <Grid item>
          <FormControl sx={{ minWidth: 148 }}>
            <StyledSelect
              multiple
              displayEmpty
              value={filters.state}
              onChange={handleChange("state")}
              renderValue={(selected) =>
                selected.length > 0 ? selected.join(", ") : "State"
              }
              MenuProps={MenuProps}
            >
              {stateOptions.map((state) => (
                <MenuItem key={state} value={state}>
                  <Checkbox checked={filters.state.includes(state)} />
                  <ListItemText primary={state} />
                </MenuItem>
              ))}
            </StyledSelect>
          </FormControl>
        </Grid>
        */}

            <Grid item>
              <FormControl sx={{ minWidth: 130 }}>
                <StyledSelect
                  displayEmpty
                  value={filters.region}
                  onChange={handleChange("region")}
                  renderValue={(selected) =>
                    !selected || selected === "All" ? "Region" : selected
                  }
                  MenuProps={MenuProps}
                >
                  {["All", ...regionOptions.map((r) => r.region)].map(
                    (region) => (
                      <MenuItem key={region} value={region}>
                        {region}
                      </MenuItem>
                    )
                  )}
                </StyledSelect>
              </FormControl>
            </Grid>

            {/* This is for MultiSelect 
        <Grid item>
          <FormControl sx={{ minWidth: 148 }}>
            <StyledSelect
              multiple
              displayEmpty
              value={filters.facility}
              onChange={handleChange("facility")}
              renderValue={(selected) =>
                selected.length > 0 ? selected.join(", ") : "Facility"
              }
              MenuProps={MenuProps}
            >
              {facilityOptions.map((facility) => (
                <MenuItem key={facility} value={facility}>
                  <Checkbox checked={filters.facility.includes(facility)} />
                  <ListItemText primary={facility} />
                </MenuItem>
              ))}
            </StyledSelect>
          </FormControl>
        </Grid>
        */}

            <Grid item>
              <FormControl sx={{ minWidth: 130 }}>
                <StyledSelect
                  displayEmpty
                  value={filters.facility}
                  onChange={handleChange("facility")}
                  renderValue={(selected) =>
                    !selected || selected === "All"
                      ? "Facility"
                      : selected.length > 3
                      ? selected.slice(0, 9) + "…"
                      : selected
                  }
                  MenuProps={MenuProps}
                >
                  {["All", ...facilityOptions.map((f) => f.Facility_Name)].map(
                    (facility) => (
                      <MenuItem key={facility} value={facility}>
                        {facility}
                      </MenuItem>
                    )
                  )}
                </StyledSelect>
              </FormControl>
            </Grid>

            <Grid item>
              <SmallButton size="small" mr={2}>
                <FileDownloadIcon />
              </SmallButton>
            </Grid>

            <Grid item>
              <SmallButton size="small" mr={2}>
                <FilterListIcon />
              </SmallButton>
            </Grid>

            <Grid item>
              <SmallButton size="small" mr={2}>
                <LoopIcon />
              </SmallButton>
            </Grid>
          </Grid>
        </Grid>
      </Stack>

      <Divider my={3} />

      <BarChartNotStacked dbData={chart1Data} title="Total Hours" />
      <BarChartNotStacked
        dbData={chart2Data}
        title="Nursing Hours
"
      />
      <BarChartNotStacked dbData={chart3Data} title="RN Hours" />
    </React.Fragment>
  );
}

export default IlStaffingDailyOverview;
