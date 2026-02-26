import React from 'react';
import { Link } from 'react-router-dom';
import './SectionCTA.css';

const SectionCTA = () => {
  return (
    <section className="section-cta">
      <div className="container text-center">
        <h2 className="section-cta__title">Let's Create Something Timeless.</h2>
        <div className="gold-divider"></div>
        <Link to="/contact" className="btn-outline-gold" style={{ marginTop: '24px' }}>
          Contact Us
        </Link>
      </div>
    </section>
  );
};

export default SectionCTA;
