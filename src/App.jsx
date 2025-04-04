import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RENDER_PATH } from "./common/constants";
import LoginContainer from "./components/loginContainer";

import LandingContainer from "./components/LandingContainer";
import QRGenerator from "./components/QRGenerator";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path={RENDER_PATH.LOGIN_URL} element={<LoginContainer />} />
      </Routes>
      <Routes>
        <Route exact path={RENDER_PATH.LANDING_URL} element={<LandingContainer />} />
      </Routes>
      <Routes>
        <Route exact path={RENDER_PATH.CREATE_QR_URL} element={<QRGenerator/>} />
      </Routes>
    </Router>
  );
}

export default App;
