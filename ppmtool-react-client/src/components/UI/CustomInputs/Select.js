import React from 'react';
import { useField } from 'formik'

const Select = ({ label, error, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <div className="form-group">
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <select className="form-control form-control-lg" {...field} {...props} />
      {error || (meta.touched && meta.error) ? (
        <div className="invalid-feedback">{error || meta.error}</div>
      ) : null}
    </div>
  );
};

export default Select;
