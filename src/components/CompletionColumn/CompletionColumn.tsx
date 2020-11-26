import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CompletionColumnProps } from "../interfaces";
import { Col, Row, Button, ProgressBar } from "react-bootstrap";
import { CollapsibleBtns } from "../CollapsibleBtns";

/**
 * Completion Column Component
 */
export const CompletionColumn: React.FC<CompletionColumnProps> = (props) => {
  const collapsibleBtnsList = Object.keys(props.categories).map(c => (
    <CollapsibleBtns key={c} activateModal={props.handleCourseClick} courseType={c} courseList={props.courseList} opposite={props.opposite} reqAmount={props.categories[c].hours}></CollapsibleBtns>
  ))
  return (
    <>
      <Col sm="3" style={{ background: "#343a40", padding: "1em", height: "100%", overflow: "scroll" }}>
        {collapsibleBtnsList}
      </Col>
    </>
  );
};

CompletionColumn.propTypes = {
  courseList: PropTypes.any,
  handleCourseClick: PropTypes.any,
  opposite: PropTypes.bool,
  categories: PropTypes.any,
};
