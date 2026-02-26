import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoCloseOutline } from 'react-icons/io5';
import { FadeIn } from '../../../components/Animations';
import { fetchFeaturedProjects } from '../../../services/api';
import './FeaturedWork.css';

const FeaturedWork = () => {
  const [categories, setCategories] = useState([]);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    fetchFeaturedProjects()
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const real = data.filter(
            p => p.coverImage?.url && !p.coverImage.url.includes('unsplash.com')
          );
          if (real.length > 0) {
            setCategories(real.map((p) => ({
              id: p._id,
              title: p.title,
              image: p.coverImage.url,
            })));
          }
        }
      })
      .catch(() => {});
  }, []);

  if (categories.length === 0) return null;

  return (
    <section className="featured section-padding">
      <div className="container">
        <FadeIn>
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <p className="featured__label">Portfolio</p>
            <h2>Featured Work</h2>
            <div className="gold-divider"></div>
          </div>
        </FadeIn>

        <div className="featured__grid">
          {categories.map((cat, i) => (
            <FadeIn key={cat.title || i} delay={i * 0.1}>
              <div
                className="featured__item"
                onClick={() => setLightbox(cat)}
              >
                <div className="featured__img-wrap">
                  <img src={cat.image} alt={cat.title} loading="lazy" />
                </div>
                <div className="featured__overlay">
                  <span className="featured__cat-name">{cat.title}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="featured__lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="featured__lightbox-inner"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="featured__lightbox-close"
                onClick={() => setLightbox(null)}
                aria-label="Close"
              >
                <IoCloseOutline />
              </button>
              <img
                src={lightbox.image}
                alt={lightbox.title}
                className="featured__lightbox-img"
              />
              <div className="featured__lightbox-caption">
                <p className="featured__label" style={{ margin: 0 }}>{lightbox.title}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FeaturedWork;
