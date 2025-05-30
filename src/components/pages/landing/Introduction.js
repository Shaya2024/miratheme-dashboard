import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { rgba } from "polished";
import Link from "next/link";

import {
  Box,
  Button,
  Container,
  Grid,
  Tooltip,
  Typography as MuiTypography,
} from "@mui/material";
import { spacing } from "@mui/system";
import { Visibility as VisibilityIcon } from "@mui/icons-material";
import { ArrowForward as ArrowForwardIcon } from "@mui/icons-material";

const Typography = styled(MuiTypography)(spacing);

const Wrapper = styled.div`
  padding-top: 3.5rem;
  position: relative;
  text-align: center;
  overflow: hidden;

  @keyframes perspectiveAnimation {
    from {
      opacity: 0;
      transform: perspective(1500px) rotateX(0deg);
    }

    to {
      opacity: 1;
      transform: perspective(2000px) rotateX(25deg);
    }
  }

  .animate__perspective {
    animation-name: perspectiveAnimation;
  }
`;

const Content = styled.div`
  padding: ${(props) => props.theme.spacing(6)} 0;
  line-height: 150%;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  box-shadow: 0 6px 18px 0 rgba(18, 38, 63, 0.075);
  border-radius: 5px;
  z-index: 0;
  position: relative;
  image-rendering: optimizequality;
  image-rendering: -webkit-optimize-contrast;
  margin-bottom: -100px;
  margin-top: -35px;
  ${(props) => props.theme.breakpoints.up("md")} {
    margin-top: -50px;
  }
`;

const ImageWrapper = styled.div`
  &:before {
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.02));
    bottom: 0;
    left: 0;
    position: absolute;
    content: " ";
    z-index: 1;
    display: block;
    width: 100%;
    height: 75px;
    pointer-events: none;
  }
`;

const Title = styled(Typography)`
  opacity: 0.9;
  line-height: 1.4;
  font-size: 1.75rem;
  font-weight: ${(props) => props.theme.typography.fontWeightBold};

  ${(props) => props.theme.breakpoints.up("sm")} {
    font-size: 2rem;
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    font-size: 2.5rem;
  }

  span {
    color: ${(props) => props.theme.palette.secondary.main};
  }
`;

const Subtitle = styled(Typography)`
  font-size: ${(props) => props.theme.typography.h6.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightRegular};
  font-family: ${(props) => props.theme.typography.fontFamily};
  margin: ${(props) => props.theme.spacing(2)} 0;
`;

const BrandIcon = styled.img`
  vertical-align: middle;
  margin-right: ${(props) => props.theme.spacing(3)};
  height: auto;
`;

const Visibility = styled(VisibilityIcon)`
  margin-right: ${(props) => props.theme.spacing(2)};
`;

const ArrowForward = styled(ArrowForwardIcon)`
  margin-left: ${(props) => props.theme.spacing(2)};
`;

const Version = styled(MuiTypography)`
  color: ${(props) => props.theme.palette.primary.main};
  font-weight: ${(props) => props.theme.typography.fontWeightBold};
  background: ${(props) => rgba(props.theme.palette.primary.main, 0.1)};
  box-shadow: 0 1px 1px
    ${(props) => rgba(props.theme.palette.primary.main, 0.25)};
  padding: 3px 8px;
  border-radius: 4px;
  margin-bottom: ${(props) => props.theme.spacing(3)};
  display: inline-block;
`;

function Introduction() {
  const [triggerAnimation, setTriggerAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTriggerAnimation(true);
    }, 500);
  }, []);

  return (
    <Wrapper>
      <Container>
        <Grid container alignItems="center" justifyContent="center" spacing={4}>
          <Grid
            size={{
              xs: 12,
              sm: 9,
              md: 8,
              lg: 8,
            }}
          >
            <Content>
              {/*<Version variant="body2">v6.0.0</Version>*/}
              <Title variant="h1" gutterBottom>
                Data-Driven Care for a Healthier Tomorrow
              </Title>
              <Grid container justifyContent="center" spacing={4}>
                <Grid
                  size={{
                    xs: 12,
                    lg: 10,
                  }}
                >
                  <Subtitle color="textSecondary">
                    Real-time analytics powered by AI — designed exclusively for
                    nursing homes to improve outcomes, streamline operations,
                    and ensure compliance.
                  </Subtitle>
                </Grid>
              </Grid>
              <Grid container justifyContent="center" spacing={4}>
                <Box my={6}>
                  <Button
                    href="#demos"
                    variant="contained"
                    color="secondary"
                    size="large"
                  >
                    <Visibility />
                    Request a Demo
                    <ArrowForward />
                  </Button>
                </Box>
                <Box my={6}>
                  <Button
                    href="#demos"
                    variant="contained"
                    color="secondary"
                    size="large"
                  >
                    <Visibility />
                    See Dashboard
                    <ArrowForward />
                  </Button>
                </Box>
              </Grid>

              <Typography variant="body2" color="textSecondary">
                Available for:
              </Typography>
              <div
                className={`animate__animated ${
                  triggerAnimation ? "animate__fadeIn" : ""
                }`}
                style={{ opacity: triggerAnimation ? 1 : 0 }}
              >
                <Box my={3}>
                  <Tooltip title="JavaScript">
                    <BrandIcon
                      alt="JavaScript"
                      src="/static/img/brands/javascript.svg"
                      style={{ width: "40px" }}
                    />
                  </Tooltip>
                  <Tooltip title="TypeScript">
                    <BrandIcon
                      alt="TypeScript"
                      src="/static/img/brands/typescript.svg"
                      style={{ width: "40px", background: "#FFF" }}
                    />
                  </Tooltip>
                  <Tooltip title="Figma">
                    <BrandIcon
                      alt="Figma"
                      src="/static/img/brands/figma.svg"
                      style={{ width: "22px" }}
                    />
                  </Tooltip>
                </Box>
              </div>
            </Content>
          </Grid>
        </Grid>
        <Grid container alignItems="center" justifyContent="center" spacing={4}>
          <Grid
            size={{
              xs: 12,
              sm: 10,
              md: 9,
              lg: 9,
            }}
          >
            <div
              className={`animate__animated ${
                triggerAnimation ? "animate__perspective" : ""
              }`}
              style={{ opacity: triggerAnimation ? 1 : 0 }}
            >
              <ImageWrapper>
                <Link href="/dashboard/analytics" target="_blank">
                  <Image
                    alt="Mira - React Material UI Admin Dashboard"
                    src={`/static/img/screenshots/dashboard-analytics-large.jpg`}
                  />
                </Link>
              </ImageWrapper>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Wrapper>
  );
}

export default Introduction;
