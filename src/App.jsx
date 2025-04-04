import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RENDER_PATH } from "./common/constants";
import LoginContainer from "./components/loginContainer";
<<<<<<< HEAD

=======
import SignupContainer from "./components/signUpContainer";
>>>>>>> b7c6c2bfa8d3eb920e332871f690da8b1fa8c4ee
import LandingContainer from "./components/LandingContainer";
import QRGenerator from "./components/QRGenerator";
import DashboardContainer from "./components/DashboardContainer";
function App() {

  return (
    <Router>
      <Routes>
        <Route exact path={RENDER_PATH.LANDING_URL} element={<LandingContainer />} />
      </Routes>
      <Routes>
        <Route exact path={RENDER_PATH.LOGIN_URL} element={<LoginContainer />} />
      </Routes>
      <Routes>
<<<<<<< HEAD
        <Route exact path={RENDER_PATH.LANDING_URL} element={<LandingContainer />} />
      </Routes>
      <Routes>
        <Route exact path={RENDER_PATH.CREATE_QR_URL} element={<QRGenerator/>} />
=======
        <Route exact path={RENDER_PATH.SIGN_UP_URL} element={<SignupContainer />} />
      </Routes>
      <Routes>
        <Route exact path={RENDER_PATH.CREATE_QR_URL} element={<QRGenerator />} />
      </Routes>
      <Routes>
        <Route exact path={RENDER_PATH.DASHBOARD} element={<DashboardContainer />} />
>>>>>>> b7c6c2bfa8d3eb920e332871f690da8b1fa8c4ee
      </Routes>
    </Router>
  );
}

export default App;
