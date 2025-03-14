import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const LandingContainer = () => {
    return (
        <>
            <Navbar />
            <section class="hero">
                <div class="hero-content">
                    <h1>Create Beautiful QR Codes in Seconds</h1>
                    <p>Generate custom, high-quality QR codes for your business, products, events, and more with our easy-to-use
                        platform.</p>
                    <a href="/login" class="btn">Create Your QR Code Now</a>
                </div>
                <div class="hero-image">
                    <img src="/api/placeholder/400/320" alt="QR Code Example" />
                </div>
            </section>

            <section id="features" class="features">
                <h2 class="section-title">Why Choose Us?</h2>
                <div class="features-grid">
                    <div class="feature-card">
                        <div class="feature-icon">✨</div>
                        <h3>Beautiful Design</h3>
                        <p>Create eye-catching QR codes with customizable colors, logos, and designs that match your brand
                            identity.</p>
                    </div>

                    <div class="feature-card">
                        <div class="feature-icon">🔄</div>
                        <h3>Dynamic QR Codes</h3>
                        <p>Update your QR code content anytime without having to reprint or redistribute your codes.</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">📱</div>
                        <h3>Mobile Optimized</h3>
                        <p>All QR codes are tested and optimized for perfect scanning on any mobile device.</p>
                    </div>
                </div>
            </section>

            <section id="examples" class="examples">
                <h2 class="section-title">QR Code Examples</h2>
                <div class="examples-grid">
                    <div class="example-card">
                        <img src="/api/placeholder/250/250" alt="Business Card QR" />
                        <h3>Business Card</h3>
                        <p>Share contact info instantly</p>
                    </div>
                    <div class="example-card">
                        <img src="/api/placeholder/250/250" alt="Menu QR" />
                        <h3>Restaurant Menu</h3>
                        <p>Contactless digital menus</p>
                    </div>
                    <div class="example-card">
                        <img src="/api/placeholder/250/250" alt="Website QR" />
                        <h3>Website Link</h3>
                        <p>Direct visitors to your site</p>
                    </div>
                    <div class="example-card">
                        <img src="/api/placeholder/250/250" alt="Event QR" />
                        <h3>Event Tickets</h3>
                        <p>Streamline check-ins</p>
                    </div>
                </div>
            </section>

            <section class="testimonials">
                <h2 class="section-title">What Our Customers Say</h2>
                <div class="testimonials-grid">
                    <div class="testimonial-card">
                        <p class="testimonial-text">QRify has transformed how we connect with our customers. The custom QR codes
                            with our logo get a much higher scan rate than standard ones.</p>
                        <div class="testimonial-author">
                            <div class="author-avatar">SB</div>
                            <div class="author-info">
                                <h4>Sarah Blackwood</h4>
                                <p>Marketing Director, TechCorp</p>
                            </div>
                        </div>
                    </div>
                    <div class="testimonial-card">
                        <p class="testimonial-text">We use QRify for our restaurant menus and love the analytics feature. Now we
                            know which menu items get the most views!</p>
                        <div class="testimonial-author">
                            <div class="author-avatar">JL</div>
                            <div class="author-info">
                                <h4>James Lee</h4>
                                <p>Owner, Fusion Kitchen</p>
                            </div>
                        </div>
                    </div>
                    <div class="testimonial-card">
                        <p class="testimonial-text">The ability to update our QR codes without reprinting has saved us thousands
                            in marketing materials. Excellent service!</p>
                        <div class="testimonial-author">
                            <div class="author-avatar">AP</div>
                            <div class="author-info">
                                <h4>Alicia Patel</h4>
                                <p>Event Manager, Eventify</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default LandingContainer;