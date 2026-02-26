import React from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';
import PageHero from '../../components/PageHero/PageHero';
import SectionCTA from '../../components/SectionCTA/SectionCTA';
import { FadeIn } from '../../components/Animations';
import './Services.css';

const services = [
  {
    title: 'Wedding Photography',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
    description: 'We capture the essence of your love story with an editorial, luxury approach. Every frame is meticulously crafted to preserve the emotions, grandeur, and intimate moments of your wedding day.',
    includes: ['Full-day coverage', 'Second photographer', 'Engagement session', 'Premium album', 'Online gallery', 'High-resolution images', 'Print rights'],
    dark: false,
  },
  {
    title: 'Cinematic Films',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80',
    description: 'Our cinematic films are crafted with a storytelling approach that rivals Hollywood productions. Using state-of-the-art equipment and artistic direction, we create films that move and inspire.',
    includes: ['Feature film (8-12 min)', 'Highlight reel (3-5 min)', 'Teaser trailer', 'Drone footage', 'Color grading', 'Licensed music', 'Same-day edit'],
    dark: true,
  },
  {
    title: 'Commercial Shoots',
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&q=80',
    description: 'Elevate your brand with our high-end commercial photography. We bring creative direction, meticulous styling, and technical precision to every product and campaign shoot.',
    includes: ['Creative consultation', 'Art direction', 'Product photography', 'Lifestyle imagery', 'Post-production', 'Multi-platform assets', 'Commercial license'],
    dark: false,
  },
  {
    title: 'Fashion Photography',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=80',
    description: 'Our fashion photography embodies the Vogue editorial aesthetic — bold, refined, and impossibly chic. We collaborate with designers, stylists, and models to create striking visual narratives.',
    includes: ['Editorial shoots', 'Lookbook creation', 'Model portfolio', 'Beauty & close-up', 'Studio & location', 'Retouching & grading', 'Digital delivery'],
    dark: true,
  },
  {
    title: 'Event Coverage',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
    description: 'From corporate galas to exclusive soirées, we provide comprehensive event photography that captures the atmosphere, energy, and key moments with sophistication.',
    includes: ['Full-event coverage', 'Candid & posed shots', 'Same-day highlights', 'Social media assets', 'Quick turnaround', 'Multiple photographers', 'Online gallery'],
    dark: false,
  },
];

const Services = () => {
  return (
    <PageTransition>
      <PageHero
        title="Services"
        subtitle="Premium visual experiences tailored for you"
        backgroundImage="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1920&q=80"
      />

      {services.map((service, i) => (
        <section
          key={service.title}
          className={`service-section ${service.dark ? 'service-section--dark' : ''}`}
        >
          <div className="container">
            <div className={`service-section__grid ${i % 2 !== 0 ? 'service-section__grid--reverse' : ''}`}>
              <FadeIn direction={i % 2 === 0 ? 'left' : 'right'} className="service-section__image-wrap">
                <img src={service.image} alt={service.title} />
              </FadeIn>

              <FadeIn direction={i % 2 === 0 ? 'right' : 'left'} className="service-section__content">
                <h2 className="service-section__title">{service.title}</h2>
                <div className={service.dark ? 'gold-divider-left' : 'gold-divider-left'}></div>
                <p className="service-section__desc">{service.description}</p>

                <div className="service-section__includes">
                  <h4 className="service-section__includes-title">What's Included</h4>
                  <ul>
                    {service.includes.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/contact"
                  className={service.dark ? 'btn-outline' : 'btn-outline-dark'}
                  style={{ marginTop: '24px' }}
                >
                  Inquire Now
                </Link>
              </FadeIn>
            </div>
          </div>
        </section>
      ))}

      <SectionCTA />
    </PageTransition>
  );
};

export default Services;
