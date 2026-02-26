import React, { useState, useEffect, useCallback } from 'react';
import { useAdmin } from '../../../context/AdminContext';
import { fetchContacts, deleteContact } from '../../../services/api';

const ContactsPanel = () => {
  const { token } = useAdmin();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchContacts(token);
      setContacts(Array.isArray(data) ? data : []);
    } catch {
      setContacts([]);
    }
    setLoading(false);
  }, [token]);

  useEffect(() => { if (token) load(); }, [token, load]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this contact submission?')) return;
    await deleteContact(token, id);
    load();
  };

  const formatDate = (d) => {
    return new Date(d).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div>
      <div className="panel__header">
        <span className="panel__count">{contacts.length} submission{contacts.length !== 1 ? 's' : ''}</span>
      </div>

      {loading ? (
        <div className="panel__empty"><p>Loading...</p></div>
      ) : contacts.length === 0 ? (
        <div className="panel__empty"><p>No contact submissions yet.</p></div>
      ) : (
        <table className="panel__table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Event</th>
              <th>Date</th>
              <th>Message</th>
              <th>Received</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(c => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>
                  <a
                    href={`mailto:${c.email}`}
                    style={{ color: 'var(--gold)', fontSize: '0.82rem' }}
                  >
                    {c.email}
                  </a>
                </td>
                <td>{c.eventType || '—'}</td>
                <td>{c.eventDate || '—'}</td>
                <td style={{ maxWidth: 260, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {c.message}
                </td>
                <td style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>
                  {formatDate(c.createdAt)}
                </td>
                <td>
                  <button
                    className="panel__action-btn panel__action-btn--danger"
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContactsPanel;
