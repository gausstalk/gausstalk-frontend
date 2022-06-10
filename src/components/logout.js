import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import urlJoin from 'url-join';


const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // clear session storage
    window.sessionStorage.setItem('mail', null);
    window.sessionStorage.setItem('name', null);
    // delete gauss_access_token from memory
    window.sessionStorage.setItem('gaussAccessToken', null);

    let token = window.sessionStorage.getItem('gaussAccessToken');

    // delete gauss_refresh_token from cookie
    const authUrl = urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/user/v1/auth/');
    axios.delete(authUrl, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    }).then(function (response) {
      console.log('Logout succeeded!!');
      navigate('/');
    }).catch(function (error) {
      console.log('Logout failed!!');
    });
  });

  return (
    <div>Logout...</div>
  );
}

export default Logout;
