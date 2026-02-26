import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../../components/PageTransition';
import PageHero from '../../components/PageHero/PageHero';
import SectionCTA from '../../components/SectionCTA/SectionCTA';
import { FadeIn } from '../../components/Animations';
import {
  IoPlayCircleOutline,
  IoCloseOutline,
  IoChevronUpOutline,
  IoChevronDownOutline,
} from 'react-icons/io5';
import { fetchFilms as fetchFilmsAPI } from '../../services/api';
import './Films.css';

const staticFilms = [
  {
    id: 1,
    title: 'Priya & Arjun — Wedding Film',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Wedding Film',
  },
  {
    id: 2,
    title: 'Meera & Rohan — Pre-Wedding',
    thumbnail: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Pre-Wedding Film',
  },
  {
    id: 3,
    title: 'Luxe Brand Campaign 2025',
    thumbnail: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Commercial',
  },
  {
    id: 4,
    title: 'The Grand Celebration',
    thumbnail: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Wedding Film',
  },
  {
    id: 5,
    title: 'Vogue Fashion Reel',
    thumbnail: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Fashion Film',
  },
  {
    id: 6,
    title: 'A Night of Elegance',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'Event Highlight',
  },
];

const getEmbedUrl = (url) => {
  if (!url) return '';
  if (url.includes('/embed/')) return url;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/shorts\/)([^&?/]+)/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

const getAutoplayEmbedUrl = (url) => {
  const base = getEmbedUrl(url);
  if (!base) return '';
  const sep = base.includes('?') ? '&' : '?';
  return `${base}${sep}autoplay=1&rel=0`;
};

/* ─── Reel Card ─────────────────────────────────────────── */
const ReelCard = ({ film, index, onClick }) => {
  const videoRef = useRef(null);
  const isDirectVideo =
    film.videoUrl &&
    !film.videoUrl.includes('youtube') &&
    !film.videoUrl.includes('youtu.be');

  const handleMouseEnter = () => {
    if (isDirectVideo && videoRef.current) videoRef.current.play();
  };
  const handleMouseLeave = () => {
    if (isDirectVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <FadeIn delay={index * 0.08}>
      <motion.div
        className="reel-card"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onClick(index)}
        whileHover={{ scale: 1.025 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="reel-card__aspect">
          {/* Thumbnail */}
          <img
            className="reel-card__thumb"
            src={film.thumbnail}
            alt={film.title}
            loading="lazy"
          />

          {/* Direct video preview (hover autoplay) */}
          {isDirectVideo && (
            <video
              ref={videoRef}
              className="reel-card__video-preview"
              src={film.videoUrl}
              muted
              loop
              playsInline
              preload="none"
            />
          )}

          {/* Play icon overlay */}
          <div className="reel-card__overlay">
            <IoPlayCircleOutline className="reel-card__play-icon" />
          </div>

          {/* Bottom info bar */}
          <div className="reel-card__info">
            <span className="reel-card__category">{film.category}</span>
            <h3 className="reel-card__title">{film.title}</h3>
          </div>
        </div>
      </motion.div>
    </FadeIn>
  );
};

/* ─── Fullscreen Reel Modal ──────────────────────────────── */
const ReelModal = ({ films, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const film = films[currentIndex];

  const goNext = useCallback(() => {
    if (currentIndex < films.length - 1) {
      setDirection(1);
      setCurrentIndex(i => i + 1);
    }
  }, [currentIndex, films.length]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(i => i - 1);
    }
  }, [currentIndex]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev, onClose]);

  const variants = {
    enter: (dir) => ({ y: dir > 0 ? '60%' : '-60%', opacity: 0, scale: 0.95 }),
    center: { y: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ y: dir > 0 ? '-60%' : '60%', opacity: 0, scale: 0.95 }),
  };

  return (
    <motion.div
      className="reel-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="reel-modal__container"
        onClick={e => e.stopPropagation()}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.15}
        onDragEnd={(_, info) => {
          if (info.offset.y < -70) goNext();
          else if (info.offset.y > 70) goPrev();
        }}
      >
        {/* Close button */}
        <button className="reel-modal__close" onClick={onClose} aria-label="Close">
          <IoCloseOutline />
        </button>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            className="reel-modal__reel"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="reel-modal__aspect">
              <iframe
                src={getAutoplayEmbedUrl(film.videoUrl)}
                title={film.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              {/* Info overlay */}
              <div className="reel-modal__info">
                <span className="reel-card__category">{film.category}</span>
                <h3 className="reel-card__title reel-modal__title">{film.title}</h3>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation controls */}
        <div className="reel-modal__nav">
          <button
            className="reel-modal__nav-btn"
            onClick={goPrev}
            disabled={currentIndex === 0}
            aria-label="Previous reel"
          >
            <IoChevronUpOutline />
          </button>
          <span className="reel-modal__counter">
            {currentIndex + 1}&thinsp;/&thinsp;{films.length}
          </span>
          <button
            className="reel-modal__nav-btn"
            onClick={goNext}
            disabled={currentIndex === films.length - 1}
            aria-label="Next reel"
          >
            <IoChevronDownOutline />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Page ───────────────────────────────────────────────── */
const Films = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [films, setFilms] = useState(staticFilms);

  useEffect(() => {
    fetchFilmsAPI()
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setFilms(
            data.map(f => ({
              id: f._id,
              title: f.title,
              thumbnail: f.coverImage?.url || '',
              videoUrl: getEmbedUrl(f.youtubeUrl),
              category: f.category,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <PageTransition>
      <PageHero
        title="Films"
        subtitle="Cinematic storytelling at its finest"
        backgroundImage="https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&q=80"
      />

      <section className="films section-padding">
        <div className="container">
          <div className="reels-grid">
            {films.map((film, i) => (
              <ReelCard
                key={film.id}
                film={film}
                index={i}
                onClick={setActiveIndex}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeIndex !== null && (
          <ReelModal
            films={films}
            initialIndex={activeIndex}
            onClose={() => setActiveIndex(null)}
          />
        )}
      </AnimatePresence>

      <SectionCTA />
    </PageTransition>
  );
};

export default Films;
