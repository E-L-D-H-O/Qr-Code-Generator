import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Button, Container, Card, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { Download, ArrowLeftCircle, Grid } from "lucide-react";
import DonateButton from "./DonateButton";


const SuccessPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const qrRef = useRef();

  if (!state?.qrValue) {
    navigate("/createqr");
    return null;
  }

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "my-qr-code.png";
    link.href = url;
    link.click();
  };


  return (
    <>
      <Navbar />
      <motion.div
        className="py-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ minHeight: "80vh", background: "#f0f2f5" }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <Card className="text-center shadow-lg p-4 rounded-4 border-0">
                <h2 className="mb-4 text-success fw-bold">🎉 QR Code Generated!</h2>
                <p className="text-muted">Your QR code is ready. You can download it or create another one.</p>

                <div ref={qrRef} className="my-4 d-flex justify-content-center">
                  <QRCodeCanvas
                    value={state.qrValue}
                    size={256}
                    level="H"
                    bgColor="#ffffff"
                    fgColor="#000000"
                  />
                </div>

                <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-3">
                  <Button variant="outline-primary" onClick={handleDownload}>
                    <Download className="me-2" size={18} />
                    Download QR
                  </Button>
                  <Button variant="primary" onClick={() => navigate("/createqr")}>
                    <ArrowLeftCircle className="me-2" size={18} />
                    Create Another
                  </Button>
                  <Button variant="success" onClick={() => navigate("/dashboard")}>
                    <Grid className="me-2" size={18} />
                    Go to Dashboard
                  </Button>
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-center gap-3 mt-3">
                  <DonateButton />
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </motion.div>
      <Footer />
    </>
  );
};

export default SuccessPage;
