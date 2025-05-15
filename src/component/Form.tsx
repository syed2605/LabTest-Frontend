// import React from 'react';
import {
  Formik,
  Form,
  Field,
  type FormikValues,
  type FieldProps,
  type FormikHelpers,
} from 'formik';
import { strings } from '../../src/constants/constants';
import { convertFormikValues } from '../../src/utils/formConversion';
import type {
  FormObjectModel,
  StatusDropdown,
} from '../../src/interfaces/CommonInterface';
import MultiChip from '../component/Chip/Chip';

interface Iprops {
  fields: FormObjectModel[];
  onSubmitFn: (
    values: FormikValues,
    actions: { setSubmitting: (arg0: boolean) => void; resetForm: () => void }
  ) => void;
  isEdit?: boolean;
  editFields?: FormikValues;
  onContextualChange?: (dependency: string, value: string) => void;
}

const Forms = ({
  fields,
  onSubmitFn,
  isEdit = false,
  editFields,
  onContextualChange,
}: Iprops) => {
  const initialValues: FormikValues =
    isEdit && editFields ? editFields : convertFormikValues(fields) || {};

  return (
    <div className="w-full p-6 rounded-md shadow-md h-full bg-white">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmitFn}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
        <Form className="flex flex-col w-full space-y-4">
          {fields?.map((item: FormObjectModel, index) => {
            let fieldComponent;

            switch (item?.type) {
              case 'input':
                fieldComponent = (
                  <div className="flex flex-col">
                    <label
                      htmlFor={item?.id}
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      {item?.label}
                    </label>
                    <Field
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id={item?.id}
                      name={item?.id}
                      placeholder={item?.placeholder}
                      type={item?.inputType ?? 'text'}
                    />
                  </div>
                );
                break;

              case 'date':
                fieldComponent = (
                  <div className="flex flex-col">
                    <label
                      htmlFor={item?.id}
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      {item?.label}
                    </label>
                    <Field
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id={item?.id}
                      name={item?.id}
                      type="date"
                    />
                  </div>
                );
                break;

              case 'dropdown':
                fieldComponent = item?.options ? (
                  <div className="flex flex-col">
                    <label
                      htmlFor={item?.id}
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      {item?.label}
                    </label>
                    <Field
                      as="select"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id={item?.id}
                      name={item?.id}
                      onChange={(e: any) => {
                        setFieldValue(item?.id,e.target.value)
                        if (item?.dependency && onContextualChange) {
                          onContextualChange(item?.dependency, e.target.value);
                        }
                      }}
                    >
                      <option value="">Select an option</option>
                      {item?.options?.map((option: StatusDropdown) => (
                        <option key={option.label} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                  </div>
                ) : null;
                break;

              case 'multichip':
                fieldComponent = item?.multioptions && (
                  <div className="flex flex-col">
                    <label
                      htmlFor={item?.id}
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      {item?.label}
                    </label>
                    <Field name={item?.id}>
                      {({
                        field,
                        form,
                      }: {
                        field: FieldProps['field'];
                        form: FormikHelpers<Record<string, string>>;
                      }) => {
                        return (
                          <MultiChip
                            options={item?.multioptions}
                            selectedOptions={field?.value || []}
                            setSelectedOptions={(options: FormikValues) =>
                              form.setFieldValue(item?.id, options)
                            }
                          />
                        );
                      }}
                    </Field>
                  </div>
                );
                break;

              default:
                fieldComponent = (
                  <p className="text-red-500">
                    Unsupported field type: {item?.type}
                  </p>
                );
            }
            return <div key={index}>{fieldComponent}</div>;
          })}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {strings?.submit}
          </button>
        </Form>
        )}
      </Formik>
    </div>
  );
};

export default Forms;
