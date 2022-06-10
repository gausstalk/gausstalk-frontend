import React from 'react';
import Button from 'react-bootstrap/Button';
import { FormControl, InputGroup } from 'react-bootstrap';
import urlJoin from 'url-join';
import axios from "axios";

import { TokenContext } from './token-context.tsx';
import CustomNavbar from './custom-nav-bar.js';

function drawBubble(messages, mail, name) {
  for  (let i = 0; i < messages.length; i++){
    let messageDict = messages[i]
    let chatArea = document.getElementById('chat-area');
    let message = document.createElement('p');
    let content = document.createTextNode(messageDict["content"]);
    message.appendChild(content);
    if(name === messageDict["sender"]) {
      message.classList.add('chat-bubble-me');
    }
    else {
      message.classList.add('chat-bubble-other')
    }
    chatArea.appendChild(message);
  }
}

class Chat extends React.Component {
  ws;
  static contextType = TokenContext;


  constructor(props, context) {
    super(props, context);
    const me = this

    this.state = {
      mail: window.sessionStorage.getItem('mail'),
      name: window.sessionStorage.getItem('name'),
    };

    const websocketUrl = urlJoin(process.env.REACT_APP_WEBSOCKET_BASE_URL, `apps/chat/v1/ws/${context.token}`);
    this.ws = new WebSocket(websocketUrl);
    this.ws.onopen = () => {
      console.log('connected!!');
    };
    this.ws.onmessage = function(event) {
      let messageJson = event.data;
      // know it seems weird but couldn't find a way to solve this
      let messageString = JSON.parse(messageJson);
      let messageDict = JSON.parse(messageString);
      drawBubble([messageDict], me.state.mail, me.state.name)
    };
  }



  getPreviousMessages(props) {
      const chatUrl = urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/chat/v1/')
      let token = props.token;
      let mail = props.mail;
      let name = props.name;
      try {
        axios.get(chatUrl, {
          params: {'room_name': "companywide", "offset": 0, "size": 10},
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        }).then((res) => {
          if (res.data.length > 0) {
            drawBubble(res.data, mail, name)
          }
        }).catch((error) => {
          console.log(error)
        })
      } catch (error) {
        console.log('Unable to retrieve messages.');
        console.log(error)
      }
  }

  sendMessage = (event) => {
    let input = document.getElementById("chat-input");
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
    const { token } = this.context;
    const {mail, name} = this.state;
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
            <this.getPreviousMessages token={token} mail={mail} name={name}/>
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
