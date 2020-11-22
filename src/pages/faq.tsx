import React from "react";
import { WordCloud } from "../components/GraphComponents/WordCloud/WordCloud";
import { MFooter } from "../components/MFooter";
import { Mheader } from "../components/Mheader/"
import { Mnavbar } from "../components/Mnavbar/";

const Faq = (): React.ReactNode => {
  return (
    <>
        <Mheader title={"FAQ"}/>
        <Mnavbar theme={"dark"}/>
        <WordCloud interactions={{}}></WordCloud>
        <MFooter/>
    </>
  );
};

export default Faq;