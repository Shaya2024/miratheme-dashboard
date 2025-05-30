import React from "react";
import styled from "@emotion/styled";
import CustomDatePicker from "./CustomDatePicker";

import {
  Button as MuiButton,
  FormControlLabel,
  Switch,
  MenuItem,
  Checkbox,
  Grid,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  FormControl as MuiFormControl,
  Paper as MuiPaper,
  Select,
  Typography,
} from "@mui/material";

import {
  Loop as LoopIcon,
  FilterList as FilterListIcon,
  FileDownload as FileDownloadIcon,
} from "@mui/icons-material";

import { spacing } from "@mui/system";

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

const StyledCheckboxLabel = styled(FormControlLabel)(({ theme }) => ({
  margin: 0,
  padding: "4px 8px",
  borderRadius: 4,
  height: 36,
  ".MuiCheckbox-root": {
    padding: 4,
  },
  ".MuiTypography-root": {
    fontSize: "0.875rem",
  },
}));

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

function Actions({ filters, setFilters, facilityOptions, stateOptions }) {
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

        <Grid item>
          <FormControl sx={{ minWidth: 130 }}>
            <StyledSelect
              displayEmpty
              value={filters.state}
              onChange={handleChange("state")}
              renderValue={(selected) =>
                !selected || selected === "All" ? "State" : selected
              }
              MenuProps={MenuProps}
            >
              {["All", ...stateOptions.map((s) => s.state)].map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
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
              {["All", ...facilityOptions.map((f) => f["Facility Name"])].map(
                (facility) => (
                  <MenuItem key={facility} value={facility}>
                    {facility}
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

        <Grid
          item
          sx={(theme) => ({
            height: 36,
            display: "flex",
            alignItems: "center",
            border: `1px solid ${theme.palette.secondary.main}`,
            borderRadius: 1,
            padding: "0 8px",
          })}
        >
          <Typography sx={{ fontSize: "0.875rem" }}>Add Bed Holds:</Typography>
          <StyledCheckboxLabel
            sx={{ ml: 0 }}
            control={
              <Checkbox
                checked={filters.residentStatusPaid === 1}
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    residentStatusPaid: e.target.checked ? 1 : 0,
                  }));
                }}
              />
            }
            label="Paid"
          />
          <StyledCheckboxLabel
            sx={{ ml: 0 }}
            control={
              <Checkbox
                checked={filters.residentStatusUnpaid === 1}
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    residentStatusUnpaid: e.target.checked ? 1 : 0,
                  }));
                }}
              />
            }
            label="Unpaid"
          />
        </Grid>

        <Grid item>
          <FormControlLabel
            control={
              <Switch
                checked={filters.splitMedicaidPending}
                onChange={() =>
                  setFilters((prev) => ({
                    ...prev,
                    splitMedicaidPending: !prev.splitMedicaidPending,
                  }))
                }
              />
            }
            label="Medicaid Pending"
          />
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
    </React.Fragment>
  );
}

export default Actions;
