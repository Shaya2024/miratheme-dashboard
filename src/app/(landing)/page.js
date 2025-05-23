"use client";

import React from "react";

import AppBar from "@/components/pages/landing/AppBar";
import Introduction from "@/components/pages/landing/Introduction";
import Demos from "@/components/pages/landing/Demos";
import Testimonial from "@/components/pages/landing/Testimonial";
import Integrations from "@/components/pages/landing/Integrations";
import Features from "@/components/pages/landing/Features";
import FAQ from "@/components/pages/landing/FAQ";
import JoinUs from "@/components/pages/landing/JoinUs";

function Presentation() {
  return (
    <React.Fragment>
      <AppBar />
      <Introduction />
      <Demos />
      <Testimonial />
      <Integrations />
      <Features />
      <FAQ />
      <JoinUs />
    </React.Fragment>
  );
}

export default Presentation;
