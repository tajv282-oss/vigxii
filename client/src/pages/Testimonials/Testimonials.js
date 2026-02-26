import React, { useState, useEffect } from 'react';
import PageTransition from '../../components/PageTransition';
import PageHero from '../../components/PageHero/PageHero';
import SectionCTA from '../../components/SectionCTA/SectionCTA';
import { FadeIn } from '../../components/Animations';
import { IoStarSharp } from 'react-icons/io5';
import { fetchTestimonials } from '../../services/api';
import './Testimonials.css';

const staticTestimonials = [
  {
    quote: "VIGXII Visuals captured our wedding day with such artistry and elegance. Every photograph feels like a piece of fine art. They didn't just document our day — they immortalized it. We are forever grateful.",
    name: 'Priya & Arjun Kapoor',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    event: 'Destination Wedding, Udaipur',
    rating: 5,
  },
  {
    quote: "The level of professionalism and creative vision is unmatched. Our pre-wedding film looks like it belongs in a cinema. Absolutely breathtaking work that we will treasure forever.",
    name: 'Meera & Rohan Sharma',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    event: 'Pre-Wedding, Santorini',
    rating: 5,
  },
  {
    quote: "Working with VIGXII for our fashion campaign was an incredible experience. The editorial quality of each shot exceeded all our expectations. Pure perfection in every frame.",
    name: 'Ananya Sinha',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    event: 'Fashion Editorial, Mumbai',
    rating: 5,
  },
  {
    quote: "From start to finish, the VIGXII team delivered luxury-level service. The images from our corporate event are stunning and truly capture the essence of our brand's identity.",
    name: 'Vikram Mehta',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    event: 'Corporate Gala, Delhi',
    rating: 5,
  },
  {
    quote: "The commercial shoot for our luxury watch brand was flawless. VIGXII understood the aesthetic we were going for immediately and delivered images that elevated our entire campaign.",
    name: 'Rahul Desai',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    event: 'Product Campaign',
    rating: 5,
  },
  {
    quote: "Our wedding film brought tears to everyone's eyes. The cinematography, music selection, and storytelling were beyond what we could have imagined. This is art, not just videography.",
    name: 'Nisha & Aditya Patel',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
    event: 'Grand Wedding, Jaipur',
    rating: 5,
  },
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(staticTestimonials);

  useEffect(() => {
    fetchTestimonials()
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data.map(t => ({
            quote: t.quote,
            name: t.clientName,
            image: t.clientImage?.url || '',
            event: t.event || '',
            rating: t.rating || 5,
          })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <PageTransition>
      <PageHero
        title="Testimonials"
        subtitle="Words from our valued clients"
        backgroundImage="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=80"
      />

      <section className="testimonials section-padding">
        <div className="container">
          <div className="testimonials__grid">
            {testimonials.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="testimonials__card">
                  <div className="testimonials__quote-mark">"</div>
                  <p className="testimonials__quote">{item.quote}</p>

                  <div className="testimonials__stars">
                    {[...Array(item.rating)].map((_, idx) => (
                      <IoStarSharp key={idx} />
                    ))}
                  </div>

                  <div className="testimonials__client">
                    <img src={item.image} alt={item.name} className="testimonials__avatar" />
                    <div>
                      <h4 className="testimonials__name">{item.name}</h4>
                      <span className="testimonials__event">{item.event}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionCTA />
    </PageTransition>
  );
};

export default Testimonials;
