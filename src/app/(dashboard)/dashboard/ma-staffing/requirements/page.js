"use client";

import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import CustomSingleDatePicker from "@/components/myCustomWidgets/CustomSingleDatePicker";
import {
  Divider as MuiDivider,
  Typography as MuiTypography,
  Stack,
} from "@mui/material";

import Stats from "@/components/myCustomWidgets/Stats";
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

function IlStaffingRequirements() {
  const today = new Date();

  const formatDate = (d) =>
    d.toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });

  const [queryLastQ, setQueryLastQ] = useState("");
  const [queryCurrentQ, setQueryCurrentQ] = useState("");
  const [queryCurrentQ30Days, setQueryCurrentQ30Days] = useState("");
  const [facilityOptions, setFacilityOptions] = useState(["All"]);
  const [loading, setLoading] = useState(false);
  console.log(`facilityOptions: ${JSON.stringify(facilityOptions)}`);

  console.log(`queryLastQ: ${JSON.stringify(queryLastQ)}`);
  console.log(`queryCurrentQ: ${JSON.stringify(queryCurrentQ)}`);
  console.log(`queryCurrentQ30Days: ${JSON.stringify(queryCurrentQ30Days)}`);

  const [filters, setFilters] = useState({
    date: today,
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
      date: formatDate(filters.date),
      facility: filters.facility,
    };

    fetchProcedure(
      "SELECT * FROM ma_last_q",
      (result) => {
        setQueryLastQ(result[0]?.sum_total);
      },
      args
    );

    fetchProcedure(
      "SELECT * FROM ma_current_q",
      (result) => {
        setQueryCurrentQ(result[0]?.sum_total);
      },
      args
    );

    fetchProcedure(
      "SELECT * FROM ma_current_q_30days",
      (result) => {
        setQueryCurrentQ30Days(result[0]?.sum_total);
      },
      args
    );
  }, [filters]);

  useEffect(() => {
    fetchProcedure(
      "SELECT DISTINCT \"Facility_Name\" FROM census_staffing WHERE state = 'MA'",
      setFacilityOptions
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
            MA Staffing Dashboard
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

      <Grid container spacing={3}>
        <Grid item size={{ xs: 4, lg: 4 }}>
          <Stats
            title="LAST Q (Q1-2025)"
            amount={
              queryLastQ === "" ? <Loader /> : Number(queryLastQ).toFixed(2)
            }
            chip="placeholder"
            align="center"
          />
        </Grid>
        <Grid item size={{ xs: 4, lg: 4 }}>
          <Stats
            title="CURRENT Q (Q2-2025)"
            amount={
              queryCurrentQ === "" ? (
                <Loader />
              ) : (
                Number(queryCurrentQ).toFixed(2)
              )
            }
            chip="placeholder"
            align="center"
          />
        </Grid>
        <Grid item size={{ xs: 4, lg: 4 }}>
          <Stats
            title="CURRENT Q (Q2-2025)"
            amount={
              queryCurrentQ30Days === "" ? (
                <Loader />
              ) : (
                Number(queryCurrentQ30Days).toFixed(2)
              )
            }
            chip="placeholder"
            align="center"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default IlStaffingRequirements;
