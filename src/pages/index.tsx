import React, { useEffect, useState } from "react";
import { Mheader } from "../components/Mheader";
import { Mnavbar } from "../components/Mnavbar/";
import { MFooter } from "../components/MFooter";
import { Col, Row, Button, Modal, Form } from "react-bootstrap";
import { CollapsibleBtns } from "../components/CollapsibleBtns";

const Home = (): React.ReactNode => {
  const [chosenSemester, setChosenSemester] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleCourseClick = () => {
    setShow(true);
  }
  useEffect(() => {
    console.log(chosenSemester)
  }, [chosenSemester])
  return (
    <>
      <Mheader title={"Home"} />
      <Mnavbar theme={"dark"} />
      <Row style={{ margin: "0px" }}>
        <Col sm="2" style={{ background: "#9bcbff", padding: "0px", minHeight: "86vh" }}>
          <CollapsibleBtns activateModal={handleCourseClick} courseType={"Required"} courseList={['ENGR - 102', 'CHEM - 107', 'CHEM - 117', 'MATH - 152']}></CollapsibleBtns>          
          <CollapsibleBtns activateModal={handleCourseClick} courseType={"Recommended"} courseList={['CSCE - 121', 'CSCE - 222']}></CollapsibleBtns>
        </Col>
        <Col sm="8" style={{ background: "#F2F3A5"}}>

        </Col>
        <Col sm="2" style={{ background: "#9EECA1", padding: "0px" }}></Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Course Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label style={{ fontSize: "1.5em" }}>Choose a semester:</Form.Label>
              <Form.Control onChange={e => setChosenSemester(e.target.value)} as="select" htmlSize={14} style={{ padding: "0px", background: "#b5ddff" }} custom>
                <option style={{ textAlign: "center", fontSize: "1.5em" }}>Semester 1</option>
                <option style={{ textAlign: "center", fontSize: "1.5em" }}>Semester 2</option>
                <option style={{ textAlign: "center", fontSize: "1.5em", background: "#ffff94" }}>Summer 1</option>
                <option style={{ textAlign: "center", fontSize: "1.5em" }}>Semester 3</option>
                <option style={{ textAlign: "center", fontSize: "1.5em" }}>Semester 4</option>
                <option style={{ textAlign: "center", fontSize: "1.5em", background: "#ffff94" }}>Summer 2</option>
                <option style={{ textAlign: "center", fontSize: "1.5em" }}>Semester 5</option>
                <option style={{ textAlign: "center", fontSize: "1.5em" }}>Semester 6</option>
                <option style={{ textAlign: "center", fontSize: "1.5em", background: "#ffff94" }}>Summer 3</option>
                <option style={{ textAlign: "center", fontSize: "1.5em" }}>Semester 7</option>
                <option style={{ textAlign: "center", fontSize: "1.5em" }}>Semester 8</option>
                <option style={{ textAlign: "center", fontSize: "1.5em", background: "#ffff94" }}>Summer 4</option>
                <option style={{ textAlign: "center", fontSize: "1.5em" }}>Semester 9</option>
                <option style={{ textAlign: "center", fontSize: "1.5em" }}>Semester 10</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="danger" onClick={handleClose}>Remove</Button>
          <Button variant="primary" onClick={handleClose}>Move</Button>
        </Modal.Footer>
      </Modal>
      <MFooter />
    </>
  );
};

export default Home;
