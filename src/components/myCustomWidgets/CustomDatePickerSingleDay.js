import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useTheme } from "@mui/material/styles";
import {
  Select,
  MenuItem,
  IconButton,
  Typography,
  Button,
  Box,
  Paper,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const CustomHeader = ({ date, decreaseMonth, increaseMonth, changeYear }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      px={1}
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
    </Box>
  );
};

const CustomDatePickerSingleDay = ({ value, onChange }) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef();

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
    .react-datepicker {
      font-family: 'Roboto', sans-serif;
      border: none;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .react-datepicker__month-container {
      background: ${theme.palette.background.paper};
    }

    .react-datepicker__header {
      background-color: ${theme.palette.background.paper};
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
    .react-datepicker__day--keyboard-selected {
      background-color: ${theme.palette.secondary.main} !important;
      color: white !important;
    }

    .react-datepicker__day--today {
      font-weight: bold;
      color: ${theme.palette.secondary.main};
    }

    .react-datepicker__day-name {
      color: ${theme.palette.text.secondary};
      font-size: 0.75rem;
      font-weight: 500;
    }
  `;
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
        !document.querySelector(".MuiPopover-root")?.contains(e.target)
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
    }) || "Select a date";

  return (
    <Box sx={{ position: "relative" }}>
      <Button
        variant="contained"
        color="white"
        onClick={() => setIsOpen(!isOpen)}
        startIcon={<CalendarTodayIcon />}
        sx={{
          backgroundColor: theme.palette.secondary.main,
          color: "white",
          "&:hover": {
            backgroundColor: theme.palette.secondary.dark,
          },
          textTransform: "none",
          fontSize: "0.875rem",
          height: 36,
          borderRadius: 2,
          px: 2,
        }}
      >
        {formatDisplayDate(value)}
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
            backgroundColor: "#fff",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: 3,
          }}
        >
          <DatePicker
            selected={value}
            onChange={(date) => {
              onChange(date);
              setIsOpen(false);
            }}
            inline
            maxDate={new Date()}
            renderCustomHeader={CustomHeader}
          />
        </Box>
      )}
    </Box>
  );
};

export default CustomDatePickerSingleDay;
