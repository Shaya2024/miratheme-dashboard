"use client";

import React, { useState } from "react";
import styled from "@emotion/styled";
import NextLink from "next/link";
import dynamic from "next/dynamic";

import "react-quill-new/dist/quill.snow.css";
import "react-quill-new/dist/quill.bubble.css";

import {
  Box,
  CardContent,
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  Divider as MuiDivider,
  Typography,
} from "@mui/material";
import { spacing } from "@mui/system";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const Card = styled(MuiCard)`
  ${spacing};

  overflow: visible;
`;

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const QuillWrapper = styled.div`
  .ql-editor {
    min-height: 200px;
  }
`;

const BubbleWrapper = styled.div`
  .ql-editor {
    padding: 0;

    &.ql-blank:before {
      left: 0;
    }
  }

  .ql-tooltip {
    z-index: 9999;
  }
`;

function Quill() {
  const [value, setValue] = useState("");

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Quill
        </Typography>
        <Typography variant="body2" gutterBottom>
          Modern WYSIWYG editor built for compatibility and extensibility.
        </Typography>
        <Box mt={3}>
          <QuillWrapper>
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              placeholder="Type something.."
            />
          </QuillWrapper>
        </Box>
      </CardContent>
    </Card>
  );
}

function Bubble() {
  const [value, setValue] = useState("");

  return (
    <Card mb={6}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Bubble
        </Typography>
        <Typography variant="body2" gutterBottom>
          Bubble is a simple tooltip based theme for Quill.
        </Typography>
        <Box mt={3}>
          <BubbleWrapper>
            <ReactQuill
              theme="bubble"
              value={value}
              onChange={setValue}
              placeholder="Compose an epic..."
            />
          </BubbleWrapper>
        </Box>
      </CardContent>
    </Card>
  );
}

function Editors() {
  return (
    <React.Fragment>
      <Typography variant="h3" gutterBottom display="inline">
        Editors
      </Typography>
      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NextLink} href="/">
          Dashboard
        </Link>

        <Link>Forms</Link>

        <Typography>Editors</Typography>
      </Breadcrumbs>
      <Divider my={6} />
      <Grid container spacing={6}>
        <Grid size={12}>
          <Quill />
          <Bubble />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Editors;
