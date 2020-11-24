import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CompletionColumnProps } from "../interfaces";
import { Col, Row, Button, ProgressBar } from "react-bootstrap";
import { CollapsibleBtns } from "../CollapsibleBtns";

/**
 * Completion Column Component
 */
export const CompletionColumn: React.FC<CompletionColumnProps> = (props) => {
  return (
    <>
      <Col sm="2" style={{ background: "#343a40", padding: "1em", height: "100%", overflow: "scroll" }}>
        <CollapsibleBtns activateModal={props.handleCourseClick} courseType={"Major Coursework"} courseList={props.courseList} opposite={props.opposite} reqAmount={30}></CollapsibleBtns>
        <CollapsibleBtns activateModal={props.handleCourseClick} courseType={"Supporting Coursework"} courseList={props.courseList} opposite={props.opposite} reqAmount={20}></CollapsibleBtns>
        <CollapsibleBtns activateModal={props.handleCourseClick} courseType={"Additional Coursework"} courseList={props.courseList} opposite={props.opposite} reqAmount={10}></CollapsibleBtns>
        <CollapsibleBtns activateModal={props.handleCourseClick} courseType={"Communication"} courseList={props.courseList} opposite={props.opposite} reqAmount={6}></CollapsibleBtns>
        <CollapsibleBtns activateModal={props.handleCourseClick} courseType={"Mathematics"} courseList={props.courseList} opposite={props.opposite} reqAmount={8}></CollapsibleBtns>
        <CollapsibleBtns activateModal={props.handleCourseClick} courseType={"Life and Physical Sciences"} courseList={props.courseList} opposite={props.opposite} reqAmount={6}></CollapsibleBtns>
        <CollapsibleBtns activateModal={props.handleCourseClick} courseType={"Language, Philosophy & Culture"} courseList={props.courseList} opposite={props.opposite} reqAmount={6}></CollapsibleBtns>
        <CollapsibleBtns activateModal={props.handleCourseClick} courseType={"Creative Arts"} courseList={props.courseList} opposite={props.opposite} reqAmount={6}></CollapsibleBtns>
        <CollapsibleBtns activateModal={props.handleCourseClick} courseType={"Social and Behavioral Sciences"} courseList={props.courseList} opposite={props.opposite} reqAmount={6}></CollapsibleBtns>
        <CollapsibleBtns activateModal={props.handleCourseClick} courseType={"Citizenship"} courseList={props.courseList} opposite={props.opposite} reqAmount={8}></CollapsibleBtns>
        <CollapsibleBtns activateModal={props.handleCourseClick} courseType={"Not Applicable"} courseList={props.courseList} opposite={props.opposite} reqAmount={100}></CollapsibleBtns>
      </Col>
    </>
  );
};

CompletionColumn.propTypes = {
  courseList: PropTypes.any,
  handleCourseClick: PropTypes.any,
  opposite: PropTypes.bool,
};
