import { useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import urlJoin from 'url-join';

import { TokenContext } from './token-context.tsx';


const Auth = () => {
  const [searchParams, ] = useSearchParams();
  const code = searchParams.get('code');
  const sessionState = searchParams.get('session_state');
  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  if(token === null) {
    const authUrl = urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/user/v1/auth/');
    axios.post(authUrl, {
      code: code,
      session_state: sessionState,
    }, {
      withCredentials: true,
    })
    .then(function (response) {
      let loginMessage = document.getElementById('login-message');
      loginMessage.innerHTML = response.data;
      let gaussAccessToken = response.data['gauss_access_token'];
      setToken(gaussAccessToken);
      navigate("/signup");
    }).catch(function (error) {
      // error handling
    });
  }

  return (
    <div id='login-message'>Login...</div>
  );
}


export default Auth;
