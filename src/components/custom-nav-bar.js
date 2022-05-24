import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';

import logo192 from '../assets/images/logo192.png';
import {TokenContext} from "./token-context.tsx";


class CustomNavbar extends React.Component {
  static contextType = TokenContext;

  constructor(props) {
    super(props);
  }

  navlinks(props) {
    let token = props.token;
    if(token === null) {
      return (
          <>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href={"/contact"}>Contact Us</Nav.Link>
          </>
      )
    }
    else {
      return (
          <>
              <Nav.Link href="/chat">Chat</Nav.Link>
              <Nav.Link href="/one-on-one">1:1</Nav.Link>
              <Nav.Link href={"/lunch-together"}>Lunch Together</Nav.Link>
          </>
      )
    }
  }

  loginLogoutLink(props) {
    let token = props.token;
    if(token === null) {
      return (
        <Nav.Link href='https://login.microsoftonline.com/cfcd9b87-7c5a-4042-9129-abee6253febe/oauth2/v2.0/authorize?client_id=7fc37514-c400-4b28-a6d6-e19a9ae981b6&response_type=code&redirect_uri=http://localhost:3000/auth&scope=User.read'>
          Login
        </Nav.Link>
      );
    } else {
      return (
        <Nav.Link href='/logout'>Logout</Nav.Link>
      );
    }
  }

  render() {
    const { token } = this.context;

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
                <this.navlinks token={token}/>
              </Nav>
              <Nav>
                <this.loginLogoutLink token={token} />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default CustomNavbar;