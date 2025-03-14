import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../assets/css/style.css'; // Ensure custom styles don't conflict with Bootstrap

const LoginContainer = () => {
    return (
        <>
            <Navbar />
            <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center"> {/* Full width container with vertical centering */}
                <div className="row m-0">
                    <div className="col-lg-6 p-5 bg-primary text-white d-flex flex-column justify-content-center"> {/* Stylish sidebar with padding and centering */}
                        <h1>Welcome Back!</h1>
                        <p>Login and start generating QR codes instantly.</p>
                    </div>

                    <div className="col-lg-6 p-5 d-flex flex-column justify-content-center">
                        <h2 className="text-center mb-4">Login</h2>
                        <form action="" method="POST">
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" name="email" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name="password" required />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </form>
                        <div className="text-center mt-3">
                            <span>Don't have an account? <a href="/signUp" className="text-primary">Sign up here</a></span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default LoginContainer;
