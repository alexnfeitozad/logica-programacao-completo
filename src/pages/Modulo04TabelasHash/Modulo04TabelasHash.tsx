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
        <h1>Tabelas Hash & Mapas</h1>
        <p className="subtitle">
          Funções de Hash matemáticas, Buckets de Memória, Resolução de Colisões e Busca em O(1).
        </p>
      </div>

      

      

      

      

      
    
        
      {/* SEÇÃO: 📖 Teoria */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Como Funciona a Busca em Tempo Constante O(1)?
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>
              Ao buscar <code>map.get('user')</code>, o JavaScript não percorre o array item a item.
              Ele passa a palavra 'user' pela função de hash matemática, descobre o índice de memória exato e acessa o valor diretamente.
            </p>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 💻 Exemplos Práticos */}
      <section className="module-section">
        <h2 className="section-title">💻 Exemplos Práticos</h2>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Estrutura de Hash Table Simples em TypeScript
          </h3>
          <pre>
            <code>{`export class HashTable<V> {
  private buckets: Array<Array<[string, V]>> = Array.from({ length: 16 }, () => []);

  private hash(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.buckets.length;
    }
    return hash;
  }

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
        <h2 className="section-title">🧪 Prática / Simulador</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              🗝️ Laboratório de Hashing e Resolução de Colisões
            </h3>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Insira uma chave e valor. A função de Hash calcula a soma ASCII dos caracteres e aplica o módulo <code>(sum % 8)</code> para descobrir o Bucket de destino instantaneamente em <strong>O(1)</strong>.
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
                Calcular Hash & Inserir
              </button>
            </form>

            {lastHashInfo && (
              <div style={{ padding: '0.75rem 1rem', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#065f46' }}>
                🧮 Hashing de <strong>"{lastHashInfo.key}"</strong>: Soma ASCII = {lastHashInfo.sum} | Cálculo: <code>{lastHashInfo.sum} % {BUCKET_SIZE} = {lastHashInfo.index}</code> ➔ Alocado no <strong>Bucket #{lastHashInfo.index}</strong>!
              </div>
            )}

            {/* Grid dos 8 Buckets */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1rem' }}>
              {buckets.map((entries, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#f8fafc',
                    border: `1.5px solid ${entries.length > 1 ? '#f59e0b' : entries.length === 1 ? '#059669' : 'var(--neutral-200)'}`,
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
        <h2 className="section-title">🛡️ Boas Práticas</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="alert alert-success">
            <div>
              <strong>Map vs Object no JavaScript:</strong> Sempre prefira a classe nativa <code>Map</code> quando as chaves forem desconhecidas em tempo de compilação ou adicionadas/removidas dinamicamente com frequência, pois ela é otimizada para alto desempenho de inserção e busca.
            </div>
          </div>
        </div>
      </section>
        
      
</div>
  );
};
