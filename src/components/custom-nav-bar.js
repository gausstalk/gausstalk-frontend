import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import axios from 'axios';

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
    let setToken = props.setToken;

    if(token !== null) {
      const authUrl = urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/user/v1/auth/');
      axios.get(authUrl, {
        params: {'gauss_access_token': token},
        withCredentials: true,
      }).then(function (response) {
        // The following should be changed later. It's kinda hard-coded.
        let loginLogoutLink = document.getElementById('login-logout-link');
        loginLogoutLink.removeAttribute('data-rr-ui-event-key');
        loginLogoutLink.innerHTML = 'Logout';
        loginLogoutLink.setAttribute('href', '/logout');

        let gaussAccessToken = response.data['gauss_access_token'];
        setToken(gaussAccessToken);
      }).catch(function (error) {
        // error
      });
    }

    return (
      // <Nav.Link id='login-logout-link' href='https://login.microsoftonline.com/cfcd9b87-7c5a-4042-9129-abee6253febe/oauth2/v2.0/authorize?client_id=7fc37514-c400-4b28-a6d6-e19a9ae981b6&response_type=code&redirect_uri=http://localhost:3000/auth&scope=User.read'>
      <Nav.Link id='login-logout-link' href='https://login.microsoftonline.com/cfcd9b87-7c5a-4042-9129-abee6253febe/oauth2/v2.0/authorize?client_id=7fc37514-c400-4b28-a6d6-e19a9ae981b6&response_type=code&redirect_uri=http://talk.gausslabs.ai/home/auth&scope=User.read'>
        Login
      </Nav.Link>
    );
  }

  render() {
    const { token, setToken } = this.context;

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
                <this.loginLogoutLink token={token} setToken={setToken} />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default CustomNavbar;