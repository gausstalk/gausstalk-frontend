import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Chat extends React.Component {
  ws;

  constructor(props) {
    super(props);
    this.ws = new WebSocket("ws://20.196.232.209/api/ws");
    this.ws.onopen = () => {
      console.log('conencted!!');
    };
    this.ws.onmessage = function(event) {
      var chatArea = document.getElementById('chat-area-ul');
      var message = document.createElement('li');
      var content = document.createTextNode(event.data);
      message.appendChild(content);
      chatArea.appendChild(message);
    };
  }

  sendMessage = (event) => {
    var input = document.getElementById("chat-input");
    this.ws.send(input.value);
    input.value = '';
    event.preventDefault();
  };

  render() {
    return (
      <div className='chat-frame'>
        <div className='chat-area'>
          <ul id='chat-area-ul'>
            <li>안녕</li>
            <li>만나서 반가워</li>
          </ul>
        </div>
        <form action='' onSubmit={this.sendMessage}>
          <input className='chat-input' id='chat-input' type='text'/>
          <button className='send-button'>Send</button>
        </form>
      </div>
    );
  }
}


ReactDOM.render(
  <Chat />,
  document.getElementById('root')
);
