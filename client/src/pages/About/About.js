import React from 'react';
import founderImg from '../../assets/founder.jpg';
import PageTransition from '../../components/PageTransition';
import PageHero from '../../components/PageHero/PageHero';
import SectionCTA from '../../components/SectionCTA/SectionCTA';
import { FadeIn } from '../../components/Animations';
import { IoCameraOutline, IoHeartOutline, IoDiamondOutline, IoTrophyOutline, IoStarOutline, IoRibbonOutline } from 'react-icons/io5';
import './About.css';

const whyChooseUs = [
  { icon: <IoDiamondOutline />, title: 'Luxury Aesthetic', desc: 'Every project is treated as a premium editorial production.' },
  { icon: <IoHeartOutline />, title: 'Emotional Storytelling', desc: 'We capture genuine emotions and authentic moments.' },
  { icon: <IoCameraOutline />, title: 'Technical Mastery', desc: 'State-of-the-art equipment with artistic precision.' },
  { icon: <IoStarOutline />, title: 'Bespoke Experience', desc: 'Personalized service tailored to your unique vision.' },
  { icon: <IoTrophyOutline />, title: 'Award-Winning', desc: 'Internationally recognized for creative excellence.' },
  { icon: <IoRibbonOutline />, title: 'Timeless Delivery', desc: 'Images and films that transcend trends and time.' },
];

const achievements = [
  { number: '100+', label: 'Projects Delivered' },
  { number: '4+', label: 'Years of Experience' },
  { number: '2', label: 'Industry Awards' },
  { number: '100%', label: 'Client Satisfaction' },
];

const About = () => {
  return (
    <PageTransition>
      <PageHero
        title="About"
        subtitle="The story behind the lens"
        backgroundImage="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1920&q=80"
      />

      {/* Founder Story */}
      <section className="about-founder section-padding">
        <div className="container">
          <div className="about-founder__grid">
            <FadeIn direction="left" className="about-founder__image-wrap">
              <img
                src={founderImg}
                alt="Founder"
              />
            </FadeIn>

            <FadeIn direction="right" className="about-founder__content">
              <p className="about-founder__label">The Founder</p>
              <h2>A Vision Born from Passion</h2>
              <div className="gold-divider-left"></div>
              <p>
                VIGXII Visuals Co. was founded with a singular vision: to elevate visual storytelling
                to an art form. What began as a passion for capturing fleeting moments has evolved
                into a premier luxury photography and filmmaking studio.
              </p>
              <p>
                With over eight years of experience working with discerning clients across weddings,
                fashion, and commercial projects, we've developed a distinctive aesthetic that blends
                editorial precision with emotional depth.
              </p>
              <p>
                Every frame we create is a testament to our belief that great photography isn't just
                about technical skill — it's about understanding the soul of the moment and preserving
                it with artistry.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Brand Philosophy */}
      <section className="about-philosophy section-padding">
        <div className="container">
          <FadeIn>
            <div className="text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
              <p className="about-philosophy__label">Our Philosophy</p>
              <h2 style={{ color: 'var(--white)' }}>Art. Emotion. Legacy.</h2>
              <div className="gold-divider"></div>
              <p className="about-philosophy__text">
                We believe that every photograph should tell a story, evoke an emotion, and stand the
                test of time. Our approach is rooted in the principles of fine art — composition,
                light, and narrative — applied with the sensibility of modern editorial design.
                We don't simply document events; we create visual heirlooms that become part of
                your legacy.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="about-why section-padding">
        <div className="container">
          <FadeIn>
            <div className="text-center" style={{ marginBottom: '60px' }}>
              <p className="about-why__label">The VIGXII Difference</p>
              <h2>Why Choose Us</h2>
              <div className="gold-divider"></div>
            </div>
          </FadeIn>

          <div className="about-why__grid">
            {whyChooseUs.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="about-why__card">
                  <div className="about-why__icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="about-achievements section-padding">
        <div className="container">
          <FadeIn>
            <div className="about-achievements__grid">
              {achievements.map((item) => (
                <div key={item.label} className="about-achievements__item">
                  <span className="about-achievements__number">{item.number}</span>
                  <span className="about-achievements__label">{item.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <SectionCTA />
    </PageTransition>
  );
};

export default About;
