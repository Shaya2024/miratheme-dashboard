"use client";

import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import CustomDatePicker from "@/components/myCustomWidgets/CustomDatePicker";
import {
  Divider as MuiDivider,
  Typography as MuiTypography,
  Stack,
  Box,
} from "@mui/material";

import ThresholdBarChart from "@/components/myCustomWidgets/ThresholdBarChart";
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

  const [queryQ1, setQueryQ1] = useState("");
  const [queryQ2, setQueryQ2] = useState("");

  const [regionOptions, setRegionOptions] = useState(["All "]);
  const [facilityOptions, setFacilityOptions] = useState(["All"]);
  const [loading, setLoading] = useState(false);
  console.log(`facilityOptions: ${JSON.stringify(facilityOptions)}`);

  console.log(`queryQ1: ${JSON.stringify(queryQ1)}`);
  console.log(`queryQ2: ${JSON.stringify(queryQ2)}`);

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
      "SELECT facility_name,total_per_q FROM ma_staffing WHERE quarter = 'Q1_2025'",
      (result) => {
        setQueryQ1(result);
      },
      args
    );

    fetchProcedure(
      "SELECT facility_name,total_per_q FROM ma_staffing WHERE quarter = 'Q2_2025'",
      (result) => {
        setQueryQ2(result);
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
            MA Staffing Dashboard
          </Typography>
          <Typography variant="h4" gutterBottom>
            Overview
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
      <Box display="flex" justifyContent="center" mt={2}>
        <ThresholdBarChart
          data={queryQ1}
          nameKey="facility_name"
          valueKey="total_per_q"
        />
      </Box>

      <Box display="flex" justifyContent="center" mt={2}>
        <ThresholdBarChart
          data={queryQ2}
          nameKey="facility_name"
          valueKey="total_per_q"
        />
      </Box>
    </React.Fragment>
  );
}

export default IlStaffingTrend;
