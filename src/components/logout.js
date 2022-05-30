import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import urlJoin from 'url-join';
import { TokenContext } from './token-context.tsx';


const Logout = () => {
  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  // delete gauss_refresh_token from cookie
  const authUrl = urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/user/v1/auth/');
  axios.delete(authUrl, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  }).then(function (response) {
    console.log('Logout succeeded!!');
  }).catch(function (error) {
    console.log('Logout failed!!');
  });

  useEffect(() => {
    setToken(null);
    navigate('/');
  });

  return (
    <div>Logout...</div>
  );
}

export default Logout;
