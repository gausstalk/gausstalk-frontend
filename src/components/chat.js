import React from 'react';
import Button from 'react-bootstrap/Button';
import {FormControl, InputGroup} from 'react-bootstrap';

import CustomNavbar from './custom-nav-bar.js';


class Chat extends React.Component {
  ws;

  constructor(props) {
    super(props);
    this.ws = new WebSocket("wss://talk.gausslabs.ai/api/apps/chat/v1/ws/");
    // this.ws = new WebSocket("ws://localhost:8000/apps/chat/v1/ws/");
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
    if(input.value) {
      this.ws.send(input.value);
    }
    input.value = '';
    event.preventDefault();
  };

  onCheckEnter = (e) => {
    if(e.key === 'Enter') {
      this.sendMessage(e);
    }
  }

  render() {
    return (
      <>
        <CustomNavbar />
        <div className='chat-frame'>
          <div className='chat-area' id={'chat-area'}>
              <p className={'chat-bubble-other'}>
                  Hi
              </p>
              <p className={'chat-bubble-me'}>
                Nice to meet you
              </p>
          </div>
          <form action='src/index' onSubmit={this.sendMessage} onKeyPress={this.onCheckEnter}>
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

export default Chat;
