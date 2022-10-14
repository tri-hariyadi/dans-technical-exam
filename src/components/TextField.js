import React from 'react';
import { Field } from 'react-final-form';
import { FormFeedback, Label, Input, FormGroup } from 'reactstrap';
import classNames from '../utils/classNames';

const TextField = ({
  id,
  name,
  type,
  placeholder,
  label,
  disabled,
  readOnly,
  maxLength,
  hideLabel,
  textTransform,
  style,
  autoComplete,
  className,
  onChange,
  formatter,
}) => {
  return (
    <Field name={name}>
      {({ input, meta: { touched, error } }) => (
        <FormGroup>
          {label &&
            <Label
              className='ms-1'
              style={hideLabel ? { visibility: 'hidden' } : {}} for={id}>
              {label}
            </Label>
          }
          <Input
            {...input}
            id={id || input.name}
            type={type}
            placeholder={placeholder || label}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            autoComplete={autoComplete}
            className={classNames(type === 'hidden' ? 'd-none' : 'd-block', 'w-100')}
            style={Object.assign(
              { marginLeft: 0, minHeight: 40 },
              textTransform ? { textTransform } : {},
              style
            )}
            invalid={error && touched}
            onChange={(e) => onChange ? onChange(e) : input.onChange(e)}
          />
          {error && touched && <FormFeedback className='ms-1'>{error}</FormFeedback>}
        </FormGroup>
      )}
    </Field>
  )
}

TextField.defaultProps = {
  id: undefined,
  type: 'text',
  placeholder: '',
  label:'',
  disabled: false,
  readOnly: false,
  maxLength: undefined,
  autoComplete: 'none',
  textTransform: 'none',
  style: undefined,
  hideLabel: false,
  className: '',
  onChange: undefined,
  formatter: undefined
};

export default TextField
