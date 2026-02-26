import React, { useState, useEffect } from 'react';
import { FadeIn } from '../../../components/Animations';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { fetchTestimonials } from '../../../services/api';
import './TestimonialSlider.css';

const staticTestimonials = [
  {
    quote: "VIGXII Visuals captured our wedding day with such artistry and elegance. Every photograph feels like a piece of fine art. They didn't just document our day — they immortalized it.",
    name: 'Priya & Arjun',
    event: 'Wedding',
  },
  {
    quote: "The level of professionalism and creative vision is unmatched. Our pre-wedding film looks like it belongs in a cinema. Absolutely breathtaking work.",
    name: 'Meera & Rohan',
    event: 'Pre-Wedding Film',
  },
  {
    quote: "Working with VIGXII for our fashion campaign was an incredible experience. The editorial quality of each shot exceeded all our expectations.",
    name: 'Ananya S.',
    event: 'Fashion Editorial',
  },
  {
    quote: "From start to finish, the VIGXII team delivered luxury-level service. The images from our corporate event are stunning and truly capture the essence of our brand.",
    name: 'Vikram M.',
    event: 'Corporate Event',
  },
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);
  const [testimonials, setTestimonials] = useState(staticTestimonials);

  useEffect(() => {
    fetchTestimonials()
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data.map(t => ({
            quote: t.quote,
            name: t.clientName,
            event: t.event || '',
          })));
        }
      })
      .catch(() => {});
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="testimonial-slider section-padding">
      <div className="container">
        <FadeIn>
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <p className="testimonial-slider__label">Testimonials</p>
            <h2>What Our Clients Say</h2>
            <div className="gold-divider"></div>
          </div>
        </FadeIn>

        <div className="testimonial-slider__wrap">
          <button className="testimonial-slider__arrow" onClick={prev} aria-label="Previous">
            <IoChevronBackOutline />
          </button>

          <div className="testimonial-slider__content">
            <div className="testimonial-slider__quote-mark">"</div>
            <p className="testimonial-slider__quote">{testimonials[current].quote}</p>
            <div className="gold-divider"></div>
            <h4 className="testimonial-slider__name">{testimonials[current].name}</h4>
            <p className="testimonial-slider__event">{testimonials[current].event}</p>
          </div>

          <button className="testimonial-slider__arrow" onClick={next} aria-label="Next">
            <IoChevronForwardOutline />
          </button>
        </div>

        <div className="testimonial-slider__dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testimonial-slider__dot ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
