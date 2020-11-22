import React, { useEffect, useState } from "react";
import { MFooter } from "../components/MFooter";
import { Mheader } from "../components/Mheader/";
import { Mnavbar } from "../components/Mnavbar/";
import { Col } from "react-bootstrap";

const Tutorial = (): React.ReactNode => {
  const [tree, setTree] = useState(<></>);

  return (
    <>
      <Mheader title={"Tutorial"} />
      <Mnavbar theme={"dark"} />
      <MFooter />
    </>
  );
};

export default Tutorial;
