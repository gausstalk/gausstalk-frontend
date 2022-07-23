import CustomNavbar from '../components/custom-nav-bar';
import GausselinPaginatedReviews from '../components/gausselin-paginated-reviews';
import '../assets/styles/gausselin.css';


const Gausselin = () => {
  return (
    <>
      <CustomNavbar />
      <div id='gausselin-root'>
        <GausselinPaginatedReviews itemsPerPage={10} />
      </div>
    </>
  );
};

export default Gausselin;
