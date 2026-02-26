import React from 'react';
import { Link } from 'react-router-dom';
import { IoLogoInstagram, IoLogoYoutube, IoLogoWhatsapp } from 'react-icons/io5';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__gold-line"></div>
      <div className="container">
        <div className="footer__inner">
          <div>
            <div className="footer__logo-wrap">
              <img src="/favicon.jpg" alt="VIGXII Visuals Co." className="footer__logo-img" />
            </div>
            <div className="footer__logo">VIGXII VISUALS CO.</div>
            <p className="footer__tagline">Capturing Stories. Creating Legacy.</p>
          </div>

          <div>
            <h4 className="footer__heading">Navigate</h4>
            <div className="footer__links">
              <Link to="/">Home</Link>
              <Link to="/portfolio">Portfolio</Link>
              <Link to="/films">Films</Link>
              <Link to="/services">Services</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="footer__heading">Services</h4>
            <div className="footer__links">
              <Link to="/services">Wedding Photography</Link>
              <Link to="/services">Cinematic Films</Link>
              <Link to="/services">Commercial Shoots</Link>
              <Link to="/services">Fashion Photography</Link>
              <Link to="/services">Event Coverage</Link>
            </div>
          </div>

          <div className="footer__contact">
            <h4 className="footer__heading">Get in Touch</h4>
            <p>hello@vigxii.com</p>
            <p><a href="tel:+918591126687" style={{ color: 'inherit', textDecoration: 'none' }}>+91 85911 26687</a></p>
            <p>Mumbai, India</p>
            <div className="footer__socials">
              <a href="https://www.instagram.com/vigxiivisuals?igsh=OTY0YWVmNjlrbXFj" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><IoLogoInstagram /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><IoLogoYoutube /></a>
              <a href="https://wa.me/918591126687" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><IoLogoWhatsapp /></a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__bottom-line"></div>
          <p>&copy; {new Date().getFullYear()} VIGXII Visuals Co. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
