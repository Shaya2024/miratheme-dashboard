import React from "react";
import dynamic from "next/dynamic";
import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import { MoreVertical } from "lucide-react";

import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import { spacing } from "@mui/system";

import worldMill from "@react-jvectormap/world/dist/worldMill.json";

const VectorMap = dynamic(
  () => import("@react-jvectormap/core").then((m) => m.VectorMap),
  { ssr: false }
);

const MapContainer = styled.div`
  height: 344px;
`;

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)`
  &:last-child {
    padding-top: 0;
    padding-bottom: ${(props) => props.theme.spacing(4)};
  }
`;

function WorldMap(props) {
  const options = {
    regionStyle: {
      initial: {
        fill:
          props.theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, 0.3)"
            : "#e3eaef",
      },
    },
    backgroundColor: "transparent",
    containerStyle: {
      width: "100%",
      height: "100%",
    },
    markerStyle: {
      initial: {
        r: 9,
        fill: props.theme.palette.secondary.main,
        "fill-opacity": 1,
        stroke: "#fff",
        "stroke-width": 7,
        "stroke-opacity": 0.4,
      },
      hover: {
        stroke: "#fff",
        "fill-opacity": 1,
        "stroke-width": 1.5,
      },
    },
    zoomOnScroll: false,
    markers: [
      {
        latLng: [39.904202, 116.407394],
        name: "Beijing",
      },
      {
        latLng: [28.70406, 77.102493],
        name: "Delhi",
      },
      {
        latLng: [41.00824, 28.978359],
        name: "Istanbul",
      },
      {
        latLng: [40.7127837, -74.0059413],
        name: "New York",
      },
      {
        latLng: [34.052235, -118.243683],
        name: "Los Angeles",
      },
      {
        latLng: [41.878113, -87.629799],
        name: "Chicago",
      },
      {
        latLng: [51.507351, -0.127758],
        name: "London",
      },
      {
        latLng: [55.755825, 37.617298],
        name: "Moscow",
      },
      {
        latLng: [40.416775, -3.70379],
        name: "Madrid",
      },
    ],
  };

  return (
    <Card mb={6}>
      <CardHeader
        action={
          <IconButton aria-label="settings" size="large">
            <MoreVertical />
          </IconButton>
        }
        title="Real-Time"
      />
      <CardContent>
        <MapContainer>
          <VectorMap map={worldMill} {...options} />
        </MapContainer>
      </CardContent>
    </Card>
  );
}

export default withTheme(WorldMap);
