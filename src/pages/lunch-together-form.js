import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import urlJoin from 'url-join';
import { Button, Input } from '@mui/material';

import CustomNavbar from '../components/custom-nav-bar';
import MapSearch from '../components/map-search.js';
import { ReactComponent as ArrowBack } from '../assets/images/arrow-back.svg';
import '../assets/styles/lunch-together.css';
import '../assets/styles/register-form.css';


const LunchTogetherForm = () => {
  const datetimeRef = useRef(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [appointmentTitle, setAppointmentTitle] = useState('');
  let navigate = useNavigate();

  // Set default datetime.
  useEffect(() => {
    var now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    now.setSeconds(0, 0);
    datetimeRef.current.value = now.toISOString().slice(0, -1);
  }, [datetimeRef]);

  function createAppointment(event) {
    event.preventDefault();

    let restaurantId = Number(event.target.restaurantId.value);
    let title = event.target.title.value;
    let datetime = event.target.datetime.value;
    let nParticipants = Number(event.target.nParticipants.value);
    let meetingPoint = event.target.meetingPoint.value;

    axios.post(urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/lunch-together/v1/appointments/'), {
      restaurant_id: restaurantId,
      title: title,
      datetime: datetime,
      n_participants: nParticipants,
      meeting_point: meetingPoint,
    }, {
      headers: { Authorization: `Bearer ${window.sessionStorage.getItem('gaussAccessToken')}` },
      withCredentials: true,
    }).then((response) => {
      navigate('..');
    }).catch((error) => {
      // error
    });
  }

  return (
    <>
      <CustomNavbar />
      <div id='register-form-frame'>
        <div id='register-form'>
          <Link id='arrow-back-button' to='..'><ArrowBack /></Link>
          <MapSearch setSelectedRestaurantId={setSelectedRestaurantId} setSelectedRestaurantName={setAppointmentTitle} />
          <form onSubmit={createAppointment} id='appointment-form'>
            <input type="hidden" name="restaurantId" defaultValue={selectedRestaurantId} />
            <table>
              <tbody>
                <tr>
                  <td>Title</td>
                  <td><Input name="title" value={appointmentTitle} required /></td>
                </tr>
                <tr>
                  <td>Date & Time</td>
                  <td><Input inputRef={datetimeRef} type="datetime-local" name="datetime" required /></td>
                </tr>
                <tr>
                  <td># Participants</td>
                  <td><Input type="number" name="nParticipants" defaultValue="2" min="2" required /></td>
                </tr>
                <tr>
                  <td>Meeting Point</td>
                  <td><Input name="meetingPoint" /></td>
                </tr>
              </tbody>
            </table>
            <Button type="submit" variant={"contained"}>Register</Button>
          </form>
        </div>
      </div>
    </>
  );
}


export default LunchTogetherForm;
