import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../axios/axios';
import { Box, Button, Modal, Typography } from '@mui/material';
import Forms from '../component/Form';
import { ADD_PROGRESS } from '../component/FormModel/login.model';

const SampleDetails = () => {
  const [taskList, setTaskList] = useState([]);
  const [patientDetails, setPatientsDetails] = useState({});
  const [processDetails, setProcessDetails] = useState({});
  const [department, setDepartment] = useState({});
  const [progressResult, setProgressResult] = useState([]);
  const [allProcessDetails, setAllProcessDetails] = useState([]);
  const [openAddSampleModal, setOpenAddSampleModal] = useState<boolean>(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const router = useParams();
  const { id } = router;
  console.log('page router', id);

  const fetchDetails = async () => {
    try {
      const res = await API.get(`api/samples/details/${id}`);
      console.log('compl', res);
      const taskList = res.data?.data;
      setTaskList(taskList);

      const patientId = taskList?.patientId;
      const departmentId = taskList?.departmentId;
      const currentProcessId = taskList?.currentProcessId;
      console.log('Patient ID:', patientId, processDetails);

      const [patientRes, departmentRes, processRes, progressRes] =
        await Promise.all([
          API.get(`/api/users/getUserById/${patientId}`),
          API.get(`/api/department/${departmentId}`),
          API.get(`/api/process/${currentProcessId}`),
          API.get(`/api/progress/getAllProgress/${id}`),
        ]);
      setPatientsDetails(patientRes?.data?.data[0]);
      setDepartment(departmentRes?.data?.data);
      setProcessDetails(processRes?.data?.data);
      setProgressResult(progressRes?.data?.data);
      fetchProcessDetails(progressRes?.data?.data);

      console.log('resulpro', processRes?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchDetails();
  }, [openAddSampleModal]);

  const fetchProcessDetails = async (progressResult) => {
    const data =
      progressResult &&
      (await Promise.all(
        progressResult?.map(async (item: { processId: string }) => {
          const response = await API.get(`/api/process/${item.processId}`);
          console.log('rrrr data', response?.data);
          return response.data.data; // <-- Make sure to access `.data`
        })
      ));

    setAllProcessDetails(data);
  };

  console.log('allProcessDetails', progressResult, allProcessDetails);

  const handleSubmit = async (
    values: object,

    actions: { setSubmitting: (arg0: boolean) => void; resetForm: () => void }
  ) => {
    const payload = {
      sampleId: id,
      departmentId: taskList?.departmentId,
      processId: taskList?.currentProcessId,
      ...values,
    };
    try {
      const res = await API.post(`/api/progress/addProcess`, payload);
      console.log(res);
      setOpenAddSampleModal(false);
      actions.resetForm();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>Details Page</h1>
      <div className=" w-full flex justify-between  h-fit border-1 border-gray-200 my-4 p-4 rounded">
        <div className="details flex flex-col gap-2 ">
          <h3 className="font-light">
            Patient Name:{' '}
            <span className="font-semibold">{patientDetails?.name}</span>
          </h3>
          <p className="font-light">
            {' '}
            Dr Name:{' '}
            <span className="font-semibold">{taskList?.physicianName}</span>
          </p>
          <p className="font-light">
            Current Process:{' '}
            <span className="font-semibold">{processDetails?.title}</span>
          </p>
          <p className="font-light">
            {' '}
            Status: <span className="font-semibold">{taskList?.status}</span>
          </p>
        </div>
        <div className="button-container flex  gap-4 items-center">
          <button
            onClick={() => setOpenAddSampleModal(true)}
            className="text-white px-4 py-2 rounded-md h-fit  bg-blue-500 font-semibold"
          >
            Add Progress
          </button>
          {taskList?.status === 'completed' && (
            <button className="text-white px-4 py-2 rounded-md h-fit  bg-blue-500 font-semibold">
              Sign off
            </button>
          )}
        </div>
      </div>

      <div>
        {allProcessDetails.map((item) => {
          const matchingResult = progressResult.find(
            (result) => result.processId === item._id
          );

          console.log(matchingResult);

          return (
            <div
              key={item.id}
              className="flex justify-between h-fit border-1 border-gray-200 my-4 p-4 rounded"
            >
              <div>
                <p>{item.title}</p>
                <p>{item.description}</p>
              </div>
              <p>{item.validRange}</p>
              <p>{matchingResult?.resultSummary}</p>
            </div>
          );
        })}
      </div>

      <Modal
        open={openAddSampleModal}
        onClose={() => {
          setOpenAddSampleModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>Add New Sample</Typography>
          <div className="flex flex-col w-full h-full justify-center p-5">
            <div className="flex w-full h-[500px] overflow-auto mb-10">
              <Forms fields={ADD_PROGRESS} onSubmitFn={handleSubmit} />
            </div>
            <div className="flex flex-row w-full">
              <Button
                onClick={() => {
                  setOpenAddSampleModal(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default SampleDetails;
