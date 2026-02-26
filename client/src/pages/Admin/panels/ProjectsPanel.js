import React, { useState, useEffect, useCallback } from 'react';
import { useAdmin } from '../../../context/AdminContext';
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImages,
  deleteProjectImage,
} from '../../../services/api';

const CATEGORIES = ['Weddings', 'Pre-Wedding', 'Fashion', 'Commercial', 'Events'];

const emptyForm = {
  title: '',
  category: 'Weddings',
  description: '',
  youtubeUrl: '',
  featured: false,
  isFilm: false,
};

const ProjectsPanel = () => {
  const { token } = useAdmin();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [coverFile, setCoverFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProjects();
      setProjects(Array.isArray(data) ? data : []);
    } catch {
      setProjects([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm });
    setCoverFile(null);
    setGalleryFiles(null);
    setShowModal(true);
  };

  const openEdit = (project) => {
    setEditing(project);
    setForm({
      title: project.title,
      category: project.category,
      description: project.description || '',
      youtubeUrl: project.youtubeUrl || '',
      featured: project.featured || false,
      isFilm: project.isFilm || false,
    });
    setCoverFile(null);
    setGalleryFiles(null);
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
      fd.append('isFilm', form.isFilm);

      if (coverFile) fd.append('coverImage', coverFile);

      if (editing) {
        await updateProject(token, editing._id, fd);
      } else {
        await createProject(token, fd);
      }

      // Upload gallery images if any
      if (galleryFiles && galleryFiles.length > 0 && editing) {
        const gfd = new FormData();
        for (let f of galleryFiles) gfd.append('images', f);
        await uploadProjectImages(token, editing._id, gfd);
      }

      setShowModal(false);
      load();
    } catch (err) {
      alert('Error saving project');
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project and all its images?')) return;
    await deleteProject(token, id);
    load();
  };

  const handleDeleteImage = async (projectId, publicId) => {
    await deleteProjectImage(token, projectId, publicId);
    load();
  };

  const handleGalleryUpload = async () => {
    if (!galleryFiles || !editing) return;
    setSaving(true);
    const gfd = new FormData();
    for (let f of galleryFiles) gfd.append('images', f);
    await uploadProjectImages(token, editing._id, gfd);
    setGalleryFiles(null);
    await load();
    // refresh editing object
    const updated = (await fetchProjects()).find(p => p._id === editing._id);
    if (updated) setEditing(updated);
    setSaving(false);
  };

  return (
    <div>
      <div className="panel__header">
        <span className="panel__count">{projects.length} project{projects.length !== 1 ? 's' : ''}</span>
        <button className="panel__add-btn" onClick={openCreate}>+ New Project</button>
      </div>

      {loading ? (
        <div className="panel__empty"><p>Loading...</p></div>
      ) : projects.length === 0 ? (
        <div className="panel__empty"><p>No projects yet. Add your first project.</p></div>
      ) : (
        <table className="panel__table">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Category</th>
              <th>Images</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p._id}>
                <td>
                  {p.coverImage?.url && (
                    <img src={p.coverImage.url} alt="" className="panel__thumb" />
                  )}
                </td>
                <td>{p.title}</td>
                <td><span className="panel__badge panel__badge--gold">{p.category}</span></td>
                <td>{p.images?.length || 0}</td>
                <td>{p.featured ? '★' : '—'}</td>
                <td>
                  <div className="panel__actions">
                    <button className="panel__action-btn" onClick={() => openEdit(p)}>Edit</button>
                    <button className="panel__action-btn panel__action-btn--danger" onClick={() => handleDelete(p._id)}>Delete</button>
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
            <h2>{editing ? 'Edit Project' : 'New Project'}</h2>
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
                  <label>YouTube URL</label>
                  <input
                    type="url"
                    value={form.youtubeUrl}
                    onChange={e => setForm({ ...form, youtubeUrl: e.target.value })}
                    placeholder="https://youtube.com/..."
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

              <div className="panel__modal-field">
                <label>Cover Image {editing ? '(leave empty to keep current)' : ''}</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setCoverFile(e.target.files[0])}
                  required={!editing}
                />
              </div>

              <div className="panel__modal-check">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured}
                  onChange={e => setForm({ ...form, featured: e.target.checked })}
                />
                <label htmlFor="featured">Featured on Homepage</label>
              </div>

              <div className="panel__modal-actions">
                <button type="submit" className="panel__modal-submit" disabled={saving}>
                  {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
                </button>
                <button type="button" className="panel__modal-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>

            {/* Gallery management for existing projects */}
            {editing && (
              <div style={{ marginTop: 32, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24 }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', marginBottom: 16 }}>Gallery Images</h3>

                {editing.images?.length > 0 && (
                  <div className="panel__gallery-grid">
                    {editing.images.map((img, i) => (
                      <div key={i} className="panel__gallery-item">
                        <img src={img.url} alt="" />
                        <button
                          className="panel__gallery-delete"
                          onClick={() => handleDeleteImage(editing._id, img.publicId)}
                        >×</button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="panel__modal-field" style={{ marginTop: 12 }}>
                  <label>Add Gallery Images (up to 25)</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={e => setGalleryFiles(Array.from(e.target.files))}
                  />
                </div>
                {galleryFiles && galleryFiles.length > 0 && (
                  <button
                    type="button"
                    className="panel__modal-submit"
                    onClick={handleGalleryUpload}
                    disabled={saving}
                  >
                    {saving ? 'Uploading...' : `Upload ${galleryFiles.length} Image${galleryFiles.length > 1 ? 's' : ''}`}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPanel;
