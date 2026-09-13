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
          Veja com seus próprios olhos o poder esmagador de O(log N) destruindo O(N) em uma corrida de performance em tempo real.
        </p>
      </div>

      {/* SEÇÃO: 📖 Teoria Completa */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria Completa & Padrões Visuais</h2>
        
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Tópico 1 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🚶‍♂️ 1. Busca Linear (A força bruta)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  A Busca Linear (ou Sequencial) é o algoritmo mais simples do mundo: você olha para o primeiro item, depois para o segundo, depois para o terceiro, até achar o que quer.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Sua complexidade é <strong>O(N)</strong>. Funciona perfeitamente em listas <strong>desordenadas</strong>. Mas, se você estiver procurando alguém na última página de uma lista telefônica de 1 milhão de páginas, você terá que ler 1 milhão de páginas.
                </p>
              </div>
              <div>
                <img 
                  src="https://placehold.co/600x400/fef2f2/991b1b?text=Busca+Linear+O(N)%5Cn%5Cn%5B1%5D%E2%86%92%5B2%5D%E2%86%92%5B3%5D%E2%86%92%5B4%5D%E2%86%92%5B99%5D%5Cn%5CnLento...+Passo+a+Passo" 
                  alt="Busca Linear" 
                  style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

          {/* Tópico 2 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🪓 2. Busca Binária (A Divisão Mágica)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ order: 2 }}>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  A Busca Binária é como procurar a letra "M" num dicionário. Você não lê da página 1. Você abre o dicionário no MEIO. Se caiu no "P", você sabe que o "M" está para a esquerda. Você acabou de descartar metade do dicionário inteiro numa tacada só!
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Sua complexidade é <strong>O(log N)</strong>. O único defeito? A lista <strong>TEM que estar ordenada</strong> primeiro.
                </p>
              </div>
              <div style={{ order: 1 }}>
                <img 
                  src="https://placehold.co/600x400/f0fdf4/16a34a?text=Busca+Bin%C3%A1ria+O(log+N)%5Cn%5Cn1.+Abre+no+meio%5Cn2.+Menor%3F+Vai+pra+esquerda%5Cn3.+Corta+metade+do+lixo+fora%21" 
                  alt="Busca Binária" 
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
            Algoritmo de Busca Binária em TypeScript
          </h3>
          <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Usamos a clássica dança dos dois ponteiros (left e right).
          </p>
          <pre>
            <code>{`export function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2); // Pega o número bem no meio
    
    if (arr[mid] === target) return mid; // Achou! O(1) Sorte!
    
    if (arr[mid] < target) {
      left = mid + 1; // O alvo é maior, joga a metade esquerda fora
    } else {
      right = mid - 1; // O alvo é menor, joga a metade direita fora
    }
  }

  return -1; // Não encontrado
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
              🔎 Comparador de Eficiência em Tempo Real
            </h3>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Selecione um número no array ordenado de 32 elementos. Aperte o botão para ver quantas vezes cada algoritmo precisa "pensar" (fazer iterações de laço) para encontrar seu número.
            </p>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155' }}>Número Alvo:</label>
                <select
                  className="input"
                  value={targetNumber}
                  onChange={e => {
                    setTargetNumber(Number(e.target.value));
                    setLinearSteps(null);
                    setBinarySteps(null);
                  }}
                  style={{ width: 'auto' }}
                >
                  {DATA_SET.map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              <button onClick={runComparison} className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>
                ⚡ Iniciar Corrida
              </button>
            </div>

            {/* Grid dos Resultados */}
            <div className="grid-2">
              <div style={{ background: '#fef2f2', border: '2px solid #fecaca', borderRadius: 'var(--radius-md)', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h4 style={{ fontWeight: 800, color: '#991b1b', fontSize: '1.1rem', margin: 0 }}>Busca Linear</h4>
                  <span className="badge badge-warning">O(N)</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#7f1d1d', marginBottom: '1.5rem' }}>
                  Vai ler caixinha por caixinha, rezando para encontrar logo.
                </p>

                <div style={{ fontSize: '3rem', fontWeight: 900, color: '#b91c1c', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
                  {linearSteps !== null ? linearSteps : '-'}
                  <span style={{ fontSize: '1rem', fontWeight: 600, color: '#f87171', marginLeft: '0.5rem' }}>passos</span>
                </div>
                
                {linearIndex !== null && linearIndex >= 0 && (
                  <div style={{ fontSize: '0.85rem', color: '#991b1b', marginTop: '1rem', fontWeight: 600, background: '#fee2e2', padding: '0.5rem', borderRadius: '4px', display: 'inline-block' }}>
                    Alvo encontrado no índice #{linearIndex}
                  </div>
                )}
              </div>

              <div style={{ background: '#f0fdf4', border: '2px solid #bbf7d0', borderRadius: 'var(--radius-md)', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h4 style={{ fontWeight: 800, color: '#166534', fontSize: '1.1rem', margin: 0 }}>Busca Binária</h4>
                  <span className="badge badge-success">O(log N)</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#14532d', marginBottom: '1.5rem' }}>
                  Corta o array no meio inteligentemente a cada laço.
                </p>

                <div style={{ fontSize: '3rem', fontWeight: 900, color: '#15803d', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
                  {binarySteps !== null ? binarySteps : '-'}
                  <span style={{ fontSize: '1rem', fontWeight: 600, color: '#4ade80', marginLeft: '0.5rem' }}>passos</span>
                </div>
                
                {binaryIndex !== null && binaryIndex >= 0 && (
                  <div style={{ fontSize: '0.85rem', color: '#166534', marginTop: '1rem', fontWeight: 600, background: '#dcfce7', padding: '0.5rem', borderRadius: '4px', display: 'inline-block' }}>
                    {Math.round(((linearSteps! - binarySteps!) / linearSteps!) * 100)}% mais eficiente!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
        
      {/* SEÇÃO: 🛡️ Boas Práticas */}
      <section className="module-section">
        <h2 className="section-title">🛡️ Boas Práticas & Mercado</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="alert alert-success">
            <div>
              <strong>Regra de Ouro (Custo de Ordenação):</strong> A Busca Binária exige que o Array esteja ordenado. Se você vai buscar <strong>apenas UMA vez</strong> em um Array totalmente desordenado, é mais rápido fazer a Busca Linear O(N). Se você for buscar <strong>várias vezes</strong>, aí sim vale a pena pagar o preço de ordenar O(N log N) uma vez, para depois ter buscas O(log N) infinitas!
            </div>
          </div>
        </div>
      </section>
        
    </div>
  );
};
