import React from "react";
import Navbar from "./assets/components/Navbar";
import QRGenerator from "./assets/components/QRGenerator";
import Footer from "./assets/components/Footer";

function App() {
  return (
    <div className="app">
      <Navbar />
      <QRGenerator />
      <Footer />
    </div>
  );
}

export default App;
