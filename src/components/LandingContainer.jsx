import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import DonateButton from "./DonateButton";

const LandingContainer = () => {
    return (
        <>
            <Navbar />
            <section className="hero">
                <div className="hero-content">
                    <h1>Create Beautiful QR Codes in Seconds</h1>
                    <p>Generate custom, high-quality QR codes for your business, products, events, and more with our easy-to-use
                        platform.</p>
                    <a href="/login" className="btn btn-primary">Create Your QR Code Now</a>
                </div>
                <div className="hero-image">
                    <img className="rounded w-50 " src="https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/assets/media/images/startpage/v2/hand-qrcodes.png" alt="QR Code Example" />
                </div>
            </section>

            <section id="features" className="features">
                <h2 className="section-title">Why Choose Us?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">✨</div>
                        <h3>Beautiful Design</h3>
                        <p>Create eye-catching QR codes with customizable colors, logos, and designs that match your brand
                            identity.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">🔄</div>
                        <h3>Dynamic QR Codes</h3>
                        <p>Update your QR code content anytime without having to reprint or redistribute your codes.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📱</div>
                        <h3>Mobile Optimized</h3>
                        <p>All QR codes are tested and optimized for perfect scanning on any mobile device.</p>
                    </div>
                </div>
            </section>

            <section id="examples" className="examples">
                <h2 className="section-title">QR Code Examples</h2>
                <div className="examples-grid">
                    <div className="example-card">
                        <img src="https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/assets/media/images/qr_codes_on/gallery/business-cards/v2/businesscard-03.jpg" alt="Business Card QR" />
                        <h3>Business Card</h3>
                        <p>Share contact info instantly</p>
                    </div>
                    <div className="example-card">
                        <img src="https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/assets/media/images/qr_codes_on/gallery/flyers/v2/flyer-03.jpg" alt="Menu QR" />
                        <h3>Restaurant Menu</h3>
                        <p>Contactless digital menus</p>
                    </div>
                    <div className="example-card">
                        <img src="https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/assets/media/images/qr_codes_on/gallery/websites/v2/website-03.jpg" alt="Website QR" />
                        <h3>Website Link</h3>
                        <p>Direct visitors to your site</p>
                    </div>
                    <div className="example-card">
                        <img src="https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/assets/media/images/qr_codes_on/gallery/tickets/v2/ticket-03.jpg" alt="Event QR" />
                        <h3>Event Tickets</h3>
                        <p>Streamline check-ins</p>
                    </div>
                </div>
            </section>

            <section className="testimonials">
                <h2 className="section-title">What Our Customers Say</h2>
                <div className="testimonials-grid">
                    <div className="testimonial-card">
                        <p className="testimonial-text">QRify has transformed how we connect with our customers. The custom QR codes
                            with our logo get a much higher scan rate than standard ones.</p>
                        <div className="testimonial-author">
                            <div className="author-avatar">SB</div>
                            <div className="author-info">
                                <h4>Sarah Blackwood</h4>
                                <p>Marketing Director, TechCorp</p>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <p className="testimonial-text">We use QRify for our restaurant menus and love the analytics feature. Now we
                            know which menu items get the most views!</p>
                        <div className="testimonial-author">
                            <div className="author-avatar">JL</div>
                            <div className="author-info">
                                <h4>James Lee</h4>
                                <p>Owner, Fusion Kitchen</p>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <p className="testimonial-text">The ability to update our QR codes without reprinting has saved us thousands
                            in marketing materials. Excellent service!</p>
                        <div className="testimonial-author">
                            <div className="author-avatar">AP</div>
                            <div className="author-info">
                                <h4>Alicia Patel</h4>
                                <p>Event Manager, Eventify</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <DonateButton />
            <Footer />
        </>
    );
};

export default LandingContainer;