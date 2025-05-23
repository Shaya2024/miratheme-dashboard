export const getPayorColors = (theme) => [
  theme.palette.primary.main, // strong blue (always visible)
  theme.palette.teal?.main || "#009688", // greenish contrast
  theme.palette.orange?.main || "#fb8c00", // warm tone

  theme.palette.secondary.light, // lighter blue, moved down
  theme.palette.purple?.main || "#8e24aa", // deep cool tone
  theme.palette.yellow?.main || "#fdd835", // warm bright
  theme.palette.red?.main || "#e53935", // bold warm
  theme.palette.grey[300], // neutral
];

export const PAYOR_COLOR_MAP = (theme) => ({
  HMO: "#2e7d32", // dark green
  Medicaid: theme.palette.teal?.main || "#009688", // teal
  "Medicare A": theme.palette.orange?.main || "#fb8c00", // orange
  paid_bed: "#66bb6a", // light green
  Private: theme.palette.purple?.main || "#8e24aa", // purple
  unpaid_bed: theme.palette.yellow?.main || "#fdd835", // yellow
  VA: theme.palette.red?.main || "#e53935", // red
  "Medicaid Pending": theme.palette.grey[700], // grey
});
