import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import '../assets/styles/index.css';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";


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
                    src="./src/assets/images/logo192.png"
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
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          </>
    );
  }
}

export default CustomNavbar;