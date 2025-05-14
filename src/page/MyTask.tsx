import { useEffect } from 'react';
import API from '../axios/axios';

const MyTask = () => {
  const user: any = localStorage.getItem('userDetail');
  const processId = JSON.parse(user)?.[0]?.processId;

  const getMyTask = async () => {
    const res = await API.get(`/api/sample/list/${processId}?page=1&limit=1`);
    console.log('res', res);
  };

  useEffect(() => {
    getMyTask();
  }, []);

  return <>MyTask</>;
};

export default MyTask;
