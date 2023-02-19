import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute.js";
import AlreadyAuthenticatedRoute from "./routing/AlreadyAuthenticatedRoute.js";
import { AddJob, AllJobs, Profile, Stats } from "./dashboard";
import { Landing, Error, Register, Login } from "./pages";
import SharedLayout from "./shared_layout/SharedLayout.js";
import { useGlobalContext } from "./context/AppContext.js";

const App = () => {
  const { loadUser } = useGlobalContext();
  React.useEffect(() => {
    // loadUser();
  }, []);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <SharedLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path="all-jobs" element={<AllJobs />}></Route>
          <Route path="add-job" element={<AddJob />}></Route>
          <Route path="profile" element={<Profile />}></Route>
        </Route>
        {/* If User is already logged in then rediredct to '/'route */}
        <Route
          path="/register"
          element={<AlreadyAuthenticatedRoute children={<Register />} />}
        />
        <Route
          path="/login"
          element={<AlreadyAuthenticatedRoute children={<Login />} />}
        />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
