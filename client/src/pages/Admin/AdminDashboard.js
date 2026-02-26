import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import ProjectsPanel from './panels/ProjectsPanel';
import FilmsPanel from './panels/FilmsPanel';
import TestimonialsPanel from './panels/TestimonialsPanel';
import ContactsPanel from './panels/ContactsPanel';
import { IoGridOutline, IoVideocamOutline, IoChatbubbleOutline, IoMailOutline, IoLogOutOutline } from 'react-icons/io5';
import './AdminDashboard.css';

const tabs = [
  { key: 'projects', label: 'Projects', icon: <IoGridOutline /> },
  { key: 'films', label: 'Films', icon: <IoVideocamOutline /> },
  { key: 'testimonials', label: 'Testimonials', icon: <IoChatbubbleOutline /> },
  { key: 'contacts', label: 'Contacts', icon: <IoMailOutline /> },
];

const AdminDashboard = () => {
  const { user, isAdmin, loading, logout } = useAdmin();
  const [activeTab, setActiveTab] = useState('projects');

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading__spinner"></div>
        <p>Verifying admin access...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const renderPanel = () => {
    switch (activeTab) {
      case 'projects': return <ProjectsPanel />;
      case 'films': return <FilmsPanel />;
      case 'testimonials': return <TestimonialsPanel />;
      case 'contacts': return <ContactsPanel />;
      default: return <ProjectsPanel />;
    }
  };

  return (
    <div className="admin">
      {/* Sidebar */}
      <aside className="admin__sidebar">
        <div className="admin__sidebar-header">
          <div className="admin__sidebar-logo">VIGXII</div>
          <span className="admin__sidebar-badge">Admin</span>
        </div>

        <nav className="admin__sidebar-nav">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`admin__sidebar-link ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="admin__sidebar-footer">
          <div className="admin__user-info">
            <span className="admin__user-email">{user?.email}</span>
          </div>
          <button className="admin__logout-btn" onClick={logout}>
            <IoLogOutOutline />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin__main">
        <div className="admin__topbar">
          <h1 className="admin__topbar-title">
            {tabs.find(t => t.key === activeTab)?.label}
          </h1>
        </div>
        <div className="admin__content">
          {renderPanel()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
