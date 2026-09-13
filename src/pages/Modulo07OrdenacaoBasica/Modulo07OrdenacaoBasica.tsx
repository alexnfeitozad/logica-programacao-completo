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
          Como os primeiros algoritmos de ordenação da história funcionam (e por que você quase nunca deve usá-los).
        </p>
      </div>

      {/* SEÇÃO: 📖 Teoria Completa */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria Completa & Padrões Visuais</h2>
        
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Tópico 1 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🫧 1. O Famoso Bubble Sort (O Algoritmo da Bolha)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Imagine bolhas de ar subindo na água: as bolhas grandes sobem mais rápido. O Bubble Sort compara vizinhos (2 a 2). Se o da esquerda for maior que o da direita, eles trocam de lugar (Swap).
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Isso se repete até o maior número "borbulhar" até o final do array. Por ter dois loops <code>for</code> aninhados varrendo os mesmos elementos repetidas vezes, a complexidade é trágica: <strong>O(N²)</strong>.
                </p>
              </div>
              <div>
                <img 
                  src="https://placehold.co/600x400/fef2f2/991b1b?text=Bubble+Sort%5Cn%5Cn%5B+5+%5D+%5B+1+%5D+%E2%86%92+Troca%21%5Cn%5B+1+%5D+%5B+5+%5D+%E2%86%92+Ok%21%5Cn%5CnO+maior+vai+pro+final" 
                  alt="Esquema Bubble Sort" 
                  style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

          {/* Tópico 2 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🎯 2. Selection Sort (O Caçador do Menor)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ order: 2 }}>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Em vez de trocar vizinhos toda hora, o Selection Sort percorre a lista inteira apenas caçando o <strong>MENOR</strong> número. Quando acha, ele pega esse número e joga lá para o primeiro espaço disponível.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Ele faz BEM menos Trocas (Swaps) que o Bubble Sort, o que poupa memória RAM. Mas ele continua fazendo o mesmo número absurdo de Comparações, então também é <strong>O(N²)</strong>.
                </p>
              </div>
              <div style={{ order: 1 }}>
                <img 
                  src="https://placehold.co/600x400/fef3c7/b45309?text=Selection+Sort%5Cn%5Cn%5B3%5D+%5B5%5D+%5B1%5D+%5B2%5D%5CnMenor+%C3%A9+1%21%5Cn%5B1%5D+%5B5%5D+%5B3%5D+%5B2%5D" 
                  alt="Esquema Selection Sort" 
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
            Bubble Sort com Otimização "Flag" (TypeScript)
          </h3>
          <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Existe um truque clássico: se o array já estiver ordenado no meio da bagunça, criamos um <code>swapped</code> que percebe que ninguém trocou, e damos um <code>break</code> parando o programa cedo.
          </p>
          <pre>
            <code>{`export function bubbleSort(arr: number[]): number[] {
  const result = [...arr];
  let swapped: boolean;

  for (let i = 0; i < result.length; i++) {
    swapped = false;
    for (let j = 0; j < result.length - i - 1; j++) {
      if (result[j] > result[j + 1]) { // Se o esquerdo é maior que o direito
        [result[j], result[j + 1]] = [result[j + 1], result[j]]; // Swap!
        swapped = true;
      }
    }
    // Se passamos a lista inteira e não houve NENHUMA troca, já está ordenado!
    if (!swapped) break;
  }

  return result;
}`}</code>
          </pre>
        </div>
      </section>
        
      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática: O Laboratório Computacional</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Métricas */}
          <div className="grid-2">
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#334155', fontFamily: 'var(--font-mono)' }}>{comparisons}</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#475569' }}>Comparações (Ifs)</span>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Quantas vezes o CPU olhou os números</span>
            </div>
            <div style={{ background: '#f0fdf4', padding: '1.5rem', borderRadius: '8px', border: '1px solid #bbf7d0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#059669', fontFamily: 'var(--font-mono)' }}>{swaps}</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#047857' }}>Trocas na RAM (Swaps)</span>
              <span style={{ fontSize: '0.75rem', color: '#10b981' }}>Quantas vezes mudamos a array</span>
            </div>
          </div>

          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>Simulador Gráfico de Ordenação</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>Veja como cada algoritmo varre o array de forma diferente.</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={shuffleArray} disabled={isSorting} className="btn btn-secondary btn-sm">
                  🔀 Embaralhar
                </button>
                <button onClick={runBubbleSort} disabled={isSorting} className="btn btn-danger btn-sm">
                  🫧 Start Bubble
                </button>
                <button onClick={runSelectionSort} disabled={isSorting} className="btn btn-primary btn-sm">
                  🎯 Start Selection
                </button>
              </div>
            </div>

            {/* Visualizador Gráfico de Barras */}
            <div
              style={{
                height: '280px',
                background: '#0f172a',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem 1rem 0.5rem',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                gap: '1rem'
              }}
            >
              {bars.map((val, idx) => {
                const isComparing = comparingIdx && (comparingIdx[0] === idx || comparingIdx[1] === idx);
                return (
                  <div
                    key={idx}
                    style={{
                      flex: 1,
                      maxWidth: '56px',
                      height: \`\${(val / 100) * 220}px\`,
                      background: isComparing
                        ? 'linear-gradient(180deg, #f59e0b 0%, #d97706 100%)'
                        : 'linear-gradient(180deg, #10b981 0%, #059669 100%)',
                      borderRadius: '6px 6px 0 0',
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      paddingBottom: '0.5rem',
                      color: '#ffffff',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      transition: 'height 0.1s ease, background 0.05s ease',
                      boxShadow: isComparing ? '0 0 16px rgba(245, 158, 11, 0.9)' : 'none'
                    }}
                  >
                    {val}
                  </div>
                );
              })}
            </div>
            <p style={{ color: '#64748b', fontSize: '0.8rem', textAlign: 'center', marginTop: '1rem' }}>
              * Repare como o Bubble faz MUITO MAIS trocas (swaps) que o Selection. No mundo real, gravar na RAM (fazer swap) é uma operação computacionalmente mais cara que apenas ler (fazer comparação).
            </p>
          </div>
        </div>
      </section>
        
      {/* SEÇÃO: 🛡️ Boas Práticas */}
      <section className="module-section">
        <h2 className="section-title">🛡️ Boas Práticas & Mercado</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="alert alert-danger">
            <div>
              <strong>Nunca use em Produção:</strong> Apesar de geniais para fins didáticos (entender loops aninhados), Bubble Sort, Selection Sort e Insertion Sort <strong>nunca</strong> devem ser usados em código de produção real para listas grandes, pois seu desempenho cai ladeira abaixo (curva quadrática O(N²)) muito rapidamente. Linguagens modernas já embutem ordenadores <code>O(N log N)</code> nativos.
            </div>
          </div>
        </div>
      </section>
        
    </div>
  );
};
