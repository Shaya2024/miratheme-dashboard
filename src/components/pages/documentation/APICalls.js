import React from "react";
import styled from "@emotion/styled";
import NextLink from "next/link";

import {
  Box,
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Grid,
  Link,
  Typography as MuiTypography,
} from "@mui/material";
import { spacing } from "@mui/system";

import Code from "@/components/Code";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Typography = styled(MuiTypography)(spacing);

function Introduction() {
  return (
    <Box mb={10}>
      <Typography variant="h3" gutterBottom>
        Introduction
      </Typography>
      <Typography variant="subtitle1" gutterBottom my={4}>
        A common use case for code actions is to make API calls to external
        services. Mira includes{" "}
        <Link
          href="https://github.com/axios/axios"
          target="_blank"
          rel="noreferrer noopener"
        >
          Axios
        </Link>{" "}
        for making XMLHttpRequests from the browser.{" "}
        <Link
          href="https://github.com/ctimmerm/axios-mock-adapter#readme"
          target="_blank"
          rel="noreferrer noopener"
        >
          Axios Mock Adapter
        </Link>{" "}
        is also included to mock those requests.{" "}
        <Link
          href="https://github.com/axios/axios"
          target="_blank"
          rel="noreferrer noopener"
        >
          Learn more
        </Link>
        .
      </Typography>
    </Box>
  );
}

function Axios() {
  return (
    <Box mb={10}>
      <Typography variant="h3" gutterBottom>
        Axios
      </Typography>
      <Typography variant="subtitle1" gutterBottom my={4}>
        Performing a GET request:
      </Typography>

      <Code>{`axios.get('/api/user?id=12345')
.then(function (response) {
  // handle success
  console.log(response);
})
.catch(function (error) {
  // handle error
  console.log(error);
});`}</Code>

      <Typography variant="subtitle1" gutterBottom my={4}>
        Performing a POST request:
      </Typography>

      <Code>{`axios.post('/api/user', {
  firstName: 'Fred',
  lastName: 'Flintstone'
})
.then(function (response) {
  // handle success
  console.log(response);
})
.catch(function (error) {
  // handle error
  console.log(error);
});`}</Code>
    </Box>
  );
}

function AxiosMockAdapter() {
  return (
    <Box mb={10}>
      <Typography variant="h3" gutterBottom>
        Axios Mock Adapter
      </Typography>
      <Typography variant="subtitle1" gutterBottom my={4}>
        Axios adapter that allows to easily mock requests.{" "}
        <Link
          href="https://github.com/ctimmerm/axios-mock-adapter#readme"
          target="_blank"
          rel="noreferrer noopener"
        >
          Learn more
        </Link>
        .
      </Typography>
      <Typography variant="subtitle1" gutterBottom my={4}>
        Mocking a GET request:
      </Typography>

      <Code>{`mock.onGet("/api/user").reply((config) => {
  return [
    200,
    {
      users: [{ id: 12345, firstName: "Fred", lastName: "Flintstone" }],
    },
  ];
});`}</Code>
      <Typography variant="subtitle1" gutterBottom my={4}>
        Mocking a POST request:
      </Typography>

      <Code>{`mock.onPost("/api/user").reply((config) => {
  const { firstName, lastName } = JSON.parse(config.data);

  if (firstName && lastName) {
    return [200, {
      id: "12345",
      firstName: "Fred",
      lastName: "Flintstone",
    };];
  }

  return [400, { message: "Looks like you didn't provide the required data." }];
});`}</Code>
    </Box>
  );
}

function APICalls() {
  return (
    <React.Fragment>
      <Grid container spacing={6} justifyContent="center">
        <Grid
          size={{
            xs: 12,
            lg: 9,
            xl: 7,
          }}
        >
          <Typography variant="h2" gutterBottom display="inline">
            API Calls
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NextLink} href="/">
              Dashboard
            </Link>
            <Link component={NextLink} href="/documentation/welcome">
              Documentation
            </Link>
            <Typography>API Calls</Typography>
          </Breadcrumbs>

          <Divider my={6} />

          <Introduction />
          <Axios />
          <AxiosMockAdapter />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default APICalls;
