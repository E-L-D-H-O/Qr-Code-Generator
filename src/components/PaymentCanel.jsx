import React from "react";
import { Container, Button, Card } from "react-bootstrap";
import { FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
    const navigate = useNavigate();

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Card className="text-center shadow-lg p-5" style={{ maxWidth: "500px" }}>
                <div className="text-center mb-4">
                    <FaTimesCircle size={80} color="red" className="mb-4" />
                </div>
                <h2 className="mb-3">Payment Cancelled</h2>
                <p className="text-muted mb-4">It looks like the payment didn't go through. Feel free to try again!</p>
                <Button variant="danger" onClick={() => navigate("/dashboard")}>
                    Back to Home
                </Button>
            </Card>
        </Container>
    );
};

export default PaymentCancel;
