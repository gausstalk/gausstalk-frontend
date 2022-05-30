import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route
 } from 'react-router-dom';
import Chat from './components/chat.js';
import Auth from './components/auth.js';
import Start from './components/start.js';
import Logout from './components/logout.js';
import Contact from './components/contact.js';
import { TokenProvider } from './components/token-context.tsx';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/index.css';



const Root = () => (
    <Router>
        <TokenProvider>
            <Routes>
                <Route exact path={"/"} element={<Start/>}/>
                <Route exact path="/chat" element={<Chat />} />
                <Route exact path="/auth" element={<Auth />} />
                <Route exact path="/logout" element={<Logout />} />
                <Route exact path="/contact" element={<Contact />} />
            </Routes>
        </TokenProvider>
    </Router>
);


ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
