import React from 'react'
import classNames from 'classnames'
import { useField } from 'formik'

const Input = ({ label, error, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props)

  return (
    <div className="form-group">
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <input
        className={classNames('form-control form-control-lg ', {
          'is-invalid': error || meta.error,
        })}
        {...field}
        {...props}
      />
      {error || (meta.touched && meta.error) ? (
        <div className="invalid-feedback">{error || meta.error}</div>
      ) : null}
    </div>
  )
}

export default Input