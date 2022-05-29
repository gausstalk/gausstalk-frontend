import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import urlJoin from 'url-join';
import { TokenContext } from './token-context.tsx';


const Logout = () => {
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  // delete gauss_refresh_token from cookie
  const authUrl = urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/user/v1/auth/');
  axios.delete(authUrl, {
    withCredentials: true,
  }).then(function (response) {
    console.log('Logout succeeded!!');
  }).catch(function (error) {
    console.log('Logout failed!!');
  });

  useEffect(() => {
    navigate('/');
    setToken(null);
  });

  return (
    <div>Logout...</div>
  );
}

export default Logout;
