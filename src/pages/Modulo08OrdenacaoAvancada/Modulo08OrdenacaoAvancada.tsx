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
    await new Promise(r => setTimeout(r, 50)); // UI paint

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
        <h1>Ordenação Avançada (O Peso Pesado)</h1>
        <p className="subtitle">
          Dividir para Conquistar (Divide & Conquer), Recursão e como os gigantes escalam para O(N log N).
        </p>
      </div>

      {/* SEÇÃO: 📖 Teoria Completa */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria Completa & Padrões Visuais</h2>
        
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Tópico 1 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ✂️ 1. O Paradigma "Dividir para Conquistar"
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  No Módulo 7, o Bubble Sort sofria porque comparava todos contra todos. A sacada de Gênios como John von Neumann (Merge Sort) foi perceber: <em>"É muito mais rápido ordenar duas listas minúsculas e depois juntá-las, do que ordenar uma lista gigante de uma vez"</em>.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Essa técnica de <strong>quebrar o problema pela metade (log N)</strong> usando Recursão destruiu a barreira do O(N²) e permitiu criar os famosos algoritmos <strong>O(N log N)</strong>.
                </p>
              </div>
              <div>
                <img 
                  src="https://placehold.co/600x400/e0f2fe/0369a1?text=Dividir+pra+Conquistar%5Cn%5Cn%5B8%2C3%2C5%2C1%5D%5Cn%E2%86%99++++++%E2%86%98%5Cn%5B8%2C3%5D++++%5B5%2C1%5D%5Cn%E2%86%99++%E2%86%98++++%E2%86%99++%E2%86%98%5Cn%5B8%5D%5B3%5D++%5B5%5D%5B1%5D%5Cn%E2%86%98++%E2%86%99++++%E2%86%98++%E2%86%99%5Cn%5B3%2C8%5D++++%5B1%2C5%5D%5Cn%E2%86%98++++++%E2%86%99%5Cn%5B1%2C3%2C5%2C8%5D" 
                  alt="Esquema Merge Sort" 
                  style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

          {/* Tópico 2 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ⚡ 2. Quick Sort vs Merge Sort
            </h3>
            <div className="table-responsive" style={{ marginTop: '0.75rem' }}>
              <table>
                <thead>
                  <tr>
                    <th>Característica</th>
                    <th>Merge Sort</th>
                    <th>Quick Sort</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mecânica Base</td>
                    <td>Divide a lista no MEIO.</td>
                    <td>Elege um PIVÔ aleatório e joga menores pra esq, maiores pra dir.</td>
                  </tr>
                  <tr>
                    <td>Tempo Médio</td>
                    <td><strong style={{ color: '#16a34a' }}>O(N log N)</strong></td>
                    <td><strong style={{ color: '#16a34a' }}>O(N log N)</strong> (Mas constantes reais de CPU são menores, roda mais rápido).</td>
                  </tr>
                  <tr>
                    <td>Pior Cenário</td>
                    <td><strong style={{ color: '#16a34a' }}>O(N log N)</strong></td>
                    <td><strong style={{ color: '#dc2626' }}>O(N²)</strong> (Se o Pivô escolhido for muito ruim toda vez).</td>
                  </tr>
                  <tr>
                    <td>Uso de RAM (Espaço)</td>
                    <td><strong style={{ color: '#dc2626' }}>O(N)</strong> Cria muitos arrays novos na memória.</td>
                    <td><strong style={{ color: '#16a34a' }}>O(log N)</strong> Ordena in-place (quase nada extra).</td>
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
            QuickSort Elegante e Funcional em TypeScript
          </h3>
          <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Existem formas mais eficientes de fazer QuickSort <code>In-Place</code> modificando o array original. Abaixo usamos uma versão Funcional com Arrays Extras para focar na legibilidade e entendimento matemático da Recursão.
          </p>
          <pre>
            <code>{`export function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr; // Base da Recursão!
  
  const pivot = arr[arr.length - 1]; // Escolhemos o último como pivô
  const left: number[] = [];
  const right: number[] = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) left.push(arr[i]); // Menores pra esquerda
    else right.push(arr[i]);               // Maiores pra direita
  }

  // A mágica: junta os que ficaram à esq ordenados + pivô + os da dir ordenados
  return [...quickSort(left), pivot, ...quickSort(right)];
}`}</code>
          </pre>
        </div>
      </section>
        
      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática: O Laboratório Computacional</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: '#0f172a' }}>
              🏎️ Laboratório de Benchmark Profissional (Stress Test)
            </h3>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Vamos criar vetores gigantes e submetê-los aos algoritmos. Usaremos o <code>performance.now()</code> do navegador para cronometrar os <strong>Milissegundos (ms)</strong> reais. Se usássemos o Bubble Sort aqui, o seu navegador travaria (demoraria minutos)!
            </p>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Tamanho da Massa de Dados:</label>
                <select
                  className="input"
                  value={dataSize}
                  onChange={e => setDataSize(Number(e.target.value))}
                  style={{ width: 'auto' }}
                  disabled={isBenchmarking}
                >
                  <option value={5000}>5.000 registros (Leve)</option>
                  <option value={20000}>20.000 registros (Médio)</option>
                  <option value={50000}>50.000 registros (Pesado)</option>
                  <option value={100000}>100.000 registros (Gargalo)</option>
                </select>
              </div>

              <button onClick={runBenchmark} disabled={isBenchmarking} className="btn btn-danger" style={{ padding: '0.6rem 2rem', fontWeight: 800 }}>
                {isBenchmarking ? 'Processando CPU...' : '🔥 INICIAR BENCHMARK'}
              </button>
            </div>

            <div className="grid-2">
              <div style={{ background: '#fffbeb', border: '2px solid #fde68a', borderRadius: 'var(--radius-md)', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <h4 style={{ fontWeight: 900, color: '#92400e', fontSize: '1.2rem', margin: 0 }}>QuickSort (Pivot)</h4>
                </div>
                <div style={{ fontSize: '3.5rem', fontWeight: 900, color: '#d97706', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
                  {quickDuration !== null ? quickDuration : '---'}
                  <span style={{ fontSize: '1.2rem', color: '#b45309', marginLeft: '0.2rem' }}>ms</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#92400e', marginTop: '1rem', fontWeight: 600 }}>
                  Particionamento na mesma memória.
                </div>
              </div>

              <div style={{ background: '#f0f9ff', border: '2px solid #bae6fd', borderRadius: 'var(--radius-md)', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <h4 style={{ fontWeight: 900, color: '#075985', fontSize: '1.2rem', margin: 0 }}>MergeSort (Split)</h4>
                </div>
                <div style={{ fontSize: '3.5rem', fontWeight: 900, color: '#0284c7', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
                  {mergeDuration !== null ? mergeDuration : '---'}
                  <span style={{ fontSize: '1.2rem', color: '#0369a1', marginLeft: '0.2rem' }}>ms</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#075985', marginTop: '1rem', fontWeight: 600 }}>
                  Gasta mais RAM alocando arrays novos.
                </div>
              </div>
            </div>

            {nativeDuration !== null && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f8fafc', borderRadius: 'var(--radius-sm)', border: '1px solid #e2e8f0', fontSize: '0.9rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🚀</span>
                <div>
                  <strong>Bônus: <code>Array.prototype.sort()</code> (Nativo do JavaScript V8):</strong> Executou em impressionantes <strong style={{ color: '#059669', fontSize: '1.1rem' }}>{nativeDuration} ms</strong>. 
                  O motor V8 do Google Chrome e Node.js usa o <em>Timsort</em> (uma mutação insana e hiperotimizada que mistura Merge Sort e Insertion Sort no nível do C++).
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
        
      {/* SEÇÃO: 🛡️ Boas Práticas */}
      <section className="module-section">
        <h2 className="section-title">🛡️ Boas Práticas & Mercado</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="alert alert-info">
            <div>
              <strong>Produção Corporativa:</strong> Você quase nunca vai escrever um QuickSort ou MergeSort do zero em código de produção (você vai usar <code>.sort()</code> ou <code>ORDER BY</code> do SQL). O objetivo aqui é treinar o seu raciocínio de <strong>Recursão</strong> e <strong>Complexidade Algorítmica</strong> para que você consiga ler arquiteturas complexas sem surtar.
            </div>
          </div>
        </div>
      </section>
        
    </div>
  );
};
