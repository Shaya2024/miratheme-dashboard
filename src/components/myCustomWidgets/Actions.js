import React from "react";
import styled from "@emotion/styled";
import { Calendar } from "lucide-react";
import CustomDatePicker from "./CustomDatePicker";

import {
  Popover,
  Button as MuiButton,
  FormControlLabel,
  Switch,
  MenuItem,
  OutlinedInput,
  CardContent,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Link,
  ListItemText,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider,
  FormControl as MuiFormControl,
  Paper as MuiPaper,
  Select,
  Typography,
  Box,
} from "@mui/material";

import {
  Loop as LoopIcon,
  FilterList as FilterListIcon,
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

function Actions({
  filters,
  setFilters,
  facilityOptions = [],
  stateOptions = [],
}) {
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

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFilters((prev) => ({
      ...prev,
      [field]: value.includes("All") ? [] : value,
    }));
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handlePreset = (days) => {
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - days);
    setFilters((prev) => ({
      ...prev,
      startDate: startDate.toISOString(),
      endDate: today.toISOString(),
    }));
    handleClose();
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

        <Grid
          item
          sx={(theme) => ({
            height: 36,
            display: "flex",
            alignItems: "center",
            gap: 1,
            border: `1px solid ${theme.palette.secondary.main}`,
            borderRadius: 1,
            padding: "0 8px",
          })}
        >
          <Typography sx={{ fontSize: "0.875rem" }}>Status:</Typography>
          <StyledCheckboxLabel
            control={
              <Checkbox
                checked={filters.status.includes("Paid")}
                onChange={(e) => {
                  const newStatus = e.target.checked
                    ? [...filters.status, "Paid", "Active"]
                    : filters.status.filter((s) => s !== "Paid");
                  setFilters((prev) => ({ ...prev, status: newStatus }));
                }}
              />
            }
            label="Paid"
          />
          <StyledCheckboxLabel
            control={
              <Checkbox
                checked={filters.status.includes("Unpaid")}
                onChange={(e) => {
                  const newStatus = e.target.checked
                    ? [...filters.status, "Unpaid", "Active"]
                    : filters.status.filter((s) => s !== "Unpaid");
                  setFilters((prev) => ({ ...prev, status: newStatus }));
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
            label="Split Medicaid Pending"
          />
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
