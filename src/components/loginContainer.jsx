import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../assets/css/style.css";
import { API_URL } from "../common/constants";

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
            const response = await fetch(`${API_URL.BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                setMessage("✅ Login successful!");

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
                    <div className="col-md-8 col-lg-5">
                        <div className="card shadow rounded-4 border-0">
                            <div className="card-body p-5">
                                <h2 className="card-title text-center mb-4 fw-bold">Welcome Back 👋</h2>
                                <p className="text-center text-muted mb-4">Login to your account to continue</p>
                                {message && <p className="alert alert-info text-center fw-semibold">{message}</p>}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                                        <input
                                            type="email"
                                            className="form-control rounded-3 p-3"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="password" className="form-label fw-semibold">Password</label>
                                        <input
                                            type="password"
                                            className="form-control rounded-3 p-3"
                                            id="password"
                                            name="password"
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Enter your password"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100 py-3 fw-semibold rounded-3">Login</button>
                                </form>
                                <div className="text-center mt-4">
                                    <span className="text-muted">Don't have an account? <a href="/signup" className="text-decoration-none text-primary fw-medium">Sign up here</a></span>
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
