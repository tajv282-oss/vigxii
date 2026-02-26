import React, { useState, useEffect, useCallback } from 'react';
import { useAdmin } from '../../../context/AdminContext';
import {
  fetchFilms,
  createProject,
  updateProject,
  deleteProject,
} from '../../../services/api';

const CATEGORIES = ['Weddings', 'Pre-Wedding', 'Fashion', 'Commercial', 'Events'];

const emptyForm = {
  title: '',
  category: 'Weddings',
  description: '',
  youtubeUrl: '',
  featured: false,
};

const FilmsPanel = () => {
  const { token } = useAdmin();
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [coverFile, setCoverFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchFilms();
      setFilms(Array.isArray(data) ? data : []);
    } catch {
      setFilms([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm });
    setCoverFile(null);
    setShowModal(true);
  };

  const openEdit = (film) => {
    setEditing(film);
    setForm({
      title: film.title,
      category: film.category,
      description: film.description || '',
      youtubeUrl: film.youtubeUrl || '',
      featured: film.featured || false,
    });
    setCoverFile(null);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('category', form.category);
      fd.append('description', form.description);
      fd.append('youtubeUrl', form.youtubeUrl);
      fd.append('featured', form.featured);
      fd.append('isFilm', true); // Always true for films

      if (coverFile) fd.append('coverImage', coverFile);

      if (editing) {
        await updateProject(token, editing._id, fd);
      } else {
        await createProject(token, fd);
      }

      setShowModal(false);
      load();
    } catch (err) {
      alert('Error saving film');
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this film?')) return;
    await deleteProject(token, id);
    load();
  };

  const getYouTubeThumb = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?/]+)/);
    return match ? `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg` : null;
  };

  return (
    <div>
      <div className="panel__header">
        <span className="panel__count">{films.length} film{films.length !== 1 ? 's' : ''}</span>
        <button className="panel__add-btn" onClick={openCreate}>+ New Film</button>
      </div>

      {loading ? (
        <div className="panel__empty"><p>Loading...</p></div>
      ) : films.length === 0 ? (
        <div className="panel__empty"><p>No films yet. Add your first film.</p></div>
      ) : (
        <table className="panel__table">
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Category</th>
              <th>YouTube</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {films.map(f => (
              <tr key={f._id}>
                <td>
                  {f.coverImage?.url ? (
                    <img src={f.coverImage.url} alt="" className="panel__thumb" />
                  ) : getYouTubeThumb(f.youtubeUrl) ? (
                    <img src={getYouTubeThumb(f.youtubeUrl)} alt="" className="panel__thumb" />
                  ) : null}
                </td>
                <td>{f.title}</td>
                <td><span className="panel__badge panel__badge--gold">{f.category}</span></td>
                <td>
                  {f.youtubeUrl ? (
                    <a href={f.youtubeUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--gold)', fontSize: '0.75rem' }}>
                      View ↗
                    </a>
                  ) : '—'}
                </td>
                <td>{f.featured ? '★' : '—'}</td>
                <td>
                  <div className="panel__actions">
                    <button className="panel__action-btn" onClick={() => openEdit(f)}>Edit</button>
                    <button className="panel__action-btn panel__action-btn--danger" onClick={() => handleDelete(f._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {showModal && (
        <div className="panel__modal-overlay" onClick={() => setShowModal(false)}>
          <div className="panel__modal" onClick={e => e.stopPropagation()}>
            <h2>{editing ? 'Edit Film' : 'New Film'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="panel__modal-field">
                <label>Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div className="panel__modal-field">
                <label>YouTube URL (required for films)</label>
                <input
                  type="url"
                  value={form.youtubeUrl}
                  onChange={e => setForm({ ...form, youtubeUrl: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                  required
                />
              </div>

              <div className="panel__modal-row">
                <div className="panel__modal-field">
                  <label>Category</label>
                  <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="panel__modal-field">
                  <label>Cover Image {editing ? '(optional)' : ''}</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => setCoverFile(e.target.files[0])}
                    required={!editing}
                  />
                </div>
              </div>

              <div className="panel__modal-field">
                <label>Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div className="panel__modal-check">
                <input
                  type="checkbox"
                  id="film-featured"
                  checked={form.featured}
                  onChange={e => setForm({ ...form, featured: e.target.checked })}
                />
                <label htmlFor="film-featured">Featured on Homepage</label>
              </div>

              <div className="panel__modal-actions">
                <button type="submit" className="panel__modal-submit" disabled={saving}>
                  {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
                </button>
                <button type="button" className="panel__modal-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilmsPanel;
