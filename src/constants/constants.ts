import type {
  FormObjectModel,
  TableHeadersInterface,
} from '../interfaces/CommonInterface';

export const SAMPLE_COLLECTOR = [{ label: 'samples', path: '/samples' }];

export const MANAGER_MENU = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Home', path: '/home' },
  { label: 'Progress', path: '/progress' },
  { label: 'Notifications', path: '/notifications' },
];

export const strings = {
  submit: 'Submit',
  actions: 'Actions',
  approve: 'Approve',
  reject: 'Reject',
  date: 'Date',
  schduleTime: 'Schedule Slot',
  personPerSlot: 'Persons Per Slot',
  viewDetails: 'View details',
};
export const tableHeaders: TableHeadersInterface[] = [
  {
    label: 'Patient Name',
    key: 'patientName',
  },
  {
    label: 'Department Name',
    key: 'departmentName',
  },
  {
    label: 'Collection Date',
    key: 'collectionDate',
  },
  {
    label: 'Physician Name',
    key: 'physicianName',
  },
  {
    label: 'Tissue Type',
    key: 'tissueType',
  },
  {
    label: 'Current Process',
    key: 'currentProcessName',
  },
  {
    label: 'Status',
    key: 'status',
  }
];

export const patientHeaders: TableHeadersInterface[] = [
  {
    label: 'Patient Name',
    key: 'name',
  },
  {
    label: 'Age',
    key: 'age',
  },
  {
    label: 'Phone Number',
    key: 'phoneNumber',
  },
  {
    label: 'Gender',
    key: 'gender',
  },
  {
    label: 'Email ID',
    key: 'email',
  },
  {
    label: 'Actions',
    key: 'actions',
  }
];

export const ADD_SAMPLE_MODEL: FormObjectModel[] = [
  {
    id: 'patientId',
    value: '',
    placeholder: 'Select Patient Name',
    label: 'Patient',
    type: 'dropdown',
    options: [],
  },
  {
    id: 'departmentId',
    value: '',
    placeholder: 'Select Department Name',
    label: 'Department',
    type: 'dropdown',
    options: [],
    dependency: 'processIds',
  },
  {
    id: 'collectionDate',
    value: '',
    placeholder: 'Enter Collection Date',
    label: 'Collection Date',
    type: 'date',
  },
  {
    id: 'physicianName',
    value: '',
    placeholder: 'Enter Physician Name',
    label: 'Physician Name',
    type: 'input',
  },
  {
    id: 'tissueType',
    value: '',
    placeholder: 'Enter Tissue Type',
    label: 'Tissue Type',
    type: 'input',
  },
  {
    id: 'processIds',
    value: '',
    placeholder: 'Select Process',
    label: 'Select Process',
    type: 'multichip',
    isArray: true,
    multioptions: [],
  },
];
export const ADD_SAMPLE_PATIENT_MODEL: FormObjectModel[] = [
  {
    id: 'departmentId',
    value: '',
    placeholder: 'Select Department Name',
    label: 'Department',
    type: 'dropdown',
    options: [],
    dependency: 'processIds',
  },
  {
    id: 'collectionDate',
    value: '',
    placeholder: 'Enter Collection Date',
    label: 'Collection Date',
    type: 'date',
  },
  {
    id: 'physicianName',
    value: '',
    placeholder: 'Enter Physician Name',
    label: 'Physician Name',
    type: 'input',
  },
  {
    id: 'tissueType',
    value: '',
    placeholder: 'Enter Tissue Type',
    label: 'Tissue Type',
    type: 'input',
  },
  {
    id: 'processIds',
    value: '',
    placeholder: 'Select Process',
    label: 'Select Process',
    type: 'multichip',
    isArray: true,
    multioptions: [],
  },
];
//   {
//   "patientId": "68230803f6ac9445f9fdaa67",
//   "departmentId": "68243197bc0284e3b900df32",
//   "collectionDate": "2025-05-15T10:00:00.000Z",
//   "physicianName": "Dr. Smith",
//   "tissueType": "Blood",
//   "processIds": [
//     "6824328ebc0284e3b900df36",
//     "682432d1bc0284e3b900df38"
//   ],
//   "currentProcessId":"6824328ebc0284e3b900df36",
//   "status": "Inprogress"
// }
