import React from "react";
import { MnavbarProps } from "../interfaces";
import PropTypes from "prop-types";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

/**
 * Mnavbar component
 */
export const Mnavbar: React.FC<MnavbarProps> = (props) => {
  return (
    <>
      <Navbar
        style={{ backgroundColor: "#25282d !important" }}
        collapseOnSelect
        expand="lg"
        bg={props.theme}
        variant={props.theme}
      >
        <Navbar.Brand href="/">Aggie Degree Planner</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link href="/about">About</Nav.Link> */}
          </Nav>
          <NavDropdown.Divider />
          <Nav>
            <Nav.Link href="/tutorial">Tutorial</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

Mnavbar.propTypes = {
  theme: PropTypes.any.isRequired,
};
