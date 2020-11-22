import React from "react";
import { InpErrMsgStyled } from "./style";
import { InputErrMsgProps } from "../interfaces";
import PropTypes from "prop-types";

/**
 * Input Error Message Container
 */
export const InputErrMsg: React.FC<InputErrMsgProps> = (props) => {

  return (
    <InpErrMsgStyled>
      {props.message}
    </InpErrMsgStyled>
  );
};

InputErrMsg.propTypes = {
  message: PropTypes.string
};
