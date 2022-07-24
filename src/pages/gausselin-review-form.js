import { useState } from 'react';
import CustomNavbar from '../components/custom-nav-bar';
import MapSearch from '../components/map-search.js';


const GausselinReviewForm = () => {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState();
  const [selectedRestaurantName, setSelectedRestaurantName] = useState();

  return (
    <>
      <CustomNavbar />
      <MapSearch setSelectedRestaurantId={setSelectedRestaurantId} setSelectedRestaurantName={setSelectedRestaurantName} />
    </>
  );
};


export default GausselinReviewForm;
