import React from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";

/**
 * Footer component
 */
export const MFooter: React.FC = () => {
  return (
    <>
      <footer style={{ background: "#25282d", color: "white", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center"  }}>
        <Container fluid style={{  }}>
          <Row className="justify-content-md-center">
            <Col sm="auto">
              <span>Aggie Degree Planner &copy; 2020-2021 by <a target="_blank" href="https://tatiaris.com">Rishabh Tatia</a></span>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};