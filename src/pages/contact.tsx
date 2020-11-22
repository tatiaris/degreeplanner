import React from "react";
import { Mheader } from "../components/Mheader/"
import { Mnavbar } from "../components/Mnavbar/";
import { MFooter } from "../components/MFooter";

const Contact = (): React.ReactNode => {
  return (
    <>
        <Mheader title={"Contact"}/>
        <Mnavbar theme={"dark"}/>
        <MFooter/>
    </>
  );
};

export default Contact;