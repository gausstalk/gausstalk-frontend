import { useSearchParams } from 'react-router-dom';
import axios from 'axios';


const Auth = () => {
  const [searchParams, ] = useSearchParams();
  const code = searchParams.get('code');
  const sessionState = searchParams.get('session_state');

  // axios.post('http://localhost:8000/apps/user/v1/auth/', {
  axios.post('https://talk.gausslabs.ai/api/apps/user/v1/auth/', {
    code: code,
    session_state: sessionState,
  })
  .then(function (response) {
    var loginMessage = document.getElementById('login-message');
    loginMessage.innerHTML = response.data;
  }).catch(function (error) {
    // error handling
  });

  return (
    <div id='login-message'>Login...</div>
  );
}


export default Auth;
