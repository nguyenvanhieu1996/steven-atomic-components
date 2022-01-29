type Props = {
  name: string;
  validationSchema?: (values: any) => void;
};
export const validate = ({name, validationSchema}: Props) => {
  let error = '';
  const schema = validationSchema;
  const func = schema && (schema as any)[name];
  error = func();
  if (error) {
    return error;
  }

  return '';
};
