import React from "react";
import styled from "@emotion/styled";
import { spacing } from "@mui/system";
import Link from "next/link";

import {
  AppBar,
  Button as MuiButton,
  Container,
  Grid,
  Box,
  Toolbar,
} from "@mui/material";

import Logo from "@/vendor/logo.svg";

const Button = styled(MuiButton)(spacing);

const Brand = styled.div`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  font-family: ${(props) => props.theme.typography.fontFamily};
`;

const BrandIcon = styled(Logo)`
  margin-right: ${(props) => props.theme.spacing(2)};
  margin-top: -2px;
  color: ${(props) => props.theme.sidebar.header.brand.color};
  fill: ${(props) => props.theme.sidebar.header.brand.color};
  width: 32px;
  height: 32px;

  vertical-align: middle;
  display: inline;
`;

const AppBarComponent = () => (
  <React.Fragment>
    <AppBar position="relative" color="transparent" elevation={0}>
      <Toolbar>
        <Container>
          <Grid container alignItems="center">
            <Grid>
              <Brand>
                <BrandIcon /> Mira
              </Brand>
            </Grid>
            <Grid size="grow" />
            <Grid>
              <Box sx={{ display: { xs: "none", md: "inline-block" } }}>
                <Button
                  ml={2}
                  color="inherit"
                  component={Link}
                  href="/dashboard/analytics"
                  target="_blank"
                >
                  Live Preview
                </Button>
                <Button
                  ml={2}
                  color="inherit"
                  component={Link}
                  href="/documentation/welcome"
                  target="_blank"
                >
                  Documentation
                </Button>
                <Button
                  ml={2}
                  color="inherit"
                  component={Link}
                  href="/documentation/support"
                  target="_blank"
                >
                  Support
                </Button>
              </Box>
              <Button
                ml={2}
                color="primary"
                variant="contained"
                component={Link}
                href="/auth/sign-in"
              >
                Sign In
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  </React.Fragment>
);

export default AppBarComponent;
