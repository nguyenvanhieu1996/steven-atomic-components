import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  KeyboardTypeOptions,
  TextInput,
  TextProps,
  View,
} from 'react-native';
// import {GLOBAL_COLORS} from '@/atomic-components/common/theme';
// import {Spacer} from '@/atomic-components/margin';
// import {useFormContext} from '@/components/common/form/use-form-context';
// import {validate} from '@/components/common/form/validate';
import {CustomInputProps} from './interface';
import Styled from './styles';
import { useFormContext } from '../form/use-form-context';
import { validate } from '../form/validate';

export type InputProps = Omit<TextProps, 'keyboardType'> & CustomInputProps;

const Input: React.FC<InputProps> = React.memo(
  ({
    name,
    placeholder,
    autoFocus,
    keyboardType,
    disable = false,
    style,
    iconRight,
    onPressIconRight,
    typeHeight,
    onFocus,
    onBlur,
    ...props
  }) => {
    const [value, setValue] = useState('');

    const {values, setValues, submitForm, initForm, setErrors, errors} =
      useFormContext<any>();
    const [isFocus, setIsFocus] = useState(false);

    const onChangeText = (value: string) => {
      setValue(value);
    };

    const onBaseBlur = useCallback(() => {
      setIsFocus(false);
      const tmp = {
        ...values,
        [name]: value,
      };
      if (initForm.validationSchema) {
        const error = validate({
          name,
          validationSchema: initForm.validationSchema(tmp),
        });
        setErrors({
          ...errors,
          [name]: error,
        });
      }
      if (onBlur) return onBlur();
    }, [errors, initForm, name, onBlur, setErrors, value, values]);

    useEffect(() => {
      onChangeText(initForm.initialValues[name]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initForm.initialValues]);

    useEffect(() => {
      setValues({
        ...values,
        [name]: value,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const keyboard: KeyboardTypeOptions = useMemo(() => {
      if (keyboardType === 'number') return 'numeric';
      if (keyboardType === 'email') return 'email-address';

      return 'default';
    }, [keyboardType]);

    const borderStyle = useMemo(() => {
      return isFocus ? 'borderOrangeLighter' : 'borderGrayLighter';
    }, [isFocus]);

    const onBaseFocus = useCallback(() => {
      setIsFocus(true);
      if (onFocus) return onFocus();
    }, [onFocus]);

    const onSubmitEditing = useCallback(() => {
      submitForm();
    }, [submitForm]);

    return (
      <View>
        <TextInput
          {...props}
          autoCapitalize="none"
          returnKeyType="go"
          keyboardType={keyboard}
          onChangeText={onChangeText}
          onFocus={onBaseFocus}
          onBlur={onBaseBlur}
          onSubmitEditing={onSubmitEditing}
          autoFocus={autoFocus}
          placeholder={placeholder}
          value={value}
          nativeID={name}
          editable={!disable}
          style={[
            Styled.input,
            (Styled as any)[borderStyle],
            iconRight && Styled.paddingRight14Percent,
            typeHeight === '40' && Styled.height40,
            style,
          ]}
        />
      </View>
    );
  },
);

Input.displayName = 'Input';
export {Input};
