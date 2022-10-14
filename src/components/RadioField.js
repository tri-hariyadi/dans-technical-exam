import React from 'react'
import classNames from '../utils/classNames';
import propTypes from 'prop-types';
import { Field } from 'react-final-form';

const RadioField = ({
  options,
  name,
  label,
  style,
  classLabel,
}) => {
  const renderComponent = (value, idx) => {
    return (
      <div
        key={`radio-${idx}`}
        className='custom-control-inline custom-control mb-2'>
        <Field
          name={name}
          component='input'
          type='radio'
          value={value.value}
          className='option-input radio'
          id={`${name}-${idx}`}
        />
        <label htmlFor={`${name}-${idx}`}>
          {value.label}
        </label>
      </div>
    );
  };
  return (
    <div style={style}>
      {label && (<div className={classNames('mb-2')}>{label}</div>)}
      {options.map(renderComponent)}
    </div>
  )
}

RadioField.propTypes = {
  options: propTypes.array.isRequired,
  name: propTypes.string.isRequired,
  label: propTypes.string,
  classLabel: propTypes.string,
  style: propTypes.object
};

RadioField.defaultProps = {
  label: undefined,
  style: {},
  classLabel: ''
};

export default RadioField
