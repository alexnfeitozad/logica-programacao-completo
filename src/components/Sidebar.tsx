import React, { useState, useMemo } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LOGICA_MODULES } from '../data/modules';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredModules = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return LOGICA_MODULES;
    return LOGICA_MODULES.filter(
      (m) =>
        m.title.toLowerCase().includes(term) ||
        m.description.toLowerCase().includes(term) ||
        m.level.toLowerCase().includes(term) ||
        m.tags.some((t) => t.toLowerCase().includes(term))
    );
  }, [searchTerm]);

  return (
    <>
      <div
        className={`sidebar-backdrop ${isOpen ? 'show' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-header-top">
            <Link to="/" className="brand-badge" onClick={onClose}>
              <div className="logo-icon">
                🧠
              </div>
              <div>
                <h1>Do Algoritmo ao Arquiteto</h1>
                <p className="subtitle">Lógica & Ciência da Computação</p>
              </div>
            </Link>
            <button
              className="mobile-close-btn"
              onClick={onClose}
              aria-label="Fechar menu lateral"
            >
              ✕
            </button>
          </div>
          <div className="status-chip">
            <span className="chip-dot"></span>
            <span>10 Módulos Prontos</span>
          </div>
        </div>

        {/* Search Input */}
        <div className="search-container">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar estrutura, busca ou ordenação..."
              className="sidebar-search"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="clear-search-btn"
                aria-label="Limpar busca"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Navigation List */}
        <nav className="sidebar-nav">
          {!searchTerm && (
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link home-nav-link ${isActive ? 'active' : ''}`
              }
              onClick={onClose}
            >
              <span className="nav-icon">🏠</span>
              <div className="nav-info">
                <span className="nav-title">Início / Apresentação</span>
                <span className="nav-desc">Visão Geral da Formação</span>
              </div>
              <span className="nav-level" data-level="Home">
                Início
              </span>
            </NavLink>
          )}

          {filteredModules.length === 0 ? (
            <div className="empty-search">
              <p>Nenhum módulo encontrado para "{searchTerm}"</p>
            </div>
          ) : (
            filteredModules.map((module) => (
              <NavLink
                key={module.id}
                to={`/${module.id}`}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
                onClick={onClose}
              >
                <span className="nav-icon">{module.icon}</span>
                <div className="nav-info">
                  <span className="nav-title">{module.title}</span>
                  <span className="nav-desc">{module.description}</span>
                </div>
                <span className="nav-level" data-level={module.level}>
                  {module.level}
                </span>
              </NavLink>
            ))
          )}
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <div className="footer-info">
            <span className="tech-pill">TypeScript</span>
            <span className="tech-pill">Big-O</span>
            <span className="tech-pill">Vitest</span>
          </div>
          <p className="footer-copy">© 2026 Fundação de Computação</p>
        </div>
      </aside>
    </>
  );
};
