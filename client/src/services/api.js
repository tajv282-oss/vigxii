const API_BASE = process.env.REACT_APP_API_URL || '/api';

// Helper to get auth headers
const getAuthHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
});

// ─── PORTFOLIO / PROJECTS ───────────────────────────

export const fetchProjects = async (category) => {
  const query = category && category !== 'All' ? `?category=${category}` : '';
  const res = await fetch(`${API_BASE}/portfolio${query}`);
  return res.json();
};

export const fetchFeaturedProjects = async () => {
  const res = await fetch(`${API_BASE}/portfolio/featured`);
  return res.json();
};

export const fetchFilms = async () => {
  const res = await fetch(`${API_BASE}/portfolio/films`);
  return res.json();
};

export const fetchProject = async (id) => {
  const res = await fetch(`${API_BASE}/portfolio/${id}`);
  return res.json();
};

export const createProject = async (token, formData) => {
  const res = await fetch(`${API_BASE}/portfolio`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: formData, // multipart/form-data
  });
  return res.json();
};

export const updateProject = async (token, id, formData) => {
  const res = await fetch(`${API_BASE}/portfolio/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: formData,
  });
  return res.json();
};

export const deleteProject = async (token, id) => {
  const res = await fetch(`${API_BASE}/portfolio/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(token),
  });
  return res.json();
};

export const uploadProjectImages = async (token, id, formData) => {
  const res = await fetch(`${API_BASE}/portfolio/${id}/images`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: formData,
  });
  return res.json();
};

export const deleteProjectImage = async (token, projectId, publicId) => {
  const res = await fetch(`${API_BASE}/portfolio/${projectId}/images/${publicId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(token),
  });
  return res.json();
};

// ─── TESTIMONIALS ───────────────────────────────────

export const fetchTestimonials = async () => {
  const res = await fetch(`${API_BASE}/testimonials`);
  return res.json();
};

export const fetchAllTestimonials = async (token) => {
  const res = await fetch(`${API_BASE}/testimonials/all`, {
    headers: getAuthHeaders(token),
  });
  return res.json();
};

export const createTestimonial = async (token, formData) => {
  const res = await fetch(`${API_BASE}/testimonials`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: formData,
  });
  return res.json();
};

export const updateTestimonial = async (token, id, formData) => {
  const res = await fetch(`${API_BASE}/testimonials/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(token),
    body: formData,
  });
  return res.json();
};

export const toggleTestimonialApproval = async (token, id) => {
  const res = await fetch(`${API_BASE}/testimonials/${id}/approve`, {
    method: 'PATCH',
    headers: getAuthHeaders(token),
  });
  return res.json();
};

export const deleteTestimonial = async (token, id) => {
  const res = await fetch(`${API_BASE}/testimonials/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(token),
  });
  return res.json();
};

// ─── CONTACTS ───────────────────────────────────────

export const submitContact = async (data) => {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const fetchContacts = async (token) => {
  const res = await fetch(`${API_BASE}/contact`, {
    headers: getAuthHeaders(token),
  });
  return res.json();
};

export const deleteContact = async (token, id) => {
  const res = await fetch(`${API_BASE}/contact/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(token),
  });
  return res.json();
};

// ─── ADMIN AUTH ─────────────────────────────────────

export const verifyAdmin = async (token) => {
  const res = await fetch(`${API_BASE}/admin/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(token),
    },
  });
  return res.json();
};
