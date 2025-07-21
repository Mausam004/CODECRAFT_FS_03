import React from "react";
import Navbar from "../components/Navbar"; // Adjust as per your folder structure
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-container">
      <Navbar />

      {/* Header */}
      <section className="contact-header">
        <h1>Let's Connect 🤝</h1>
        <p>Have a question, idea, or feedback? Drop us a message. We're always happy to help you!</p>
      </section>

      {/* Main Section */}
      <section className="contact-main">
        {/* Left - Form */}
        <div className="contact-left">
          <h2>Send a Message</h2>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Subject" />
            <textarea rows="5" placeholder="Type your message here..." required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>

        {/* Right - Info */}
        <div className="contact-right">
          <h2>Contact Info</h2>
          <ul>
            <li><strong>Email:</strong> support@shopnow.com</li>
            <li><strong>Phone:</strong> +91 98765 43210</li>
            <li><strong>Location:</strong> 123 Fashion Street, Mumbai, India</li>
          </ul>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2920/2920090.png"
            alt="Contact Illustration"
          />
        </div>
      </section>
    </div>
  );
}
