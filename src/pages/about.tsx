import React from "react";
import { MFooter } from "../components/MFooter";
import { Mheader } from "../components/Mheader/";
import { Mnavbar } from "../components/Mnavbar/";

const About = (): React.ReactNode => {
  return (
    <>
      <Mheader title={"About"} />
      <Mnavbar theme={"dark"} />
      <MFooter />
    </>
  );
};

export default About;
