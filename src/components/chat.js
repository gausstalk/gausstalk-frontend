import React from 'react';
import Button from 'react-bootstrap/Button';
import { FormControl, InputGroup } from 'react-bootstrap';
import urlJoin from 'url-join';
import axios from "axios";

import { TokenContext } from './token-context.tsx';
import CustomNavbar from './custom-nav-bar.js';

function hexToRGB(hex) {
  hex = hex.substring(1);
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return [r, g, b];
}

function contrastColor(hex) {
  let rgb = hexToRGB(hex);
  let color = Math.round(((parseInt(rgb[0]) * 299) +
      (parseInt(rgb[1]) * 587) +
      (parseInt(rgb[2]) * 114)) / 1000);
  let textColor = (color > 125) ? 'black' : 'white';
  return textColor;
}

function stringToColour(email) {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

function formatTime(raw_time) {
  let local_time = new Date(raw_time);
  let local_year = local_time.getFullYear();
  let local_month = String(local_time.getMonth() + 1).padStart(2, '0');
  let local_day = String(local_time.getDate()).padStart(2, '0');
  let local_hour = ('0'+local_time.getHours()).slice(-2);
  let local_minute = ('0'+local_time.getMinutes()).slice(-2);

  let today = new Date();
  let current_year = today.getFullYear();
  let current_month = String(today.getMonth() + 1).padStart(2, '0');
  let current_day = String(today.getDate()).padStart(2, '0');
  if (current_year == local_year && current_month == local_month && current_day == local_day) {
    return local_hour + ":" + local_minute;
  }
  else if (current_year === local_year) {
    return `${local_month}/${local_day} ${local_hour}:${local_minute}`
  }
  return `${local_year}/${local_month}/${local_day} ${local_hour}:${local_minute}`
}

function drawBubble(messages, mail, name) {
  let previousUser = null;
  let previousTime = null;
  for  (let i = 0; i < messages.length; i++){
    let messageDict = messages[i];
    let content = messageDict["content"];
    let sender = messageDict["sender"];
    let time = messageDict["time"];
    let formattedTime = formatTime(time);
    let initial = sender.split(" ").map((n)=>n[0]).join("");
    let chatArea = document.getElementById('chat-area');
    let profileColor = stringToColour(sender);
    let textColor = contrastColor(profileColor);

    let chatContainer = document.createElement('div');
    chatContainer.classList.add('chat-container');

    let messageContainer = document.createElement('div');
    messageContainer.classList.add('message-container');

    let contentContainer = document.createElement('p');
    contentContainer.innerText = content;
    contentContainer.classList.add('content-container');

    let userContainer = document.createElement('div');
    userContainer.innerText = sender;
    userContainer.classList.add('user-name-container');

    let timeContainer = document.createElement('div');
    timeContainer.innerText = formattedTime
    timeContainer.classList.add('time-container');

    let initialContainer = document.createTextNode(initial);
    let profileImageContainer = document.createElement('div');
    profileImageContainer.classList.add('circle');
    profileImageContainer.classList.add('profile-image-container');
    profileImageContainer.style.backgroundColor = profileColor;
    profileImageContainer.style.color = textColor;

    profileImageContainer.appendChild(initialContainer)

    if(name === sender) {
      messageContainer.classList.add('chat-bubble-me');
      chatContainer.style.alignSelf = 'flex-end'
    }
    else {
      messageContainer.classList.add('chat-bubble-other')
      chatContainer.appendChild(profileImageContainer);
      chatContainer.style.alignSelf = 'flex-start'
      messageContainer.appendChild(userContainer);
    }

    if (previousUser === sender && previousTime === formattedTime) {
      timeContainer.innerText = ""
      userContainer.innerText = "";
      profileImageContainer.style.visibility = "hidden";
    }
    else if (previousUser === sender) {
      userContainer.innerText = "";
      profileImageContainer.style.visibility = "hidden";
    }

    messageContainer.appendChild(contentContainer);
    messageContainer.appendChild(timeContainer);
    chatContainer.appendChild(messageContainer);

    chatArea.appendChild(chatContainer);
    previousUser = sender;
    previousTime = formattedTime;
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
        if (token === null) {
          return;
        }
        axios.get(chatUrl, {
          params: {'room_name': "companywide", "offset": 0, "size": 30},
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
