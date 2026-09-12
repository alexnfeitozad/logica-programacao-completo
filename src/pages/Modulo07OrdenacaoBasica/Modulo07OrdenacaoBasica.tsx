import React, { useState } from 'react';

const INITIAL_ARRAY = [45, 12, 85, 32, 89, 21, 65, 38, 95, 14, 52, 73];

export const Modulo07OrdenacaoBasica: React.FC = () => {
  
  const [bars, setBars] = useState<number[]>([...INITIAL_ARRAY]);
  const [comparingIdx, setComparingIdx] = useState<[number, number] | null>(null);
  const [isSorting, setIsSorting] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const shuffleArray = () => {
    if (isSorting) return;
    const shuffled = [...bars].sort(() => Math.random() - 0.5);
    setBars(shuffled);
    setComparingIdx(null);
    setComparisons(0);
    setSwaps(0);
  };

  const runBubbleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    let current = [...bars];
    let comp = 0;
    let swp = 0;

    for (let i = 0; i < current.length; i++) {
      for (let j = 0; j < current.length - i - 1; j++) {
        setComparingIdx([j, j + 1]);
        comp++;
        setComparisons(comp);

        await new Promise(r => setTimeout(r, 60));

        if (current[j] > current[j + 1]) {
          const temp = current[j];
          current[j] = current[j + 1];
          current[j + 1] = temp;
          swp++;
          setSwaps(swp);
          setBars([...current]);
        }
      }
    }

    setComparingIdx(null);
    setIsSorting(false);
  };

  const runSelectionSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    let current = [...bars];
    let comp = 0;
    let swp = 0;

    for (let i = 0; i < current.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < current.length; j++) {
        setComparingIdx([minIdx, j]);
        comp++;
        setComparisons(comp);
        await new Promise(r => setTimeout(r, 60));

        if (current[j] < current[minIdx]) {
          minIdx = j;
        }
      }
      if (minIdx !== i) {
        const temp = current[i];
        current[i] = current[minIdx];
        current[minIdx] = temp;
        swp++;
        setSwaps(swp);
        setBars([...current]);
      }
    }

    setComparingIdx(null);
    setIsSorting(false);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 3: Algoritmos & Otimização</span>
          <span className="badge badge-neutral">Módulo 07</span>
        </div>
        <h1>Ordenação Básica (Bubble & Selection Sort)</h1>
        <p className="subtitle">
          Visualizador gráfico com barras interativas, rastreamento de comparações e trocas passo a passo.
        </p>
      </div>

      

      

      

      

      
    
        
      {/* SEÇÃO: 📖 Teoria */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Por que Bubble Sort é ineficiente para grandes volumes?
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>
              No Bubble Sort, para cada um dos N elementos, você percorre novamente quase todos os outros N elementos.
              Isso gera aproximadamente <code>N × N = N²</code> comparações. Para 100.000 itens, são necessários 10 bilhões de passos.
            </p>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 💻 Exemplos Práticos */}
      <section className="module-section">
        <h2 className="section-title">💻 Exemplos Práticos</h2>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Bubble Sort com Otimização de Flag em TypeScript
          </h3>
          <pre>
            <code>{`export function bubbleSort(arr: number[]): number[] {
  const result = [...arr];
  let swapped: boolean;

  for (let i = 0; i < result.length; i++) {
    swapped = false;
    for (let j = 0; j < result.length - i - 1; j++) {
      if (result[j] > result[j + 1]) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
        swapped = true;
      }
    }
    // Se nenhuma troca ocorreu nesta passada, o array já está ordenado!
    if (!swapped) break;
  }

  return result;
}`}</code>
          </pre>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática / Simulador</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Métricas */}
          <div className="grid-2">
            <div className="stat-card">
              <span className="stat-value">{comparisons}</span>
              <span className="stat-label">Comparações Realizadas</span>
              <span className="stat-detail">Elemento [j] vs [j+1]</span>
            </div>
            <div className="stat-card">
              <span className="stat-value" style={{ color: '#0d9488' }}>{swaps}</span>
              <span className="stat-label">Trocas de Posição (Swaps)</span>
              <span className="stat-detail">Inversões na memória</span>
            </div>
          </div>

          <div className="glass-card">
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <button onClick={shuffleArray} disabled={isSorting} className="btn btn-secondary">
                🔀 Embaralhar Array
              </button>
              <button onClick={runBubbleSort} disabled={isSorting} className="btn btn-primary">
                ▶ Iniciar Bubble Sort
              </button>
              <button onClick={runSelectionSort} disabled={isSorting} className="btn btn-success">
                ▶ Iniciar Selection Sort
              </button>
            </div>

            {/* Visualizador Gráfico de Barras */}
            <div
              style={{
                height: '240px',
                background: '#0f172a',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem 1rem 0.5rem',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                gap: '0.85rem'
              }}
            >
              {bars.map((val, idx) => {
                const isComparing = comparingIdx && (comparingIdx[0] === idx || comparingIdx[1] === idx);
                return (
                  <div
                    key={idx}
                    style={{
                      flex: 1,
                      maxWidth: '48px',
                      height: `${(val / 100) * 190}px`,
                      background: isComparing
                        ? 'linear-gradient(180deg, #f59e0b 0%, #d97706 100%)'
                        : 'linear-gradient(180deg, #10b981 0%, #059669 100%)',
                      borderRadius: '6px 6px 0 0',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      paddingBottom: '0.4rem',
                      color: '#ffffff',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      transition: 'height 0.1s ease, background 0.1s ease',
                      boxShadow: isComparing ? '0 0 12px rgba(245, 158, 11, 0.8)' : 'none'
                    }}
                  >
                    {val}
                  </div>
                );
              })}
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
              <strong>Uso Didático:</strong> Embora não seja usado em produção para grandes volumes de dados, o Bubble Sort é a introdução perfeita para entender a mecânica de iteração e trocas em vetores de memória.
            </div>
          </div>
        </div>
      </section>
        
      
</div>
  );
};
