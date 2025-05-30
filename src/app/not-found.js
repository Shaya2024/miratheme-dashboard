"use client";

import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

import ErrorLayout from "@/layouts/Error";

import { Button as MuiButton, Typography } from "@mui/material";
import { spacing } from "@mui/system";

const Button = styled(MuiButton)(spacing);

const Wrapper = styled.div`
  text-align: center;
`;

function Page404() {
  return (
    <ErrorLayout>
      <Wrapper>
        <Typography component="h1" variant="h1" align="center" gutterBottom>
          404
        </Typography>
        <Typography component="h2" variant="h4" align="center" gutterBottom>
          Page not found.
        </Typography>
        <Typography
          component="h2"
          variant="subtitle1"
          align="center"
          gutterBottom
        >
          The page you are looking for might have been removed.
        </Typography>

        <Button
          component={Link}
          href="/"
          variant="contained"
          color="secondary"
          mt={2}
        >
          Return to website
        </Button>
      </Wrapper>
    </ErrorLayout>
  );
}

export default Page404;
