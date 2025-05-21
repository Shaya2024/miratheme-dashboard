import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";

import { Button, Box, Container, Typography, Tooltip } from "@mui/material";
import { spacing } from "@mui/system";
import { ArrowForward as ArrowForwardIcon } from "@mui/icons-material";

const Wrapper = styled.div`
  ${spacing};
  text-align: center;
`;

const TypographyOverline = styled(Typography)`
  text-transform: uppercase;
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const BrandIcon = styled.img`
  vertical-align: middle;
  height: auto;
`;

const Brand = styled.div`
  background: white;
  display: inline-block;
  padding: 12px 16px;
  border-radius: 10px;
  margin: 10px;
`;

const ArrowForward = styled(ArrowForwardIcon)`
  margin-left: ${(props) => props.theme.spacing(2)};
`;

function Integrations() {
  return (
    <Wrapper py={20}>
      <Container>
        <TypographyOverline variant="body2" gutterBottom>
          Integrations
        </TypographyOverline>
        <Typography variant="h2" component="h3" gutterBottom>
          We use so far: Pointclickcare, Webclock. When2Work, NCS
        </Typography>

        <Box my={7}>
          <Tooltip title="Point Click Care">
            <Brand>
              <BrandIcon
                alt="MUI"
                src="/static/img/brands/PointClickCare.png"
                style={{ height: "34px", margin: "3px 0" }}
              />
            </Brand>
          </Tooltip>
          <Tooltip title="WebClock">
            <Brand>
              <BrandIcon
                alt="Next.js"
                src="/static/img/brands/WebClock.png"
                style={{ height: "40px" }}
              />
            </Brand>
          </Tooltip>
          <Tooltip title="WhenToWork">
            <Brand>
              <BrandIcon
                alt="React"
                src="/static/img/brands/WhenToWork.png"
                style={{ height: "40px" }}
              />
            </Brand>
          </Tooltip>
        </Box>
        <Box>
          <Button
            component={Link}
            href="/documentation/welcome"
            target="_blank"
            variant="contained"
            color="secondary"
            size="large"
          >
            Open Documentation
            <ArrowForward />
          </Button>
        </Box>
      </Container>
    </Wrapper>
  );
}

export default Integrations;
