import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CollapsibleBtnsProps } from "../interfaces";
import { Col, Row, Button, ProgressBar } from "react-bootstrap";

/**
 * Collapsible Buttons Component
 */
export const CollapsibleBtns: React.FC<CollapsibleBtnsProps> = (props) => {
  const bootVariant = (props.opposite) ? "primary" : "danger";
  const cellColor = (props.opposite) ? "#3a99ff" : "#dd5c68";
  const [collapse, setCollapse] = useState(true);
  const options = props.courseList;

  const handleCourseBtnClick = (e) => {
      props.activateModal(e.target.name);
  }

  let optionsComponent = [];
  if (options.length > 0 && !collapse){
    optionsComponent = options.map((o, i) => {
      if (o.location == props.courseType || (props.opposite && o.type == props.courseType)) {
        return (
          <Button key={`course-btn-${o.id}`} name={o.id} variant={bootVariant} onClick={handleCourseBtnClick} style={{ width: "100%", borderRadius: "0px", textAlign: "left", background: `${cellColor}` }}>
            {o.name}
            <span style={{ float: "right", fontWeight: "bold" }}>{o.credit_hours}</span>
          </Button>
        )
      }
    });
  }

  const handleCollapseBtn = (e) => {
    setCollapse(!collapse);
  }

  const collapseSymbol = collapse ? '>' : 'v';

  let progress = 0;
  let progressComponent = (<></>);
  let progressCount = (<></>);
  if (props.reqAmount > 0) {
    for (let i = 0; i < options.length; i++){
      if (options[i].type == props.courseType) {
        progress += options[i].credit_hours;
      }
    }
    progressCount = <>({progress}/{props.reqAmount})</>
    progress = Math.round(progress*100/props.reqAmount);
    progressComponent = (<ProgressBar striped variant="success" style={{ height: "2em" }} now={progress} label={`${progress}%`} />);
  }

  return (
    <>
      <Button style={{ width: "100%", borderRadius: "0px", textAlign: "left" }} variant={bootVariant} onClick={handleCollapseBtn}>
        {props.courseType} {progressCount}
        <span style={{ float: "right", fontWeight: "bold" }}>{collapseSymbol}</span>
      </Button>
      {progressComponent}
      {optionsComponent}
    </>
  );
};

CollapsibleBtns.propTypes = {
  courseType: PropTypes.string,
  courseList: PropTypes.any,
  activateModal: PropTypes.any,
  reqAmount: PropTypes.number
};
