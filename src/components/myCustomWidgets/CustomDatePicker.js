import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useTheme } from "@mui/material/styles";
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
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "10px",
    }}
  >
    <IconButton
      onClick={decreaseMonth}
      disabled={prevMonthButtonDisabled}
      size="small"
    >
      <ChevronLeft fontSize="small" />
    </IconButton>

    <Typography variant="subtitle2" fontWeight={600}>
      {date.toLocaleString("default", { month: "long", year: "numeric" })}
    </Typography>

    <IconButton
      onClick={increaseMonth}
      disabled={nextMonthButtonDisabled}
      size="small"
    >
      <ChevronRight fontSize="small" />
    </IconButton>
  </div>
);

const CustomDatePicker = ({ value, onChange }) => {
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(
    value?.startDate ? new Date(value.startDate) : null
  );
  const [endDate, setEndDate] = useState(
    value?.endDate ? new Date(value.endDate) : null
  );
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
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
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
    if (!isSelectingRange || !startDate || date < startDate) {
      setStartDate(date);
      setEndDate(null);
      setIsSelectingRange(true);
      onChange({ startDate: date.toISOString(), endDate: date.toISOString() });
    } else {
      setEndDate(date);
      setIsSelectingRange(false);
      onChange({
        startDate: startDate.toISOString(),
        endDate: date.toISOString(),
      });
    }
  };

  const handlePresetClick = (presetStart, presetEnd) => {
    setStartDate(presetStart);
    setEndDate(presetEnd);
    setIsOpen(false);
    onChange({
      startDate: presetStart.toISOString(),
      endDate: presetEnd.toISOString(),
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
                      label: "This Week",
                      range: [
                        new Date(
                          new Date().setDate(
                            new Date().getDate() - new Date().getDay()
                          )
                        ),
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
                      label: "Last 3 Months",
                      range: [
                        new Date(
                          new Date().setMonth(new Date().getMonth() - 3)
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
                  ].map((preset) => (
                    <Button
                      key={preset.label}
                      variant="outlined"
                      size="small"
                      color="primary"
                      onClick={() => handlePresetClick(...preset.range)}
                      sx={{
                        justifyContent: "center",
                        textTransform: "none",
                        fontWeight: 500,
                        fontSize: "0.85rem",
                        borderRadius: "6px",
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
