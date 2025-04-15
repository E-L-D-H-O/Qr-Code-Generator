import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../assets/css/style.css";
import qrSignUP from "../assets/images/qrSignUP.jpg";
import { API_URL } from "../common/constants";

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
        if (!formData.firstName.trim() || !formData.lastName.trim()) {
            setMessage("❌ First name and last name are required.");
            return false;
        }
        const nameRegex = /^[A-Za-z]+$/;
        if (!nameRegex.test(formData.firstName) || !nameRegex.test(formData.lastName)) {
            setMessage("❌ Names should only contain letters with no special characters or numbers.");
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setMessage("❌ Please enter a valid email address.");
            return false;
        }
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

        if (!validateForm()) return;

        try {
            const response = await fetch(`${API_URL.BASE_URL}/signup`, {
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
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-10">
                        <div className="card shadow border-0">
                            <div className="row g-0">
                                <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
                                    <h1 className="mb-3 fw-bold text-dark">Start Generating Beautiful QR Codes</h1>
                                    <p className="text-muted">
                                        Create and manage dynamic QR codes. Perfect for marketing, events, menus, and more.
                                    </p>
                                    <img
                                        src={qrSignUP}
                                        className="img-fluid rounded mt-4 shadow-sm"
                                        alt="QR Preview"
                                    />
                                </div>
                                <div className="col-md-6 bg-light p-5">
                                    <h2 className="text-center fw-semibold mb-4">Create Your Free Account</h2>
                                    {message && (
                                        <div className={`alert ${message.startsWith("✅") ? "alert-success" : "alert-danger"}`} role="alert">
                                            {message}
                                        </div>
                                    )}
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
                                        <button type="submit" className="btn btn-primary w-100 py-2">Sign Up</button>
                                    </form>
                                    <div className="text-center mt-3">
                                        <small>
                                            Already have an account?{" "}
                                            <a href="/login" className="text-decoration-none text-primary fw-semibold">Login here</a>
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonials */}
                <div className="row mt-5">
                    <div className="col-12">
                        <section className="testimonials">
                            <h2 className="section-title text-center mb-4">What Our Customers Say</h2>
                            <div className="row g-4">
                                {[
                                    {
                                        initials: "SB",
                                        name: "Sarah Blackwood",
                                        title: "Marketing Director, TechCorp",
                                        text: "QRify has transformed how we connect with our customers. The custom QR codes with our logo get a much higher scan rate than standard ones.",
                                    },
                                    {
                                        initials: "JL",
                                        name: "James Lee",
                                        title: "Owner, Fusion Kitchen",
                                        text: "We use QRify for our restaurant menus and love the analytics feature. Now we know which menu items get the most views!",
                                    },
                                    {
                                        initials: "AP",
                                        name: "Alicia Patel",
                                        title: "Event Manager, Eventify",
                                        text: "The ability to update our QR codes without reprinting has saved us thousands in marketing materials. Excellent service!",
                                    },
                                ].map((testimonial, idx) => (
                                    <div key={idx} className="col-md-4">
                                        <div className="card h-100 border-0 shadow-sm">
                                            <div className="card-body">
                                                <p className="card-text text-muted">{testimonial.text}</p>
                                                <div className="d-flex align-items-center mt-3">
                                                    <div className="rounded-circle bg-primary text-white fw-bold d-flex align-items-center justify-content-center" style={{ width: "40px", height: "40px" }}>
                                                        {testimonial.initials}
                                                    </div>
                                                    <div className="ms-3">
                                                        <h6 className="mb-0">{testimonial.name}</h6>
                                                        <small className="text-muted">{testimonial.title}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SignUpContainer;
