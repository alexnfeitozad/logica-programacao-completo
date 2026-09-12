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
          Entenda como computadores executam código: Stack vs Heap, Ponteiros e Análise Assintótica Big-O.
        </p>
      </div>

      

      

      

      

      
    
        
      {/* SEÇÃO: 📖 Teoria */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              O que é a Notação Big-O?
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>
              A Notação Big-O (Grande-O) é a ferramenta matemática que usamos para descrever a eficiência de um algoritmo conforme o volume de dados de entrada (N) cresce rumo ao infinito no <strong>pior cenário (worst case)</strong>.
            </p>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 💻 Exemplos Práticos */}
      <section className="module-section">
        <h2 className="section-title">💻 Exemplos Práticos</h2>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Passagem por Valor vs Referência em TypeScript
          </h3>
          <pre>
            <code>{`// Primitivo: alocado diretamente na Call Stack (cópia por valor)
let a = 10;
let b = a;
b = 20; // 'a' continua sendo 10!

// Objeto: alocado no Heap (cópia de ponteiro / referência)
let obj1 = { valor: 10 };
let obj2 = obj1; // copia apenas o endereço da memória!
obj2.valor = 20; // 'obj1.valor' também mudou para 20!`}</code>
          </pre>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática / Simulador</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Lab 1: Stack vs Heap */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              🔬 Laboratório 1: Simulador de Memória do Processador (Call Stack vs Heap)
            </h3>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              A <strong>Call Stack</strong> armazena tipos primitivos e frames de execução de funções (rápida, tamanho fixo).
              O <strong>Heap</strong> armazena estruturas dinâmicas, objetos e arrays (alocação sob demanda).
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <button onClick={handlePushStack} className="btn btn-primary btn-sm">
                + Chamar Função (Push Stack Frame)
              </button>
              <button onClick={handlePopStack} className="btn btn-secondary btn-sm">
                - Retornar Função (Pop Stack Frame)
              </button>
              <button onClick={handleAllocateHeap} className="btn btn-success btn-sm">
                + Alocar Objeto no Heap (new Object)
              </button>
            </div>

            <div className="grid-2">
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-200)' }}>
                <h4 style={{ fontWeight: 700, marginBottom: '1rem', color: '#0f172a' }}>
                  🥞 Call Stack (Pilha de Execução - LIFO)
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
                  📦 Heap Memory (Objetos Dinâmicos)
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
                      <span style={{ color: '#38bdf8' }}>Endereço: {item.address}</span>
                      <span style={{ color: '#cbd5e1' }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lab 2: Big-O Comparador */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              📈 Laboratório 2: Comparador Interativo de Notação Big-O
            </h3>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Altere o tamanho da entrada <strong>N</strong> e veja quantas operações cada classe de algoritmo exige do processador:
            </p>

            <div style={{ marginBottom: '1.5rem', maxWidth: '480px' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#334155' }}>
                Tamanho da Entrada (N): <strong>{inputSize} elementos</strong>
              </label>
              <input
                type="range"
                min="4"
                max="64"
                step="4"
                value={inputSize}
                onChange={e => setInputSize(Number(e.target.value))}
                style={{ width: '100%', marginTop: '0.4rem' }}
              />
            </div>

            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Complexidade</th>
                    <th>Classificação</th>
                    <th>Operações Calculadas para N={inputSize}</th>
                    <th>Exemplo Prático</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: '#f0fdf4' }}>
                    <td><strong style={{ color: '#16a34a' }}>O(1)</strong></td>
                    <td>Excelente (Constante)</td>
                    <td><strong>{o1} operação</strong></td>
                    <td>Acesso a array por índice (<code>arr[0]</code>), Hash Map get.</td>
                  </tr>
                  <tr style={{ background: '#f0fdfa' }}>
                    <td><strong style={{ color: '#0d9488' }}>O(log n)</strong></td>
                    <td>Muito Bom (Logarítmica)</td>
                    <td><strong>{oLogN} operações</strong></td>
                    <td>Busca Binária em array ordenado.</td>
                  </tr>
                  <tr style={{ background: '#fffbeb' }}>
                    <td><strong style={{ color: '#d97706' }}>O(n)</strong></td>
                    <td>Aceitável (Linear)</td>
                    <td><strong>{oN} operações</strong></td>
                    <td>Busca Linear, percorrer array com laço simples.</td>
                  </tr>
                  <tr style={{ background: '#fef3c7' }}>
                    <td><strong style={{ color: '#b45309' }}>O(n log n)</strong></td>
                    <td>Moderado (Quasilinear)</td>
                    <td><strong>{oNLogN} operações</strong></td>
                    <td>Merge Sort, QuickSort médio.</td>
                  </tr>
                  <tr style={{ background: '#fef2f2' }}>
                    <td><strong style={{ color: '#dc2626' }}>O(n²)</strong></td>
                    <td>Perigo (Quadrática)</td>
                    <td><strong style={{ color: '#dc2626' }}>{oN2} operações</strong></td>
                    <td>Laços aninhados (for dentro de for), Bubble Sort.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🛡️ Boas Práticas */}
      <section className="module-section">
        <h2 className="section-title">🛡️ Boas Práticas</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="alert alert-danger">
            <div>
              <strong>Evite O(n²) acidental:</strong> Chamar <code>arr.includes()</code> ou <code>arr.indexOf()</code> dentro de um <code>arr.forEach()</code> transforma sua operação simples em quadrática O(n²). Converta o array para um <code>Set</code> para ter busca instantânea em O(1).
            </div>
          </div>
        </div>
      </section>
        
      
</div>
  );
};
