import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">

        {/* ===== BRAND ===== */}
        <div className="footer-brand">
          <div className="brand-logo">
            <span>F</span>
            <h2>MoM's Food HuB</h2>
          </div>

          <p>
            Delivering happiness to your doorstep. Order from the
            best restaurants and enjoy hot, fresh meals in minutes.
          </p>

          <div className="social-icons">
            <span>f</span>
            <span>𝕏</span>
            <span>📸</span>
            <span>▶</span>
          </div>
        </div>

        {/* ===== COMPANY ===== */}
        <div className="footer-column">
          <h4>Company</h4>
          <a>About Us</a>
          <a>Careers</a>
          <a>Press</a>
          <a>Blog</a>
        </div>

        {/* ===== SUPPORT ===== */}
        <div className="footer-column">
          <h4>Support</h4>
          <a>Help Center</a>
          <a>Contact Us</a>
          <a>FAQs</a>
          <a>Safety</a>
        </div>

        {/* ===== PARTNER ===== */}
        <div className="footer-column">
          <h4>Partner</h4>
          <a>Add Restaurant</a>
          <a>Become a Driver</a>
          <a>Business Account</a>
          <a>Affiliates</a>
        </div>
      </div>

      {/* ===== BOTTOM ===== */}
      <div className="footer-bottom">
        <span>© 2025 Moms Food. All rights reserved.</span>

        <div className="footer-links">
          <a>Privacy Policy</a>
          <a>Terms of Service</a>
          <a>Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
