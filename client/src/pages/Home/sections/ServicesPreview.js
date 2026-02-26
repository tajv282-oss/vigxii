import React from 'react';
import { FadeIn } from '../../../components/Animations';
import { IoCameraOutline, IoVideocamOutline, IoBriefcaseOutline, IoShirtOutline, IoCalendarOutline } from 'react-icons/io5';
import './ServicesPreview.css';

const services = [
  { icon: <IoCameraOutline />, title: 'Wedding Photography', desc: 'Timeless wedding stories captured with an editorial eye for every precious moment.' },
  { icon: <IoVideocamOutline />, title: 'Cinematic Films', desc: 'Luxury wedding films and cinematic reels that bring your story to life on screen.' },
  { icon: <IoBriefcaseOutline />, title: 'Commercial Shoots', desc: 'High-end product and brand photography for campaigns that demand excellence.' },
  { icon: <IoShirtOutline />, title: 'Fashion Photography', desc: 'Editorial fashion photography with a refined, magazine-worthy aesthetic.' },
  { icon: <IoCalendarOutline />, title: 'Event Coverage', desc: 'Complete event documentation with a discreet, professional approach.' },
];

const ServicesPreview = () => {
  return (
    <section className="services-preview section-padding">
      <div className="container">
        <FadeIn>
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <p className="services-preview__label">What We Offer</p>
            <h2>Our Services</h2>
            <div className="gold-divider"></div>
          </div>
        </FadeIn>

        <div className="services-preview__grid">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={i * 0.1}>
              <div className="services-preview__card">
                <div className="services-preview__icon">{service.icon}</div>
                <h3 className="services-preview__title">{service.title}</h3>
                <p className="services-preview__desc">{service.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
