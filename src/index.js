import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Chat extends React.Component {
  render() {
    return (
      <div className='chat-frame'>
        <textarea className='chat-area' rows='8' readonly>
          {'안녕\n마난서 반가워'}
        </textarea>
        <input type='chat-input' className='chat-input'/>
        <button className='send-button'>Send</button>
      </div>
    );
  }
}


ReactDOM.render(
  <Chat />,
  document.getElementById('root')
);
