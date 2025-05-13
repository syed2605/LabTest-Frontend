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
        actions?: string[];
      }

      export interface MenuItem {
        label: string;
        path: string;
      }