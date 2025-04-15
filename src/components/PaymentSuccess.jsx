import React from "react";
import { Container, Button, Card } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
    const navigate = useNavigate();

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Card className="text-center shadow-lg p-5" style={{ maxWidth: "500px" }}>
                <div className="text-center mb-4">
                    <FaCheckCircle size={80} color="green" />
                </div>
                <h2 className="mb-3">Payment Successful!</h2>
                <p className="text-muted mb-4">Thank you for your donation. Your support means a lot to us!</p>
                <Button variant="success" onClick={() => navigate("/")}>
                    Go to Home
                </Button>
            </Card>
        </Container>
    );
};

export default PaymentSuccess;
