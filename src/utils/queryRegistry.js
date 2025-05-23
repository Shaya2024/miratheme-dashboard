// utils/queryRegistry.js

export const queryRegistry = {
  // Existing entries
  "SELECT * FROM funccensus_payorarry": {
    args: [
      "startDate",
      "endDate",
      "facility",
      "residentStatusPaid",
      "residentStatusUnpaid",
      "payors",
      "splitMedicaidPending",
      "state",
    ],
    arrayParams: ["payors"],
    sql: (placeholders) =>
      `SELECT * FROM funccensus_payorarry(${placeholders})`,
  },
  "SELECT occupancypct from funcoccupancy_payorarry": {
    args: [
      "startDate",
      "endDate",
      "facility",
      "residentStatusPaid",
      "residentStatusUnpaid",
      "payors",
      "splitMedicaidPending",
      "state",
    ],
    arrayParams: ["payors"],
    sql: (placeholders) =>
      `SELECT occupancypct from funcoccupancy_payorarry(${placeholders})`,
  },
  "SELECT * FROM payorpie_new": {
    args: [
      "startDate",
      "endDate",
      "facility",
      "residentStatusPaid",
      "residentStatusUnpaid",
      "splitMedicaidPending",
      "state",
    ],
    arrayParams: [],
    sql: (placeholders) => `SELECT * FROM payorpie_new(${placeholders})`,
  },
  "SELECT * FROM censustrend_payorarry": {
    args: [
      "startDate",
      "endDate",
      "facility",
      "residentStatusPaid",
      "residentStatusUnpaid",
      "payors",
      "splitMedicaidPending",
      "state",
    ],
    arrayParams: ["payors"],
    sql: (placeholders) =>
      `SELECT * FROM censustrend_payorarry(${placeholders})`,
  },
  "SELECT * from bar_census": {
    args: [
      "startDate",
      "endDate",
      "facility",
      "residentStatusPaid",
      "residentStatusUnpaid",
      "payors",
      "splitMedicaidPending",
      "state",
    ],
    arrayParams: ["payors"],
    sql: (placeholders) => `SELECT * from bar_census(${placeholders})`,
  },
  "SELECT DISTINCT state FROM stern_portfolio_location_info": {
    args: [],
    arrayParams: [],
    sql: () => `SELECT DISTINCT state FROM stern_portfolio_location_info`,
  },
  'SELECT DISTINCT "Facility Name" FROM stern_portfolio_location_info': {
    args: [],
    arrayParams: [],
    sql: () =>
      `SELECT DISTINCT "Facility Name" FROM stern_portfolio_location_info`,
  },

  //  Filters IL Staffing
  "SELECT DISTINCT \"Facility_Name\" FROM pointclickcare.census_staffing WHERE state = 'IL'":
    {
      args: [],
      arrayParams: [],
      sql: () =>
        "SELECT DISTINCT \"Facility_Name\" FROM pointclickcare.census_staffing WHERE state = 'IL'",
    },

  "SELECT DISTINCT region FROM pointclickcare.census_staffing WHERE state = 'IL'":
    {
      args: [],
      arrayParams: [],
      sql: () =>
        "SELECT DISTINCT region FROM pointclickcare.census_staffing WHERE state = 'IL'",
    },

  // IL Staffing Page 1 - Daily Overview
  "SELECT * FROM total_hours_page1": {
    args: ["facility", "date", "region"],
    arrayParams: [],
    sql: (placeholders) => `SELECT * FROM total_hours_page1(${placeholders})`,
  },
  "SELECT * FROM total_hours_worked_page1": {
    args: ["facility", "date", "region"],
    arrayParams: [],
    sql: (placeholders) =>
      `SELECT * FROM total_hours_worked_page1(${placeholders})`,
  },
  "SELECT * FROM total_nursing_hours_worked_page1": {
    args: ["facility", "date", "region"],
    arrayParams: [],
    sql: (placeholders) =>
      `SELECT * FROM total_nursing_hours_worked_page1(${placeholders})`,
  },
  "SELECT * FROM total_rn_hours_worked_page1": {
    args: ["facility", "date", "region"],
    arrayParams: [],
    sql: (placeholders) =>
      `SELECT * FROM total_rn_hours_worked_page1(${placeholders})`,
  },
  // IL Staffing Page 2 - Requirements
  // Hours required
  "SELECT sum_total FROM total_hours_page2_all": {
    args: ["facility", "date"],
    arrayParams: [],
    sql: (placeholders) =>
      `SELECT sum_total FROM total_hours_page2_all(${placeholders})`,
  },

  "SELECT nursing_hours FROM total_hours_page2_all": {
    args: ["facility", "date"],
    arrayParams: [],
    sql: (placeholders) =>
      `SELECT nursing_hours FROM total_hours_page2_all(${placeholders})`,
  },

  "SELECT rn_hours FROM total_hours_page2_all": {
    args: ["facility", "date"],
    arrayParams: [],
    sql: (placeholders) =>
      `SELECT rn_hours FROM total_hours_page2_all(${placeholders})`,
  },
  //Hours worked
  "SELECT * FROM total_hours_worked_page2": {
    args: ["facility", "date"],
    arrayParams: [],
    sql: (placeholders) =>
      `SELECT * FROM total_hours_worked_page2(${placeholders})`,
  },
  "SELECT * FROM total_nursing_hours_worked_page2": {
    args: ["facility", "date"],
    arrayParams: [],
    sql: (placeholders) =>
      `SELECT * FROM total_nursing_hours_worked_page2(${placeholders})`,
  },
  "SELECT * FROM total_rn_hours_worked_page2": {
    args: ["facility", "date"],
    arrayParams: [],
    sql: (placeholders) =>
      `SELECT * FROM total_rn_hours_worked_page2(${placeholders})`,
  },
  // IL Staffing Page 3 - Trend
  //5a
  "SELECT datekey,SUM(sum_total) as sum_total FROM total_hours_page3 GROUP BY datekey":
    {
      args: ["region", "facility", "startDate", "endDate"],
      arrayParams: [],
      sql: (placeholders) =>
        `SELECT datekey,SUM(sum_total) as sum_total FROM total_hours_page3(${placeholders}) GROUP BY datekey`,
    },
  //5b
  "SELECT datekey,SUM(sum_total) as sum_total FROM total_nursing_hours_page3 GROUP BY datekey":
    {
      args: ["region", "facility", "startDate", "endDate"],
      arrayParams: [],
      sql: (placeholders) =>
        `SELECT datekey,SUM(sum_total) as sum_total FROM total_nursing_hours_page3(${placeholders}) GROUP BY datekey`,
    },
  //5c
  "SELECT datekey,SUM(sum_total) as sum_total FROM total_rn_hours_page3 GROUP BY datekey":
    {
      args: ["region", "facility", "startDate", "endDate"],
      arrayParams: [],
      sql: (placeholders) =>
        `SELECT datekey,SUM(sum_total) as sum_total FROM total_rn_hours_page3(${placeholders}) GROUP BY datekey`,
    },
  // 6
  "SELECT datekey, SUM(hours_worked) AS hours_worked FROM total_hours_worked_page3 GROUP BY datekey":
    {
      args: ["region", "facility", "startDate", "endDate"],
      arrayParams: [],
      sql: (placeholders) =>
        `SELECT datekey, SUM(hours_worked) AS hours_worked
     FROM total_hours_worked_page3(${placeholders})
     GROUP BY datekey
     ORDER BY datekey`,
    },
  // 7
  "SELECT datekey, SUM(hours_worked) AS hours_worked FROM total_nursing_hours_worked_page3 GROUP BY datekey":
    {
      args: ["region", "facility", "startDate", "endDate"],
      arrayParams: [],
      sql: (placeholders) =>
        `SELECT datekey, SUM(hours_worked) AS hours_worked
     FROM total_nursing_hours_worked_page3(${placeholders})
     GROUP BY datekey
     ORDER BY datekey`,
    },
  //8
  "SELECT datekey, SUM(hours_worked) AS hours_worked FROM total_rn_hours_worked_page3 GROUP BY datekey":
    {
      args: ["region", "facility", "startDate", "endDate"],
      arrayParams: [],
      sql: (placeholders) =>
        `SELECT datekey, SUM(hours_worked) AS hours_worked
     FROM total_rn_hours_worked_page3(${placeholders})
     GROUP BY datekey
     ORDER BY datekey`,
    },

  // IL Staffing Page 4 - RN Coverage
  "SELECT * FROM rn_coverage_page4": {
    args: ["facility", "startDate", "endDate"],
    arrayParams: [],
    sql: (placeholders) => `SELECT * FROM rn_coverage_page4(${placeholders})`,
  },

  // MA Staffing Page 1 - Overview
  "SELECT DISTINCT \"Facility_Name\" FROM census_staffing WHERE state = 'MA'": {
    args: [],
    arrayParams: [],
    sql: () =>
      "SELECT DISTINCT \"Facility_Name\" FROM census_staffing WHERE state = 'MA'",
  },

  "SELECT facility_name,total_per_q FROM ma_staffing WHERE quarter = 'Q1_2025'":
    {
      args: [],
      arrayParams: [],
      sql: () =>
        `SELECT facility_name,total_per_q FROM ma_staffing WHERE quarter = 'Q1_2025'`,
    },

  "SELECT facility_name,total_per_q FROM ma_staffing WHERE quarter = 'Q2_2025'":
    {
      args: [],
      arrayParams: [],
      sql: () =>
        `SELECT facility_name,total_per_q FROM ma_staffing WHERE quarter = 'Q2_2025'`,
    },

  // MA Staffing Page 2 - Requirements
  "SELECT * FROM ma_last_q": {
    args: ["facility"],
    arrayParams: [],
    sql: (placeholders) => `SELECT * FROM ma_last_q(${placeholders})`,
  },

  "SELECT * FROM ma_current_q": {
    args: ["facility"],
    arrayParams: [],
    sql: (placeholders) => `SELECT * FROM ma_current_q(${placeholders})`,
  },

  "SELECT * FROM ma_current_q_30days": {
    args: ["facility"],
    arrayParams: [],
    sql: (placeholders) => `SELECT * FROM ma_current_q_30days(${placeholders})`,
  },

  // MA Staffing Page 3 - RN Coverage
  "SELECT * FROM ma_rn_coverage": {
    args: ["facility", "startDate", "endDate"],
    arrayParams: [],
    sql: (placeholders) => `SELECT * FROM ma_rn_coverage(${placeholders})`,
  },
};
