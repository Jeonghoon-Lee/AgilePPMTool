import React from 'react'
import classNames from 'classnames'
import { useField } from 'formik'

const Textarea = ({ label, error, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <div className="form-group">
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <textarea
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

export default Textarea