import React, { useState } from 'react';

interface NodeItem {
  id: string;
  value: string;
}

export const Modulo03Listas: React.FC = () => {
  
  const [nodes, setNodes] = useState<NodeItem[]>([
    { id: '1', value: '10' },
    { id: '2', value: '25' },
    { id: '3', value: '42' },
  ]);
  const [nodeInput, setNodeInput] = useState('');

  const handleInsertHead = () => {
    if (!nodeInput.trim()) return;
    setNodes(prev => [{ id: String(Date.now()), value: nodeInput.trim() }, ...prev]);
    setNodeInput('');
  };

  const handleInsertTail = () => {
    if (!nodeInput.trim()) return;
    setNodes(prev => [...prev, { id: String(Date.now()), value: nodeInput.trim() }]);
    setNodeInput('');
  };

  const handleRemoveHead = () => {
    if (nodes.length === 0) return;
    setNodes(prev => prev.slice(1));
  };

  const handleRemoveTail = () => {
    if (nodes.length === 0) return;
    setNodes(prev => prev.slice(0, -1));
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 1: Alicerce da Computação</span>
          <span className="badge badge-neutral">Módulo 03</span>
        </div>
        <h1>Listas Encadeadas (Linked Lists)</h1>
        <p className="subtitle">
          Ponteiros, alocação não-contígua na memória e listas simplesmente e duplamente encadeadas.
        </p>
      </div>

      

      

      

      

      
    
        
      {/* SEÇÃO: 📖 Teoria */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Array Tradicional vs Lista Encadeada
            </h3>
            <div className="table-responsive" style={{ marginTop: '0.75rem' }}>
              <table>
                <thead>
                  <tr>
                    <th>Operação</th>
                    <th>Array (Vetor)</th>
                    <th>Lista Encadeada</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Acesso por índice (<code>[i]</code>)</td>
                    <td><strong style={{ color: '#16a34a' }}>O(1)</strong> Instantâneo</td>
                    <td><strong>O(n)</strong> Precisa percorrer os ponteiros</td>
                  </tr>
                  <tr>
                    <td>Inserção / Remoção no Início</td>
                    <td><strong>O(n)</strong> Reindexação de memória</td>
                    <td><strong style={{ color: '#16a34a' }}>O(1)</strong> Apenas troca de ponteiro</td>
                  </tr>
                  <tr>
                    <td>Alocação de Memória</td>
                    <td>Bloco contíguo (tamanho pré-alocado)</td>
                    <td>Dinâmica e dispersa nó a nó no Heap</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 💻 Exemplos Práticos */}
      <section className="module-section">
        <h2 className="section-title">💻 Exemplos Práticos</h2>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Nó e Lista Simplesmente Encadeada em TypeScript
          </h3>
          <pre>
            <code>{`class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

export class LinkedList<T> {
  head: ListNode<T> | null = null;

  insertAtHead(value: T): void {
    const newNode = new ListNode(value);
    newNode.next = this.head;
    this.head = newNode;
  }
}`}</code>
          </pre>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática / Simulador</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              🔗 Simulador Gráfico de Lista Simplesmente Encadeada
            </h3>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Diferente de um Array fixo, os nós de uma lista encadeada estão espalhados na memória e cada um guarda o endereço do próximo nó (<code>next</code>).
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <input
                type="text"
                className="input"
                placeholder="Valor do nó..."
                value={nodeInput}
                onChange={e => setNodeInput(e.target.value)}
                style={{ width: '180px' }}
              />
              <button onClick={handleInsertHead} className="btn btn-primary btn-sm">
                + Inserir no Início O(1)
              </button>
              <button onClick={handleInsertTail} className="btn btn-primary btn-sm">
                + Inserir no Fim O(n)
              </button>
              <button onClick={handleRemoveHead} className="btn btn-danger btn-sm" disabled={nodes.length === 0}>
                - Remover do Início O(1)
              </button>
              <button onClick={handleRemoveTail} className="btn btn-danger btn-sm" disabled={nodes.length === 0}>
                - Remover do Fim
              </button>
            </div>

            {/* Visualizer dos Nós */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                overflowX: 'auto',
                padding: '2rem 1rem',
                background: '#f8fafc',
                border: '1.5px solid var(--neutral-200)',
                borderRadius: 'var(--radius-md)',
                minHeight: '130px'
              }}
            >
              <span className="badge badge-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                HEAD
              </span>
              <span style={{ color: '#059669', fontWeight: 800, fontSize: '1.2rem' }}>→</span>

              {nodes.length === 0 ? (
                <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>Lista vazia (HEAD aponta para NULL)</span>
              ) : (
                nodes.map((n) => (
                  <React.Fragment key={n.id}>
                    <div
                      style={{
                        display: 'flex',
                        background: '#ffffff',
                        border: '2px solid #059669',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-sm)',
                        overflow: 'hidden',
                        flexShrink: 0
                      }}
                    >
                      <div style={{ padding: '0.8rem 1.1rem', fontWeight: 800, color: '#0f172a', fontSize: '1.1rem' }}>
                        {n.value}
                      </div>
                      <div style={{ padding: '0.8rem 0.75rem', background: '#ecfdf5', borderLeft: '1px solid #a7f3d0', fontSize: '0.75rem', color: '#059669', display: 'flex', alignItems: 'center', fontFamily: 'var(--font-mono)' }}>
                        next
                      </div>
                    </div>
                    <span style={{ color: '#059669', fontWeight: 800, fontSize: '1.2rem' }}>→</span>
                  </React.Fragment>
                ))
              )}

              <span className="badge badge-neutral" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                NULL
              </span>
            </div>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🛡️ Boas Práticas */}
      <section className="module-section">
        <h2 className="section-title">🛡️ Boas Práticas</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="alert alert-success">
            <div>
              <strong>Uso em Entrevistas:</strong> Inverter uma Lista Encadeada (<em>Reverse Linked List</em>) é a questão número #1 de entrevistas técnicas em empresas como Google, Meta e Amazon.
            </div>
          </div>
        </div>
      </section>
        
      
</div>
  );
};
