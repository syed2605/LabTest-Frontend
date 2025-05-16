import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Pagination,
    Select,
    Typography,
    type SelectChangeEvent,
} from '@mui/material';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../axios/axios';
import Forms from '../component/Form';
import DynamicTable from '../component/Table/TableComponent';
import {
    ADD_SAMPLE_PATIENT_MODEL,
    tableHeaders,
} from '../constants/constants';
import { BASE_URL } from '../constants/URL';
import {
    type AllSampleDataInterface,
    type DepartmentData,
    type FormObjectModel,
    type ProcessDataInterface,
    type StatusDropdown,
    type UserDataInterface,
} from '../interfaces/CommonInterface';

const PatientDetails: React.FC = () => {
  const { id } = useParams();
  const [patientDetails, setPatientDetails] = useState<UserDataInterface>({});
  const [sampleData, setSampleData] = useState<AllSampleDataInterface[]>([]);
  const [FormModelData, setFormModelData] = useState<FormObjectModel[]>([]);
  const [openAddSampleModal, setOpenAddSampleModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<string>('10');
  const [count, setcount] = useState<number>(0);
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
  useEffect(() => {
    getPatientDetails();
    getAllSamplesPatient();
    addFieldsToForm();
  }, [loading, page, limit]);

  const addFieldsToForm = async (): Promise<void> => {
    const formFields: FormObjectModel[] = [...ADD_SAMPLE_PATIENT_MODEL];

    const depatmentRes = await API.get(`${BASE_URL}/api/department`);

    const departmentsObjectIndex = ADD_SAMPLE_PATIENT_MODEL.findIndex(
      (o: FormObjectModel) => o.id === 'departmentId'
    );

    const departmentData: StatusDropdown[] =
      depatmentRes?.data?.data?.departments.map((user: DepartmentData) => {
        return {
          label: user?.title,
          value: user?._id,
        };
      });

    formFields[departmentsObjectIndex].options = departmentData;
    setFormModelData(formFields);
  };

  const getPatientDetails = async () => {
    const res = await API.get(`${BASE_URL}/api/users/getUserById/${id}`);
    setPatientDetails(res?.data?.data?.[0]);
    console.log(res);
  };

  const getAllSamplesPatient = async () => {
    const res = await API.get(
      `${BASE_URL}/api/samples/getSampleByPatient/${id}?limit=${limit}&page=${page}`
    );
    setSampleData(res?.data?.data?.data);
    setcount(res?.data?.data?.totalPages);
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    console.log(event);
    setPage(value);
  };

  const handleChangePageSize = (event: SelectChangeEvent) => {
    console.log('event,', event.target.value as string);
    setLimit(event.target.value as string);
    setPage(1);
  };

  const handleContexualChange = async (
    dep: string,
    val: string
  ): Promise<void> => {
    console.log(dep, val);
    const formFields: FormObjectModel[] = [...ADD_SAMPLE_PATIENT_MODEL];
    const res = await API.get(
      `${BASE_URL}/api/process/getProcessByDepId/${val}`
    );

    const dependencyObjectIndex = ADD_SAMPLE_PATIENT_MODEL.findIndex(
      (o: FormObjectModel) => o.id === dep
    );

    const depData: StatusDropdown[] = res?.data?.data.map(
      (process: ProcessDataInterface) => {
        return {
          label: process?.title,
          value: process?._id,
        };
      }
    );
    formFields[dependencyObjectIndex].multioptions = depData;
    setFormModelData(formFields);
    console.log('Process', formFields);
  };

  const onSubmitFn = async (
    values: object,

    actions: { setSubmitting: (arg0: boolean) => void; resetForm: () => void }
  ) => {
    console.log('initial', values);

    const finalValues = { ...values };

    finalValues.patientId = id;

    finalValues.processIds = values.processIds.map((process) => {
      return process.value;
    });
    finalValues.status = 'Inprogress';

    console.log('Final Values', finalValues);

    // const id: string | null = localStorage?.getItem('userId') ?? '';
    const res = await API.post(`${BASE_URL}/api/samples/addSample`, {
      ...finalValues,
    });
    console.log('res', res);
    alert(res?.data.message);
    actions.setSubmitting(true);
    actions.resetForm();
    setOpenAddSampleModal(false);
    setLoading(!loading);
    // navigate('/home')
  };
  return (
    <div className="flex flex-col w-full h-full justify-start">
      <div className="w-full bg-white rounded-xl shadow-md p-4 flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold text-gray-800">
            {patientDetails.name}
          </h2>
          <p className="text-gray-600 text-sm mt-1">{patientDetails.email}</p>
          <p className="text-gray-600 text-sm mt-1">{patientDetails.age}</p>
          <p className="text-gray-600 text-sm mt-1">{patientDetails.gender}</p>
          {/* <div>
                {user?.role === 'researcher' ? (
                  <button
                    className={`cursor-pointer border-blue-500 border text-blue-500 bg-white font-medium py-2 px-4 rounded-full hover:bg-gray-100 hover:text-gray-900 transition duration-200`}
                    onClick={() => router(`/trails/${trial?._id}`)}
                  >
                    {strings?.viewDetails}
                  </button>
                ) : (
                  <button
                    disabled={trial.enrolled}
                    onClick={() => onEnroll(trial)}
                    className={`cursor-pointer border-blue-500 border text-blue-500 bg-white font-medium py-2 px-4 rounded-full hover:bg-gray-100 hover:text-gray-900 transition duration-200 ${enrollButtonPointerEvents}`}
                  >
                    {trial.enrolled ? 'Enrolled' : 'Enroll'}
                  </button>
                )}
              </div> */}
        </div>
        <div>
          <button
            className={`cursor-pointer border-blue-500 border text-blue-500 bg-white font-medium py-2 px-4 rounded-full hover:bg-gray-100 hover:text-gray-900 transition duration-200`}
            onClick={() => {
              setOpenAddSampleModal(true);
            }}
          >
            Add Sample
          </button>
        </div>
      </div>
      <div className="flex w-full flex-1 justify-between border-0 mb-5 overflow-auto rounded-[10px]">
        <DynamicTable data={sampleData} headers={tableHeaders} />
      </div>

      <div className="flex flex-row h-[4%] justify-center align-middle">
        <FormControl>
          <InputLabel id="demo-simple-select-label">Page Size</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={limit}
            label="Page Size"
            onChange={handleChangePageSize}
            style={{
              width: '100px',
              height: '40px',
              color: 'black',
            }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </FormControl>
        <Pagination count={count} page={page} onChange={handleChangePage} />
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
          <Typography>Add New Sample for {patientDetails.name}</Typography>
          <div className="flex flex-col w-full h-full justify-center p-5">
            <div className="flex w-full h-[500px] overflow-auto mb-10">
              <Forms
                fields={FormModelData}
                onSubmitFn={onSubmitFn}
                onContextualChange={handleContexualChange}
              />
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
    </div>
  );
};

export default PatientDetails;
