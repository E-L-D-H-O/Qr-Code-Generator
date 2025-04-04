import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../assets/css/style.css";

const LoginContainer = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email.trim() || !formData.password.trim()) {
            setMessage("❌ Please enter both email and password.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                setMessage("✅ Login successful!");

                // Store user data & token in localStorage
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify({ firstName: data.firstName, email: formData.email }));

                navigate("/dashboard");
            } else {
                setMessage(`❌ ${data.message || "Invalid login credentials"}`);
            }
        } catch (error) {
            console.error("Login error:", error);
            setMessage("❌ Something went wrong with the login request.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow-lg">
                            <div className="card-body p-5">
                                <h2 className="card-title text-center mb-4">Login</h2>
                                {message && <p className="alert alert-info">{message}</p>}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100">Login</button>
                                </form>
                                <div className="text-center mt-3">
                                    <span>Don't have an account? <a href="/signup" className="text-primary">Sign up here</a></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default LoginContainer;
