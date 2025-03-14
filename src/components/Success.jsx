import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaDownload, FaPlusCircle } from "react-icons/fa";

const QRSuccess = () => {
  return (
    <div>
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center p-3 bg-primary text-white">
        <h1 className="m-0">QR Generator</h1>
        <button className="btn btn-light">My Account</button>
      </header>

      {/* Main Content */}
      <div className="container text-center mt-5">
        <h2 className="text-success fw-bold">QR Code Generated Successfully!</h2>

        <div className="card mx-auto mt-4 p-4 shadow-lg border-0" style={{ maxWidth: "350px" }}>
          <img src="/path-to-qr.png" alt="QR Code" className="img-fluid rounded" />
        </div>

        <p className="mt-4 fs-5 fw-semibold">Style Your QR</p>

        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-outline-primary">One</button>
          <button className="btn btn-outline-secondary">Two</button>
          <button className="btn btn-outline-danger">Three</button>
        </div>

        <div className="mt-4">
          <button className="btn btn-success px-4 py-2 me-2">
            <FaDownload /> Download
          </button>
          <button className="btn btn-warning px-4 py-2">
            <FaPlusCircle /> Create New QR
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-3 mt-5">
        &copy; 2025 QR Generator | All Rights Reserved
      </footer>
    </div>
  );
};

export default QRSuccess;
