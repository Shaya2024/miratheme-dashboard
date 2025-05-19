import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useTheme } from "@mui/material/styles";
import { Select, MenuItem, TextField } from "@mui/material"; // Make sure this is imported
import {
  IconButton,
  Typography,
  Divider,
  Box,
  Button,
  Paper,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const CustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  changeYear,
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "10px",
        gap: "0.5rem",
        width: "100%",
      }}
    >
      <IconButton onClick={decreaseMonth} size="small">
        <ChevronLeft fontSize="small" />
      </IconButton>

      <Typography variant="subtitle2" fontWeight={600}>
        {date.toLocaleString("default", { month: "long" })}
      </Typography>

      <Select
        value={date.getFullYear()}
        onChange={(e) => changeYear(Number(e.target.value))}
        size="small"
        variant="outlined"
        sx={{
          fontSize: "0.8rem",
          minWidth: 80,
          height: 32,
          ".MuiSelect-select": {
            padding: "4px 12px",
          },
        }}
      >
        {years.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>

      <IconButton onClick={increaseMonth} size="small">
        <ChevronRight fontSize="small" />
      </IconButton>
    </div>
  );
};
const CustomDatePicker = ({ value, onChange }) => {
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(value?.startDate || null);

  const [endDate, setEndDate] = useState(value?.endDate || null);

  const [isSelectingRange, setIsSelectingRange] = useState(false);
  const calendarRef = useRef();

  const customDatePickerStyles = (theme) => `
  .react-datepicker {
    font-family: 'Roboto', sans-serif;
    border: none;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  .react-datepicker__month-container {
    background: ${theme.palette.background.paper};
  }

  .react-datepicker__header {
    background: ${theme.palette.background.paper};
    border-bottom: 1px solid ${theme.palette.divider};
    padding-top: 15px;
  }

  .react-datepicker__day {
    margin: 3px;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    border-radius: 50%;
    transition: all 0.2s ease;
    font-size: 0.875rem;
    color: ${theme.palette.text.primary};
  }

  .react-datepicker__day:hover {
    background-color: ${theme.palette.secondary.dark} !important;
    color: white !important;
    border-radius: 50% !important;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--in-range,
  .react-datepicker__day--in-selecting-range {
    background-color: ${theme.palette.secondary.main} !important;
    color: white !important;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: ${theme.palette.secondary.main} !important;
    color: white !important;
  }

  .react-datepicker__day--in-range:not(.react-datepicker__day--selected) {
    background-color: ${theme.palette.secondary.light};
    color: ${theme.palette.secondary.main};
  }

  .react-datepicker__day--today {
    font-weight: bold;
    color: ${theme.palette.secondary.main};
  }

  .react-datepicker__day-name {
  color: ${theme.palette.text.secondary}; /* or .primary if you prefer */
  font-size: 0.75rem;
  font-weight: 500;
}

`;

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = customDatePickerStyles(theme); // pass theme here
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target) &&
        !document.querySelector(".MuiPopover-root")?.contains(e.target) // 👈 ADD THIS
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDisplayDate = (date) =>
    date?.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const getDisplayRange = () => {
    if (!startDate) return "Select dates";
    if (!endDate || startDate.getTime() === endDate.getTime())
      return formatDisplayDate(startDate);
    return `${formatDisplayDate(startDate)} – ${formatDisplayDate(endDate)}`;
  };

  const handleDateChange = (date) => {
    if (!isSelectingRange) {
      // First click (or 3rd, 5th, etc.)
      setStartDate(date);
      setEndDate(date); // treat it like a single-day range
      setIsSelectingRange(true);
      onChange({ startDate: date, endDate: date });
    } else {
      // Second click (or 4th, 6th, etc.)
      const [start, end] =
        date < startDate ? [date, startDate] : [startDate, date];
      setStartDate(start);
      setEndDate(end);
      setIsSelectingRange(false);
      onChange({ startDate: start, endDate: end });
    }
  };

  const handlePresetClick = (presetStart, presetEnd) => {
    setStartDate(presetStart);
    setEndDate(presetEnd);
    setIsOpen(false);
    onChange({
      startDate: presetStart,
      endDate: presetEnd,
    });
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Button
        variant="contained"
        color="white"
        onClick={() => setIsOpen(!isOpen)}
        startIcon={<CalendarTodayIcon />}
        sx={(theme) => ({
          backgroundColor: `${theme.palette.secondary.main}`,
          color: "white",
          "&:hover": {
            backgroundColor: `${theme.palette.secondary.main}`,
          },
        })}
      >
        {getDisplayRange()}
      </Button>

      {isOpen && (
        <Box
          ref={calendarRef}
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 10,
            mt: 1,
            display: "flex",
            backgroundColor: "#fff",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: 3,
          }}
        >
          <DatePicker
            showYearDropdown
            dropdownMode="select"
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsStart={!isSelectingRange}
            selectsEnd={isSelectingRange && !!startDate}
            inline
            renderCustomHeader={CustomHeader}
            calendarContainer={({ className, children }) => (
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  borderRadius: 2,
                  overflow: "hidden",
                  width: "auto",
                  minWidth: 400,
                  border: `1px solid ${theme.palette.divider}`,
                  boxShadow: 3,
                }}
              >
                <Box sx={{ flex: 1 }}>{children}</Box>

                <Box
                  sx={(theme) => ({
                    width: 150,
                    borderLeft: `1px solid ${theme.palette.divider}`,
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    backgroundColor: `${theme.palette.background.paper}`,
                  })}
                >
                  {[
                    {
                      label: "Last 7 Days",
                      range: [
                        new Date(new Date().setDate(new Date().getDate() - 6)),
                        new Date(),
                      ],
                    },
                    {
                      label: "This Month",
                      range: [
                        new Date(
                          new Date().getFullYear(),
                          new Date().getMonth(),
                          1
                        ),
                        new Date(),
                      ],
                    },
                    {
                      label: "Last Month",
                      range: [
                        new Date(
                          new Date().getFullYear(),
                          new Date().getMonth() - 1,
                          1
                        ),
                        new Date(
                          new Date().getFullYear(),
                          new Date().getMonth(),
                          0
                        ),
                      ],
                    },
                    {
                      label: "Last 3 Months",
                      range: [
                        new Date(
                          new Date().getFullYear(),
                          new Date().getMonth() - 3,
                          1
                        ),
                        new Date(),
                      ],
                    },
                    {
                      label: "Last 6 Months",
                      range: [
                        new Date(
                          new Date().getFullYear(),
                          new Date().getMonth() - 6,
                          1
                        ),
                        new Date(),
                      ],
                    },
                    {
                      label: "Last 9 Months",
                      range: [
                        new Date(
                          new Date().getFullYear(),
                          new Date().getMonth() - 9,
                          1
                        ),
                        new Date(),
                      ],
                    },
                    {
                      label: "Last 12 Months",
                      range: [
                        new Date(
                          new Date().getFullYear(),
                          new Date().getMonth() - 12,
                          1
                        ),
                        new Date(),
                      ],
                    },
                    {
                      label: "This Year",
                      range: [
                        new Date(new Date().getFullYear(), 0, 1),
                        new Date(),
                      ],
                    },
                    {
                      label: "Last Year",
                      range: [
                        new Date(new Date().getFullYear() - 1, 0, 1),
                        new Date(new Date().getFullYear() - 1, 11, 31),
                      ],
                    },
                  ].map((preset) => (
                    <Button
                      key={preset.label}
                      variant="outlined"
                      size="small"
                      color="theme.palette.text.primary"
                      onClick={() => handlePresetClick(...preset.range)}
                      sx={{
                        justifyContent: "center",
                        textTransform: "none",
                        fontSize: "0.75rem",
                        borderRadius: "6px",

                        "&:hover": {
                          bgcolor: "secondary.light", // optional: Mira-style light green
                          borderRadius: "6px", // ⬅️ force it to stay rounded on hover
                          color: "white",
                        },
                      }}
                    >
                      {preset.label}
                    </Button>
                  ))}
                </Box>
              </Paper>
            )}
          />
        </Box>
      )}
    </Box>
  );
};

export default CustomDatePicker;
