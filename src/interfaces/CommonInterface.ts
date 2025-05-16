export interface MenuItem {
    label: string;
    path: string;
  }

  export interface Notification {
  id: string;
  title: string;
  body?: string;
  read?: boolean;
  createdAt: string; // ISO date
}

import { type Option } from "../component/Chip/Chip";

export interface FormObjectModel{
    id:string,
    value?: string,
    placeholder?: string,
    label: string,
    type: string,
    options?: StatusDropdown[]  ,
    multioptions?:StatusDropdown[]  |Option[] | undefined,
    isArray?:boolean,
    inputType?:string,
    dependency?: string;
  };

export interface StatusDropdown
    { label: string; value: string }
export interface EnrollFormValuesInterface
    { prefered_slot: string; prefered_timeslot: string }

export interface EnrollmentInterface {
        _id?: string;
        trialId?: string;
        patientId?: string;
        prefered_slot_date?: string;
        prefered_slot_time?: string;
        documents?: string;
        confirmed_slot?: string;
        confirmed_time?: string;
        status?: string;
        createdAt?: Date;
        updatedAt?: Date;
    }

export interface TrailDetail {
        title: string;
        description: string;
        status: string;
        createdBy?: string;
        schedule_per_time: [];
        persons_per_slot: string;
        end_date: string;
        start_date: string;
        createdAt: string;
        updatedAt: string;
      }    
      
export interface PatientDetails {
        _id: string| number;
        patientId?:string;
        name: string;
        email: string;
        role: string;
        phone: string | number;
        aadhar: string | number;
        password?: string;
      }

export interface MenuItem {
        label: string;
        path: string;
      }
export interface TableHeadersInterface {
  label: string,
  key: string
}

export interface PatientSampleActionsInterface {
    type: string,
    label: string,
    function: (data: UserDataInterface) => void
    disabled?: boolean
}

export interface AllSampleDataInterface {
  patientName?: string;
  patientId?: string;
    departmentName?: string;
    departmentId?: string;
    collectionDate?: Date;
    physicianName?: string;
    tissueType?: string;
    processIds?: string;
    currentProcessId?: string;
    currentProcessName?: string;
    status?: string;
}

export interface UserDataInterface {
  _id: string;
  name: string;
  role: string;
  email: string;
  age: number;
  gender: string;
  phoneNumber : number;
  departmentId?: string;
  processId?: string;
  actions?: PatientSampleActionsInterface[];
}
export interface DepartmentData {
  _id: string;
  title: string;
  description: string;
  status: string;
}

export interface ProcessDataInterface  {
  _id:string;
  title: string;
  description: string;
  departmentId: string;
  sequence: number;
  validRange: string;
  status: string;
}