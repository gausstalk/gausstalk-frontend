import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import urlJoin from 'url-join';
import { Button, Input, TextField } from '@mui/material';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import CustomNavbar from '../components/custom-nav-bar';
import MapSearch from '../components/map-search.js';
import { ReactComponent as ArrowBack } from '../assets/images/arrow-back.svg';
import '../assets/styles/gausselin.css';
import '../assets/styles/register-form.css';


const labels = {
  1: 'Useless',
  2: 'Poor',
  3: 'Ok',
  4: 'Good',
  5: 'Excellent',
};


function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}


const GausselinReviewForm = () => {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [selectedRestaurantName, setSelectedRestaurantName] = useState('');
  const [value, setValue] = useState(3);
  const [hover, setHover] = useState(-1);
  const navigate = useNavigate();

  const createReview = (event) => {
    event.preventDefault();

    axios.post(urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/gausselin/v1/reviews/'), {
      restaurant_id: Number(event.target.restaurantId.value),
      restaurant_name: event.target.restaurantName.value,
      stars: Number(event.target.stars.value),
      comment: event.target.comment.value,
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
          <MapSearch setSelectedRestaurantId={setSelectedRestaurantId} setSelectedRestaurantName={setSelectedRestaurantName} />
          <form onSubmit={createReview} id='gausselin-review-form'>
            <input type="hidden" name="restaurantId" defaultValue={selectedRestaurantId} />
            <table>
              <tbody>
                <tr>
                  <td>Restaurant</td>
                  <td><Input name="restaurantName" value={selectedRestaurantName} required /></td>
                </tr>
                <tr>
                  <td>Stars</td>
                  <td id='stars-td'>
                    <div>
                      <Rating
                        name="stars"
                        value={value}
                        precision={1}
                        getLabelText={getLabelText}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                          setHover(newHover);
                        }}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                      />
                      {value !== null && (
                        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>Review</td>
                  <td id='review-td'><TextField name="comment" variant="standard" multiline inputProps={{ maxLength: 280 }} /></td>
                </tr>
              </tbody>
            </table>
            <Button type="submit" variant={"contained"}>Register</Button>
          </form>
        </div>
      </div>
    </>
  );
};


export default GausselinReviewForm;
