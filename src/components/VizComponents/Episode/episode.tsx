import React from "react";
import { EpisodeTitle, StyledEpisode } from "./style";
import { EpisodeProps } from "../../interfaces";
import PropTypes from "prop-types";
import { InteractionContainer } from "../InteractionContainer";

/**
 * Inputs Container component
 */
export const Episode: React.FC<EpisodeProps> = (props) => {
  return (
    <StyledEpisode>
      <EpisodeTitle>{props.content.title}</EpisodeTitle>
      <InteractionContainer colorDict={props.colorDict} interactionParts={props.content.episode_parts}></InteractionContainer>
    </StyledEpisode>
  );
};

Episode.propTypes = {
  content: PropTypes.any,
};
