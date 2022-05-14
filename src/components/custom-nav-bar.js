import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';

import logo192 from '../assets/images/logo192.png';


class CustomNavbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky={"top"}>
          <Container>
            <Navbar.Brand href="#home">
              <img
                  alt=""
                  src={logo192}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
              />{' '}
              Gauss Talk
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
                <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <Nav.Link href="#deets">More deets</Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                  Dank memes
                </Nav.Link>
                <Nav.Link href='https://login.microsoftonline.com/cfcd9b87-7c5a-4042-9129-abee6253febe/oauth2/v2.0/authorize?client_id=7fc37514-c400-4b28-a6d6-e19a9ae981b6&response_type=code&redirect_uri=http://localhost:3000/auth&scope=User.read'>
                  Login
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default CustomNavbar;