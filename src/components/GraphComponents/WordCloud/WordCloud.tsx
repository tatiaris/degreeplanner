import React from "react";
import { WordCloudProps } from "../../interfaces";
import PropTypes from "prop-types";

/**
 * Word Cloud component
 */
export const WordCloud: React.FC<WordCloudProps> = (props) => {
  const text = "Four score and seven years ago"
  const loadWordCloud = async () => {
  }
  loadWordCloud()
  return (
      <></>
  );
};

WordCloud.propTypes = {
  interactions: PropTypes.any
};
