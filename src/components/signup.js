import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import axios from 'axios';
import urlJoin from 'url-join';

import CustomNavbar from './custom-nav-bar.js';
import { TokenContext } from './token-context.tsx';


export default function Signup() {
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function goToMainIfUserExists() {
      // Get the mail from the token.
      let mail = null;
      try {
        const response = await axios.get(urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/user/v1/auth/'), {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        mail = response.data.mail;
      } catch(error) {
      }

      // Check if the user already exists.
      if(mail !== null) {
        try {
          await axios.get(urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/user/v1/user/'), {
            params: {mail: mail},
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });

          // If the user is already in the DB.
          navigate('/chat');
        } catch(error) {
          console.log('Go to signup.');
        }
      }
    }
    goToMainIfUserExists();
  });

  if(token === null) {
    return (
      <>Please do Microsoft login.</>
    );
  }

  return (
    <>
      <CustomNavbar />
      <Link to='create-user'>
        <Button>Agree</Button>
      </Link>
    </>
  );
}
