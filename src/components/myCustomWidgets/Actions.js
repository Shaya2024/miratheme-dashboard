import React from "react";
import styled from "@emotion/styled";
import { Calendar } from "lucide-react";

import {
  Button as MuiButton,
  Menu,
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
  MenuItem,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  FormControl as MuiFormControl,
  Paper as MuiPaper,
  Select,
  Typography,
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item>
          <SmallButton size="small" mr={2}>
            <LoopIcon />
          </SmallButton>
        </Grid>
        <Grid item>
          <SmallButton size="small" mr={2}>
            <FilterListIcon />
          </SmallButton>
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

        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            Today: April 29
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Today</MenuItem>
            <MenuItem onClick={handleClose}>Yesterday</MenuItem>
            <MenuItem onClick={handleClose}>Last 7 days</MenuItem>
            <MenuItem onClick={handleClose}>Last 30 days</MenuItem>
            <MenuItem onClick={handleClose}>This month</MenuItem>
            <MenuItem onClick={handleClose}>Last month</MenuItem>
          </Menu>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Calendar />
          </Button>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Today</MenuItem>
            <MenuItem onClick={handleClose}>Yesterday</MenuItem>
            <MenuItem onClick={handleClose}>Last 7 days</MenuItem>
            <MenuItem onClick={handleClose}>Last 30 days</MenuItem>
            <MenuItem onClick={handleClose}>This month</MenuItem>
            <MenuItem onClick={handleClose}>Last month</MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Actions;
