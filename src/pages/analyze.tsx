import React, { useState } from "react";
import { Mheader } from "../components/Mheader/"
import { Mnavbar } from "../components/Mnavbar/";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Dashboard } from "../components/Dashboard";
import { MFooter } from "../components/MFooter";

const AnalyzePage = (): React.ReactNode => {
  const [episode, setEpisode] = useState('undetermined');
  const [inpContent, setContent] = useState({});

  const analyze_data = (data) => {
    setContent(data);
  };

  const loadEpisodeData = async (episodeTitle) => {
    const res = await fetch(`/api/interactions?episode=${episodeTitle}`)
    const json = await res.json()
    
    analyze_data(json)
  }

  const handleEpisodeUpdate = (event) => {
    event.preventDefault();
    loadEpisodeData(episode)
  }

  let dashboardComponent = (<></>)
  if (Object.keys(inpContent).length !== 0) {
    dashboardComponent = (<Dashboard data={inpContent}></Dashboard>)
  }

  return (
    <>
        <Mheader title={"Analyze"}/>
        <Mnavbar theme={"dark"}/>
        <Col style={{ marginTop: "1em" }}>
        <h3>Episode Analysis</h3>
        <Form style={{ borderBottom: "1px solid black" }} onSubmit={handleEpisodeUpdate}>
          <Form.Group as={Row}>
            <Form.Label column sm="1">Episode Title:</Form.Label>
            <Col sm="4">
              <Form.Control onChange={e => setEpisode(e.target.value)} type="text" placeholder="ex: Initial Field Report - 1st Observation" required />
            </Col>
            <Col sm="1">
              <Button variant="primary" type="submit">Submit</Button>
            </Col>
          </Form.Group>
        </Form>
        {dashboardComponent}
      </Col>
      <MFooter/>
    </>
  );
};

export default AnalyzePage;