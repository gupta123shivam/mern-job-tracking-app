import React from "react";
import Wrapper from "../assets/wrappers/DashboardFormPage.js";
import { useGlobalContext } from "../context/AppContext";
import Alert from "../components/Alert.js";
import FormRow from "../components/FormRow.js";

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useGlobalContext();
  const [formData, setFormData] = React.useState(user);
  const { name, email, lastname, location } = formData;

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      displayAlert({
        alertText: "Name and EMail fields can NOT be empty",
        alertType: "danger",
      });
      return;
    }

    updateUser(formData);
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={onSubmit}>
        <h3>profile </h3>
        {showAlert && <Alert />}

        {/* name */}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={handleChange}
          />
          <FormRow
            labelText="last name"
            type="text"
            name="lastname"
            value={lastname}
            handleChange={handleChange}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={handleChange}
          />

          <FormRow
            type="text"
            name="location"
            value={location}
            handleChange={handleChange}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
