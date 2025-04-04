import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../assets/css/style.css";

const SignUpContainer = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        // Trim spaces and ensure fields are not empty
        if (!formData.firstName.trim() || !formData.lastName.trim()) {
            setMessage("❌ First name and last name are required.");
            return false;
        }

        // Only allow letters (no special characters or numbers) for name fields
        const nameRegex = /^[A-Za-z]+$/;
        if (!nameRegex.test(formData.firstName) || !nameRegex.test(formData.lastName)) {
            setMessage("❌ Names should only contain letters with no special characters or numbers.");
            return false;
        }

        // Validate email format using a regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setMessage("❌ Please enter a valid email address.");
            return false;
        }

        // Validate password length and complexity: at least 6 characters, one uppercase, one lowercase, and one number
        if (formData.password.length < 6) {
            setMessage("❌ Password must be at least 6 characters long.");
            return false;
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
        if (!passwordRegex.test(formData.password)) {
            setMessage("❌ Password must contain at least one uppercase letter, one lowercase letter, and one number.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Run validation before sending data
        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("✅ Registration Successful!");
                setFormData({ firstName: "", lastName: "", email: "", password: "" });
            } else {
                setMessage(`❌ ${data.message}`);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setMessage("❌ Something went wrong with the request.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-12">
                        <div className="card shadow-lg">
                            <div className="card-body p-5">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h1 className="mb-4">The best way to Generate variety QR</h1>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        </p>
                                        <img src="https://play-lh.googleusercontent.com/VTWbnVfTYtIyysxRFHgJTimJbIhCClj2ke8HsIqbSLBpBVi2FBcHX9RohLHl18LShw=w480-h960-rw" className="w-50 h-60 rounded mx-auto d-block" alt="" />
                                    </div>
                                    <div className="col-md-6">
                                        <h2 className="card-title text-center mb-4">Sign Up & Start Your Free Trial</h2>
                                        {message && <p className="alert alert-info">{message}</p>}
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="firstName" className="form-label">First Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="firstName"
                                                    name="firstName"
                                                    required
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="lastName"
                                                    name="lastName"
                                                    required
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                />
                                            </div>
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
                                            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                                        </form>
                                        <div className="text-center mt-3">
                                            <span>
                                                Already have an account? <a href="/login" className="text-primary">Login here</a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12">
                        <h3 className="text-center mb-4">What Our Users Say</h3>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                                <p className="card-text">
                                    "This platform has significantly streamlined our operations, making QR code generation quick and simple!"
                                </p>
                                <footer className="blockquote-footer">John Doe <cite title="Company Name">Company Inc.</cite></footer>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                                <p className="card-text">
                                    "Absolutely love the intuitive design and how easy it is to create and manage QR codes on the fly!"
                                </p>
                                <footer className="blockquote-footer">Jane Smith <cite title="Freelancer">Freelancer</cite></footer>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                                <p className="card-text">
                                    "Great features and excellent customer support. Highly recommended for businesses of all sizes."
                                </p>
                                <footer className="blockquote-footer">Alice Johnson <cite title="Tech Solutions">Tech Solutions</cite></footer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SignUpContainer;
