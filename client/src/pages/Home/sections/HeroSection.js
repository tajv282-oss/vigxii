import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero">
      {/* Video Background */}
      <div className="hero__video-wrap">
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          poster="https://res.cloudinary.com/dfz2eygsp/image/upload/v1772084101/vigxii/projects/qefrneovkow7ni1jbbdr.jpg"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-a-couple-walking-on-the-beach-at-sunset-1573/1080p.mp4"
            type="video/mp4"
          />
        </video>
        <div className="hero__overlay"></div>
      </div>

      {/* Content */}
      <div className="hero__content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="hero__pre-title">Premium Photography & Films</p>
        </motion.div>

        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          VIGXII VISUALS CO.
        </motion.h1>

        <motion.div
          className="hero__gold-line"
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        ></motion.div>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          Capturing Stories. Creating Legacy.
        </motion.p>

        <motion.div
          className="hero__buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <Link to="/portfolio" className="btn-outline">View Portfolio</Link>
          <Link to="/contact" className="btn-outline">Book Now</Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <span>Scroll</span>
        <div className="hero__scroll-line"></div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
