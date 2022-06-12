import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import urlJoin from 'url-join';
import '../assets/styles/loading.css';


function timeout(delay: number) {
    return new Promise( res => setTimeout(res, delay) );
}

const Auth = () => {
  const [searchParams, ] = useSearchParams();
  const code = searchParams.get('code');
  const sessionState = searchParams.get('session_state');
  const navigate = useNavigate();
  const token = window.sessionStorage.getItem('token');

  if(token === null) {
    const authUrl = urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/user/v1/auth/');
    axios.post(authUrl, {
      code: code,
      session_state: sessionState,
    }, {
      withCredentials: true,
    })
    .then(async function (res) {
      await timeout(500);

      try {
        const response = await axios.get(urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/user/v1/user/'), {
          headers: { Authorization: `Bearer ${res.data.ms_access_token}` },
        });

        // If the user exists.
        window.sessionStorage.setItem('mail', response.data.mail);
        window.sessionStorage.setItem('name', response.data.name);
        window.sessionStorage.setItem('gaussAccessToken', response.data.gauss_access_token);
        navigate('/chat');
      } catch(error) {
        // If the user doesn't exist.
        navigate('/signup', {state: {msAccessToken: res.data.ms_access_token}});
      }
    }).catch(function (error) {
      // error handling
    });
  }

  return (<>
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


export default Auth;
