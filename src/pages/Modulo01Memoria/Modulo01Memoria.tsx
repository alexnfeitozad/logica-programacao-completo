import React, { useState } from 'react';

export const Modulo01Memoria: React.FC = () => {
  
  // Interactive Big-O Visualizer State
  const [inputSize, setInputSize] = useState(16);

  // Memory Simulation State
  const [stackMemory, setStackMemory] = useState<string[]>([
    'main() [Frame Base]',
    'let x: number = 42',
    'let ptr: 0x7FFE -> Heap'
  ]);
  const [heapMemory, setHeapMemory] = useState<{ address: string; value: string }[]>([
    { address: '0x7FFE', value: '{ id: 1, nome: "Objeto Alocado" }' }
  ]);

  const handlePushStack = () => {
    const frameId = stackMemory.length + 1;
    setStackMemory(prev => [`calcularTaxa() [Frame #${frameId}]`, ...prev]);
  };

  const handlePopStack = () => {
    if (stackMemory.length <= 1) return;
    setStackMemory(prev => prev.slice(1));
  };

  const handleAllocateHeap = () => {
    const hex = '0x' + Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
    setHeapMemory(prev => [...prev, { address: hex, value: `Array[${Math.floor(Math.random() * 1000)}]` }]);
  };

  const o1 = 1;
  const oLogN = Math.round(Math.log2(inputSize));
  const oN = inputSize;
  const oNLogN = Math.round(inputSize * Math.log2(inputSize));
  const oN2 = inputSize * inputSize;

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 1: Alicerce da Computação</span>
          <span className="badge badge-neutral">Módulo 01</span>
        </div>
        <h1>Memória & Complexidade Big-O</h1>
        <p className="subtitle">
          Entenda como computadores executam código: Stack vs Heap, Ponteiros e Análise Assintótica Big-O. Onde a magia realmente acontece.
        </p>
      </div>
        
      {/* SEÇÃO: 📖 Teoria Completa */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria Completa & Padrões Visuais</h2>
        
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Tópico 1 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🧠 1. Memória RAM: Stack vs Heap
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Quando um programa roda, ele precisa guardar variáveis. A RAM divide esse trabalho em duas áreas principais:
                </p>
                <ul style={{ color: '#475569', lineHeight: 1.6, paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                  <li><strong>Call Stack (Pilha):</strong> Muito rápida, organizada. Guarda variáveis simples (números, booleanos) e a "ordem" em que as funções foram chamadas. Tamanho limitado (Stack Overflow).</li>
                  <li><strong>Heap (Monte):</strong> Uma bagunça gigante. Guarda dados dinâmicos e pesados (Objetos, Arrays). Para acessá-los, a Stack guarda um <em>Ponteiro</em> que indica o endereço no Heap.</li>
                </ul>
              </div>
              <div>
                <img 
                  src="https://placehold.co/600x400/e0f2fe/0369a1?text=STACK+(R%C3%A1pida)%5Cn%5B+Fun%C3%A7%C3%A3o+B+%5D%5Cn%5B+Fun%C3%A7%C3%A3o+A+%5D%5Cn%5Cnv%5CnHEAP+(Bagun%C3%A7a)%5Cn%7B+Objeto+Gigante+%7D" 
                  alt="Stack vs Heap" 
                  style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

          {/* Tópico 2 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ⏱️ 2. Big-O: A Matemática do Código
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ order: 2 }}>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  A Notação Big-O não mede "segundos". Computadores rápidos podem executar código lento rapidamente. Big-O mede <strong>como o número de operações cresce</strong> à medida que a entrada de dados (N) aumenta.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Sempre analisamos o <strong>Pior Cenário</strong>. Se você procura um número num Array de 100 itens, o número pode ser o primeiro (O(1)), mas assumimos que ele é o último e teremos que olhar todos (O(N)).
                </p>
              </div>
              <div style={{ order: 1 }}>
                <img 
                  src="https://placehold.co/600x400/fef2f2/991b1b?text=Gr%C3%A1fico+Big-O%5Cn%5CnO(N%C2%B2)+%3E+Sobe+R%C3%A1pido!%5CnO(N)+%3E+Diagonal%5CnO(1)+%3E+Linha+Reta+(Perfeito)" 
                  alt="Gráfico Big-O" 
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
            Passagem por Valor vs Referência em TypeScript
          </h3>
          <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Isso é a causa número 1 de bugs misteriosos para iniciantes. Tipos primitivos moram na Stack, Objetos moram no Heap.
          </p>
          <pre>
            <code>{`// Primitivo: alocado diretamente na Call Stack (cópia por valor)
let a = 10;
let b = a;
b = 20; // 'a' continua sendo 10! Eles são independentes.

// Objeto: alocado no Heap (cópia de ponteiro / referência)
let obj1 = { valor: 10 };
let obj2 = obj1; // Você NÃO copiou o objeto. Copiou apenas o Endereço de Memória!
obj2.valor = 20; // 'obj1.valor' também mudou para 20! Estão conectados.`}</code>
          </pre>
        </div>
      </section>
        
      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática: O Laboratório Computacional</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Lab 1: Stack vs Heap */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: '#0369a1' }}>
              🔬 Laboratório 1: Simulador de Memória do Processador
            </h3>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Adicione Frames na Pilha (Stack) e aloje objetos no Monte (Heap) para ver como eles se comportam.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <button onClick={handlePushStack} className="btn btn-primary btn-sm">
                + Função (Push Stack)
              </button>
              <button onClick={handlePopStack} className="btn btn-secondary btn-sm">
                - Função (Pop Stack)
              </button>
              <button onClick={handleAllocateHeap} className="btn btn-success btn-sm" style={{ marginLeft: 'auto' }}>
                + Objeto (Alocar Heap)
              </button>
            </div>

            <div className="grid-2">
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-200)' }}>
                <h4 style={{ fontWeight: 700, marginBottom: '1rem', color: '#0f172a' }}>
                  🥞 Call Stack (LIFO)
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {stackMemory.map((frame, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '0.65rem 0.85rem',
                        background: idx === 0 ? '#ecfdf5' : '#ffffff',
                        border: `1.5px solid ${idx === 0 ? '#10b981' : 'var(--neutral-200)'}`,
                        borderRadius: 'var(--radius-sm)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span>{frame}</span>
                      {idx === 0 && <span className="badge badge-success">Topo da Pilha</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ color: '#34d399', fontWeight: 700, marginBottom: '1rem' }}>
                  📦 Heap Memory
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                  {heapMemory.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '0.6rem 0.85rem',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span style={{ color: '#38bdf8' }}>{item.address}</span>
                      <span style={{ color: '#cbd5e1' }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lab 2: Big-O Comparador */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: '#b91c1c' }}>
              📈 Laboratório 2: Comparador Interativo de Notação Big-O
            </h3>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Altere o tamanho da entrada <strong>N</strong> e veja quantas operações cada classe de algoritmo exige do processador (Pior Cenário):
            </p>

            <div style={{ marginBottom: '1.5rem', maxWidth: '480px', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#334155', display: 'flex', justifyContent: 'space-between' }}>
                <span>Tamanho da Entrada (N):</span>
                <strong style={{ color: '#3b82f6', fontSize: '1.1rem' }}>{inputSize} elementos</strong>
              </label>
              <input
                type="range"
                min="4"
                max="128"
                step="4"
                value={inputSize}
                onChange={e => setInputSize(Number(e.target.value))}
                style={{ width: '100%', marginTop: '0.75rem', cursor: 'pointer' }}
              />
            </div>

            <div className="table-responsive">
              <table style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Complexidade</th>
                    <th>Classificação</th>
                    <th>Operações (N={inputSize})</th>
                    <th>Exemplo Prático</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: '#f0fdf4' }}>
                    <td><strong style={{ color: '#16a34a' }}>O(1)</strong></td>
                    <td>Excelente (Constante)</td>
                    <td><strong style={{ color: '#16a34a' }}>{o1} operação</strong></td>
                    <td>Acesso a array por índice (<code>arr[0]</code>)</td>
                  </tr>
                  <tr style={{ background: '#f0fdfa' }}>
                    <td><strong style={{ color: '#0d9488' }}>O(log n)</strong></td>
                    <td>Muito Bom (Logarítmica)</td>
                    <td><strong style={{ color: '#0d9488' }}>{oLogN} operações</strong></td>
                    <td>Busca Binária</td>
                  </tr>
                  <tr style={{ background: '#fffbeb' }}>
                    <td><strong style={{ color: '#d97706' }}>O(n)</strong></td>
                    <td>Aceitável (Linear)</td>
                    <td><strong style={{ color: '#d97706' }}>{oN} operações</strong></td>
                    <td>Percorrer array inteiro (for)</td>
                  </tr>
                  <tr style={{ background: '#fef3c7' }}>
                    <td><strong style={{ color: '#b45309' }}>O(n log n)</strong></td>
                    <td>Moderado (Quasilinear)</td>
                    <td><strong style={{ color: '#b45309' }}>{oNLogN} operações</strong></td>
                    <td>Merge Sort, Quick Sort</td>
                  </tr>
                  <tr style={{ background: '#fef2f2' }}>
                    <td><strong style={{ color: '#dc2626' }}>O(n²)</strong></td>
                    <td>Perigo (Quadrática)</td>
                    <td><strong style={{ color: '#dc2626' }}>{oN2} operações</strong></td>
                    <td>Laços aninhados (for dentro de for)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
        
      {/* SEÇÃO: 🛡️ Boas Práticas */}
      <section className="module-section">
        <h2 className="section-title">🛡️ Boas Práticas & Mercado</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div className="alert alert-danger">
            <div>
              <strong>Evite O(N²) acidental no Front-end:</strong> Chamar <code>arr.includes()</code> dentro de um <code>arr.map()</code> no React transforma sua renderização simples em quadrática. Se o array tiver 1.000 itens, serão 1.000.000 de verificações a cada clique na tela! Converta o array alvo para um <code>Set</code> ou Objeto primeiro para ter buscas O(1).
            </div>
          </div>

        </div>
      </section>
        
    </div>
  );
};
