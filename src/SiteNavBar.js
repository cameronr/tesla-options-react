import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

class SiteNavBar extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Tesla Options Decoder</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">Check your options</NavItem>
            <NavItem eventKey={2} href="#">Show all possible options</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">About</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default SiteNavBar;
