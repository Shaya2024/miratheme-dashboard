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
        To format code automatically, we've included a basic ESLint & Prettier
        configuration. ESLint statically analyzes your code to quickly find
        problems. Prettier is used to automatically format the code you write to
        ensure a consistent code style withing your projects.
      </Typography>

      <Typography variant="subtitle1" gutterBottom my={4}>
        Included ESLint configuration:
        <Code>{`{
  "extends": ["next/core-web-vitals", "prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
  }
}
`}</Code>
      </Typography>
    </Box>
  );
}

function Usage() {
  return (
    <Box mb={10}>
      <Typography variant="h3" gutterBottom>
        Usage
      </Typography>
      <Typography variant="subtitle1" gutterBottom my={4}>
        Format all source files in the /src folder:
        <br />
        <Code>npm run lint</Code>
      </Typography>
    </Box>
  );
}

function VSCode() {
  return (
    <Box mb={10}>
      <Typography variant="h3" gutterBottom>
        VSCode integration
      </Typography>
      <Typography variant="subtitle1" gutterBottom my={4}>
        To use ESLint & Prettier in combination with VSCode, we suggest
        installing the{" "}
        <Link
          target="_blank"
          rel="noreferrer noopener"
          href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint"
        >
          VSCode ESLint extension
        </Link>
        . After installing the extension, the code will automatically be
        formatted. The following configuration is included, which can be
        enabled/disabled or adjusted to your needs.
        <Code>{`{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}`}</Code>
      </Typography>
    </Box>
  );
}

function ESLintAndPrettier() {
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
            ESLint & Prettier
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NextLink} href="/">
              Dashboard
            </Link>
            <Link component={NextLink} href="/documentation/welcome">
              Documentation
            </Link>
            <Typography>ESLint & Prettier</Typography>
          </Breadcrumbs>

          <Divider my={6} />

          <Introduction />
          <Usage />
          <VSCode />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ESLintAndPrettier;
