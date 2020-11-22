import React from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";

/**
 * Footer component
 */
export const MFooter: React.FC = () => {
  return (
    <>
      <footer style={{ color: "white" }}>
        <Container fluid style={{ padding: "2em 1em", background: "#343a40" }}>
          <Row className="justify-content-md-center">
            <Col sm="2">
              <span>DP by Rishabh Tatia &copy; 2020-2021</span>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};