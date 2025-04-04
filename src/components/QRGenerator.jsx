import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const QRGenerator = () => {
  const [qrType, setQrType] = useState("URL");
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const qrRef = useRef(null);

  const qrTypes = ["URL", "Text", "Email", "Phone", "WiFi", "Event"];

  // Validate user input based on QR type and update errorMessage state
  const validateInput = () => {
    switch (qrType) {
      case "URL":
        try {
          new URL(formData.data);
          setErrorMessage("");
          return true;
        } catch (err) {
          setErrorMessage("Please enter a valid URL.");
          return false;
        }
      case "Text":
        if (!formData.data || formData.data.trim() === "") {
          setErrorMessage("Please enter text data.");
          return false;
        }
        setErrorMessage("");
        return true;
      case "Email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email || "")) {
          setErrorMessage("Please enter a valid email address.");
          return false;
        }
        setErrorMessage("");
        return true;
      }
      case "Phone": {
        const phoneRegex = /^\+?[0-9\s-]{7,15}$/;
        if (!formData.contactName || formData.contactName.trim() === "") {
          setErrorMessage("Please enter a contact name.");
          return false;
        }
        if (!phoneRegex.test(formData.phone || "")) {
          setErrorMessage("Please enter a valid phone number.");
          return false;
        }
        setErrorMessage("");
        return true;
      }
      case "WiFi": {
        if (!formData.ssid || formData.ssid.trim() === "") {
          setErrorMessage("Please enter the SSID.");
          return false;
        }
        if ((formData.encryption || "WPA") !== "nopass" && (!formData.password || formData.password.trim() === "")) {
          setErrorMessage("Please enter the WiFi password.");
          return false;
        }
        setErrorMessage("");
        return true;
      }
      case "Event": {
        if (!formData.title || formData.title.trim() === "") {
          setErrorMessage("Please enter the event title.");
          return false;
        }
        // Validate dates using DD/MM/YYYY format
        const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/;
        if (!dateRegex.test(formData.start || "")) {
          setErrorMessage("Please enter a valid start date (DD/MM/YYYY).");
          return false;
        }
        if (!dateRegex.test(formData.end || "")) {
          setErrorMessage("Please enter a valid end date (DD/MM/YYYY).");
          return false;
        }
        setErrorMessage("");
        return true;
      }
      default:
        setErrorMessage("");
        return true;
    }
  };

  // Download QR code only if inputs are valid
  const downloadQRCode = () => {
    if (!validateInput()) {
      return;
    }
    const canvas = qrRef.current.querySelector("canvas");
    const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.href = image;
    link.download = "QRCode.png";
    link.click();
  };

  // Generate the QR code value based on type and form data
  const getQRValue = () => {
    switch (qrType) {
      case "URL":
      case "Text":
        return formData.data || "";
      case "Email":
        return `mailto:${formData.email || ""}?subject=${encodeURIComponent(
          formData.subject || ""
        )}&body=${encodeURIComponent(formData.body || "")}`;
      case "Phone":
        // MECARD format for contacts
        return `MECARD:N:${formData.contactName || ""};TEL:${formData.phone || ""};;`;
      case "WiFi":
        return `WIFI:T:${formData.encryption || "WPA"};S:${
          formData.ssid || ""
        };P:${formData.password || ""};H:${
          formData.hidden ? "true" : "false"
        };;`;
      case "Event":
        return `BEGIN:VEVENT
SUMMARY:${formData.title || ""}
DTSTART:${formData.start || ""}
DTEND:${formData.end || ""}
LOCATION:${formData.location || ""}
DESCRIPTION:${formData.description || ""}
END:VEVENT`;
      default:
        return "";
    }
  };

  // Render input fields based on selected QR type
  const renderInputFields = () => {
    switch (qrType) {
      case "WiFi":
        return (
          <div className="wifi-inputs">
            <label>
              SSID:
              <input
                type="text"
                placeholder="SSID"
                value={formData.ssid || ""}
                onChange={(e) => setFormData({ ...formData, ssid: e.target.value })}
              />
            </label>
            <label>
              Encryption:
              <select
                value={formData.encryption || "WPA"}
                onChange={(e) => setFormData({ ...formData, encryption: e.target.value })}
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">None</option>
              </select>
            </label>
            <label>
              Password:
              <input
                type="text"
                placeholder="Password"
                value={formData.password || ""}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </label>
            <label>
              Hidden:
              <input
                type="checkbox"
                checked={formData.hidden || false}
                onChange={(e) => setFormData({ ...formData, hidden: e.target.checked })}
              />
            </label>
          </div>
        );
      case "Email":
        return (
          <div className="email-inputs">
            <label>
              Recipient Email:
              <input
                type="email"
                placeholder="Recipient Email"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </label>
            <label>
              Subject:
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject || ""}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </label>
            <label>
              Body:
              <textarea
                placeholder="Body"
                value={formData.body || ""}
                onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              />
            </label>
          </div>
        );
      case "Phone":
        return (
          <div className="phone-inputs">
            <label>
              Contact Name:
              <input
                type="text"
                placeholder="Contact Name"
                value={formData.contactName || ""}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
              />
            </label>
            <label>
              Phone Number:
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone || ""}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </label>
          </div>
        );
      case "Event":
        return (
          <div className="event-inputs">
            <label>
              Event Title:
              <input
                type="text"
                placeholder="Event Title"
                value={formData.title || ""}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </label>
            <label>
              Location:
              <input
                type="text"
                placeholder="Location"
                value={formData.location || ""}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </label>
            <label>
              Start (DD/MM/YYYY):
              <input
                type="text"
                placeholder="Start Date"
                value={formData.start || ""}
                onChange={(e) => setFormData({ ...formData, start: e.target.value })}
              />
            </label>
            <label>
              End (DD/MM/YYYY):
              <input
                type="text"
                placeholder="End Date"
                value={formData.end || ""}
                onChange={(e) => setFormData({ ...formData, end: e.target.value })}
              />
            </label>
            <label>
              Description:
              <textarea
                placeholder="Description"
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </label>
          </div>
        );
      default:
        return (
          <div className="default-input">
            <label>
              {qrType} Data:
              <input
                type="text"
                placeholder={`Enter ${qrType} data`}
                value={formData.data || ""}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
              />
            </label>
          </div>
        );
    }
  };

  return (
    <>
      <Navbar/>
      <div className="qr-generator">
      <div className="qr-container">
        {/* Left Panel: 2x3 Grid of Types and Dynamic Input Fields */}
        <div className="left-panel">
          <div className="qr-types-grid">
            {qrTypes.map((type) => (
              <button
                key={type}
                className={qrType === type ? "active" : ""}
                onClick={() => {
                  setQrType(type);
                  setFormData({});
                  setErrorMessage("");
                }}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="qr-input-group">
            {renderInputFields()}
            {errorMessage && (
              <div style={{ color: "red", marginBottom: "10px" }}>
                {errorMessage}
              </div>
            )}
            <button onClick={downloadQRCode}>Download QR</button>
          </div>
        </div>
        {/* Right Panel: Phone Display */}
        <div className="phone-display">
          <div className="phone-frame">
            <div className="phone-screen" ref={qrRef}>
              <QRCodeCanvas value={getQRValue()} size={150} />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
    
  );
};

export default QRGenerator;
