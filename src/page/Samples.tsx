import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Pagination,
  Select,
  Typography,
  type SelectChangeEvent,
} from '@mui/material';
import Tab from '@mui/material/Tab';
import type React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../axios/axios';
import Forms from '../component/Form';
import DynamicTable from '../component/Table/TableComponent';
import { BASE_URL } from '../constants/URL';
import {
  ADD_SAMPLE_MODEL,
  patientHeaders,
  tableHeaders,
} from '../constants/constants';
import {
  type AllSampleDataInterface,
  type DepartmentData,
  type FormObjectModel,
  type PatientSampleActionsInterface,
  type ProcessDataInterface,
  type StatusDropdown,
  type UserDataInterface
} from '../interfaces/CommonInterface';

export const Sample: React.FC = () => {
  const [sampleData, setSampleData] = useState<AllSampleDataInterface[]>([]);
  const [patientsData, setPatientsData] = useState<UserDataInterface[]>([]);
  const [FormModelData, setFormModelData] = useState<FormObjectModel[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<string>('10');
  const [count, setcount] = useState<number>(0);
  const [openAddSampleModal, setOpenAddSampleModal] = useState<boolean>(false);
  const [value, setValue] = useState<string>('samples');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate()

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
    getSampleData();
    getPatients();
  }, [page, limit,loading]);

  const getPatients = async (): Promise<void> => {
    const res = await API.get(
      `${BASE_URL}/api/users/getUserByRole?role=patient&page=${page}&limit=${limit}`
    );
    const patientsData = res?.data?.data?.user
    const d: UserDataInterface[] = [...patientsData];
    const convertedData: UserDataInterface[] = d?.map((patient) => {
      const action: PatientSampleActionsInterface[] = [];
      const sampleAction: PatientSampleActionsInterface = {
        type: 'Button',
        label: 'Samples',
        function: handleOpenBorrow,
        // disabled: patient?.status !== 'available' || user?.role === 'admin',
      };
      action.push(sampleAction);
      patient = { ...patient, actions: [...action] };
      return patient;
    });
    setPatientsData(convertedData);
    addFieldsToForm(convertedData);
  };

  const handleOpenBorrow = (data: UserDataInterface) => {
    navigate(`/samples/${data._id}`)
  }

  const addFieldsToForm = async (users: UserDataInterface[]): Promise<void> => {
    const formFields: FormObjectModel[] = [...ADD_SAMPLE_MODEL];
    const patientsObjectIndex = ADD_SAMPLE_MODEL.findIndex(
      (o: FormObjectModel) => o.id === 'patientId'
    );
    const userData: StatusDropdown[] = users.map((user: UserDataInterface) => {
      return {
        label: user?.name,
        value: user._id,
      };
    });

    const depatmentRes = await API.get(`${BASE_URL}/api/department`);

    const departmentsObjectIndex = ADD_SAMPLE_MODEL.findIndex(
      (o: FormObjectModel) => o.id === 'departmentId'
    );

    const departmentData: StatusDropdown[] =
      depatmentRes?.data?.data?.departments.map((user: DepartmentData) => {
        return {
          label: user?.title,
          value: user?._id,
        };
      });

    console.log(userData);
    formFields[departmentsObjectIndex].options = departmentData;
    formFields[patientsObjectIndex].options = userData;
    setFormModelData(formFields);
  };

  const getSampleData = async (): Promise<void> => {
    const res = await API.get(
      `${BASE_URL}/api/samples/getAllSample?page=${page}&limit=${limit}`
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

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setPage(1);
    setLimit('10');
  };

  const handleAddSample = () => {
    setOpenAddSampleModal(true);
  };

  const handleContexualChange = async (
    dep: string,
    val: string
  ): Promise<void> => {
    console.log(dep, val);
    const formFields: FormObjectModel[] = [...ADD_SAMPLE_MODEL];
    const res = await API.get(
      `${BASE_URL}/api/process/getProcessByDepId/${val}`
    );

    const dependencyObjectIndex = ADD_SAMPLE_MODEL.findIndex(
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

    console.log("initial",values)

    const finalValues = {...values}

    finalValues.processIds = values.processIds.map((process) => {
        return process.value
    })
    finalValues.status = "Inprogress"

    console.log("Final Values",finalValues)

    // const id: string | null = localStorage?.getItem('userId') ?? '';
    const res = await API.post(
      `${BASE_URL}/api/samples/addSample`,
      {...finalValues}
    );
    console.log("res",res)
    alert(res?.data.message);
    actions.setSubmitting(true);
    actions.resetForm();
    setOpenAddSampleModal(false)
    setLoading(!loading)
    // navigate('/home')
  };
  return (
    <div className="flex flex-col w-full h-full justify-start">
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
            <Tab label="Samples" value="samples" />
            <Tab label="Patients" value="patients" />
          </TabList>
        </Box>
        <TabPanel
          value="samples"
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            justifyContent: 'flex-start',
          }}
        >
          <div className="flex w-full justify-between border-b-2 mb-5">
            <div className="text-[30px]">All Samples</div>
            <IconButton
              onClick={handleAddSample}
              style={{ color: 'black', borderColor: 'white' }}
            >
              <AddCircleOutlineOutlinedIcon
                sx={{ width: '30px', height: '30px' }}
              />
            </IconButton>
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
        </TabPanel>
        <TabPanel
          value="patients"
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            justifyContent: 'flex-start',
          }}
        >
          <div className="flex w-full justify-between border-b-2 mb-5">
            <div className="text-[30px]">All Patients Sample</div>
            {/* <IconButton
              onClick={handleAddSample}
              style={{ color: 'black', borderColor: 'white' }}
            >
              <AddCircleOutlineOutlinedIcon
                sx={{ width: '30px', height: '30px' }}
              />
            </IconButton> */}
          </div>
          <div className="flex w-full flex-1 justify-between border-0 mb-5 overflow-auto rounded-[10px]">
            <DynamicTable data={patientsData} headers={patientHeaders} />
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
        </TabPanel>
      </TabContext>

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
