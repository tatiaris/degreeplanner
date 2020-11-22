import React from "react";
import {
  StyledInteractionPart,
  Bracket,
  BracketArrow,
  BracketLabel,
  PartLabel,
  InteractionsContainer,
} from "./style";
import { InteractionPartProps } from "../../interfaces";
import PropTypes from "prop-types";
import { Interaction } from "../Interaction";

/**
 * Interaction Part component
 */
export const InteractionPart: React.FC<InteractionPartProps> = (props) => {
  let interactionElements = <></>;

  if (props.interactions != undefined) {
    interactionElements = props.interactions.interactions.map(
      (interaction_details, i) => (
        <Interaction
          colorDict={props.colorDict}
          key={"interaction-" + i}
          details={interaction_details}
        ></Interaction>
      )
    );
  }

  return (
    <StyledInteractionPart>
      <InteractionsContainer>{interactionElements}</InteractionsContainer>
      <BracketLabel>
        <Bracket></Bracket>
        <BracketArrow></BracketArrow>
        <PartLabel>{props.interactions.label}</PartLabel>
      </BracketLabel>
    </StyledInteractionPart>
  );
};

InteractionPart.propTypes = {
  interactions: PropTypes.any,
};
