"use client";

import React from "react";
import styled from "@emotion/styled";
import NextLink from "next/link";

import {
  Button,
  CardActions,
  CardContent,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardHeader as MuiCardHeader,
  Divider as MuiDivider,
  Typography,
} from "@mui/material";
import { StarBorder as StarIcon } from "@mui/icons-material";
import { spacing } from "@mui/system";

const Card = styled(MuiCard)(spacing);

const CardHeader = styled(MuiCardHeader)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Price = styled.div`
  text-align: center;
  padding-bottom: ${(props) => props.theme.spacing(3)};
`;

const Header = styled.div`
  padding: ${(props) => props.theme.spacing(6)} 0;
`;

function Pricing() {
  return (
    <React.Fragment>
      <Typography variant="h3" gutterBottom display="inline">
        Pricing
      </Typography>
      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NextLink} href="/">
          Dashboard
        </Link>
        <Link component={NextLink} href="/">
          Pages
        </Link>
        <Typography>Pricing</Typography>
      </Breadcrumbs>
      <Divider my={6} />
      <Header>
        <Typography variant="h3" gutterBottom align="center">
          We have a plan for everyone
        </Typography>

        <Typography variant="subtitle1" gutterBottom align="center">
          Whether you're a business or an individual, 14-day trial no credit
          card required.
        </Typography>
      </Header>
      <Grid container justifyContent="center">
        <Grid
          size={{
            xs: 12,
            lg: 10,
          }}
        >
          <React.Fragment>
            <Grid container spacing={6} alignItems="flex-end">
              <Grid
                size={{
                  xs: 12,
                  md: 4,
                }}
              >
                <Card p={5}>
                  <CardHeader
                    title="Free"
                    titleTypographyProps={{ align: "center" }}
                    pb={0}
                    pt={2}
                  />
                  <CardContent>
                    <Price>
                      <Typography
                        component="h2"
                        variant="h1"
                        color="textPrimary"
                        align="center"
                        display="inline"
                      >
                        $0
                      </Typography>
                      <Typography
                        variant="h5"
                        color="textSecondary"
                        align="center"
                        display="inline"
                      >
                        /mo
                      </Typography>
                    </Price>
                    <Typography variant="subtitle1" align="center">
                      10 users included
                      <br />
                      2 GB of storage
                      <br />
                      Help center access
                      <br />
                      Email support
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button fullWidth variant="outlined" color="primary">
                      Sign up for free
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  md: 4,
                }}
              >
                <Card p={5}>
                  <CardHeader
                    title="Free"
                    subheader="Most popular"
                    titleTypographyProps={{ align: "center" }}
                    subheaderTypographyProps={{ align: "center" }}
                    action={<StarIcon />}
                    pb={0}
                    pt={2}
                  />
                  <CardContent>
                    <Price>
                      <Typography
                        component="h2"
                        variant="h1"
                        color="textPrimary"
                        align="center"
                        display="inline"
                      >
                        $15
                      </Typography>
                      <Typography
                        variant="h5"
                        color="textSecondary"
                        align="center"
                        display="inline"
                      >
                        /mo
                      </Typography>
                    </Price>
                    <Typography variant="subtitle1" align="center">
                      20 users included
                      <br />
                      10 GB of storage
                      <br />
                      Help center access
                      <br />
                      Priority email support
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button fullWidth variant="contained" color="primary">
                      Get started
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  md: 4,
                }}
              >
                <Card p={5}>
                  <CardHeader
                    title="Enterprise"
                    titleTypographyProps={{ align: "center" }}
                    pb={0}
                    pt={2}
                  />
                  <CardContent>
                    <Price>
                      <Typography
                        component="h2"
                        variant="h1"
                        color="textPrimary"
                        align="center"
                        display="inline"
                      >
                        $30
                      </Typography>
                      <Typography
                        variant="h5"
                        color="textSecondary"
                        align="center"
                        display="inline"
                      >
                        /mo
                      </Typography>
                    </Price>
                    <Typography variant="subtitle1" align="center">
                      50 users included
                      <br />
                      30 GB of storage
                      <br />
                      Help center access
                      <br />
                      Phone & email support
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button fullWidth variant="outlined" color="primary">
                      Contact us
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </React.Fragment>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Pricing;
