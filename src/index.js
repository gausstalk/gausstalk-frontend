import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Chat from './pages/chat.js';
import Auth from './pages/auth.js';
import Start from './pages/start.js';
import Logout from './pages/logout.js';
import Signup from './pages/signup.js';
import CreateUser from './pages/create-user.js';
import OneOnOne from './pages/one-on-one.js'
import Construction from './components/construction.js'
import LunchTogether from './pages/lunch-together.js';
import LunchTogetherView from './pages/lunch-together-view.js'
import LunchTogetherForm from './pages/lunch-together-form.js';
import Gausselin from './pages/gausselin.js';
import GausselinReviews from './pages/gausselin-reviews.js';
import GausselinReviewForm from './pages/gausselin-review-form.js';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/index.css';


const Root = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<Start />} />
      <Route exact path="/chat" element={<Chat />} />
      <Route exact path="/auth" element={<Auth />} />
      <Route exact path="/logout" element={<Logout />} />
      <Route exact path="/contact" element={<Construction />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/one-on-one" element={<OneOnOne />}></Route>
      <Route exact path="/signup/create-user" element={<CreateUser />} />
      <Route path="/lunch-together" element={<LunchTogether />}>
        <Route path="" element={<LunchTogetherView />} />
        <Route path="form" element={<LunchTogetherForm />} />
      </Route>
      <Route path="/gausselin" element={<Gausselin />}>
        <Route path="" element={<GausselinReviews />} />
        <Route path="form" element={<GausselinReviewForm />} />
      </Route>
    </Routes>
  </Router>
);


const root = createRoot(document.getElementById('root'));
root.render(<Root />);
