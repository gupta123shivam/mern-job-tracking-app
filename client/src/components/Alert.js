import React from "react";
import PropTypes from "prop-types";

const Alert = ({ alert: { alertText, alertType, duration = 5000 } }) => {
  if (!alertText) {
    return <></>;
  }

  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};

Alert.propTypes = {
  alert: PropTypes.object.isRequired,
};

export default Alert;
