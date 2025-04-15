import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { Button, Card, Form, Row, Col, Alert, Spinner } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";
import { ArrowLeftCircle } from "lucide-react";
import { API_URL } from "../common/constants";

const QRGenerator = () => {
  const [qrType, setQrType] = useState("URL");
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const qrTypes = ["URL", "Text", "Email", "Phone", "WiFi", "Event"];

  const validateInput = () => {
    switch (qrType) {
      case "URL": {
        const url = formData.data?.trim();
        const urlRegex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;


        if (!url || !urlRegex.test(url)) {
          setErrorMessage("Please enter a valid URL (must include domain name).");
          return false;
        }

        try {
          new URL(url.startsWith("http") ? url : `https://${url}`);
          return true;
        } catch {
          setErrorMessage("Invalid URL format.");
          return false;
        }
      }

      case "Text":
        if (!formData.data?.trim()) {
          setErrorMessage("Please enter text data.");
          return false;
        }
        return true;

      case "Email": {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email || "")) {
          setErrorMessage("Please enter a valid email address.");
          return false;
        }
        return true;
      }

      case "Phone":
        if (!formData.contactName?.trim()) {
          setErrorMessage("Please enter a contact name.");
          return false;
        }
        if (!/^\+?[0-9\s-]{7,15}$/.test(formData.phone || "")) {
          setErrorMessage("Please enter a valid phone number (7-15 digits).");
          return false;
        }
        return true;

      case "WiFi": {
        const { ssid, encryption = "WPA", password } = formData;

        if (!ssid || ssid.trim().length === 0) {
          setErrorMessage("SSID is required.");
          return false;
        }

        if (!["WPA", "WEP", "nopass"].includes(encryption)) {
          setErrorMessage("Invalid encryption type.");
          return false;
        }

        if (
          encryption !== "nopass" &&
          (!password || password.length < 8 || password.length > 64)
        ) {
          setErrorMessage("Password must be between 8 and 64 characters.");
          return false;
        }

        return true;
      }

      case "Event": {
        const dateRegex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/;
        const { title, start, end } = formData;

        if (!title?.trim() || !dateRegex.test(start || "") || !dateRegex.test(end || "")) {
          setErrorMessage("Please enter a valid title and dates in DD/MM/YYYY format.");
          return false;
        }

        const [startDay, startMonth, startYear] = start.split("/").map(Number);
        const [endDay, endMonth, endYear] = end.split("/").map(Number);
        const startDate = new Date(startYear, startMonth - 1, startDay);
        const endDate = new Date(endYear, endMonth - 1, endDay);

        if (startDate > endDate) {
          setErrorMessage("End date cannot be before start date.");
          return false;
        }

        return true;
      }

      default:
        return true;
    }
  };

  const escapeQR = (val = "") =>
    val.replace(/([;,:\\"])/g, "\\$1");


  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    if (!day || !month || !year) return "";
    return `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`;
  };

  const getQRValue = () => {
    switch (qrType) {
      case "URL":
      case "Text":
        return formData.data || "";
      case "Email":
        return `mailto:${escapeQR(formData.email)}?subject=${encodeURIComponent(formData.subject || "")}&body=${encodeURIComponent(formData.body || "")}`;
      case "Phone":
        return `MECARD:N:${escapeQR(formData.contactName)};TEL:${escapeQR(formData.phone)};;`;
      case "WiFi": {
        const { ssid, encryption = "WPA", password = "", hidden = false } = formData;
        const escapedSSID = escapeQR(ssid);
        const escapedPassword = escapeQR(password);
        const hiddenFlag = hidden ? "true" : "false";

        return `WIFI:T:${encryption};S:${escapedSSID};P:${escapedPassword};H:${hiddenFlag};;`;
      }
      case "Event": {
        const formatDate = (dateStr) => {
          const [day, month, year] = dateStr.split("/");
          return `${year}${month.padStart(2, "0")}${day.padStart(2, "0")}T000000`;
        };
        return `BEGIN:VEVENT\nSUMMARY:${escapeQR(formData.title)}\nDTSTART:${formatDate(formData.start)}\nDTEND:${formatDate(formData.end)}\nLOCATION:${escapeQR(formData.location)}\nDESCRIPTION:${escapeQR(formData.description)}\nEND:VEVENT`;
      }
      default:
        return "";
    }
  };


  const handleCreateQRCode = () => {
    if (!validateInput()) return;

    setErrorMessage("");
    setLoading(true);
    setShowToast(true);

    // Show QR after 1s loading
    setTimeout(() => {
      setShowQR(true);
      setLoading(false);
    }, 1000);

    // Redirect after 5 seconds
    setTimeout(() => {
      navigate("/success", { state: { qrValue: getQRValue() } });
    }, 5000);

    // ✅ Call the save function
    saveQRCodeToDB();
  };

  const saveQRCodeToDB = async () => {
    try {
      const response = await fetch(`${API_URL.BASE_URL}/create-qr`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          type: qrType,
          data: getQRValue(), // ✅ must match backend expectations
        }),
      });

      if (!response.ok) throw new Error("Failed to save QR code.");

      console.log("QR code saved successfully.");
    } catch (err) {
      console.error(err.message);
    }
  };



  const renderInput = (label, placeholder, value, key, type = "text") => (
    <Form.Group controlId={key}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
        className="p-3 rounded-3 shadow-sm border-0"
      />
    </Form.Group>
  );

  const renderTextarea = (label, placeholder, value, key) => (
    <Form.Group controlId={key}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="textarea"
        placeholder={placeholder}
        value={value || ""}
        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
        className="p-3 rounded-3 shadow-sm border-0"
      />
    </Form.Group>
  );

  const renderInputFields = () => {
    switch (qrType) {
      case "WiFi":
        return (
          <>
            {renderInput("SSID", "Enter WiFi SSID", formData.ssid, "ssid")}
            <Form.Label>Encryption</Form.Label>
            <Form.Control
              as="select"
              value={formData.encryption || "WPA"}
              onChange={(e) => setFormData({ ...formData, encryption: e.target.value })}
              className="p-3 rounded-3 shadow-sm border-0"
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">None</option>
            </Form.Control>
            {renderInput("Password", "Enter Password", formData.password, "password")}
            <Form.Check
              type="checkbox"
              label="Hidden Network"
              checked={formData.hidden || false}
              onChange={(e) => setFormData({ ...formData, hidden: e.target.checked })}
              className="mt-2"
            />
          </>
        );
      case "Email":
        return (
          <>
            {renderInput("Email Address", "Enter email", formData.email, "email")}
            {renderInput("Subject", "Enter subject", formData.subject, "subject")}
            {renderTextarea("Body", "Enter email body", formData.body, "body")}
          </>
        );
      case "Phone":
        return (
          <>
            {renderInput("Contact Name", "Enter name", formData.contactName, "contactName")}
            {renderInput("Phone Number", "Enter number", formData.phone, "phone")}
          </>
        );
      case "Event":
        return (
          <>
            {renderInput("Event Title", "Enter title", formData.title, "title")}
            {renderInput("Location", "Enter location", formData.location, "location")}
            {renderInput("Start Date (DD/MM/YYYY)", "", formData.start, "start")}
            {renderInput("End Date (DD/MM/YYYY)", "", formData.end, "end")}
            {renderTextarea("Description", "Event description", formData.description, "description")}
          </>
        );
      default:
        return renderInput(`${qrType} Data`, `Enter ${qrType} data`, formData.data, "data");
    }
  };

  return (
    <>
      <Navbar />
      <motion.div className="container py-5">
        <Row className="justify-content-center">
          {/* Left - Options */}
          <Col xs={12} md={6} lg={5} className="mb-4">
            <Card className="rounded-4 shadow-lg border-0 p-4 bg-light">
              <Card.Body>
                <h2 className="text-center mb-5 text-primary">Create Your QR Code</h2>
                <Row className="mb-4">
                  {qrTypes.map((type) => (
                    <Col xs={6} sm={4} md={3} key={type} className="mb-2">
                      <Button
                        variant={qrType === type ? "primary" : "outline-primary"}
                        onClick={() => {
                          setQrType(type);
                          setFormData({});
                          setErrorMessage("");
                          setShowQR(false);
                        }}
                        className="w-100 py-2"
                      >
                        {type}
                      </Button>
                    </Col>
                  ))}
                </Row>
                {renderInputFields()}
                {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
                <Button className="w-100 mt-4 py-3" onClick={handleCreateQRCode}>
                  Generate QR
                </Button>
                <Button className="w-100 mt-4 py-3" variant="outline-dark" onClick={() => navigate("/dashboard")}>
                  <ArrowLeftCircle className="me-2" size={18} />
                  Go back to Dashboard
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Right - Preview */}
          <Col xs={12} md={6} lg={5} className="d-flex align-items-center justify-content-center">
            <motion.div
              className="qr-preview w-100 text-center"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              style={{
                minHeight: "300px",
                backgroundColor: "#f8fafc",
                borderRadius: "16px",
                padding: "2rem",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              }}
            >
              {loading ? (
                <Spinner animation="border" variant="primary" />
              ) : showQR ? (
                <QRCodeCanvas
                  value={getQRValue()}
                  size={256}
                  bgColor={"#ffffff"}
                  fgColor={"#333"}
                  level="H"
                  renderAs="canvas"
                />
              ) : (
                <div className="text-muted">
                  <p className="fw-bold">QR Code Preview</p>
                  <p>Your QR code will appear here once generated.</p>
                </div>
              )}
            </motion.div>
          </Col>
        </Row>
      </motion.div>
      <ToastContainer position="bottom-end" className="p-4">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={5000}
          autohide
          bg="info"
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Redirecting...</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            You will be redirected to the success page in 5 seconds.
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <Footer />
    </>
  );
};

export default QRGenerator;
