import React from 'react';
import Button from 'react-bootstrap/Button'
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import {Container, FormControl, InputGroup, Nav, Navbar, NavDropdown} from "react-bootstrap";


class Chat extends React.Component {
  ws;

  constructor(props) {
    super(props);
    this.ws = new WebSocket("wss://talk.gausslabs.ai/api/ws");
    //this.ws = new WebSocket("ws://localhost:8000/ws");
    this.ws.onopen = () => {
      console.log('connected!!');
    };
    this.ws.onmessage = function(event) {
      var chatArea = document.getElementById('chat-area');
      var message = document.createElement('p');
      var content = document.createTextNode(event.data);
      message.appendChild(content);
      message.classList.add('chat-bubble-me')
      chatArea.appendChild(message);
    };
  }

  sendMessage = (event) => {
    var input = document.getElementById("chat-input");
    console.log(input)
    this.ws.send(input.value);
    input.value = '';
    event.preventDefault();
  };

  render() {
    return (
        <>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky={"top"}>
            <Container>
              <Navbar.Brand href="#home">
                <img
                    alt=""
                    src="/logo.svg"
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
      <div className='chat-frame'>
        <div className='chat-area' id={'chat-area'}>
            <p className={'chat-bubble-other'}>
                Hi
            </p>
            <p className={'chat-bubble-me'}>
              Nice to meet you
            </p>
        </div>
        <form action='' onSubmit={this.sendMessage}>
          <InputGroup className="mb-3">
            <FormControl
                placeholder="Enter what you want to say"
                aria-label="Enter what you want to say"
                aria-describedby="basic-addon"
                className={'chat-input'}
                id={'chat-input'}
            />
            <Button type={'submit'} variant="primary" id="button-addon2" className={'send-button'}>
              Send
            </Button>
          </InputGroup>

        </form>
      </div>
      </>
    );
  }
}


ReactDOM.render(
  <Chat />,
  document.getElementById('root')
);
