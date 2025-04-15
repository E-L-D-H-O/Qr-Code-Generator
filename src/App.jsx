import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RENDER_PATH } from "./common/constants";
import LoginContainer from "./components/loginContainer";
import SignupContainer from "./components/signUpContainer";
import LandingContainer from "./components/LandingContainer";
import QRGenerator from "./components/QRGenerator";
import DashboardContainer from "./components/DashboardContainer";
import ProtectedRoute from "./components/ProtectedRoute";
import SuccessPage from "./components/Success";
import DonateButton from "./components/DonateButton";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentCancel from "./components/PaymentCanel";
function App() {

  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Routes>
          <Route exact path={RENDER_PATH.LANDING_URL} element={<LandingContainer />} />
        </Routes>
        <Routes>
          <Route exact path={RENDER_PATH.LOGIN_URL} element={<LoginContainer />} />
        </Routes>
        <Routes>
          <Route exact path={RENDER_PATH.SIGN_UP_URL} element={<SignupContainer />} />
        </Routes>
        <Routes>
          <Route exact path={RENDER_PATH.CREATE_QR_URL} element={<ProtectedRoute> <QRGenerator /></ProtectedRoute>} />
        </Routes>
        <Routes>
          <Route exact path={RENDER_PATH.DASHBOARD} element={<ProtectedRoute><DashboardContainer /></ProtectedRoute>} />
        </Routes>
        <Routes>
          <Route exact path={RENDER_PATH.SUCCESS} element={<ProtectedRoute><SuccessPage /></ProtectedRoute>} />
        </Routes>
        <Routes>
          <Route exact path={RENDER_PATH.DONATE} element={<ProtectedRoute><DonateButton /></ProtectedRoute>} />
        </Routes>
        <Routes>
          <Route exact path={RENDER_PATH.PAYMENT_SUCCESS} element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
        </Routes>
        <Routes>
          <Route exact path={RENDER_PATH.PAYMENT_CANCEL} element={<ProtectedRoute><PaymentCancel /></ProtectedRoute>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
