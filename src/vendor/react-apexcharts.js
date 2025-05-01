"use client";

// Workaround for ApexCharts SSR
// https://github.com/apexcharts/react-apexcharts/issues/469

import { useEffect, useState } from "react";

export default function ApexChart(props) {
  const [Chart, setChart] = useState();
  const hasType = typeof props?.type !== "undefined";

  useEffect(() => {
    import("react-apexcharts").then((mod) => {
      setChart(() => mod.default);
    });
  }, []);

  return hasType && Chart && <Chart {...props} />;
}
