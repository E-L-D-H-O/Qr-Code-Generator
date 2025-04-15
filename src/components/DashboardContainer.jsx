import React, { useEffect, useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';
import "../assets/css/dashboard.css";
import Navbar from './Navbar';
import Footer from './Footer';
import { API_URL } from '../common/constants';

const DashboardContainer = () => {
    const navigate = useNavigate();
    const [qrCodes, setQrCodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchQRCodes = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL.BASE_URL}/my-qrcodes`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (response.ok) {
                // Generate image URLs for all QR data
                const qrWithImages = await Promise.all(
                    data.qrcodes.map(async (qr) => {
                        const imageUrl = await QRCode.toDataURL(qr.data);
                        return { ...qr, imageUrl };
                    })
                );
                setQrCodes(qrWithImages);
            } else {
                setError(data.message || "Failed to load QR codes.");
            }
        } catch (err) {
            setError("Something went wrong while fetching QR codes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQRCodes();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container qr-container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold">Your QR Codes</h2>
                    <button
                        className="btn btn-primary btn-lg create-qr-btn"
                        onClick={() => navigate('/createqr')}
                    >
                        ➕ Create QR Code
                    </button>
                </div>

                {loading ? (
                    <p>Loading your QR codes...</p>
                ) : error ? (
                    <div className="alert alert-danger">{error}</div>
                ) : qrCodes.length === 0 ? (
                    <div className="alert alert-info">No QR codes found. Click "Create QR Code" to get started!</div>
                ) : (
                    <div className="row g-4">
                        {qrCodes.map((qr, idx) => (
                            <div className="col-md-4" key={idx}>
                                <div className="qr-card">
                                    <div className="qr-preview-img">
                                        <img
                                            src={qr.imageUrl}
                                            alt={`QR code for ${qr.type}`}
                                        />
                                    </div>
                                    <div className=''>
                                        <div className="mt-2">
                                            <p><strong>Type:</strong> {qr.type}</p>
                                            <p><strong>Created:</strong> {new Date(qr.createdAt).toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-3d"
                                        onClick={() => {
                                            const link = document.createElement("a");
                                            link.href = qr.imageUrl;
                                            link.download = `qr-${qr._id || idx}.png`;
                                            link.click();
                                        }}
                                    >
                                        Download
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default DashboardContainer;
