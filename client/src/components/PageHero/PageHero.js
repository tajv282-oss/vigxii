import React from 'react';
import './PageHero.css';

const PageHero = ({ title, subtitle, backgroundImage }) => {
  return (
    <section
      className="page-hero"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      <div className="page-hero__overlay"></div>
      <div className="page-hero__content">
        <h1 className="page-hero__title">{title}</h1>
        {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}
        <div className="gold-divider"></div>
      </div>
    </section>
  );
};

export default PageHero;
