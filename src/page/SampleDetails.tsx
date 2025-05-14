import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../axios/axios';

const SampleDetails = () => {
  const router = useParams();
  const { id } = router;
  console.log('page router', id);

  const fetchDetails = async () => {
    try {
      const res = await API.get(`api/samples/details/${id}`);
      console.log('res', res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <>
      <h1>Sample Details</h1>
    </>
  );
};

export default SampleDetails;
