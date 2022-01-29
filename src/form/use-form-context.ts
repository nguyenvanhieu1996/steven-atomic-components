/**
 * Description: The App Component.
 *
 * change history:
 * date            defect#        person            comments
 * -----------------------------------------------------------------------------
 * 2020/04/26      -------        Hieu.Nguyen       create file
 *
 * @date 2020/04/26 23:58
 */

import React from 'react';

type InitFormType<T> = {
  initialValues: T;
  validationSchema?: (data: T) => any;
  validationSubmission?: () => boolean;
  onSubmit?: (data: T) => void;
};

export type FormContextType<T> = {
  setInitForm: (data: InitFormType<T>) => void;
  values: T;
  errors: {[key: string]: any};
  touched: {[key: string]: T};
  initForm: InitFormType<T>;
  setValues: (data: T) => void;
  setTouched: (data: any) => void;
  setErrors: (data: any) => void;
  setFieldTouch: (name: string, touch?: boolean) => void;
  setFieldError: (name: string, error: string) => void;
  submitForm: VoidFunction;
};

export const FormContext = React.createContext<FormContextType<any>>({} as any);

export const useFormContext = <T>() => {
  const formContext = React.useContext<FormContextType<T>>(FormContext);

  return formContext;
};
