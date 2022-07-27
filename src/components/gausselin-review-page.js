import { useEffect, useState } from 'react';
import axios from 'axios';
import urlJoin from 'url-join';
import { Paper } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import '../assets/styles/gausselin.css';


const GausselinReviewPage = ({ offset, limit }) => {
  const [reviews, setReviews] = useState();
  const [reviewPapers, setReviewPapers] = useState();
  const token = window.sessionStorage.getItem('gaussAccessToken');
  const reviewsUrl = urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/gausselin/v1/reviews/');

  // Get reviews.
  useEffect(() => {
    setReviewPapers('Loading...');

    axios.get(reviewsUrl, {
      params: { offset: offset, limit: limit },
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    }).then((response) => {
      setReviews(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, [token, reviewsUrl, offset, limit]);

  // Show reviews.
  useEffect(() => {
    if (reviews) {
      let tempReviewPapers = [];

      reviews.forEach(review => {
        // Draw stars.
        let starIcons = [];
        for (let i = 0; i < review.stars; i++) {
          starIcons.push(<StarIcon sx={{ color: 'orange' }} key={i} />);
        }
        for (let i = review.stars; i < 5; i++) {
          starIcons.push(<StarBorderIcon sx={{ color: 'orange' }} key={i} />);
        }

        tempReviewPapers.push(
          <Paper elevation={3} className='gausselin-paper' key={review.id}>
            <table>
              <tbody>
                <tr>
                  <td>Restaurant</td>
                  <td><a href={`https://place.map.kakao.com/${review.restaurant_id}`}>
                    {review.restaurant_name}
                  </a></td>
                </tr>
                <tr>
                  <td>Reviewer</td>
                  <td>{review.user_name}</td>
                </tr>
                <tr>
                  <td>Stars</td>
                  <td>{starIcons}</td>
                </tr>
                <tr>
                  <td>Date</td>
                  <td>{new Date(review.created_datetime).toDateString()}</td>
                </tr>
                <tr>
                  <td>Comment</td>
                  <td>{review.comment}</td>
                </tr>
              </tbody>
            </table>
          </Paper>
        );
      });

      setReviewPapers(tempReviewPapers);
    }
  }, [reviews]);

  return (
    <>{reviewPapers}</>
  );
};

export default GausselinReviewPage;
