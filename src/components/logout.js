import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import urlJoin from 'url-join';

import '../assets/styles/loading.css';

function timeout(delay: number) {
  return new Promise( res => setTimeout(res, delay) );
}

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // clear session storage
    window.sessionStorage.removeItem('mail');
    window.sessionStorage.removeItem('name');
    // delete gauss_access_token from memory
    window.sessionStorage.removeItem('gaussAccessToken');

    let token = window.sessionStorage.getItem('gaussAccessToken');

    // delete gauss_refresh_token from cookie
    const authUrl = urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/user/v1/auth/');
    axios.delete(authUrl, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    }).then(async function (response) {
      console.log('Logout succeeded!!');
      await timeout(500);
      navigate('/');
    }).catch(function (error) {
      console.log('Logout failed!!');
    });
  });

  return (
      <>
        <div id={"loading-container"}>
          <div className="wrapper">
            <div className="loading"></div>
            <div className="loading"></div>
            <div className="loading"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
          </div>
        </div>
      </>
  );
}

export default Logout;
