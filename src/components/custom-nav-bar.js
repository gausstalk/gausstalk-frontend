import React from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import urlJoin from 'url-join';

import logo192 from '../assets/images/logo192.png';


class CustomNavbar extends React.Component {
  constructor() {
    super();
    this.state = {
      token: window.sessionStorage.getItem('gaussAccessToken'),
    };
  }

  componentDidMount() {
    let self = this;
    axios.get(urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/user/v1/auth/'), {
      headers: { Authorization: `Bearer ${self.state.token}` },
      withCredentials: true,
    }).then(function (response) {
      window.sessionStorage.setItem('gaussAccessToken', response.data.gauss_access_token);
      self.setState({
        token: response.data.gauss_access_token,
      });
    }).catch(function (error) {
      // error
    });
  }

  navlinks(props) {
    let redirectUrl = urlJoin(process.env.REACT_APP_FRONTEND_BASE_URL, 'auth');
    let loginUrl = `https://login.microsoftonline.com/cfcd9b87-7c5a-4042-9129-abee6253febe/oauth2/v2.0/authorize?client_id=7fc37514-c400-4b28-a6d6-e19a9ae981b6&response_type=code&redirect_uri=${redirectUrl}&scope=User.read`;
    if(props.token === null) {
      return (
        <>
          <Nav className='me-auto'>
            <Nav.Link href="/#about">About</Nav.Link>
            <Nav.Link href="/#features">Features</Nav.Link>
            <Nav.Link as={Link} to={"/contact"}>Contact Us</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link id='login-logout-link' href={loginUrl}>
              Login
            </Nav.Link>
          </Nav>
        </>
      )
    }
    else {
      return (
        <>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to="/chat">Chat</Nav.Link>
            <Nav.Link as={Link} to="/one-on-one">1:1</Nav.Link>
            <Nav.Link as={Link} to="/lunch-together">Lunch Together</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link id='login-logout-link' as={Link} to='/logout'>
              Logout
            </Nav.Link>
          </Nav>
        </>
      )
    }
  }

  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky={"top"}>
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand>
                <img
                  alt=""
                  src={logo192}
                  width="20"
                  height="20"
                  className="d-inline-block center"
                  style={{'marginBottom': 3}}
                />
                <span style={{'marginLeft': 8}}>Gauss Talk</span>
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <this.navlinks token={this.state.token}/>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default CustomNavbar;