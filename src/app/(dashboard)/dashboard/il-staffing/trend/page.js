"use client";

import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import CustomDatePicker from "@/components/myCustomWidgets/CustomDatePicker";
import {
  Divider as MuiDivider,
  Typography as MuiTypography,
  Stack,
} from "@mui/material";

import BarLineComboChart from "@/components/myCustomWidgets/BarLineComboChart";
import { green, red } from "@mui/material/colors";
import Loader from "@/components/Loader";

import {
  Button as MuiButton,
  FormControlLabel,
  MenuItem,
  Grid,
  FormControl as MuiFormControl,
  Select,
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

function IlStaffingTrend() {
  const today = new Date();

  const formatDate = (d) =>
    d.toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });

  const [query5, setQuery5] = useState("");
  const [query6, setQuery6] = useState("");
  const [query7, setQuery7] = useState("");
  const [query8, setQuery8] = useState("");
  const [regionOptions, setRegionOptions] = useState(["All "]);
  const [facilityOptions, setFacilityOptions] = useState(["All"]);
  const [loading, setLoading] = useState(false);
  console.log(`facilityOptions: ${JSON.stringify(facilityOptions)}`);

  console.log(`query5: ${JSON.stringify(query5)}`);
  console.log(`query6: ${JSON.stringify(query6)}`);
  console.log(`query7: ${JSON.stringify(query7)}`);
  console.log(`query8: ${JSON.stringify(query8)}`);

  const [filters, setFilters] = useState({
    startDate: today,
    endDate: today,
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
    setLoading(true);
    const args = {
      region: filters.region,
      facility: filters.facility,
      startDate: formatDate(filters.startDate),
      endDate: formatDate(filters.endDate),
    };

    fetchProcedure(
      "SELECT sum(sum_total) FROM total_hours_page3",
      (result) => {
        setQuery5(result);
      },
      args
    );

    fetchProcedure(
      "SELECT datekey, SUM(hours_worked) AS hours_worked FROM total_hours_worked_page3 GROUP BY datekey",
      (result) => {
        setQuery6(result);
      },
      args
    );

    fetchProcedure(
      "SELECT datekey, SUM(hours_worked) AS hours_worked FROM total_nursing_hours_worked_page3 GROUP BY datekey",
      (result) => {
        setQuery7(result);
      },
      args
    );

    fetchProcedure(
      "SELECT datekey, SUM(hours_worked) AS hours_worked FROM total_rn_hours_worked_page3 GROUP BY datekey",
      (result) => {
        setQuery8(result);
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
            Requirements
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
              <CustomDatePicker
                value={{
                  startDate: filters.startDate,
                  endDate: filters.endDate,
                }}
                onChange={({ startDate, endDate }) =>
                  setFilters((prev) => ({
                    ...prev,
                    startDate,
                    endDate,
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
                    !selected || selected === "All"
                      ? "Region"
                      : selected.length > 3
                      ? selected.slice(0, 9) + "…"
                      : selected
                  }
                  MenuProps={MenuProps}
                >
                  {[
                    "All",
                    ...(Array.isArray(regionOptions) && regionOptions[0]?.region
                      ? regionOptions.map((r) => r.region)
                      : []),
                  ].map((region) => (
                    <MenuItem key={region} value={region}>
                      {region}
                    </MenuItem>
                  ))}
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
                  {[
                    "All",
                    ...(Array.isArray(facilityOptions) &&
                    facilityOptions[0]?.Facility_Name
                      ? facilityOptions.map((f) => f.Facility_Name)
                      : []),
                  ].map((facility) => (
                    <MenuItem key={facility} value={facility}>
                      {facility}
                    </MenuItem>
                  ))}
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

      <BarLineComboChart
        barData={query6}
        lineData={query5}
        title="Total Hours"
      />

      <BarLineComboChart
        barData={query7}
        lineData={query5}
        title="Nursing Hours"
      />

      <BarLineComboChart barData={query8} lineData={query5} title="RN Hours" />
    </React.Fragment>
  );
}

export default IlStaffingTrend;
