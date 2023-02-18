import React, { useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, FormRow, Alert } from "../components";
import { useGlobalContext } from "../context/AppContext";

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);

  const { alertType, showAlert, alertText, isLoading, displayAlert } =
    useGlobalContext();
  const { name, email, password, password2 } = formData;

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !password2 || password !== password2) {
      displayAlert({
        alertText: "Please fill all fields",
        alertType: "danger",
      });
      return;
    }
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>Register</h3>
        {showAlert && <Alert alert={{ alertText, alertType }} />}
        <FormRow
          name="name"
          type="text"
          value={name}
          handleChange={handleChange}
        />
        <FormRow
          name="email"
          type="email"
          value={email}
          handleChange={handleChange}
        />
        <FormRow
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
        />

        <FormRow
          name="password2"
          type="password"
          value={password2}
          handleChange={handleChange}
          labelText="Confirm Password"
        />

        <button type="submit" className="btn btn-block">
          Sign up
        </button>
        <p>
          Already a member? <Link to="/login">Login</Link>{" "}
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
