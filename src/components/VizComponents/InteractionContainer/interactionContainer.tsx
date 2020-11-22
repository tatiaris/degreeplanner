import React from "react";
import { InteractionInfo, RowType, StyledInteractionContainer } from "./style";
import { InteractionContainerProps } from "../../interfaces";
import PropTypes from "prop-types";
import {InteractionPart } from "../InteractionPart"

/**
 * Inputs Container component
 */
export const InteractionContainer: React.FC<InteractionContainerProps> = (
  props
) => {
  let interactionPartElements = (<></>);
  
  if (props.interactionParts != undefined) {
    interactionPartElements = props.interactionParts.map((part, i) => (
      <InteractionPart colorDict={props.colorDict} key={"interaction-part-" + i} interactions={part}></InteractionPart>
    ));
  }

  return (
    <StyledInteractionContainer>
      <InteractionInfo>
        <tbody>
          <RowType><td>Initiator</td></RowType>
          <RowType style={{height: '20px'}}><td>Technology</td></RowType>
          <RowType><td>Receiver</td></RowType>
          <RowType style={{minHeight: '20px'}}><td>Duration (sec)</td></RowType>
          <RowType><td>Conversation</td></RowType>
        </tbody>
      </InteractionInfo>
      {interactionPartElements}
    </StyledInteractionContainer>
  );
};

InteractionContainer.propTypes = {
  interactionParts: PropTypes.any,
};
