import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Logout = () => {
  const navigate = useNavigate();

  // expire gauss_access_token and gauss_refresh_token on the server
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
  });

  return (
    <div>Logout...</div>
  );
}

export default Logout;
