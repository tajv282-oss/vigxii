import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseOutline, IoExpandOutline } from 'react-icons/io5';
import PageTransition from '../../components/PageTransition';
import PageHero from '../../components/PageHero/PageHero';
import SectionCTA from '../../components/SectionCTA/SectionCTA';
import { FadeIn } from '../../components/Animations';
import { fetchProjects } from '../../services/api';
import './Portfolio.css';

const categories = ['All', 'Weddings', 'Pre-Wedding', 'Fashion', 'Commercial', 'Events'];

const staticProjects = [
  { id: '1', title: 'The Royal Wedding', category: 'Weddings', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80' },
  { id: '2', title: 'Golden Hour Romance', category: 'Pre-Wedding', image: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80' },
  { id: '3', title: 'Vogue Noir', category: 'Fashion', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80' },
  { id: '4', title: 'Elegance in Motion', category: 'Weddings', image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80' },
  { id: '5', title: 'Brand Luxe Campaign', category: 'Commercial', image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80' },
  { id: '6', title: 'Midnight Gala', category: 'Events', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80' },
  { id: '7', title: 'Eternal Promises', category: 'Weddings', image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80' },
  { id: '8', title: 'Parisian Escape', category: 'Pre-Wedding', image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80' },
  { id: '9', title: 'Haute Couture Series', category: 'Fashion', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80' },
  { id: '10', title: 'Minimal Luxe Branding', category: 'Commercial', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80' },
  { id: '11', title: 'Sunset Soirée', category: 'Events', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80' },
  { id: '12', title: 'The Grand Affair', category: 'Weddings', image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80' },
];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState(staticProjects);
  const [lightbox, setLightbox] = useState(null); // { image, title, category }

  useEffect(() => {
    fetchProjects()
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data.map(p => ({
            id: p._id,
            title: p.title,
            category: p.category,
            image: p.coverImage?.url || '',
          })));
        }
      })
      .catch(() => {});
  }, []);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <PageTransition>
      <PageHero
        title="Portfolio"
        subtitle="A curated collection of our finest work"
        backgroundImage="https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1920&q=80"
      />

      <section className="portfolio section-padding">
        <div className="container">
          <FadeIn>
            <div className="portfolio__filters">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`portfolio__filter ${activeFilter === cat ? 'active' : ''}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </FadeIn>

          <motion.div className="portfolio__grid" layout>
<AnimatePresence>
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <div
                    className="portfolio__item"
                    onClick={() => setLightbox(project)}
                  >
                    <div className="portfolio__img-wrap">
                      <img src={project.image} alt={project.title} loading="lazy" />
                    </div>
                    <div className="portfolio__overlay">
                      <IoExpandOutline className="portfolio__view-icon" />
                      <h3 className="portfolio__project-title">{project.title}</h3>
                      <span className="portfolio__project-cat">{project.category}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="portfolio__lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="portfolio__lightbox-inner"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="portfolio__lightbox-close"
                onClick={() => setLightbox(null)}
                aria-label="Close"
              >
                <IoCloseOutline />
              </button>
              <img
                src={lightbox.image}
                alt={lightbox.title}
                className="portfolio__lightbox-img"
              />
              <div className="portfolio__lightbox-caption">
                <span className="portfolio__project-cat" style={{ opacity: 1, transform: 'none' }}>
                  {lightbox.category}
                </span>
                <h3 className="portfolio__lightbox-title">{lightbox.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SectionCTA />
    </PageTransition>
  );
};

export default Portfolio;
