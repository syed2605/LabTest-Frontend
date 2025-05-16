import type { FormikValues } from "formik";
import { type FormObjectModel } from "../interfaces/CommonInterface";


export const convertFormikValues = (arr: FormObjectModel[]): FormikValues => { // Explicitly type the return value
    return arr.reduce((acc: FormikValues , item: FormObjectModel) => {
      const id: string = item?.id;
      if (item?.isArray) {
        acc[id] = [];
      } else {
        acc[id] = item?.value ?? "";
      }
      return acc;
    }, {});
  }