import { useEffect, useState } from 'react';
import API from '../axios/axios';
import { Box, Button, Modal, Typography } from '@mui/material';
import Forms from '../component/Form';
import { useNavigate } from 'react-router-dom';

const Signoff = () => {
  const [taskList, setTaskList] = useState([]);
  const [patientDetails, setPatientsDetails] = useState({});
  const navigate = useNavigate();
  const getSignoffDetails = async () => {
    try {
      const res = await API.get(`/api/samples/status?status=completed`);
      console.log('compl', res);
      const taskList = res.data?.data;
      setTaskList(taskList);

      const patientId = taskList?.[0]?.patientId;
      const departmentId = taskList?.[0]?.departmentId;
      const currentProcessId = taskList?.[0]?.currentProcessId;
      console.log('Patient ID:', patientId);

      if (patientId && departmentId) {
        const [patientRes, departmentRes, processRes] = await Promise.all([
          API.get(`/api/users/getUserById/${patientId}`),
          API.get(`/api/department/${departmentId}`),
          API.get(`/api/process/${currentProcessId}`),
        ]);
        setPatientsDetails(patientRes?.data?.data[0]);
        setDepartment(departmentRes?.data?.data);
        setProcessDetails(processRes?.data?.data[0]);
      } else {
        console.warn('No patientId found in the task list.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getSignoffDetails();
  }, []);
  return (
    <>
      <h1>Signoff</h1>
      {taskList?.map((task: any) => {
        console.log('task is', task);
        return (
          <div className=" w-full flex justify-between  h-fit border-1 border-gray-200 my-4 p-4 rounded">
            <div className="details flex flex-col gap-2 ">
              <h3 className="font-light">
                Patient Name:{' '}
                <span className="font-semibold">{patientDetails?.name}</span>
              </h3>
              <p className="font-light">
                {' '}
                Dr Name:{' '}
                <span className="font-semibold">{task?.physicianName}</span>
              </p>
              <p className="font-light">
                {' '}
                Status: <span className="font-semibold">{task?.status}</span>
              </p>
            </div>
            <div className="button-container flex  gap-4 items-center">
              <button
                onClick={() => navigate(`/details/${task?._id}`)}
                className="text-blue-500 font-semibold"
              >
                View Details
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Signoff;
