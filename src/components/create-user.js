import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import urlJoin from 'url-join';

import CustomNavbar from './custom-nav-bar';


export default function CreateUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const { msAccessToken } = location.state;

  let creating_user_message = 'Creating a user...';
  const [message, setMessage] = useState(creating_user_message);

  useEffect(() => {
    async function createUser() {
      if(message === creating_user_message) {  // keep it from running multiple times
        try {
          await axios.put(urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/user/v1/user/'), {
            ms_access_token: msAccessToken,
          }, {
            withCredentials: true,
          });
          setMessage('We captured you in our DB.');
        } catch(error) {
          if(error.response.status === 409) {
            setMessage('You are already in our DB.');
          }
        }
      }
    }
    createUser();
  }, [setMessage, creating_user_message, message, msAccessToken, navigate]);

  return (
    <>
      <CustomNavbar />
      {message}
    </>
  )
}
