import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Typography,
  Switch,
  Card as MuiCard,
  CardContent,
  useTheme,
} from "@mui/material";
import { spacing } from "@mui/system";
import styled from "@emotion/styled";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { red } from "@mui/material/colors";
import { styled as muiStyled } from "@mui/material/styles";

const Card = styled(MuiCard)(spacing);

const HeaderContainer = muiStyled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "10px",
}));

const MonthYear = muiStyled("span")(({ theme }) => ({
  margin: "0 10px",
  fontSize: "16px",
  fontWeight: "bold",
}));

const NavButton = muiStyled("button")(({ theme }) => ({
  background: "none",
  border: "none",
  padding: "5px 10px",
  cursor: "pointer",
  fontSize: "16px",
  color: theme.palette.primary.main,
  "&:disabled": {
    color: theme.palette.action.disabled,
  },
}));

// Custom header component
const CustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}) => (
  <HeaderContainer>
    <NavButton
      onClick={decreaseMonth}
      disabled={prevMonthButtonDisabled}
      type="button"
    >
      ←
    </NavButton>
    <MonthYear>
      {date.toLocaleString("default", { month: "long", year: "numeric" })}
    </MonthYear>
    <NavButton
      onClick={increaseMonth}
      disabled={nextMonthButtonDisabled}
      type="button"
    >
      →
    </NavButton>
  </HeaderContainer>
);

// Add this near the top of the file, after the imports
const getCustomDatePickerStyles = (theme) => `
  .react-datepicker {
    font-family: 'Roboto', sans-serif;
    border: none;
    border-radius: 12px;
    overflow: hidden;
  }
  
  .react-datepicker__month-container {
    background: ${theme.palette.background.paper};
  }

  .react-datepicker__header {
    background: ${theme.palette.background.paper};
    border-bottom: 1px solid ${theme.palette.primary.main};
    padding-top: 15px;
  }

  .react-datepicker__day {
    margin: 3px;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    border-radius: 50%;
    transition: all 0.2s ease;
    color: ${theme.palette.text.primary};
  }

  .react-datepicker__day--outside-month {
    color: ${theme.palette.text.primary};
  }

  .react-datepicker__day-name {
    margin: 3px;
    width: 2rem;
    color: ${theme.palette.text.primary};
  }

  .react-datepicker__day:hover {
    background-color: ${theme.palette.primary.main} !important;
    border-radius: 50% !important;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--in-range,
  .react-datepicker__day--in-selecting-range {
    background-color: ${theme.palette.primary.main} !important;
    color: white !important;
    border-radius: 50% !important;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: ${theme.palette.primary.main} !important;
    color: white !important;
    border-radius: 50% !important;
  }

  .react-datepicker__day--in-range:not(.react-datepicker__day--selected) {
    background-color: ${theme.palette.primary.light};
    color: ${theme.palette.primary.main};
  }

  .react-datepicker__day--today {
    font-weight: bold;
    color: ${theme.palette.primary.main};
  }

  .react-datepicker__current-month {
    font-size: 1rem;
    color: ${theme.palette.text.primary};
    font-weight: 500;
  }

  .react-datepicker__navigation {
    top: 15px;
  }
`;

const FilterBar = ({
  filters,
  setFilters,
  facilityOptions = [],
  stateOptions = [],
}) => {
  const theme = useTheme();

  // Add this to see all available theme colors
  useEffect(() => {
    console.log("Theme Colors:", {
      palette: theme.palette,
    });
  }, [theme]);

  // Convert string dates to Date objects for react-datepicker
  const [startDate, setStartDate] = useState(
    filters.startDate ? new Date(filters.startDate) : null
  );
  const [endDate, setEndDate] = useState(
    filters.endDate ? new Date(filters.endDate) : null
  );

  // Add state for date picker visibility and range mode
  const [isOpen, setIsOpen] = useState(false);
  const [isSelectingRange, setIsSelectingRange] = useState(false);

  // Format dates for display
  const formatDisplayDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Handle opening the date picker
  const handleOpenPicker = (event) => {
    event.stopPropagation(); // ✅ Prevent global mousedown from firing
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsSelectingRange(false);
      setIsOpen(true);
    }
  };

  // Handle date selection
  const handleDateChange = (date) => {
    if (!isSelectingRange) {
      // Single date mode
      setStartDate(date);
      setEndDate(null);
      setIsSelectingRange(true);

      const dateStr = date.toISOString().split("T")[0];
      setFilters((prev) => ({
        ...prev,
        startDate: dateStr,
        endDate: dateStr,
      }));
    } else if (date < startDate) {
      // If selecting a date before start date in range mode,
      // switch back to single date mode
      setStartDate(date);
      setEndDate(null);
      setIsSelectingRange(true);

      const dateStr = date.toISOString().split("T")[0];
      setFilters((prev) => ({
        ...prev,
        startDate: dateStr,
        endDate: dateStr,
      }));
    } else {
      // Completing the range selection
      setEndDate(date);
      setIsSelectingRange(false);

      setFilters((prev) => ({
        ...prev,
        startDate: startDate.toISOString().split("T")[0],
        endDate: date.toISOString().split("T")[0],
      }));
    }
  };

  // Get formatted date range for display
  const getDisplayDateRange = () => {
    if (!startDate) return "Select dates";

    if (!endDate || startDate.getTime() === endDate.getTime()) {
      return formatDisplayDate(startDate);
    }

    return `${formatDisplayDate(startDate)} - ${formatDisplayDate(endDate)}`;
  };

  // Handle changes for regular form controls
  const handleChange = (field) => (event) => {
    const value = event.target.value;

    setFilters((prev) => ({
      ...prev,
      [field]: value.includes("All") ? [] : value,
    }));
  };

  useEffect(() => {
    // Inject custom styles
    const styleElement = document.createElement("style");
    styleElement.textContent = getCustomDatePickerStyles(theme);
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        !inputRef.current?.contains(event.target) // 👈 make sure it's not the input box
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const calendarRef = useRef();
  const inputRef = useRef();

  return (
    <Card sx={{ backgroundColor: "background.paper" }} mb={1}>
      <CardContent>
        <Box
          display="flex"
          flexWrap="wrap"
          flexDirection={{ xs: "column", md: "row" }}
          gap={3}
          mb={0.1}
          width="95%"
          justifyContent="flex-start"
          sx={{
            color: "text.primary",
            backgroundColor: "background.paper",
            "& > *": {
              minWidth: "200px",
              maxWidth: "80%",
            },
          }}
        >
          {/* Custom Date Picker */}
          <Box
            sx={{
              position: "relative",
              minWidth: "250px",
              backgroundColor: "background.paper",
            }}
          >
            <Box
              onClick={handleOpenPicker}
              ref={inputRef}
              sx={{
                display: "flex",
                alignItems: "center",
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: "4px",
                padding: "0 16px",
                cursor: "pointer",
                minWidth: "250px",
                height: "40px",
                boxSizing: "border-box",
                backgroundColor: "background.paper",
                "&:hover": {
                  borderColor: "primary.main",
                },
              }}
            >
              <Typography sx={{ flex: 1 }}>{getDisplayDateRange()}</Typography>
              <CalendarTodayIcon color="primary" sx={{ ml: 1 }} />
            </Box>

            {isOpen && (
              <Box
                ref={calendarRef}
                sx={{
                  position: "fixed",
                  top: "40%",
                  left: "36%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 9999,
                  mt: 1,
                  width: "auto",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                  backgroundColor: "white",
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                }}
              >
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsStart={!isSelectingRange && !!startDate}
                  selectsEnd={isSelectingRange && !!startDate}
                  inline
                  monthsShown={1}
                  highlightDates={[startDate, endDate].filter(Boolean)}
                  dayClassName={(date) => {
                    if (!startDate || !date) return "";
                    if (
                      date.toDateString() === startDate.toDateString() ||
                      (endDate &&
                        date.toDateString() === endDate.toDateString())
                    ) {
                      return "react-datepicker__day--highlighted";
                    }
                    return "";
                  }}
                  renderCustomHeader={CustomHeader}
                  calendarContainer={({ className, children }) => (
                    <Box
                      sx={{
                        minWidth: "610px", // Increased width for better spacing
                        borderRadius: "12px",
                        overflow: "hidden",
                        border: "none",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                        backgroundColor: theme.palette.background.paper,
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                      }}
                    >
                      {/* Calendar */}
                      <div className={className}>{children}</div>

                      {/* Presets */}

                      <Box
                        sx={{
                          width: "300px",
                          borderLeft: `1px solid ${theme.palette.divider}`,
                          px: 2,
                          py: 2,
                          backgroundColor: theme.palette.background.paper,
                          color: theme.palette.text.primary,
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          justifyContent: "center",
                          alignItems: "flex-start",
                          overflowY: "auto", // 👈 scroll if too tall
                          maxHeight: "280px", // 👈 same height as calendar ideally
                        }}
                      >
                        {[
                          { label: "This week", type: "thisWeek" },
                          { label: "Since last week", type: "sinceLastWeek" },
                          { label: "This month", type: "thisMonth" },
                          { label: "Since last month", type: "sinceLastMonth" },
                          { label: "Last 3 months", months: 3 },
                          { label: "Last 6 months", months: 6 },
                          { label: "Last 9 months", months: 9 },
                          { label: "Last 12 months", months: 12 },
                          { label: "This year", type: "thisYear" },
                          { label: "Since last year", type: "sinceLastYear" },
                        ].map((preset) => (
                          <Box
                            key={preset.label}
                            onClick={() => {
                              const today = new Date();
                              let start,
                                end = today;

                              if (preset.type === "thisWeek") {
                                const dayOfWeek = today.getDay(); // 0 (Sun) - 6 (Sat)
                                start = new Date(today);
                                start.setDate(today.getDate() - dayOfWeek); // Sunday
                                end = today;
                              } else if (preset.type === "sinceLastWeek") {
                                const lastSunday = new Date(today);
                                lastSunday.setDate(
                                  today.getDate() - today.getDay() - 7
                                );
                                start = lastSunday;
                                end = today;
                              } else if (preset.type === "thisMonth") {
                                start = new Date(
                                  today.getFullYear(),
                                  today.getMonth(),
                                  1
                                );
                                end = today;
                              } else if (preset.type === "sinceLastMonth") {
                                start = new Date(
                                  today.getFullYear(),
                                  today.getMonth() - 1,
                                  1
                                );
                                end = today;
                              } else if (preset.months) {
                                start = new Date(today);
                                start.setMonth(
                                  today.getMonth() - preset.months
                                );
                                end = today;
                              } else if (preset.type === "thisYear") {
                                start = new Date(today.getFullYear(), 0, 1);
                                end = today;
                              } else if (preset.type === "sinceLastYear") {
                                start = new Date(today.getFullYear() - 1, 0, 1);
                                end = today;
                              }

                              setStartDate(start);
                              setEndDate(end);
                              setFilters((prev) => ({
                                ...prev,
                                startDate: start.toISOString().split("T")[0],
                                endDate: end.toISOString().split("T")[0],
                              }));
                              setIsOpen(false);
                            }}
                            sx={{
                              width: "100%",
                              px: 1,
                              py: 0.5,
                              fontSize: "0.8rem",
                              fontWeight: 500,
                              fontFamily: "Roboto, sans-serif",
                              borderRadius: "6px",
                              cursor: "pointer",
                              border: `1px solid ${theme.palette.divider}`,
                              textAlign: "center",
                              "&:hover": {
                                bgcolor: theme.palette.action.hover,
                              },
                            }}
                          >
                            {preset.label}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}
                />
              </Box>
            )}
          </Box>

          {/* State Filter */}
          <FormControl
            sx={{
              minWidth: "200px",
              position: "relative",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                top: "-12px",
                left: "10px",
                padding: "0 5px",
                backgroundColor: "background.paper",
                color: "text.primary",
                zIndex: 1,
              }}
            >
              State
            </Typography>
            <Select
              multiple
              value={filters.state}
              onChange={handleChange("state")}
              displayEmpty
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <Typography variant="body2" color="text.primary">
                      All
                    </Typography>
                  );
                }
                return selected.join(", ");
              }}
              size="small"
              sx={{
                height: "40px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "background.paper",
                "& .MuiSelect-select": {
                  padding: "0 16px",
                  display: "flex",
                  alignItems: "center",
                  height: "40px",
                },
              }}
            >
              <MenuItem
                value="All"
                sx={{
                  color: "text.primary",
                }}
              >
                <Typography variant="body2">All</Typography>
              </MenuItem>
              {stateOptions.map((state) => (
                <MenuItem
                  key={state}
                  value={state}
                  sx={{
                    color: "text.primary",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "action.selected",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "action.selected",
                    },
                  }}
                >
                  <Typography variant="body2">{state}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Facility Filter */}
          <FormControl
            sx={{
              minWidth: "200px",
              position: "relative",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                top: "-12px",
                left: "10px",
                padding: "0 5px",
                backgroundColor: "background.paper",
                color: "text.primary",
                zIndex: 1,
              }}
            >
              Facility
            </Typography>
            <Select
              multiple
              value={filters.facility}
              onChange={handleChange("facility")}
              displayEmpty
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return (
                    <Typography variant="body2" color="text.primary">
                      All
                    </Typography>
                  );
                }
                return selected.join(", ");
              }}
              size="small"
              sx={{
                height: "40px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "background.paper",
                "& .MuiSelect-select": {
                  padding: "0 16px",
                  display: "flex",
                  alignItems: "center",
                  height: "40px",
                },
              }}
            >
              <MenuItem
                value="All"
                sx={{
                  color: "text.primary",
                }}
              >
                <Typography variant="body2">All</Typography>
              </MenuItem>
              {facilityOptions.map((facility) => (
                <MenuItem
                  key={facility}
                  value={facility}
                  sx={{
                    color: "text.primary",
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "action.selected",
                    },
                    "&.Mui-selected:hover": {
                      backgroundColor: "action.selected",
                    },
                  }}
                >
                  <Typography variant="body2">{facility}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Status Filters */}
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 1,
              minWidth: "200px",
              px: 2,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              height: "40px",
              boxSizing: "border-box",
              backgroundColor: "background.paper",
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                top: "-12px",
                left: "10px",
                padding: "0 5px",
                backgroundColor: "background.paper",
                color: "text.primary",
                zIndex: 1,
              }}
            >
              Status:
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.status.includes("Paid")}
                  onChange={(e) => {
                    const newStatus = e.target.checked
                      ? [...filters.status, "Paid", "Active"]
                      : filters.status.filter((s) => s !== "Paid");
                    setFilters((prev) => ({ ...prev, status: newStatus }));
                  }}
                  size="small"
                />
              }
              label={
                <Typography variant="body2" color="text.primary">
                  Paid
                </Typography>
              }
              sx={{ mr: 1 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.status.includes("Unpaid")}
                  onChange={(e) => {
                    const newStatus = e.target.checked
                      ? [...filters.status, "Unpaid", "Active"]
                      : filters.status.filter((s) => s !== "Unpaid");
                    setFilters((prev) => ({ ...prev, status: newStatus }));
                  }}
                  size="small"
                />
              }
              label={
                <Typography variant="body2" color="text.primary">
                  Unpaid
                </Typography>
              }
            />
          </Box>

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
                sx={{
                  "&.MuiSwitch-root .MuiSwitch-switchBase.Mui-checked": {
                    color: "primary.main",
                  },
                  "&.MuiSwitch-root .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                    {
                      backgroundColor: "primary.main",
                    },
                }}
              />
            }
            label={
              <Typography variant="body2" color="text.primary">
                Split Medicaid Pending
              </Typography>
            }
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default FilterBar;
