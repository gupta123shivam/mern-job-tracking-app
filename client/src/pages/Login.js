import React, { useState, useEffect } from "react";
import { Link, useNavigate, redirect } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, FormRow, Alert } from "../components";
import { useGlobalContext } from "../context/AppContext";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);

  const {
    showAlert,
    isLoading,
    displayAlert,
    loginUser,
    user,
    isAuthenticated,
  } = useGlobalContext();
  const { email, password } = formData;
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isAuthenticated) redirect("/");
  // });

  useEffect(() => {
    if (user && isAuthenticated) {
      const timerId = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timerId);
    }
  }, [user, navigate, isAuthenticated]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      displayAlert({
        alertText: "Please fill all fields",
        alertType: "danger",
      });
      return;
    }

    loginUser(formData);
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>Login</h3>
        {showAlert && <Alert />}
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

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          login
        </button>
        <p>
          Not a member yet? <Link to="/register">Register</Link>
        </p>
      </form>
    </Wrapper>
  );
};

export default Login;
