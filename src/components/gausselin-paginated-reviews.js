import React, { useEffect, useState } from 'react';
import axios from 'axios';
import urlJoin from 'url-join';
import GausselinReviewPage from './gausselin-review-page';
import { Button, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function GausselinPaginatedReviews({ itemsPerPage }) {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const navigate = useNavigate();

  const token = window.sessionStorage.getItem('gaussAccessToken');
  const reviewCountUrl = urlJoin(process.env.REACT_APP_BACKEND_BASE_URL, 'apps/gausselin/v1/reviews/count/');

  // Get the page count from the backend.
  useEffect(() => {
    axios.get(reviewCountUrl, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    }).then((response) => {
      setPageCount(Math.ceil(response.data['count'] / itemsPerPage));
    }).catch((error) => {
      console.log(error);
    });
  }, [itemsPerPage, token, reviewCountUrl]);

  const handleChange = (e, p) => {
    setPage(p);
  }

  return (
    <>
      <Button variant='contained' onClick={() => { navigate('./form') }}>Write Review</Button>
      <GausselinReviewPage offset={(page - 1) * itemsPerPage} limit={itemsPerPage} />
      <Pagination count={pageCount} page={page} onChange={handleChange} />
    </>
  );
}

export default GausselinPaginatedReviews;
