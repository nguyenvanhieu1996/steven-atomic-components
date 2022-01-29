import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Keyboard} from 'react-native';
// import R from 'ramda';
import {FormContext as BaseFormContext} from './use-form-context';
import {validate} from './validate';

const FormContext: React.FC = props => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [initForm, setInitForm] = useState({
    initialValues: {},
    validationSchema: () => {},
    onSubmit: () => {},
    setFieldTouch: () => {},
    setFieldError: () => {},
  } as any);

  const submitForm = useCallback(() => {
    Keyboard.dismiss();

    if (!initForm.validationSchema) return initForm.onSubmit(values);
    const schema = initForm.validationSchema();
    if (!schema) return;

    let errorsTmp = {};
    Object.keys(initForm.initialValues).map(name => {
      const error = validate({
        name,
        validationSchema: initForm.validationSchema(values),
      });
      if (error) {
        errorsTmp = {
          ...errorsTmp,
          [name]: error,
        };
      }
    });
    setErrors(errorsTmp);

    // if (!R.isEmpty(errorsTmp)) return;

    initForm.onSubmit(values);
  }, [initForm, values]);

  const setFieldTouch = useCallback(
    (name: string, touch: boolean) => {
      setTouched({
        ...touched,
        [name]: touch,
      });
    },
    [touched],
  );

  const setFieldError = useCallback(
    (name: string, error: string) => {
      setErrors({
        ...errors,
        [name]: error,
      });
    },
    [errors],
  );

  const valuesContext = useMemo(() => {
    return {
      setInitForm,
      initForm,
      values,
      setValues,
      errors,
      setErrors,
      touched,
      setTouched,
      submitForm,
      setFieldTouch: () => setFieldTouch,
      setFieldError: () => setFieldError,
    };
  }, [
    errors,
    initForm,
    setFieldError,
    setFieldTouch,
    submitForm,
    touched,
    values,
  ]);

  useEffect(() => {
    setValues(initForm.initialValues);
  }, [initForm]);

  return (
    <BaseFormContext.Provider value={valuesContext}>
      {props.children}
    </BaseFormContext.Provider>
  );
};

export {FormContext};
