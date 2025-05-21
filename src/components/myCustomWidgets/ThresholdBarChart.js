import React from "react";
import { Box, Typography, Stack, Tooltip } from "@mui/material";
import { green, red } from "@mui/material/colors";

const ThresholdBarChart = ({ data, nameKey, valueKey, threshold = 3.6 }) => {
  return (
    <Stack spacing={1}>
      {Array.isArray(data) &&
        data.map((item, index) => {
          const facility = item[nameKey];
          const value = parseFloat(item[valueKey]);
          const isAboveThreshold = value > threshold;
          const barColor = isAboveThreshold ? green[500] : red[500];

          return (
            <Box key={index} display="flex" alignItems="center">
              <Typography sx={{ width: "250px" }}>{facility}</Typography>
              <Tooltip placement="right" title={`${facility} - ${value}`}>
                <Box
                  sx={{
                    height: 40,
                    width: 200,
                    bgcolor: barColor,
                    ml: 2,
                    borderRadius: 0,
                    cursor: "pointer",
                  }}
                />
              </Tooltip>
              <Typography sx={{ ml: 1 }}>{value}</Typography>
            </Box>
          );
        })}
    </Stack>
  );
};

export default ThresholdBarChart;
