import React, { useState } from 'react';
import PageTransition from '../../components/PageTransition';
import PageHero from '../../components/PageHero/PageHero';
import { FadeIn } from '../../components/Animations';
import { IoLocationOutline, IoCallOutline, IoMailOutline, IoLogoInstagram } from 'react-icons/io5';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: '',
    eventDate: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (data) => {
    const e = {};
    if (!data.name.trim()) {
      e.name = 'Full name is required.';
    } else if (data.name.trim().length < 2) {
      e.name = 'Name must be at least 2 characters.';
    }

    if (!data.phone.trim()) {
      e.phone = 'Phone number is required.';
    } else if (!/^[+]?[0-9\s\-().]{7,15}$/.test(data.phone.trim())) {
      e.phone = 'Enter a valid phone number.';
    }

    if (!data.eventType) {
      e.eventType = 'Please select an event type.';
    }

    if (data.eventDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(data.eventDate) < today) {
        e.eventDate = 'Event date cannot be in the past.';
      }
    }

    if (!data.message.trim()) {
      e.message = 'Message is required.';
    } else if (data.message.trim().length < 10) {
      e.message = 'Message must be at least 10 characters.';
    }
    return e;
  };

  const handleChange = (e) => {
    const updated = { ...formData, [e.target.name]: e.target.value };
    setFormData(updated);
    // Clear error for this field as user types
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const fieldErrors = validate(formData);
    setErrors(prev => ({ ...prev, [e.target.name]: fieldErrors[e.target.name] || '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldErrors = validate(formData);
    if (Object.values(fieldErrors).some(v => v)) {
      setErrors(fieldErrors);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', phone: '', eventType: '', eventDate: '', message: '' });
        setErrors({});
      }
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <PageHero
        title="Contact"
        subtitle="Let's create something extraordinary together"
        backgroundImage="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=80"
      />

      <section className="contact section-padding">
        <div className="container">
          <div className="contact__grid">
            {/* Form */}
            <FadeIn direction="left">
              <div className="contact__form-wrap">
                <h2>Get in Touch</h2>
                <div className="gold-divider-left"></div>
                <p className="contact__form-intro">
                  We'd love to hear about your vision. Fill out the form below and we'll
                  get back to you within 24 hours.
                </p>

                {submitted ? (
                  <div className="contact__success">
                    <h3>Thank You</h3>
                    <p>Your message has been sent successfully. We'll be in touch soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact__form">
                    <div className="contact__field">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.name ? 'input-error' : ''}
                        placeholder="Your full name"
                      />
                      {errors.name && <span className="contact__error">{errors.name}</span>}
                    </div>

                    <div className="contact__field">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.phone ? 'input-error' : ''}
                        placeholder="+91 00000 00000"
                      />
                      {errors.phone && <span className="contact__error">{errors.phone}</span>}
                    </div>

                    <div className="contact__row">
                      <div className="contact__field">
                        <label htmlFor="eventType">Event Type</label>
                        <select
                          id="eventType"
                          name="eventType"
                          value={formData.eventType}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={errors.eventType ? 'input-error' : ''}
                        >
                          <option value="">Select event type</option>
                          <option value="Wedding">Wedding</option>
                          <option value="Pre-Wedding">Pre-Wedding</option>
                          <option value="Fashion">Fashion</option>
                          <option value="Commercial">Commercial</option>
                          <option value="Event">Event</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.eventType && <span className="contact__error">{errors.eventType}</span>}
                      </div>

                      <div className="contact__field">
                        <label htmlFor="eventDate">Event Date</label>
                        <input
                          type="date"
                          id="eventDate"
                          name="eventDate"
                          value={formData.eventDate}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={errors.eventDate ? 'input-error' : ''}
                        />
                        {errors.eventDate && <span className="contact__error">{errors.eventDate}</span>}
                      </div>
                    </div>

                    <div className="contact__field">
                      <label htmlFor="message">Your Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.message ? 'input-error' : ''}
                        placeholder="Tell us about your vision..."
                        rows="5"
                      ></textarea>
                      {errors.message && <span className="contact__error">{errors.message}</span>}
                    </div>

                    <button type="submit" className="btn-outline-dark" disabled={loading}>
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>

            {/* Info */}
            <FadeIn direction="right">
              <div className="contact__info">
                <h2>Studio Information</h2>
                <div className="gold-divider-left"></div>

                <div className="contact__info-items">
                  <div className="contact__info-item">
                    <IoLocationOutline className="contact__info-icon" />
                    <div>
                      <h4>Studio Address</h4>
                      <p>Thane<br />Mumbai, Maharashtra 400606</p>
                    </div>
                  </div>

                  <div className="contact__info-item">
                    <IoCallOutline className="contact__info-icon" />
                    <div>
                      <h4>Phone</h4>
                      <p><a href="tel:+918591126687" style={{ color: 'inherit', textDecoration: 'none' }}>+91 85911 26687</a></p>
                    </div>
                  </div>

                  <div className="contact__info-item">
                    <IoMailOutline className="contact__info-icon" />
                    <div>
                      <h4>Email</h4>
                      <p>hello@vigxii.com</p>
                    </div>
                  </div>

                  <div className="contact__info-item">
                    <IoLogoInstagram className="contact__info-icon" />
                    <div>
                      <h4>Instagram</h4>
                      <p><a href="https://www.instagram.com/vigxiivisuals?igsh=OTY0YWVmNjlrbXFj" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>@vigxiivisuals</a></p>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="contact__map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60384.45588!2d72.94051!3d19.21829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b8e4e3b4c3d5%3A0x6fcf0c7bb65b1a20!2sThane%2C%20Maharashtra%20400606!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Studio Location"
                  ></iframe>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Contact;
