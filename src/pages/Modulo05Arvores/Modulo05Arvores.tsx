import React, { useState } from 'react';

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function insertBST(root: TreeNode | null, val: number): TreeNode {
  if (!root) return { value: val, left: null, right: null };
  if (val < root.value) {
    root.left = insertBST(root.left, val);
  } else if (val > root.value) {
    root.right = insertBST(root.right, val);
  }
  return root;
}

function inOrderTraversal(root: TreeNode | null, list: number[] = []): number[] {
  if (!root) return list;
  inOrderTraversal(root.left, list);
  list.push(root.value);
  inOrderTraversal(root.right, list);
  return list;
}

function preOrderTraversal(root: TreeNode | null, list: number[] = []): number[] {
  if (!root) return list;
  list.push(root.value);
  preOrderTraversal(root.left, list);
  preOrderTraversal(root.right, list);
  return list;
}

export const Modulo05Arvores: React.FC = () => {
  
  // Árvore inicial
  const [treeValues, setTreeValues] = useState<number[]>([50, 30, 70, 20, 40, 60, 80]);
  const [inputValue, setInputValue] = useState('');

  // Constrói a árvore a partir do array
  const rootNode = React.useMemo(() => {
    let root: TreeNode | null = null;
    for (const val of treeValues) {
      root = insertBST(root, val);
    }
    return root;
  }, [treeValues]);

  const inOrderList = React.useMemo(() => inOrderTraversal(rootNode, []), [rootNode]);
  const preOrderList = React.useMemo(() => preOrderTraversal(rootNode, []), [rootNode]);

  const handleInsert = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(inputValue);
    if (isNaN(num) || treeValues.includes(num)) return;

    setTreeValues(prev => [...prev, num]);
    setInputValue('');
  };

  const handleReset = () => {
    setTreeValues([50, 30, 70, 20, 40, 60, 80]);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 2: Estruturas Avançadas</span>
          <span className="badge badge-neutral">Módulo 05</span>
        </div>
        <h1>Árvores Binárias de Busca (BST)</h1>
        <p className="subtitle">
          Nós Raiz, Ramos Esquerdo e Direito, Percursos In-Order, Pre-Order e Busca Logarítmica O(log n).
        </p>
      </div>

      

      

      

      

      
    
        
      {/* SEÇÃO: 📖 Teoria */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Por que Árvores Binárias são tão Rápidas?
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>
              A cada passo na busca de uma árvore balanceada, você descarta metade de todos os nós restantes!
              Isso garante que uma busca em 1 bilhão de registros precise de apenas <strong>30 comparações</strong> (<code>log₂(1.000.000.000) ≈ 30</code>).
            </p>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 💻 Exemplos Práticos */}
      <section className="module-section">
        <h2 className="section-title">💻 Exemplos Práticos</h2>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Nó de Árvore e Inserção Recursiva em TypeScript
          </h3>
          <pre>
            <code>{`class TreeNode {
  value: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;

  constructor(value: number) {
    this.value = value;
  }
}

function insert(root: TreeNode | null, val: number): TreeNode {
  if (!root) return new TreeNode(val);
  if (val < root.value) root.left = insert(root.left, val);
  else if (val > root.value) root.right = insert(root.right, val);
  return root;
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
              🌳 Laboratório de Árvore Binária de Busca
            </h3>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Regra fundamental: Qualquer nó à <strong>esquerda</strong> é menor que o pai. Qualquer nó à <strong>direita</strong> é maior que o pai.
            </p>

            <form onSubmit={handleInsert} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <input
                type="number"
                className="input"
                placeholder="Insira um número (ex: 45)..."
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                style={{ width: '220px' }}
              />
              <button type="submit" className="btn btn-primary btn-sm">+ Inserir na Árvore</button>
              <button type="button" onClick={handleReset} className="btn btn-secondary btn-sm">Reiniciar Padrão</button>
            </form>

            {/* Representação Gráfica dos Nós em Níveis */}
            <div style={{ background: '#f8fafc', padding: '2rem 1rem', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--neutral-200)', textAlign: 'center', overflowX: 'auto' }}>
              <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
                {/* Raiz */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#059669', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem', boxShadow: '0 4px 10px rgba(5,150,105,0.3)' }}>
                    {rootNode?.value}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>Raiz</span>
                </div>

                {/* Nível 1 */}
                <div style={{ display: 'flex', gap: '8rem', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#0d9488', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                      {rootNode?.left?.value ?? '-'}
                    </div>
                    <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Esquerda (&lt; Raiz)</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#0d9488', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                      {rootNode?.right?.value ?? '-'}
                    </div>
                    <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Direita (&gt; Raiz)</span>
                  </div>
                </div>

                {/* Percursos Calculados */}
                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', textAlign: 'left' }}>
                  <div style={{ padding: '0.85rem 1rem', background: '#ecfdf5', borderRadius: 'var(--radius-sm)', border: '1px solid #a7f3d0' }}>
                    <strong style={{ color: '#065f46', fontSize: '0.85rem' }}>Percurso In-Order (Ordenação Natural):</strong>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: '#047857', marginTop: '0.2rem' }}>
                      [ {inOrderList.join(' ➔ ')} ]
                    </div>
                  </div>

                  <div style={{ padding: '0.85rem 1rem', background: '#f0f9ff', borderRadius: 'var(--radius-sm)', border: '1px solid #bae6fd' }}>
                    <strong style={{ color: '#0369a1', fontSize: '0.85rem' }}>Percurso Pre-Order (Raiz ➔ Esquerda ➔ Direita):</strong>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: '#0284c7', marginTop: '0.2rem' }}>
                      [ {preOrderList.join(' ➔ ')} ]
                    </div>
                  </div>
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
          <div className="alert alert-warning">
            <div>
              <strong>Árvores Desbalanceadas:</strong> Se você inserir dados já ordenados (ex: 10, 20, 30, 40) em uma BST simples, ela vira uma linha reta degenerada equivalente a uma lista encadeada O(n). É por isso que árvores corporativas usam auto-balanceamento (como <strong>Árvores AVL</strong> ou <strong>Red-Black Trees</strong>).
            </div>
          </div>
        </div>
      </section>
        
      
</div>
  );
};
