import React from 'react';
import { Field } from 'react-final-form';
import Select from 'react-select';
import { FormFeedback, Label, FormGroup, Spinner } from 'reactstrap';
import classNames from '../utils/classNames';

const SelectField = ({
  name,
  label,
  hideLabel,
  isLoading,
  menuPortalTarget,
  options,
  disabled,
  placeholder,
  isSearchable,
  noOptionsMessage,
}) => {
  const loadingMsg = () => (
    <div>
      <Spinner color='secondary' size='sm' className='me-2' />
      <span className='mt-n1'>Loading...</span>
    </div>
  );

  return (
    <Field name={name}>
      {({ input, meta: { error, touched } }) => (
        <FormGroup>
          {label &&
            <Label className={classNames('ms-1', hideLabel ? 'invisible' : '')} for={`select-${input.name}`}>
              {label}
            </Label>
          }
          <Select
            {...input}
            id={input.name}
            inputId={`select-${input.name}`}
            loadingMessage={loadingMsg}
            isLoading={isLoading}
            onChange={(value) => input.onChange(value)}
            onBlur={event => {
              event.preventDefault();
              input.onBlur();
            }}
            menuPortalTarget={menuPortalTarget}
            options={options || []}
            isDisabled={disabled}
            placeholder={placeholder}
            className={classNames('select-field', touched && error && 'is-invalid')}
            isSearchable={isSearchable}
            noOptionsMessage={noOptionsMessage}
          />
          {error && touched && <FormFeedback className='ms-1'>{error}</FormFeedback>}
        </FormGroup>
      )}
    </Field>
  )
}

SelectField.defaultProps = {
  id: undefined,
  label: undefined,
  hideLabel: false,
  isLoading: false,
  menuPortalTarget: null,
  disabled: false,
  placeholder: 'Silahkan Pilih',
  isSearchable: true,
  noOptionsMessage: () => <span>Data tidak ditemukan</span>,
};

export default SelectField
