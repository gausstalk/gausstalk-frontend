import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TokenContext } from './token-context.tsx';


const Logout = () => {
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  // delete gauss_refresh_token from cookie
  //axios.delete('http://localhost:8000/apps/user/v1/auth/', {
  axios.delete('https://talk.gausslabs.ai/api/apps/user/v1/auth/', {
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
