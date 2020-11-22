import React from "react";
import { InpsContainer } from "./style";
import { InputProps } from "../interfaces";
import PropTypes from "prop-types";
import { Form, Button, Col, Row } from "react-bootstrap";

/**
 * Inputs Container component
 */
export const InputContainer: React.FC<InputProps> = (props) => {
  const iea_api_url = "https://iea-backend.herokuapp.com";

  const get_data = (f_name) => {
    fetch(`${iea_api_url}/get-data?src_file=${f_name}`)
      .then((response) => response.json())
      .then((response_data) => {
        props.visualizeFunc(response_data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFileChange = (event) => {
    event.preventDefault();

    const files = event.target.files;
    const formData = new FormData();
    formData.append("data_file", files[0]);

    let req = fetch(`${iea_api_url}/upload-data`, {
      method: "post",
      body: formData,
    })
      .then((response) => get_data(files[0].name))
      .catch((error) => {
        console.log(error);
      });
  };

  const handleColorUpdate = (event) => {
    props.colorUpdateFunc(event.target.name, event.target.value);
  }

  const handleDownload = (event) => {
    event.preventDefault();
  }

  let colorInputs = [(<></>)];
  if (props.colorDict != undefined) {
    colorInputs = (Object.keys(props.colorDict.colors)).map((key, i) => (
      <>
        <Form.Label column sm="1" key={"color-label-" + i}>{key + ': '}</Form.Label>
        <Col style={{ paddingTop: "calc(.375rem + 1px)", paddingBottom: "calc(0.375rem + 1px)" }} sm="1">
          <input key={"color-input-" + i} onChange={handleColorUpdate} type="color" name={key} defaultValue={props.colorDict.colors[key]}/>
        </Col>
      </>
    ));
  }

  return (
    <InpsContainer style={{ borderBottom: "1px solid black" }}>
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm="1">Episode File:</Form.Label>
          <Col sm="4">
            <Form.File onChange={handleFileChange} id="exampleFormControlFile1" />
          </Col>
          <Col sm="1">
            <Button onClick={handleDownload} variant="primary" type="submit">Download</Button>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>{colorInputs}</Form.Group>
      </Form>

      
      
    </InpsContainer>
  );
};

InputContainer.propTypes = {
  visualizeFunc: PropTypes.any,
  colorUpdateFunc: PropTypes.any,
  colorDict: PropTypes.any
};
