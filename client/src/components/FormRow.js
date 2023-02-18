import React from "react";
import PropTypes from 'prop-types';

const FormRow = ({ name, value, type, handleChange, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>

      <input
        type={type}
        value={value}
        name={name}
        id={name}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
};

FormRow.defaultProps = {
  labelText: "",
};

FormRow.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  labelText: PropTypes.string,
};

export default FormRow;
