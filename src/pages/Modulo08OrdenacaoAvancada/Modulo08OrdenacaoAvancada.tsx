import React, { useState } from 'react';

function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left: number[] = [];
  const right: number[] = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  const result: number[] = [];
  let l = 0;
  let r = 0;

  while (l < left.length && r < right.length) {
    if (left[l] < right[r]) result.push(left[l++]);
    else result.push(right[r++]);
  }

  return result.concat(left.slice(l)).concat(right.slice(r));
}

export const Modulo08OrdenacaoAvancada: React.FC = () => {
  
  // Benchmark State
  const [dataSize, setDataSize] = useState(5000);
  const [quickDuration, setQuickDuration] = useState<number | null>(null);
  const [mergeDuration, setMergeDuration] = useState<number | null>(null);
  const [nativeDuration, setNativeDuration] = useState<number | null>(null);
  const [isBenchmarking, setIsBenchmarking] = useState(false);

  const runBenchmark = async () => {
    setIsBenchmarking(true);
    await new Promise(r => setTimeout(r, 50));

    const dataset = Array.from({ length: dataSize }, () => Math.floor(Math.random() * 100000));

    // 1. QuickSort
    const t0 = performance.now();
    quickSort([...dataset]);
    const t1 = performance.now();
    setQuickDuration(Number((t1 - t0).toFixed(2)));

    // 2. MergeSort
    const t2 = performance.now();
    mergeSort([...dataset]);
    const t3 = performance.now();
    setMergeDuration(Number((t3 - t2).toFixed(2)));

    // 3. Array.prototype.sort (Timsort)
    const t4 = performance.now();
    [...dataset].sort((a, b) => a - b);
    const t5 = performance.now();
    setNativeDuration(Number((t5 - t4).toFixed(2)));

    setIsBenchmarking(false);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 3: Algoritmos & Otimização</span>
          <span className="badge badge-neutral">Módulo 08</span>
        </div>
        <h1>Ordenação Avançada (Merge & Quick Sort)</h1>
        <p className="subtitle">
          Dividir para Conquistar, Particionamento de Pivôs e Performance Logarítmica O(n log n).
        </p>
      </div>

      

      

      

      

      
    
        
      {/* SEÇÃO: 📖 Teoria */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              O Poder do Dividir para Conquistar (Divide & Conquer)
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>
              Em vez de comparar todos os itens contra todos os itens, algoritmos como QuickSort dividem a lista em duas metades sucessivas.
              Isso reduz a altura da árvore de decisão para <code>log₂(n)</code> níveis, transformando <code>O(n²)</code> no eficiente <code>O(n log n)</code>.
            </p>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 💻 Exemplos Práticos */}
      <section className="module-section">
        <h2 className="section-title">💻 Exemplos Práticos</h2>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            QuickSort Elegante e Recursivo em TypeScript
          </h3>
          <pre>
            <code>{`export function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left: number[] = [];
  const right: number[] = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
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
              ⚡ Laboratório de Benchmark: Ordenação de Alta Performance
            </h3>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Execute o benchmark para medir o tempo real de CPU na ordenação de milhares de registros aleatórios com algoritmos <strong>O(n log n)</strong>.
            </p>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Tamanho do Vetor:</label>
                <select
                  className="input"
                  value={dataSize}
                  onChange={e => setDataSize(Number(e.target.value))}
                  style={{ width: 'auto', marginLeft: '0.5rem' }}
                  disabled={isBenchmarking}
                >
                  <option value={1000}>1.000 números</option>
                  <option value={5000}>5.000 números</option>
                  <option value={20000}>20.000 números</option>
                </select>
              </div>

              <button onClick={runBenchmark} disabled={isBenchmarking} className="btn btn-primary">
                {isBenchmarking ? 'Executando Benchmark...' : '🚀 Iniciar Benchmark'}
              </button>
            </div>

            <div className="grid-2">
              <div style={{ background: '#f8fafc', border: '1.5px solid var(--neutral-200)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontWeight: 800, color: '#0f172a' }}>QuickSort (Pivot)</h4>
                  <span className="badge badge-success">O(n log n)</span>
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--font-mono)' }}>
                  {quickDuration !== null ? `${quickDuration} ms` : '---'}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.3rem' }}>
                  Particionamento in-place com pivô
                </div>
              </div>

              <div style={{ background: '#f8fafc', border: '1.5px solid var(--neutral-200)', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontWeight: 800, color: '#0f172a' }}>MergeSort (Recursive)</h4>
                  <span className="badge badge-primary">O(n log n)</span>
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0284c7', fontFamily: 'var(--font-mono)' }}>
                  {mergeDuration !== null ? `${mergeDuration} ms` : '---'}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.3rem' }}>
                  Divisão recursiva garantida (estável)
                </div>
              </div>
            </div>

            {nativeDuration !== null && (
              <div style={{ marginTop: '1.25rem', padding: '0.85rem 1rem', background: '#ecfdf5', borderRadius: 'var(--radius-sm)', border: '1px solid #a7f3d0', fontSize: '0.85rem', color: '#065f46' }}>
                💡 <strong>Array.prototype.sort (Timsort V8 do JS):</strong> Executou em <strong>{nativeDuration} ms</strong>.
              </div>
            )}
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🛡️ Boas Práticas */}
      <section className="module-section">
        <h2 className="section-title">🛡️ Boas Práticas</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="alert alert-success">
            <div>
              <strong>Produção Corporativa:</strong> O QuickSort é geralmente mais rápido na prática que o MergeSort porque possui menor constante de sobrecarga de memória (melhor uso de cache L1/L2 do processador).
            </div>
          </div>
        </div>
      </section>
        
      
</div>
  );
};
