import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { LOGICA_MODULES } from '../../data/modules';
import './Home.css';

export const Home: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<'all' | 1 | 2 | 3>('all');

  const stats = [
    { label: 'Módulos Práticos', value: '10', detail: 'Da memória a algoritmos avançados' },
    { label: 'Simuladores Interativos', value: '100%', detail: 'Pilhas, Filas, BST e Ordenações' },
    { label: 'Pilares de Ciência', value: '3 Fases', detail: 'Memória, Estruturas & Algoritmos' },
    { label: 'Linguagem Base', value: 'TypeScript', detail: 'Tipagem estrita e POO moderna' },
  ];

  const phases = [
    {
      id: 1,
      num: '01',
      title: 'O Alicerce da Computação',
      subtitle: 'Módulos 01 ao 03',
      icon: '🧠',
      desc: 'Fundamentos essenciais da ciência da computação: gerenciamento de memória (Stack vs Heap), análise assintótica com Notação Big-O e estruturas de dados lineares (Pilhas, Filas e Listas Encadeadas).',
      highlights: ['Stack vs Heap & Ponteiros', 'Pilhas (LIFO) & Filas (FIFO)', 'Listas Simples e Duplamente Encadeadas'],
    },
    {
      id: 2,
      num: '02',
      title: 'Estruturas de Dados Avançadas',
      subtitle: 'Módulos 04 ao 06',
      icon: '🌳',
      desc: 'O domínio das estruturas corporativas: Tabelas Hash (Mapas e Sets em O(1)), Árvores Binárias de Busca (BST com percursos e recursão) e o comparador prático de Busca Linear vs Busca Binária.',
      highlights: ['Tabelas Hash & Resolução de Colisões', 'Árvores Binárias de Busca (BST)', 'Busca Linear O(n) vs Binária O(log n)'],
    },
    {
      id: 3,
      num: '03',
      title: 'Algoritmos, Paradigmas & Arena',
      subtitle: 'Módulos 07 ao 10',
      icon: '⚡',
      desc: 'A elite do pensamento computacional: algoritmos de ordenação visual (Bubble, Selection, Merge e Quick Sort), Programação Funcional vs POO e a Arena de Desafios LeetCode com runner de testes.',
      highlights: ['Ordenação O(n log n) com QuickSort', 'Programação Funcional vs POO em TS', 'Arena de Desafios Tipo LeetCode'],
    },
  ];

  const filteredModules = useMemo(() => {
    if (selectedPhase === 'all') return LOGICA_MODULES;
    return LOGICA_MODULES.filter((m) => m.phase === selectedPhase);
  }, [selectedPhase]);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow"></div>
        <div className="hero-glow-secondary"></div>

        <div className="hero-badge">
          <span className="pulse-dot"></span>
          <span>FORMAÇÃO FUNDAMENTAL • CIÊNCIA DA COMPUTAÇÃO & ALGORITMOS</span>
        </div>

        <h1 className="hero-title">
          Do Algoritmo à <span className="gradient-text">Estrutura de Dados</span>
        </h1>

        <p className="hero-lead">
          Não decore código. Compreenda a ciência por trás do software: como a memória aloca variáveis,
          como estruturas de dados organizam informações e como algoritmos resolvem problemas em escala.
        </p>

        {/* CTAs */}
        <div className="hero-actions">
          <Link to="/modulo-01-fundamentos-memoria" className="btn btn-primary btn-lg">
            <span>🚀 Iniciar Formação (Módulo 01)</span>
          </Link>
          <Link to="/modulo-10-arena-desafios" className="btn btn-secondary btn-lg">
            <span>🏆 Ver Arena de Desafios (LeetCode)</span>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
              <span className="stat-detail">{stat.detail}</span>
            </div>
          ))}
        </div>
      </section>

      {/* The 3 Pillars Section */}
      <section className="pillars-section">
        <div className="section-header">
          <span className="section-tag">A JORNADA DO CONHECIMENTO</span>
          <h2 className="section-title">As Três Fases da Formação</h2>
          <p className="section-subtitle">
            Uma progressão metodológica pensada para construir bases inabaláveis de Ciência da Computação.
          </p>
        </div>

        <div className="pillars-grid">
          {phases.map((phase) => (
            <div key={phase.id} className="pillar-card">
              <div className="pillar-header">
                <div className="pillar-icon-box">
                  <span className="pillar-icon">{phase.icon}</span>
                  <span className="pillar-num">FASE {phase.num}</span>
                </div>
                <span className="pillar-modules-tag">{phase.subtitle}</span>
              </div>

              <h3 className="pillar-title">{phase.title}</h3>
              <p className="pillar-desc">{phase.desc}</p>

              <ul className="pillar-highlights">
                {phase.highlights.map((item, i) => (
                  <li key={i}>
                    <span className="check-icon">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Comparative Section */}
      <section className="comparison-section">
        <div className="section-header">
          <span className="section-tag">DIFERENCIAL TÉCNICO</span>
          <h2 className="section-title">Por Que Aprender Algoritmos é Crucial?</h2>
          <p className="section-subtitle">
            A diferença entre quem só copia soluções prontas e quem é capaz de arquitetar sistemas de alta performance.
          </p>
        </div>

        <div className="comparison-grid">
          <div className="compare-card compare-negative">
            <div className="compare-badge negative">❌ Programadores sem Fundamentos</div>
            <h3>O "Código Sem Consciência"</h3>
            <ul className="compare-list">
              <li>Não entendem o consumo de memória de arrays e objetos</li>
              <li>Utilizam laços aninhados O(n²) sem perceber o travamento da CPU</li>
              <li>Travam em entrevistas técnicas de Big Techs (LeetCode/HackerRank)</li>
              <li>Não sabem quando usar uma Tabela Hash vs Lista vs Árvore</li>
              <li>Ficam reféns da sintaxe do framework da moda</li>
            </ul>
          </div>

          <div className="compare-card compare-positive">
            <div className="compare-badge positive">🏛️ Engenheiros com Base Algorítmica</div>
            <h3>Pensamento Computacional</h3>
            <ul className="compare-list">
              <li>Dominam a alocação de memória (Stack e Heap) com precisão</li>
              <li>Calculam complexidade de tempo e espaço com Notação Big-O</li>
              <li>Escolhem a estrutura de dados correta para cada problema de negócio</li>
              <li>Implementam ordenações rápidas e buscas logarítmicas O(log n)</li>
              <li>Aprendem qualquer linguagem ou framework em questão de dias</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Modules Explorer */}
      <section className="modules-explorer-section">
        <div className="section-header">
          <span className="section-tag">GRADE CURRICULAR COMPLETA</span>
          <h2 className="section-title">Explore os 10 Módulos Práticos</h2>
          <p className="section-subtitle">
            Cada módulo é acompanhado de visualizadores e simuladores interativos em tempo real.
          </p>
        </div>

        <div className="phase-filters">
          <button
            className={`filter-tab ${selectedPhase === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedPhase('all')}
          >
            <span>Todos os Módulos ({LOGICA_MODULES.length})</span>
          </button>
          <button
            className={`filter-tab ${selectedPhase === 1 ? 'active' : ''}`}
            onClick={() => setSelectedPhase(1)}
          >
            <span>🧠 Fase 1: Alicerce (01-03)</span>
          </button>
          <button
            className={`filter-tab ${selectedPhase === 2 ? 'active' : ''}`}
            onClick={() => setSelectedPhase(2)}
          >
            <span>🌳 Fase 2: Estruturas (04-06)</span>
          </button>
          <button
            className={`filter-tab ${selectedPhase === 3 ? 'active' : ''}`}
            onClick={() => setSelectedPhase(3)}
          >
            <span>⚡ Fase 3: Algoritmos & Arena (07-10)</span>
          </button>
        </div>

        <div className="modules-grid">
          {filteredModules.map((mod) => (
            <Link key={mod.id} to={`/${mod.id}`} className="module-card">
              <div className="module-card-top">
                <div className="mod-icon-wrapper">
                  <span className="mod-icon">{mod.icon}</span>
                </div>
                <div className="mod-badge-group">
                  <span className="mod-num-badge">MÓDULO {mod.number}</span>
                  <span className="level-chip" data-level={mod.level}>
                    {mod.level}
                  </span>
                </div>
              </div>

              <div className="mod-phase-sub">{mod.phaseName}</div>
              <h4 className="module-card-title">{mod.title}</h4>
              <p className="module-card-desc">{mod.shortDesc}</p>

              <div className="module-tags">
                {mod.tags.map((tag, i) => (
                  <span key={i} className="mod-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="module-card-footer">
                <span className="card-action-btn">
                  <span>Acessar Laboratório</span>
                  <span className="arrow-icon">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Final Call To Action */}
      <section className="final-cta">
        <span className="cta-emoji">⚡</span>
        <h2>Pronto para dominar os fundamentos da Ciência da Computação?</h2>
        <p>
          Inicie agora pelo Módulo 01 e descubra como a memória do computador trabalha nos bastidores.
        </p>
        <Link to="/modulo-01-fundamentos-memoria" className="btn btn-primary btn-lg">
          Começar pelo Módulo 01 (Memória & Big-O) →
        </Link>
      </section>
    
        
        
        
        
      
</div>
  );
};
