import React from "react";
import styled from "@emotion/styled";
import { rgba } from "polished";
import Link from "next/link";

import { Button, Box, Container, Grid, Typography } from "@mui/material";
import { spacing } from "@mui/system";
import { ArrowForward as ArrowForwardIcon } from "@mui/icons-material";

import {
  Code as CodeIcon,
  HeartPulse as HeartPulseIcon,
  Gauge as GaugeIcon,
  DollarSign as DollarSignIcon,
  ShieldCheck as ShieldCheckIcon,
  Building2 as Building2Icon,
} from "lucide-react";

import FigmaIcon from "@/vendor/figma.svg";

const Wrapper = styled.div`
  ${spacing};
  background: ${(props) => props.theme.palette.background.paper};
  text-align: center;
`;

const TypographyOverline = styled(Typography)`
  text-transform: uppercase;
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const FeatureWrapper = styled.div`
  display: flex;
  text-align: left;
  padding: 18px 20px;
`;

const FeatureIcon = styled.div`
  svg {
    flex-shrink: 0;
    width: auto;
    height: 48px;
    width: 48px;
    background: ${(props) => rgba(props.theme.palette.primary.main, 0.15)};
    color: ${(props) => props.theme.palette.primary.main};
    padding: 10px;
    border-radius: 50%;
  }
`;

const ArrowForward = styled(ArrowForwardIcon)`
  margin-left: ${(props) => props.theme.spacing(2)};
`;

const Feature = ({ Icon, title, description }) => {
  return (
    <Grid
      size={{
        xs: 12,
        sm: 6,
        md: 4,
        lg: 4,
      }}
    >
      <FeatureWrapper>
        <FeatureIcon>
          <Icon />
        </FeatureIcon>
        <Box ml={6}>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {description}
          </Typography>
        </Box>
      </FeatureWrapper>
    </Grid>
  );
};

function Features() {
  return (
    <Wrapper py={20}>
      <Container>
        <TypographyOverline variant="body2" gutterBottom>
          Solutions
        </TypographyOverline>
        <Typography variant="h2" component="h3" gutterBottom>
          Developers love Mira Pro
        </Typography>
        <Box mb={8} />
        <Grid container spacing={6}>
          <Feature
            Icon={HeartPulseIcon}
            title="Clinical Intelligence"
            description={
              <ul style={{ margin: 0, paddingLeft: "20px" }}>
                <li>Monitor vitals, medication adherence, and wound care</li>
                <li>Predict falls, infections, and clinical decline with AI</li>
                <li>Automate care plan alerts and nursing follow-ups</li>
              </ul>
            }
          />
          <Feature
            Icon={GaugeIcon}
            title="Operational Performance"
            description={
              <ul style={{ margin: 0, paddingLeft: "20px" }}>
                <li>Optimize staffing and reduce overtime</li>
                <li>Monitor census, turnover, and service quality</li>
                <li>AI detects inefficiencies and suggests improvements</li>
              </ul>
            }
          />

          <Feature
            Icon={DollarSignIcon}
            title="Financial Optimization"
            description={
              <ul style={{ margin: 0, paddingLeft: "20px" }}>
                <li>Identify missed billing opportunities</li>
                <li>Forecast budgets using AI-powered financial modeling</li>
                <li>Spot payer delays and reimbursement issues instantly</li>
              </ul>
            }
          />

          <Feature
            Icon={ShieldCheckIcon}
            title="Compliance Monitoring"
            description={
              <ul style={{ margin: 0, paddingLeft: "20px" }}>
                <li>Real-time alerts for documentation gaps</li>
                <li>Track incidents, infection control, and audit-readiness</li>
                <li>AI flags patterns before they become violations</li>
              </ul>
            }
          />

          <Feature
            Icon={Building2Icon}
            title="Multi-Facility Oversight"
            description={
              <ul style={{ margin: 0, paddingLeft: "20px" }}>
                <li>Centralize insights across multiple sites</li>
                <li>Benchmark KPIs and drill down to the resident level</li>
                <li>
                  Use AI to surface anomalies and standardize best practices
                </li>
              </ul>
            }
          />
        </Grid>

        <Box mt={4}>
          <Button
            component={Link}
            href="/documentation/welcome"
            variant="contained"
            color="secondary"
            size="large"
            target="_blank"
          >
            Open Documentation
            <ArrowForward />
          </Button>
        </Box>
      </Container>
    </Wrapper>
  );
}

export default Features;
