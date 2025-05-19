import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { styled, useTheme } from "@mui/material/styles";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Box } from "@mui/material";

const StyledDatePickerWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: "white",
  borderRadius: 4,
  height: 36,
  fontSize: "0.875rem",
  paddingLeft: 12,
  paddingRight: 12,
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",

  ".react-datepicker-wrapper": {
    width: "100%",
  },
  ".react-datepicker__input-container input": {
    backgroundColor: "transparent",
    border: "none",
    color: "white",
    width: "100%",
    height: "100%",
    fontSize: "0.875rem",
    padding: 0,
    cursor: "pointer",
  },
  ".react-datepicker__triangle": {
    display: "none",
  },
}));

const CustomSingleDatePicker = ({ value, onChange }) => {
  return (
    <StyledDatePickerWrapper>
      <CalendarTodayIcon fontSize="small" />
      <DatePicker
        selected={value}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        maxDate={new Date()}
        placeholderText="Select a date"
        popperPlacement="bottom-start"
      />
    </StyledDatePickerWrapper>
  );
};

export default CustomSingleDatePicker;
