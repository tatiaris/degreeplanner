import React from "react";
import Head from "next/head";
import { MheaderProps } from "../interfaces";
import PropTypes from "prop-types";

/**
 * Mheader component
 */
export const Mheader: React.FC<MheaderProps> = (props) => {
  return (
    <div>
      <Head>
        <title>DP | {props.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

Mheader.propTypes = {
  title: PropTypes.string.isRequired,
};
