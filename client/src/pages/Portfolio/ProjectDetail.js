import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';
import { FadeIn } from '../../components/Animations';
import SectionCTA from '../../components/SectionCTA/SectionCTA';
import { fetchProject } from '../../services/api';
import './ProjectDetail.css';

/* Fallback for when API is unavailable */
const fallbackProject = {
  title: 'Featured Project',
  category: 'Portfolio',
  coverImage: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1920&q=80',
  description: 'A beautifully curated project from our premium portfolio collection. Each frame has been carefully crafted to tell a compelling visual story with our signature luxury aesthetic.',
  images: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80',
    'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
  ],
  youtubeUrl: null,
};

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject(id)
      .then(data => {
        if (data && data._id) {
          setProject({
            title: data.title,
            category: data.category,
            coverImage: data.coverImage?.url || fallbackProject.coverImage,
            description: data.description || '',
            images: (data.images || []).map(img => img.url || img),
            youtubeUrl: data.youtubeUrl || null,
          });
        } else {
          setProject(fallbackProject);
        }
      })
      .catch(() => setProject(fallbackProject))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <PageTransition>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', fontSize: '0.85rem' }}>Loading...</p>
        </div>
      </PageTransition>
    );
  }

  const p = project || fallbackProject;

  // Convert YouTube watch URL to embed URL
  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes('/embed/')) return url;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&?/]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  return (
    <PageTransition>
      {/* Cover Image */}
      <section className="project-cover">
        <img src={p.coverImage} alt={p.title} />
        <div className="project-cover__overlay"></div>
        <div className="project-cover__content">
          <span className="project-cover__cat">{p.category}</span>
          <h1 className="project-cover__title">{p.title}</h1>
          <div className="gold-divider"></div>
        </div>
      </section>

      {/* Description */}
      <section className="project-desc section-padding-sm">
        <div className="container" style={{ maxWidth: '800px' }}>
          <FadeIn>
            <p className="project-desc__text">{p.description}</p>
          </FadeIn>
        </div>
      </section>

      {/* Gallery */}
      <section className="project-gallery section-padding-sm">
        <div className="container">
          <div className="project-gallery__grid">
            {p.images.map((img, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="project-gallery__item">
                  <img src={img} alt={`${p.title} ${i + 1}`} />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Film embed */}
      {p.youtubeUrl && (
        <section className="project-film section-padding-sm">
          <div className="container" style={{ maxWidth: '900px' }}>
            <FadeIn>
              <h2 className="text-center" style={{ marginBottom: '40px' }}>The Film</h2>
              <div className="project-film__embed">
                <iframe
                  src={getEmbedUrl(p.youtubeUrl)}
                  title="Project Film"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Back Link */}
      <section className="text-center" style={{ padding: '40px 0 80px' }}>
        <Link to="/portfolio" className="btn-outline-dark">Back to Portfolio</Link>
      </section>

      <SectionCTA />
    </PageTransition>
  );
};

export default ProjectDetail;
