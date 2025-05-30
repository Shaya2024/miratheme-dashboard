"use client";

import React, { useState } from "react";
import styled from "@emotion/styled";

import {
  Box,
  CssBaseline,
  Paper as MuiPaper,
  Container as MuiContainer,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { spacing } from "@mui/system";

import GlobalStyle from "@/components/GlobalStyle";
import NavbarSimple from "@/components/navbar/NavbarSimple";
import docItems from "@/components/sidebar/docItems";
import Sidebar from "@/components/sidebar/Sidebar";
import Settings from "@/components/Settings";

const drawerWidth = 258;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Drawer = styled.div`
  ${(props) => props.theme.breakpoints.up("md")} {
    width: ${drawerWidth}px;
    flex-shrink: 0;
  }
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

const Paper = styled(MuiPaper)(spacing);

const Container = styled(MuiContainer)`
  height: 100%;
`;

const MainContent = styled(Paper)`
  flex: 1;
  background: ${(props) => props.theme.palette.background.default};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

const Doc = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const theme = useTheme();
  const isLgDown = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      <Drawer>
        <Box sx={{ display: { xs: "block", lg: "none" } }}>
          <Sidebar
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            items={docItems}
            showFooter={false}
          />
        </Box>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Sidebar
            PaperProps={{ style: { width: drawerWidth } }}
            items={docItems}
            showFooter={false}
          />
        </Box>
      </Drawer>
      <AppContent>
        <NavbarSimple onDrawerToggle={handleDrawerToggle} />
        <MainContent p={isLgDown ? 5 : 12}>
          <Container maxWidth="xl">{children}</Container>
        </MainContent>
      </AppContent>
      <Settings />
    </Root>
  );
};

export default Doc;
