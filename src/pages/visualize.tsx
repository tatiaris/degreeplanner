import React, { useState } from "react";
import { Mheader } from "../components/Mheader";
import { Mnavbar } from "../components/Mnavbar";
import { InputContainer } from "../components/InputContainer";
import { PosterContainer } from "../components/PosterContainer";
import { Form, Button, Col, Row } from "react-bootstrap";
import { MFooter } from "../components/MFooter";

interface colorDict {
  colors: any;
}

const VisualizePage = (): React.ReactNode => {
  const [inpContent, setContent] = useState({});
  const [episode, setEpisode] = useState('');

  const visualize_data = (data) => {
    setParticipantColors(generateColorDict(data))
    setCopyParticipantColors(generateColorDict(data))
    setContent(data);
  };

  const loadEpisodeData = async (episodeTitle) => {
    const res = await fetch(`/api/interactions?episode=${episodeTitle}`)
    const json = await res.json()
    let episode_parts = []

    for (let k = 0; k < json.length; k++) {
      let found = false;
      for (let i = 0; i < episode_parts.length; i++) {
        if (episode_parts[i].label == json[k].sub_episode) {
          found = true
          episode_parts[i].interactions.push(json[k])
        }
      }
      if (!found) {
        episode_parts.push({
          "label": json[k].sub_episode,
          "interactions": [
            json[k]
          ]
        })
      }
    }

    let newContent = {
      "observations": [
        {
          "title": episodeTitle,
          "episode_parts": episode_parts
        }
      ]
    }
    
    visualize_data(newContent)
  }

  const handleEpisodeUpdate = (event) => {
    event.preventDefault();
    loadEpisodeData(episode)
  }

  const generateColorDict = (data) => {
    if (data == {}) return {colors: {}}
    if (data == null) return {colors: {}}
    let colorDict = {};
    if (data["observations"]) {
      for (let k = 0; k < data["observations"].length; k++) {
        let episode = data["observations"][k];
        for (let j = 0; j < episode.episode_parts.length; j++) {
          let part = episode.episode_parts[j];
          for (let i = 0; i < part.interactions.length; i++) {
            if (!(part.interactions[i].initiator in colorDict)) {
              colorDict[part.interactions[i].initiator] = "#ffffff"
            }
            if (!(part.interactions[i].receiver in colorDict)) {
              colorDict[part.interactions[i].receiver] = "#ffffff"
            }
          }
        }
      }
    }
    return {
      colors: colorDict
    };
  };

  const [participantColors, setParticipantColors] = useState<colorDict | null>(
    generateColorDict({})
  );
  const [copyParticipantColors, setCopyParticipantColors] = useState<colorDict | null>(
    generateColorDict({})
  );

  const handleColorChange = (clabel, newColor) => {
    let newParticipantColors = {colors: {}};
    for (let p in participantColors.colors) {
      if (p == clabel) {
        newParticipantColors.colors[p] = newColor;
      } else {
        newParticipantColors.colors[p] = participantColors.colors[p];
      }
    }
    setParticipantColors(newParticipantColors);
  };

  return (
    <>
      <Mheader title={"Visualize"}/>
      <Mnavbar theme={"dark"}/>
      <Col style={{marginTop: "1em"}}>
        <h3>Poster Visualization</h3>
        <Form.Group>
          <span>Sample files: </span>
          <a href="/files/sample.csv">csv</a>,{" "}
          <a href="/files/sample.yaml">yaml</a>,{" "}
          <a href="/files/sample.json">json</a>
          <br/>
        </Form.Group>
        <Form onSubmit={handleEpisodeUpdate}>
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
        <InputContainer
          colorUpdateFunc={handleColorChange}
          colorDict={copyParticipantColors}
          visualizeFunc={visualize_data}
        ></InputContainer>
        <PosterContainer
          colorDict={participantColors}
          content={inpContent}
        ></PosterContainer>
      </Col>
      <MFooter/>
    </>
  );
};

export default VisualizePage;
