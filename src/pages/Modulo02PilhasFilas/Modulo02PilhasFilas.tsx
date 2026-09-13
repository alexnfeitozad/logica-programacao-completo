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
          Estruturas de dados lineares fundamentais para controle de fluxo. Entenda como o "Desfazer" e as "Impressões" funcionam por debaixo dos panos.
        </p>
      </div>
        
      {/* SEÇÃO: 📖 Teoria Completa */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria Completa & Padrões Visuais</h2>
        
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Tópico 1 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🥞 1. Pilhas (Stack) e a regra LIFO
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  A Pilha funciona como uma pilha de pratos reais. Você só pode colocar um prato no topo (<strong>Push</strong>) e só pode tirar o prato do topo (<strong>Pop</strong>).
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Esta regra é chamada de <strong>LIFO</strong> (<em>Last In, First Out</em> - O Último a Entrar é o Primeiro a Sair). É assim que o botão "Voltar" do navegador ou o "Ctrl+Z" (Desfazer) do seu editor funcionam!
                </p>
              </div>
              <div>
                <img 
                  src="https://placehold.co/600x400/e0f2fe/0369a1?text=A%5Cn%E2%86%93%5CnB%5Cn%E2%86%93%5CnC%5Cn%5CnO+%C3%BAlitmo+a+entrar+(A)%5Cn%C3%A9+o+primeiro+a+sair%21" 
                  alt="Esquema da Pilha" 
                  style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

          {/* Tópico 2 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🚶‍♂️ 2. Filas (Queue) e a regra FIFO
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ order: 2 }}>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  A Fila funciona exatamente como uma fila de banco. Você entra no final da fila (<strong>Enqueue</strong>) e é atendido quando chega na frente (<strong>Dequeue</strong>).
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Esta regra é chamada de <strong>FIFO</strong> (<em>First In, First Out</em> - O Primeiro a Entrar é o Primeiro a Sair). É assim que a sua impressora gerencia 10 documentos mandados de uma vez, ou como os servidores lidam com milhares de requisições web.
                </p>
              </div>
              <div style={{ order: 1 }}>
                <img 
                  src="https://placehold.co/600x400/fef2f2/991b1b?text=%5B+Frente+%5D+%E2%86%90+A+%E2%86%90+B+%E2%86%90+C+%5B+Fim+%5D%5Cn%5CnO+primeiro+a+chegar+(A)%5Cn%C3%A9+o+primeiro+a+ser+atendido%21" 
                  alt="Esquema da Fila" 
                  style={{ width: '100%', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

        </div>
      </section>
        
      {/* SEÇÃO: 💻 Exemplos Práticos */}
      <section className="module-section">
        <h2 className="section-title">💻 Como fazer no Código?</h2>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Implementação de Pilha Genérica com TypeScript
          </h3>
          <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Abaixo criamos uma classe protegida para garantir que ninguém consiga acessar os itens do meio, forçando o comportamento correto de Pilha (só acessando o Topo).
          </p>
          <pre>
            <code>{`export class Stack<T> {
  private items: T[] = []; // O modificador 'private' é crucial aqui!

  // Adiciona ao Topo (Final do Array)
  push(element: T): void {
    this.items.push(element);
  }

  // Remove do Topo (Final do Array)
  pop(): T | undefined {
    return this.items.pop();
  }

  // Olha quem está no Topo sem remover
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
}`}</code>
          </pre>
        </div>
      </section>
        
      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática: O Laboratório Computacional</h2>
        <div className="grid-2">
          
          {/* Simulador de Pilha */}
          <div className="glass-card" style={{ borderTop: '4px solid #10b981' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                🥞 Pilha (Stack)
              </h3>
              <span className="badge badge-success">LIFO</span>
            </div>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              Histórico de Navegação: Adicione as páginas que você visitou.
            </p>

            <form onSubmit={handlePushStack} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input
                type="text"
                className="input"
                placeholder="Ex: Pagamento..."
                value={stackInput}
                onChange={e => setStackInput(e.target.value)}
              />
              <button type="submit" className="btn btn-success btn-sm">Push</button>
              <button type="button" onClick={handlePopStack} className="btn btn-danger btn-sm" disabled={stackItems.length === 0}>
                Pop (Voltar)
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
                      border: '1.5px solid ' + (idx === 0 ? '#10b981' : 'var(--neutral-200)'),
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
          <div className="glass-card" style={{ borderTop: '4px solid #0ea5e9' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                🚶‍♂️ Fila (Queue)
              </h3>
              <span className="badge badge-primary">FIFO</span>
            </div>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              Spooler de Impressão: Adicione documentos para imprimir.
            </p>

            <form onSubmit={handleEnqueue} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input
                type="text"
                className="input"
                placeholder="Ex: Boleto..."
                value={queueInput}
                onChange={e => setQueueInput(e.target.value)}
              />
              <button type="submit" className="btn btn-primary btn-sm">Enqueue</button>
              <button type="button" onClick={handleDequeue} className="btn btn-danger btn-sm" disabled={queueItems.length === 0}>
                Dequeue (Imprimir)
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
                      background: idx === 0 ? '#f0fdfa' : idx === queueItems.length - 1 ? '#eff6ff' : '#ffffff',
                      border: '1.5px solid ' + (idx === 0 ? '#0d9488' : idx === queueItems.length - 1 ? '#0ea5e9' : 'var(--neutral-200)'),
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
                    {idx === 0 && <span className="badge" style={{ background: '#0d9488', color: '#fff', border: 'none' }}>Frente (Next Out)</span>}
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
        <h2 className="section-title">🛡️ Boas Práticas & Mercado</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div className="alert alert-warning">
            <div>
              <strong>A Armadilha da Fila com Array:</strong> Na linguagem JavaScript, o <code>array.push()</code> e o <code>array.pop()</code> são operações extremamente rápidas (Tempo <strong>O(1)</strong>). É por isso que arrays nativos são excelentes para <strong>Pilhas</strong>.
            </div>
          </div>

          <div className="alert alert-danger">
            <div>
              <strong>O perigo do shift():</strong> No entanto, se você tentar implementar uma <strong>Fila</strong> usando <code>array.shift()</code> para remover o primeiro elemento, o motor V8 do JavaScript será obrigado a reindexar TODOS os elementos restantes (O índice 1 vira 0, o 2 vira 1, etc). Isso custa tempo <strong>O(N)</strong>. Se sua fila de servidor tiver 1 milhão de tarefas, o <code>shift()</code> destruirá a sua CPU. Para filas gigantes, usamos <strong>Listas Encadeadas (Linked Lists)</strong>!
            </div>
          </div>

        </div>
      </section>
        
    </div>
  );
};
