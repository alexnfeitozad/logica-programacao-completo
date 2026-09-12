import React, { useState } from 'react';

export const Modulo02PilhasFilas: React.FC = () => {
  
  // Estado da Pilha (Stack - LIFO)
  const [stackItems, setStackItems] = useState<string[]>(['Página Home', 'Página Cursos', 'Aula 03']);
  const [stackInput, setStackInput] = useState('');

  // Estado da Fila (Queue - FIFO)
  const [queueItems, setQueueItems] = useState<string[]>(['Impressão #1', 'E-mail Boas-Vindas', 'Notificação Push']);
  const [queueInput, setQueueInput] = useState('');

  // Ações da Pilha
  const handlePushStack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stackInput.trim()) return;
    setStackItems(prev => [stackInput.trim(), ...prev]);
    setStackInput('');
  };

  const handlePopStack = () => {
    if (stackItems.length === 0) return;
    setStackItems(prev => prev.slice(1));
  };

  // Ações da Fila
  const handleEnqueue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queueInput.trim()) return;
    setQueueItems(prev => [...prev, queueInput.trim()]);
    setQueueInput('');
  };

  const handleDequeue = () => {
    if (queueItems.length === 0) return;
    setQueueItems(prev => prev.slice(1));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 1: Alicerce da Computação</span>
          <span className="badge badge-neutral">Módulo 02</span>
        </div>
        <h1>Pilhas (LIFO) & Filas (FIFO)</h1>
        <p className="subtitle">
          Estruturas lineares fundamentais com animação visual de Push, Pop, Enqueue e Dequeue.
        </p>
      </div>

      

      

      

      

      
    
        
      {/* SEÇÃO: 📖 Teoria */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Operações e Complexidades
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>
              Tanto em Pilhas quanto em Filas otimizadas, as operações fundamentais (inserção e remoção no topo/frente) possuem complexidade <strong>O(1) tempo constante</strong>.
            </p>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 💻 Exemplos Práticos */}
      <section className="module-section">
        <h2 className="section-title">💻 Exemplos Práticos</h2>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Implementação de Pilha Genérica com TypeScript
          </h3>
          <pre>
            <code>{`export class Stack<T> {
  private items: T[] = [];

  push(element: T): void {
    this.items.push(element);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}`}</code>
          </pre>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática / Simulador</h2>
        <div className="grid-2">
          {/* Simulador de Pilha */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                🥞 Pilha (Stack — LIFO)
              </h3>
              <span className="badge badge-primary">Last-In, First-Out</span>
            </div>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              O último elemento adicionado é o primeiro a ser removido (ex: Histórico de Navegação, Ctrl+Z, Call Stack).
            </p>

            <form onSubmit={handlePushStack} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input
                type="text"
                className="input"
                placeholder="Novo item na pilha..."
                value={stackInput}
                onChange={e => setStackInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-sm">Push</button>
              <button type="button" onClick={handlePopStack} className="btn btn-danger btn-sm" disabled={stackItems.length === 0}>
                Pop
              </button>
            </form>

            <div style={{ minHeight: '220px', background: '#f8fafc', border: '2px dashed var(--neutral-200)', borderRadius: 'var(--radius-md)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', justifyContent: 'flex-start' }}>
              {stackItems.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#94a3b8', margin: 'auto' }}>A pilha está vazia.</div>
              ) : (
                stackItems.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '0.75rem 1rem',
                      background: idx === 0 ? '#ecfdf5' : '#ffffff',
                      border: `1.5px solid ${idx === 0 ? '#10b981' : 'var(--neutral-200)'}`,
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <span>{item}</span>
                    {idx === 0 && <span className="badge badge-success">Topo (Next Pop)</span>}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Simulador de Fila */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                🚶‍♂️ Fila (Queue — FIFO)
              </h3>
              <span className="badge badge-primary">First-In, First-Out</span>
            </div>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              O primeiro elemento que entra é o primeiro a ser atendido (ex: Fila de tarefas assíncronas, fila de impressão).
            </p>

            <form onSubmit={handleEnqueue} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input
                type="text"
                className="input"
                placeholder="Novo item na fila..."
                value={queueInput}
                onChange={e => setQueueInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-sm">Enqueue</button>
              <button type="button" onClick={handleDequeue} className="btn btn-danger btn-sm" disabled={queueItems.length === 0}>
                Dequeue
              </button>
            </form>

            <div style={{ minHeight: '220px', background: '#f8fafc', border: '2px dashed var(--neutral-200)', borderRadius: 'var(--radius-md)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', justifyContent: 'flex-start' }}>
              {queueItems.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#94a3b8', margin: 'auto' }}>A fila está vazia.</div>
              ) : (
                queueItems.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '0.75rem 1rem',
                      background: idx === 0 ? '#ecfdf5' : idx === queueItems.length - 1 ? '#eff6ff' : '#ffffff',
                      border: `1.5px solid ${idx === 0 ? '#10b981' : idx === queueItems.length - 1 ? '#0284c7' : 'var(--neutral-200)'}`,
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    <span>{item}</span>
                    {idx === 0 && <span className="badge badge-success">Frente (Next Out)</span>}
                    {idx === queueItems.length - 1 && idx !== 0 && <span className="badge badge-primary">Fim da Fila</span>}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🛡️ Boas Práticas */}
      <section className="module-section">
        <h2 className="section-title">🛡️ Boas Práticas</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="alert alert-info">
            <div>
              <strong>Armadilha de Fila com Array:</strong> Fazer <code>array.shift()</code> para implementar uma fila em JavaScript é <strong>O(n)</strong> porque obriga todos os índices a serem reindexados na memória. Em produção com milhões de itens, implemente com Lista Encadeada para garantir <strong>O(1)</strong>.
            </div>
          </div>
        </div>
      </section>
        
      
</div>
  );
};
