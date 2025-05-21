"use client";

import React from "react";
import styled from "@emotion/styled";

import { Avatar, Typography } from "@mui/material";

import SignInComponent from "@/components/auth/SignIn";
import useAuth from "@/hooks/useAuth";

const BigAvatar = styled(Avatar)`
  width: 92px;
  height: 92px;
  text-align: center;
  margin: 0 auto ${(props) => props.theme.spacing(5)};
`;

function SignIn() {
  const { user } = useAuth();
  const fullName = user?.displayName || "User";
  const firstName = fullName.split(" ")[0];
  return (
    <React.Fragment>
      <BigAvatar alt="Lucy" src="/static/img/avatars/avatar-1.jpg" />

      <Typography component="h1" variant="h3" align="center" gutterBottom>
        Welcome back, {firstName}!
      </Typography>
      <Typography component="h2" variant="subtitle1" align="center">
        Sign in to your account to continue
      </Typography>

      <SignInComponent />
    </React.Fragment>
  );
}

export default SignIn;
