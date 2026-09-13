import React, { useState } from 'react';

interface HashEntry {
  key: string;
  value: string;
}

const BUCKET_SIZE = 8;

function simpleHash(key: string, size: number): { hashIndex: number; charCodes: number[] } {
  const charCodes = Array.from(key).map(c => c.charCodeAt(0));
  const sum = charCodes.reduce((acc, code) => acc + code, 0);
  return { hashIndex: sum % size, charCodes };
}

export const Modulo04TabelasHash: React.FC = () => {
  
  // Buckets Array
  const [buckets, setBuckets] = useState<HashEntry[][]>([
    [{ key: 'user', value: 'Alexandre' }],
    [],
    [{ key: 'role', value: 'Tech Lead' }, { key: 'lang', value: 'TypeScript' }], // Colisão demonstrativa
    [],
    [{ key: 'theme', value: 'dark' }],
    [],
    [],
    []
  ]);

  const [inputKey, setInputKey] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [lastHashInfo, setLastHashInfo] = useState<{ key: string; index: number; sum: number } | null>(null);

  const handleInsert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputKey.trim() || !inputValue.trim()) return;

    const { hashIndex, charCodes } = simpleHash(inputKey.trim(), BUCKET_SIZE);
    const sum = charCodes.reduce((a, b) => a + b, 0);

    setBuckets(prev => {
      const copy = prev.map(b => [...b]);
      // Atualiza ou insere
      const existingIdx = copy[hashIndex].findIndex(e => e.key === inputKey.trim());
      if (existingIdx >= 0) {
        copy[hashIndex][existingIdx].value = inputValue.trim();
      } else {
        copy[hashIndex].push({ key: inputKey.trim(), value: inputValue.trim() });
      }
      return copy;
    });

    setLastHashInfo({ key: inputKey.trim(), index: hashIndex, sum });
    setInputKey('');
    setInputValue('');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 2: Estruturas Avançadas</span>
          <span className="badge badge-neutral">Módulo 04</span>
        </div>
        <h1>Tabelas Hash (Hash Maps)</h1>
        <p className="subtitle">
          Como os Dicionários, Objetos JS e Bancos de Dados encontram informações em piscar de olhos usando a Matemática do Hashing.
        </p>
      </div>

      {/* SEÇÃO: 📖 Teoria Completa */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria Completa & Padrões Visuais</h2>
        
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Tópico 1 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ⚡ 1. O Milagre do Tempo Constante O(1)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  No Módulo 3, vimos que para encontrar um dado específico, precisávamos procurar item por item (Tempo O(N)). Se a lista tiver 1 milhão de itens, são 1 milhão de checagens.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  As <strong>Tabelas Hash</strong> quebram essa regra! Se você quiser buscar o usuário 'Alexandre', ela faz uma conta matemática com a palavra 'Alexandre', que resulta num número. Esse número é a posição EXATA na memória. O computador vai direto lá: <strong>Tempo O(1)</strong>!
                </p>
              </div>
              <div>
                <img 
                  src="https://placehold.co/600x400/ecfdf5/065f46?text=%5B+%22user%22+%5D%5Cn%E2%86%93%5CnFun%C3%A7%C3%A3o+de+Hash%5Cn(Matem%C3%A1tica+M%C3%A1gica)%5Cn%E2%86%93%5Cn%5B+Bucket+%230+%5D+%E2%86%92+%22Alexandre%22" 
                  alt="Esquema da Função Hash" 
                  style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

          {/* Tópico 2 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              💥 2. Colisões: Quando a matemática falha
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ order: 2 }}>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Como a memória do computador é limitada, a função de hash vai acabar gerando o mesmo número para duas palavras diferentes. Isso se chama <strong>Colisão</strong>.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  A solução mais famosa é o "Encadeamento" (Chaining): O bucket (caixinha de memória) não guarda apenas 1 valor, ele guarda uma <strong>Lista Encadeada</strong> (Módulo 3)! Se duas pessoas caírem na caixa 5, colocamos as duas lado a lado lá dentro.
                </p>
              </div>
              <div style={{ order: 1 }}>
                <img 
                  src="https://placehold.co/600x400/fffbeb/b45309?text=Colis%C3%A3o%21%5Cn%5CnPalavra+%22A%22+%E2%86%92+Hash+5%5CnPalavra+%22B%22+%E2%86%92+Hash+5%5Cn%5CnBucket+5%3A%5Cn%5B+%22A%22+%5D+%E2%86%92+%5B+%22B%22+%5D" 
                  alt="Esquema de Colisão" 
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
            Estrutura de Hash Table Simples em TypeScript
          </h3>
          <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Abaixo, temos os Buckets (Arrays que guardam Arrays, para lidar com as colisões). A função <code>hash()</code> transforma a String em um número.
          </p>
          <pre>
            <code>{`export class HashTable<V> {
  // 16 caixas de memória prontas para receber listas (Chaining)
  private buckets: Array<Array<[string, V]>> = Array.from({ length: 16 }, () => []);

  // A Matemática: Pega os códigos das letras e aplica o Módulo (%)
  private hash(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.buckets.length;
    }
    return hash; // Retorna um número exato de 0 a 15
  }

  // Inserção O(1)
  set(key: string, value: V): void {
    const idx = this.hash(key);
    this.buckets[idx].push([key, value]);
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                🗝️ O Simulador de Hashing
              </h3>
              <span className="badge badge-primary">8 Buckets de Memória</span>
            </div>
            
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Insira uma Chave (Key) e um Valor. O nosso algoritmo fará a soma dos valores ASCII de cada letra da sua Chave, e depois calculará o Resto da Divisão por 8 (<code>soma % 8</code>) para alocar num Bucket fixo!
            </p>

            <form onSubmit={handleInsert} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <input
                type="text"
                className="input"
                placeholder="Chave (ex: 'cidade')..."
                value={inputKey}
                onChange={e => setInputKey(e.target.value)}
                style={{ width: '180px' }}
              />
              <input
                type="text"
                className="input"
                placeholder="Valor (ex: 'São Paulo')..."
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                style={{ width: '220px' }}
              />
              <button type="submit" className="btn btn-primary btn-sm">
                Calcular Hash & Inserir O(1)
              </button>
            </form>

            {lastHashInfo && (
              <div style={{ padding: '0.75rem 1rem', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#065f46' }}>
                🧮 Hashing de <strong>"{lastHashInfo.key}"</strong>: Soma ASCII = {lastHashInfo.sum} | Cálculo de Memória: <code>{lastHashInfo.sum} % {BUCKET_SIZE} = {lastHashInfo.index}</code> ➔ Alocado no <strong>Bucket #{lastHashInfo.index}</strong>!
              </div>
            )}

            {/* Grid dos 8 Buckets */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1rem' }}>
              {buckets.map((entries, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#f8fafc',
                    border: '1.5px solid ' + (entries.length > 1 ? '#f59e0b' : entries.length === 1 ? '#059669' : 'var(--neutral-200)'),
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>
                      Bucket #{idx}
                    </span>
                    {entries.length > 1 ? (
                      <span className="badge badge-warning">Colisão ({entries.length})</span>
                    ) : entries.length === 1 ? (
                      <span className="badge badge-success">1 Item</span>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Vazio</span>
                    )}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {entries.map((item, i) => (
                      <div
                        key={i}
                        style={{
                          padding: '0.45rem 0.65rem',
                          background: '#ffffff',
                          border: '1px solid var(--neutral-200)',
                          borderRadius: '4px',
                          fontSize: '0.82rem',
                          fontFamily: 'var(--font-mono)'
                        }}
                      >
                        <span style={{ color: '#059669', fontWeight: 700 }}>"{item.key}"</span>: <span>"{item.value}"</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
        
      {/* SEÇÃO: 🛡️ Boas Práticas */}
      <section className="module-section">
        <h2 className="section-title">🛡️ Boas Práticas & Mercado</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div className="alert alert-info">
            <div>
              <strong>Objetos também são Hash Maps!</strong> No JavaScript, todo Objeto literal <code>{`{}`}</code> é uma implementação simplificada de uma Tabela Hash por baixo dos panos! É por isso que buscar uma chave num objeto (ex: <code>usuario["nome"]</code>) é instantâneo, não importa o tamanho do objeto!
            </div>
          </div>
          
          <div className="alert alert-success">
            <div>
              <strong>Map vs Object nativos:</strong> Se as chaves do seu dicionário forem adicionadas ou removidas dinamicamente o tempo todo pelo usuário final, sempre prefira a classe <code>new Map()</code> em vez de <code>{`{}`}</code>. O <code>Map</code> foi otimizado exatamente para inserção e deleção constantes e agressivas, prevenindo "Hash Collisions Attack".
            </div>
          </div>

        </div>
      </section>
        
    </div>
  );
};
