import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route
 } from 'react-router-dom';
import Chat from './components/chat.js'
import Auth from './components/auth.js'
import { TokenProvider } from './components/token-context.tsx';
import 'bootstrap/dist/css/bootstrap.css'
import './assets/styles/index.css';


const Root = () => {
  return (
    <Router>
      <TokenProvider>
        <Routes>
            <Route exact path="/chat" element={<Chat />} />
            <Route exact path="/auth" element={<Auth />} />
        </Routes>
      </TokenProvider>
    </Router>
  );
};


ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
