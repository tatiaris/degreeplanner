import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CollapsibleBtnsProps } from "../interfaces";
import { Col, Row, Button } from "react-bootstrap";

/**
 * Collapsible Buttons Component
 */
export const CollapsibleBtns: React.FC<CollapsibleBtnsProps> = (props) => {
  const [collapse, setCollapse] = useState(true);
  const [options, setOptions] = useState(props.courseList);

  const handleCourseBtnClick = () => {
      props.activateModal();
  }

  let optionsComponent = [];
  if (options.length > 0 && !collapse){
    optionsComponent = options.map((o, i) => (
      <Button key={`course-btn-${i}`} onClick={handleCourseBtnClick} style={{ width: "100%", borderRadius: "0px", textAlign: "left", background: "#3a99ff" }}>{o}</Button>
    ));
  }

  const handleCollapseBtn = (e) => {
    setCollapse(!collapse);
  }

  const collapseSymbol = collapse ? '>' : 'v';

  return (
    <>
      <Button style={{ width: "100%", borderRadius: "0px", textAlign: "left" }} onClick={handleCollapseBtn}>
        {props.courseType}
        <span style={{ float: "right", fontWeight: "bold" }}>{collapseSymbol}</span>
      </Button>
      {optionsComponent}
    </>
  );
};

CollapsibleBtns.propTypes = {
  courseType: PropTypes.string,
  courseList: PropTypes.any,
  activateModal: PropTypes.any
};
