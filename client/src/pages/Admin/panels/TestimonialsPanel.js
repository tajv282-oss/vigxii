import React, { useState, useEffect, useCallback } from 'react';
import { useAdmin } from '../../../context/AdminContext';
import {
  fetchAllTestimonials,
  createTestimonial,
  updateTestimonial,
  toggleTestimonialApproval,
  deleteTestimonial,
} from '../../../services/api';

const emptyForm = {
  clientName: '',
  quote: '',
  event: '',
  rating: 5,
};

const TestimonialsPanel = () => {
  const { token } = useAdmin();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [avatarFile, setAvatarFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAllTestimonials(token);
      setTestimonials(Array.isArray(data) ? data : []);
    } catch {
      setTestimonials([]);
    }
    setLoading(false);
  }, [token]);

  useEffect(() => { if (token) load(); }, [token, load]);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...emptyForm });
    setAvatarFile(null);
    setShowModal(true);
  };

  const openEdit = (t) => {
    setEditing(t);
    setForm({
      clientName: t.clientName,
      quote: t.quote,
      event: t.event || '',
      rating: t.rating || 5,
    });
    setAvatarFile(null);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('clientName', form.clientName);
      fd.append('quote', form.quote);
      fd.append('event', form.event);
      fd.append('rating', form.rating);

      if (avatarFile) fd.append('clientImage', avatarFile);

      if (editing) {
        await updateTestimonial(token, editing._id, fd);
      } else {
        await createTestimonial(token, fd);
      }

      setShowModal(false);
      load();
    } catch {
      alert('Error saving testimonial');
    }
    setSaving(false);
  };

  const handleToggle = async (id) => {
    await toggleTestimonialApproval(token, id);
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    await deleteTestimonial(token, id);
    load();
  };

  const renderStars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

  return (
    <div>
      <div className="panel__header">
        <span className="panel__count">{testimonials.length} testimonial{testimonials.length !== 1 ? 's' : ''}</span>
        <button className="panel__add-btn" onClick={openCreate}>+ New Testimonial</button>
      </div>

      {loading ? (
        <div className="panel__empty"><p>Loading...</p></div>
      ) : testimonials.length === 0 ? (
        <div className="panel__empty"><p>No testimonials yet.</p></div>
      ) : (
        <table className="panel__table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Client</th>
              <th>Event</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map(t => (
              <tr key={t._id}>
                <td>
                  {t.clientImage?.url ? (
                    <img
                      src={t.clientImage.url}
                      alt=""
                      style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'rgba(255,255,255,0.06)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)',
                    }}>
                      {t.clientName?.charAt(0)?.toUpperCase()}
                    </div>
                  )}
                </td>
                <td>{t.clientName}</td>
                <td>{t.event || '—'}</td>
                <td style={{ color: 'var(--gold)', fontSize: '0.8rem' }}>{renderStars(t.rating)}</td>
                <td>
                  <span className={`panel__badge ${t.approved ? 'panel__badge--green' : 'panel__badge--red'}`}>
                    {t.approved ? 'Approved' : 'Pending'}
                  </span>
                </td>
                <td>
                  <div className="panel__actions">
                    <button className="panel__action-btn" onClick={() => handleToggle(t._id)}>
                      {t.approved ? 'Unapprove' : 'Approve'}
                    </button>
                    <button className="panel__action-btn" onClick={() => openEdit(t)}>Edit</button>
                    <button className="panel__action-btn panel__action-btn--danger" onClick={() => handleDelete(t._id)}>Delete</button>
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
            <h2>{editing ? 'Edit Testimonial' : 'New Testimonial'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="panel__modal-row">
                <div className="panel__modal-field">
                  <label>Client Name</label>
                  <input
                    type="text"
                    value={form.clientName}
                    onChange={e => setForm({ ...form, clientName: e.target.value })}
                    required
                  />
                </div>
                <div className="panel__modal-field">
                  <label>Event Type</label>
                  <input
                    type="text"
                    value={form.event}
                    onChange={e => setForm({ ...form, event: e.target.value })}
                    placeholder="e.g. Wedding"
                  />
                </div>
              </div>

              <div className="panel__modal-field">
                <label>Quote / Review</label>
                <textarea
                  value={form.quote}
                  onChange={e => setForm({ ...form, quote: e.target.value })}
                  required
                />
              </div>

              <div className="panel__modal-row">
                <div className="panel__modal-field">
                  <label>Rating (1-5)</label>
                  <select
                    value={form.rating}
                    onChange={e => setForm({ ...form, rating: Number(e.target.value) })}
                  >
                    {[5, 4, 3, 2, 1].map(n => (
                      <option key={n} value={n}>{n} Star{n !== 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <div className="panel__modal-field">
                  <label>Client Avatar {editing ? '(optional)' : '(optional)'}</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => setAvatarFile(e.target.files[0])}
                  />
                </div>
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

export default TestimonialsPanel;
