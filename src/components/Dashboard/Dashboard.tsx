import React from "react";
import { DashboardProps } from "../interfaces";
import PropTypes from "prop-types";
import { Col, Row, Table } from "react-bootstrap";

const getTotalWords = (convo) => {
  return convo.split(' ').length
}
const average = (array) => {
  if (array.length < 1) return 0;
  return array.reduce((a, b) => a + b) / array.length;
}

/**
 * Dashboard component
*/
export const Dashboard: React.FC<DashboardProps> = (props) => {
  let CanvasJSReact, CanvasJS, CanvasJSChart;
  let charts = (<></>);

  const totalInteractions = props.data.length;
  let participantCount = {}
  let participantList = Array.from(new Set(props.data.map(d => d.initiator).concat(props.data.map(d => d.receiver))))
  participantList.forEach(p => { participantCount[p.toString()] = 0 });
  let participantsPieChartDatapoints = []
  
  let durationList = props.data.map(d => d.duration)
  let wpiList = props.data.map(d => getTotalWords(d.conversation))
  
  let technologyCount = {}
  let technologyList = Array.from(new Set(props.data.map(d => d.technology)))
  technologyList.forEach(t => { technologyCount[t.toString()] = 0 });
  let technologyPieChartDatapoints = []

  for (let i = 0; i < props.data.length; i++) {
    participantCount[props.data[i].initiator] += 1
    participantCount[props.data[i].receiver] += 1
    technologyCount[props.data[i].technology] += 1
  }

  durationList = durationList.sort((a, b) => a - b)
  const minDuration = durationList[0];
  const maxDuration = durationList[durationList.length - 1]
  const q1Duration = durationList[Math.floor(durationList.length/4)]
  const q2Duration = durationList[Math.floor(durationList.length/2)]
  const q3Duration = durationList[Math.floor(durationList.length*3/4)]
  const averageDuration = Math.round(average(durationList)*10)/10

  wpiList = wpiList.sort((a, b) => a - b)
  const minwpi = wpiList[0];
  const maxwpi = wpiList[wpiList.length - 1]
  const q1wpi = wpiList[Math.floor(wpiList.length/4)]
  const q2wpi = wpiList[Math.floor(wpiList.length/2)]
  const q3wpi = wpiList[Math.floor(wpiList.length*3/4)]
  const averageWpi = Math.round(average(wpiList))

  for (let t in technologyCount) {
    technologyPieChartDatapoints.push({
      y: Math.round(technologyCount[t]*10000/totalInteractions)/100,
      label: t
    })
  }
  for (let p in participantCount) {
    participantsPieChartDatapoints.push({
      y: Math.round(participantCount[p]*10000/totalInteractions)/100,
      label: p
    })
  }
  
  const DurationsBoxPlot = {
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
		dataPointWidth: 40,
    title:{
      text: "Duration Distribution",
      fontSize: "18"
    },
    axisY: {
      title: "duration (seconds)"
    },
    data: [{
      type: "boxAndWhisker",
      // color: "black",
      upperBoxColor: "#23bfaa",
      lowerBoxColor: "#c0504e",
      stroke: 1,
      dataPoints: [
        { label: "Conversations",  y: [minDuration, q1Duration, q3Duration, maxDuration, q2Duration] }
      ],
      whiskerThickness: 3,
      stemThickness: 3,
      lineThickness: 3,
      upperBoxThickness: 3
    }]
  }

  const WPIBoxPlot = {
    theme: "light2",
    animationEnabled: true,
    exportEnabled: true,
		dataPointWidth: 40,
    title:{
      text: "WPI Distribution",
      fontSize: "18"
    },
    axisY: {
      title: "WPI (count)"
    },
    data: [{
      type: "boxAndWhisker",
      // color: "black",
      upperBoxColor: "#23bfaa",
      lowerBoxColor: "#c0504e",
      stroke: 1,
      dataPoints: [
        { label: "Conversations",  y: [minwpi, q1wpi, q3wpi, maxwpi, q2wpi] }
      ],
      whiskerThickness: 3,
      stemThickness: 3,
      lineThickness: 3,
      upperBoxThickness: 3
    }]
  }

  const TechnologyPieChart = {
    theme: "light2",
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Technology Used",
      fontSize: "18"
    },
    data: [{
      type: "pie",
      startAngle: 75,
      toolTipContent: "<b>{label}</b>: {y}%",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}%",
      dataPoints: technologyPieChartDatapoints
    }]
  }

  const participantsPieChart = {
    theme: "light2",
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Participation Distribution",
      fontSize: "18"
    },
    data: [{
      type: "pie",
      startAngle: 75,
      toolTipContent: "<b>{label}</b>: {y}%",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}%",
      dataPoints: participantsPieChartDatapoints
    }]
  }

  if (typeof window !== 'undefined') {
    CanvasJSReact = require('../../pages/api/canvasjs.react')
    CanvasJSChart = CanvasJSReact.default.CanvasJSChart;
    charts = (
      <>
        <Col sm="5" style={{ margin: "1em" }}>
          <CanvasJSChart options = {TechnologyPieChart}/>
        </Col>
        <Col sm="5" style={{ margin: "1em" }}>
          <CanvasJSChart options = {participantsPieChart}/>
        </Col>
        <Col sm="5" style={{ margin: "1em" }}>
          <CanvasJSChart options = {DurationsBoxPlot}/>
        </Col>
        <Col sm="5" style={{ margin: "1em" }}>
          <CanvasJSChart options = {WPIBoxPlot}/>
        </Col>
      </>
    )
  }

  return (
    <>
      <Row style={{padding: "1em"}}>
        <Col sm="3" style={{ margin: "1em" }}>
          <Table striped>
            <thead>
              <tr>
                <th style={{ textAlign: "center", borderTop: "0px", paddingTop: "0px" }} colSpan={2}>Overall Statistics</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Participants</td>
                <td>{participantList.length}</td>
              </tr>
              <tr>
                <td>Technologies</td>
                <td>{technologyPieChartDatapoints.length}</td>
              </tr>
              <tr>
                <td>Frequency of Interactions</td>
                <td>{totalInteractions}</td>
              </tr>
              <tr>
                <td>Average Duration</td>
                <td>{averageDuration}s</td>
              </tr>
              <tr>
                <td>Median Duration</td>
                <td>{q2Duration}s</td>
              </tr>
              <tr>
                <td>Average WPI</td>
                <td>{averageWpi}</td>
              </tr>
              <tr>
                <td>Median WPI</td>
                <td>{q2wpi}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col>
          <Row>
            {charts}
          </Row>
        </Col>
      </Row>
    </>
  );
};

Dashboard.propTypes = {
  data: PropTypes.any,
};
