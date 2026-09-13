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
          Ponteiros, alocação não-contígua na memória e como resolver o grande problema de performance de Arrays.
        </p>
      </div>

      {/* SEÇÃO: 📖 Teoria Completa */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria Completa & Padrões Visuais</h2>
        
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Tópico 1 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📦 1. O Problema do Array Clássico
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Um Array (Vetor) na memória C++ ou Java precisa de um <strong>bloco de memória contíguo</strong> (todas as caixinhas coladas umas nas outras).
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Isso torna a leitura incrivelmente rápida O(1). Mas se você quiser inserir um item no INÍCIO do array, o computador precisará empurrar todos os outros milhões de itens uma casa para o lado para abrir espaço. Custo: <strong>O(N)</strong>!
                </p>
              </div>
              <div>
                <img 
                  src="https://placehold.co/600x400/fee2e2/991b1b?text=Mem%C3%B3ria+Cont%C3%ADgua%5Cn%5Cn%5B+A+%5D+%5B+B+%5D+%5B+C+%5D%5Cn%5CnQuer+colocar+um+%27Z%27+no+in%C3%ADcio%3F%5CnEmpurra+todo+mundo+pro+lado%21" 
                  alt="Esquema de Arrays Fixos" 
                  style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

          {/* Tópico 2 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🔗 2. A Solução: Listas Encadeadas (Linked Lists)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ order: 2 }}>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  A Lista Encadeada abandona a obrigação de memória contígua. Cada pedaço da lista (chamado de <strong>Nó</strong> ou Node) guarda duas coisas: o seu próprio <strong>Valor</strong>, e uma setinha mágica apontando para o <strong>Próximo Nó</strong>.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Graças a isso, os nós podem ficar espalhados em qualquer buraco do Heap. E para inserir um nó novo no início, basta mudar uma setinha. O resto da lista nem fica sabendo! Custo de inserção: <strong>O(1)</strong>!
                </p>
              </div>
              <div style={{ order: 1 }}>
                <img 
                  src="https://placehold.co/600x400/e0f2fe/0369a1?text=Mem%C3%B3ria+Dispersa%5Cn%5CnHEAD+%E2%86%92+%5B+Val+%7C+Next+%5D+%E2%86%92+%5B+Val+%7C+Next+%5D+%E2%86%92+NULL%5Cn%5CnPara+inserir+no+meio%2C%5Cn%C3%A9+s%C3%B3+trocar+o+fio%21" 
                  alt="Esquema Lista Encadeada" 
                  style={{ width: '100%', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />
          
          {/* Tópico 3 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ⚖️ 3. O Grande Trato (Trade-off)
            </h3>
            <div className="table-responsive" style={{ marginTop: '0.75rem' }}>
              <table>
                <thead>
                  <tr>
                    <th>Operação</th>
                    <th>Array (Vetor Clássico)</th>
                    <th>Lista Encadeada Simples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Acesso por índice (Ex: <code>[500]</code>)</td>
                    <td><strong style={{ color: '#16a34a' }}>O(1)</strong> Super Rápido</td>
                    <td><strong style={{ color: '#dc2626' }}>O(N)</strong> Precisa pular nó a nó do início até o 500.</td>
                  </tr>
                  <tr>
                    <td>Inserir/Remover do INÍCIO (Head)</td>
                    <td><strong style={{ color: '#dc2626' }}>O(N)</strong> (Desloca todo mundo)</td>
                    <td><strong style={{ color: '#16a34a' }}>O(1)</strong> Apenas muda o ponteiro do Head.</td>
                  </tr>
                  <tr>
                    <td>Alocação de Memória RAM</td>
                    <td>Tamanho rígido. Blocão fechado.</td>
                    <td>Dinâmica e espalhada (mas gasta mais memória extra para guardar os ponteiros).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>
        
      {/* SEÇÃO: 💻 Exemplos Práticos */}
      <section className="module-section">
        <h2 className="section-title">💻 Como fazer no Código?</h2>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            A Classe do Nó (Node) e a LinkedList em TypeScript
          </h3>
          <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            O nó não sabe quem está antes dele, apenas guarda um ponteiro <code>next</code>. Se ele for o último, seu <code>next</code> apontará para nulo.
          </p>
          <pre>
            <code>{`// A estrutura de cada Caixinha
class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null; // O fio mágico que aponta pro vizinho

  constructor(value: T) {
    this.value = value;
  }
}

// O Gerenciador da Lista
export class LinkedList<T> {
  head: ListNode<T> | null = null; // Aponta sempre para a primeira caixa da lista

  insertAtHead(value: T): void {
    const newNode = new ListNode(value);
    newNode.next = this.head; // O novo nó aponta pro antigo primeiro nó
    this.head = newNode;      // A coroa (head) é passada pro novo nó
  }
}`}</code>
          </pre>
        </div>
      </section>
        
      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática: O Laboratório Computacional</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: '#0369a1' }}>
              🔗 Simulador Visual de Lista Simplesmente Encadeada (Singly Linked List)
            </h3>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Adicione nós no início (Rápido O(1)) ou no fim, e veja como o ponteiro HEAD e os ponteiros "next" fluem da esquerda para a direita.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center' }}>
              <input
                type="text"
                className="input"
                placeholder="Valor numérico/texto..."
                value={nodeInput}
                onChange={e => setNodeInput(e.target.value)}
                style={{ width: '220px' }}
              />
              <button onClick={handleInsertHead} className="btn btn-primary btn-sm">
                + Inserir HEAD (O(1))
              </button>
              <button onClick={handleInsertTail} className="btn btn-secondary btn-sm">
                + Inserir TAIL (O(n))
              </button>
              
              <div style={{ width: '1px', height: '30px', background: '#cbd5e1', margin: '0 0.5rem' }}></div>
              
              <button onClick={handleRemoveHead} className="btn btn-danger btn-sm" disabled={nodes.length === 0}>
                - Remover HEAD (O(1))
              </button>
              <button onClick={handleRemoveTail} className="btn btn-danger btn-sm" disabled={nodes.length === 0}>
                - Remover TAIL (O(n))
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
                border: '1.5px dashed var(--neutral-300)',
                borderRadius: 'var(--radius-md)',
                minHeight: '130px'
              }}
            >
              <span className="badge badge-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                HEAD
              </span>
              <span style={{ color: '#059669', fontWeight: 800, fontSize: '1.2rem' }}>→</span>

              {nodes.length === 0 ? (
                <span style={{ color: '#94a3b8', fontStyle: 'italic', margin: '0 1rem' }}>A lista está vazia (HEAD aponta para NULL)</span>
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
                      <div style={{ padding: '0.8rem 1.1rem', fontWeight: 800, color: '#0f172a', fontSize: '1.1rem', minWidth: '40px', textAlign: 'center' }}>
                        {n.value}
                      </div>
                      <div style={{ padding: '0.8rem 0.75rem', background: '#ecfdf5', borderLeft: '1px solid #a7f3d0', fontSize: '0.75rem', color: '#059669', display: 'flex', alignItems: 'center', fontFamily: 'var(--font-mono)' }} title="Ponteiro NEXT">
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
            
            <p style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '1rem', textAlign: 'center' }}>
              Para uma inserção O(1) também no fim da lista, guardaríamos um ponteiro para a cauda (<strong>TAIL</strong>). 
              Se precisássemos andar de trás para frente, usaríamos a <strong>Lista Duplamente Encadeada (Doubly Linked List)</strong> (cada nó guarda um ponteiro PREV além do NEXT).
            </p>
          </div>
        </div>
      </section>
        
      {/* SEÇÃO: 🛡️ Boas Práticas */}
      <section className="module-section">
        <h2 className="section-title">🛡️ Boas Práticas & Mercado</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="alert alert-success">
            <div>
              <strong>Uso Prático em Sistemas e Entrevistas:</strong> Listas encadeadas são o motor escondido das famosas <strong>Filas (Queues)</strong> em bibliotecas profissionais, garantindo o tempo O(1). Inverter uma Lista Encadeada (<em>Reverse a Linked List</em>) é de longe a questão técnica de algoritmos mais cobrada em entrevistas do Google, Meta, Uber e Amazon. Se você domina a dança dos 3 ponteiros (prev, curr, next), você passa na entrevista!
            </div>
          </div>
        </div>
      </section>
        
    </div>
  );
};
