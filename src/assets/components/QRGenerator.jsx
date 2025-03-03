import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react"; 

const QRGenerator = () => {
  const [qrData, setQrData] = useState("https://example.com");
  const [qrType, setQrType] = useState("URL");
  const qrRef = useRef(null);

  const qrTypes = ["URL", "Text", "Email", "Phone", "WiFi", "Event"];

  // Function to download the QR code
  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.href = image;
    link.download = "QRCode.png";
    link.click();
  };

  return (
    <div className="qr-generator">
      <h2>Create Your QR Code</h2>
      
      <div className="qr-types">
        {qrTypes.map((type) => (
          <button 
            key={type} 
            className={qrType === type ? "active" : ""}
            onClick={() => setQrType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <h3>Selected Type: {qrType}</h3>

      <div className="qr-preview" ref={qrRef}>
        <QRCodeCanvas value={qrData} size={200} />
        <input
          type="text"
          placeholder={`Enter ${qrType} data`}
          onChange={(e) => setQrData(e.target.value)}
        />
        <button onClick={downloadQRCode}>Download QR</button>
      </div>
    </div>
  );
};

export default QRGenerator;
