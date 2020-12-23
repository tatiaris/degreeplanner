import React from "react";
import PropTypes from "prop-types";
import { CourseColumnProps } from "../interfaces";
import { Col } from "react-bootstrap";
import { CollapsibleBtns } from "../CollapsibleBtns";
import { PlaceHolder } from "../Placeholder";

/**
 * Course Column Component
 */
export const CourseColumn: React.FC<CourseColumnProps> = (props) => {
  const collapsibleBtnsList = Object.keys(props.categories).map((c) => (
    <CollapsibleBtns
      key={"tbt" + c}
      activateModal={props.handleCourseClick}
      courseType={c}
      courseList={props.courseList}
      opposite={props.opposite}
      reqAmount={0}
    ></CollapsibleBtns>
  ));

  return (
    <>
      <Col
        sm="2"
        style={{
          background: "#343a40",
          padding: "1em",
          height: "100%",
          overflow: "scroll",
        }}
      >
        <PlaceHolder show={Object.keys(props.categories).length == 0} />
        {collapsibleBtnsList}
      </Col>
    </>
  );
};

CourseColumn.propTypes = {
  courseList: PropTypes.any,
  handleCourseClick: PropTypes.any,
  opposite: PropTypes.bool,
  categories: PropTypes.any,
};
