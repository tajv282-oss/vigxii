import React from 'react';
import { Link } from 'react-router-dom';
import { FadeIn } from '../../../components/Animations';
import './AboutPreview.css';

const AboutPreview = () => {
  return (
    <section className="about-preview section-padding">
      <div className="container">
        <div className="about-preview__grid">
          <FadeIn direction="left" className="about-preview__image-wrap">
            <img
              src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80"
              alt="VIGXII Founder"
            />
          </FadeIn>

          <FadeIn direction="right" className="about-preview__content">
            <p className="about-preview__label">About Us</p>
            <h2>The Art of Visual Storytelling</h2>
            <div className="gold-divider-left"></div>
            <p className="about-preview__text">
              At VIGXII Visuals Co., we believe that every moment holds a story worth
              preserving. With an editorial eye for detail and a cinematic approach to
              storytelling, we craft visual narratives that transcend time. Our work is
              driven by passion, precision, and an unwavering commitment to excellence.
            </p>
            <p className="about-preview__text">
              From intimate weddings to high-fashion editorials, we bring a luxury
              aesthetic to every frame we capture.
            </p>
            <Link to="/about" className="btn-outline-dark" style={{ marginTop: '16px' }}>
              Learn More
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
