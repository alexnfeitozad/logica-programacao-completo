import React, { useState } from 'react';

const DATA_SET = Array.from({ length: 32 }, (_, i) => (i + 1) * 3); // [3, 6, 9, ..., 96]

export const Modulo06Buscas: React.FC = () => {
  
  const [targetNumber, setTargetNumber] = useState(78);
  const [linearSteps, setLinearSteps] = useState<number | null>(null);
  const [binarySteps, setBinarySteps] = useState<number | null>(null);
  const [linearIndex, setLinearIndex] = useState<number | null>(null);
  const [binaryIndex, setBinaryIndex] = useState<number | null>(null);

  const runComparison = () => {
    // 1. Busca Linear
    let lSteps = 0;
    let lFound = -1;
    for (let i = 0; i < DATA_SET.length; i++) {
      lSteps++;
      if (DATA_SET[i] === targetNumber) {
        lFound = i;
        break;
      }
    }
    setLinearSteps(lSteps);
    setLinearIndex(lFound);

    // 2. Busca Binária
    let bSteps = 0;
    let bFound = -1;
    let start = 0;
    let end = DATA_SET.length - 1;

    while (start <= end) {
      bSteps++;
      const mid = Math.floor((start + end) / 2);
      if (DATA_SET[mid] === targetNumber) {
        bFound = mid;
        break;
      }
      if (DATA_SET[mid] < targetNumber) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
    setBinarySteps(bSteps);
    setBinaryIndex(bFound);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 2: Estruturas Avançadas</span>
          <span className="badge badge-neutral">Módulo 06</span>
        </div>
        <h1>Algoritmos de Busca: Linear vs Binária</h1>
        <p className="subtitle">
          Veja com seus próprios olhos a diferença de performance entre O(n) e O(log n) em tempo real.
        </p>
      </div>

      

      

      

      

      
    
        
      {/* SEÇÃO: 📖 Teoria */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Pré-requisito Vital: Ordenação
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>
              A Busca Binária <strong>só funciona se a lista estiver previamente ordenada</strong>.
              Caso a lista seja desordenada e precise ser consultada uma única vez, a busca linear é mais vantajosa (porque ordenar custa O(n log n)).
            </p>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 💻 Exemplos Práticos */}
      <section className="module-section">
        <h2 className="section-title">💻 Exemplos Práticos</h2>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Algoritmo de Busca Binária em TypeScript
          </h3>
          <pre>
            <code>{`export function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid; // Encontrado!
    if (arr[mid] < target) left = mid + 1; // Busca na metade direita
    else right = mid - 1; // Busca na metade esquerda
  }

  return -1; // Não encontrado
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
              🔎 Comparador de Eficiência em Tempo Real
            </h3>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Selecione um número no array ordenado de 32 elementos e execute a busca para comparar as iterações.
            </p>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Número Alvo:</label>
                <select
                  className="input"
                  value={targetNumber}
                  onChange={e => {
                    setTargetNumber(Number(e.target.value));
                    setLinearSteps(null);
                    setBinarySteps(null);
                  }}
                  style={{ width: 'auto', marginLeft: '0.5rem' }}
                >
                  {DATA_SET.map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              <button onClick={runComparison} className="btn btn-primary">
                ⚡ Comparar Algoritmos
              </button>
            </div>

            {/* Grid dos Resultados */}
            <div className="grid-2">
              <div style={{ background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <h4 style={{ fontWeight: 800, color: '#991b1b', fontSize: '1.05rem' }}>Busca Linear (Sequential)</h4>
                  <span className="badge badge-warning">O(n)</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#7f1d1d', marginBottom: '1rem' }}>
                  Varre elemento por elemento do início até achar.
                </p>

                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#b91c1c', fontFamily: 'var(--font-mono)' }}>
                  {linearSteps !== null ? `${linearSteps} iterações` : '---'}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#991b1b', marginTop: '0.3rem' }}>
                  {linearIndex !== null && linearIndex >= 0 ? `Encontrado no índice #${linearIndex}` : 'Aguardando teste...'}
                </div>
              </div>

              <div style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <h4 style={{ fontWeight: 800, color: '#166534', fontSize: '1.05rem' }}>Busca Binária (Binary Search)</h4>
                  <span className="badge badge-success">O(log n)</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#14532d', marginBottom: '1rem' }}>
                  Divide o array ordenado ao meio a cada passo.
                </p>

                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#15803d', fontFamily: 'var(--font-mono)' }}>
                  {binarySteps !== null ? `${binarySteps} iterações` : '---'}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#166534', marginTop: '0.3rem' }}>
                  {binaryIndex !== null && binaryIndex >= 0
                    ? `Encontrado no índice #${binaryIndex} (${Math.round(((linearSteps! - binarySteps!) / linearSteps!) * 100)}% mais rápido!)`
                    : 'Aguardando teste...'}
                </div>
              </div>
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
              <strong>Escala de Dados:</strong> Em um array com 1 milhão de elementos, a busca linear no pior caso faz 1.000.000 de comparações. A busca binária faz no máximo <strong>20 comparações</strong>.
            </div>
          </div>
        </div>
      </section>
        
      
</div>
  );
};
