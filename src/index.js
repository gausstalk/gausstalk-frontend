import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route
 } from 'react-router-dom';
import Chat from './components/chat.js';
import Auth from './components/auth.js';
import Start from './components/start.js';
import Logout from './components/logout.js';
import Signup from './components/signup.js';
import CreateUser from './components/create-user.js';
import OneOnOne from './components/one-on-one.js'
import Construction from './components/construction.js'
import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/index.css';


const Root = () => (
    <Router>
        <Routes>
            <Route exact path={"/"} element={<Start/>}/>
            <Route exact path="/chat" element={<Chat />} />
            <Route exact path="/auth" element={<Auth />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/contact" element={<Construction/>} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/one-on-one" element={<OneOnOne/>}></Route>
            <Route exact path="/signup/create-user" element={<CreateUser />} />
            <Route exact path={"/lunch-together"} element={<Construction/>}/>
        </Routes>
    </Router>
);


const root = createRoot(document.getElementById('root'));
root.render(<Root />);
