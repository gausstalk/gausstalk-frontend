import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import urlJoin from 'url-join';

import CustomNavbar from './custom-nav-bar';
import { TokenContext } from './token-context.tsx';


const postUser = (token, mail, name, setMessage) => {
  axios.post(urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/user/v1/user'), {
    mail: mail,
    name: name,
  }, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  }).then(function (response) {
    setMessage('Created a user.');
  }).catch(function (error) {
    if(error.response.status === 409) {  // 409 CONFLICT
      setMessage('The user already exists.');
    } else {
      setMessage('Failed to create a user.');
    }
  });
};


export default function CreateUser() {
  const { token } = useContext(TokenContext);

  let creating_user_message = 'Creating a user...';
  const [message, setMessage] = useState(creating_user_message);

  useEffect(() => {
    if(message === creating_user_message) {  // keep it from running multiple times
      axios.get(urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/user/v1/auth'), {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }).then(function (response) {
        let mail = response.data['mail'];
        let name = response.data['name'];
        postUser(token, mail, name, setMessage);
      }).catch(function (error) {
        // error
      });
    }
  });

  return (
    <>
      <CustomNavbar />
      {message}
    </>
  )
}
