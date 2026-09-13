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
          Saia das estruturas lineares e descubra como a divisão logarítmica O(log N) permite buscar 1 dado entre 1 Bilhão em apenas 30 passos.
        </p>
      </div>

      {/* SEÇÃO: 📖 Teoria Completa */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria Completa & Padrões Visuais</h2>
        
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Tópico 1 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🌳 1. Anatomia de uma Árvore
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Ao contrário dos Arrays e Listas (que são "linhas retas"), as Árvores se ramificam. Elas têm:
                </p>
                <ul style={{ color: '#475569', lineHeight: 1.6, paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                  <li><strong>Raiz (Root):</strong> O nó principal lá no topo. É por onde você sempre começa.</li>
                  <li><strong>Filhos (Children):</strong> Cada nó pode apontar para outros nós abaixo dele (Esquerda e Direita).</li>
                  <li><strong>Folhas (Leaves):</strong> São os nós lá embaixo na ponta, que não têm nenhum filho. Apontam para NULL.</li>
                </ul>
              </div>
              <div>
                <img 
                  src="https://placehold.co/600x400/e0f2fe/0369a1?text=Anatomia+da+%C3%81rvore%5Cn%5Cn++%5B+RAIZ+%5D++%5Cn++%E2%86%99++++%E2%86%98++%5Cn%5BFilho+E%5D++%5BFilho+D%5D%5Cn%E2%86%99%5Cn%5BFolha%5D(Sem+filhos)" 
                  alt="Anatomia da Árvore" 
                  style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

          {/* Tópico 2 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ⚖️ 2. A Regra de Ouro da Árvore Binária de Busca (BST)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ order: 2 }}>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Uma <strong>Binary Search Tree</strong> tem uma regra inquebrável que a torna absurdamente rápida para pesquisas:
                </p>
                <ul style={{ color: '#475569', lineHeight: 1.6, paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                  <li>TUDO que for <strong>MENOR</strong> que o nó atual vai para a <strong>ESQUERDA</strong>.</li>
                  <li>TUDO que for <strong>MAIOR</strong> que o nó atual vai para a <strong>DIREITA</strong>.</li>
                </ul>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  Assim, se você está buscando o número 90 e a raiz é 50, você automaticamente joga fora toda a metade esquerda da árvore. Você corta o trabalho pela metade a cada passo! <strong>(O(log N))</strong>
                </p>
              </div>
              <div style={{ order: 1 }}>
                <img 
                  src="https://placehold.co/600x400/f0fdf4/16a34a?text=Regra+da+BST%5Cn%5Cn++%5B+50+%5D++%5Cn++%E2%86%99++++%E2%86%98++%5Cn%5B+%3C+50+%5D++%5B+%3E+50+%5D%5Cn(20)++++++(80)" 
                  alt="Regra da BST" 
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
            Nó de Árvore e Inserção Recursiva em TypeScript
          </h3>
          <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Diferente da Lista Encadeada (que tinha apenas 1 <code>next</code>), o Nó da Árvore tem dois ponteiros: <code>left</code> e <code>right</code>. Usamos recursão para descer pelos galhos.
          </p>
          <pre>
            <code>{`// A estrutura de cada Caixinha
class TreeNode {
  value: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;

  constructor(value: number) {
    this.value = value;
  }
}

// Inserindo na Árvore (A Mágica Logarítmica)
function insert(root: TreeNode | null, val: number): TreeNode {
  // Se achou um espaço vazio (NULL), cria o nó e retorna!
  if (!root) return new TreeNode(val);
  
  // Se for menor, manda pra sub-árvore Esquerda
  if (val < root.value) {
    root.left = insert(root.left, val);
  } 
  // Se for maior, manda pra sub-árvore Direita
  else if (val > root.value) {
    root.right = insert(root.right, val);
  }
  
  return root;
}`}</code>
          </pre>
        </div>
      </section>
        
      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática: O Laboratório Computacional</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', color: '#0369a1' }}>
              🌳 Laboratório Interativo de Árvore Binária de Busca
            </h3>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Insira números. Se for MENOR que a Raiz (50), ele vai pra Esquerda. Se for MAIOR, vai pra Direita. 
              Abaixo da árvore, observe como o percurso <strong>In-Order</strong> milagrosamente sempre imprime os números em ordem crescente!
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
              <button type="submit" className="btn btn-primary btn-sm">+ Inserir (O(log n))</button>
              <button type="button" onClick={handleReset} className="btn btn-secondary btn-sm">Reiniciar Padrão</button>
            </form>

            {/* Representação Gráfica dos Nós em Níveis */}
            <div style={{ background: '#f8fafc', padding: '2.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1.5px dashed var(--neutral-300)', textAlign: 'center', overflowX: 'auto' }}>
              <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', minWidth: '400px' }}>
                {/* Raiz */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#059669', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.25rem', boxShadow: '0 4px 10px rgba(5,150,105,0.3)', border: '3px solid #047857' }}>
                    {rootNode?.value}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.4rem', fontWeight: 700 }}>Raiz</span>
                </div>

                {/* Nível 1 */}
                <div style={{ display: 'flex', gap: '10rem', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                    {/* Linha Falsa Conectora */}
                    <div style={{ position: 'absolute', top: '-2rem', right: '-4rem', width: '4rem', height: '2rem', borderBottom: '2px solid #94a3b8', borderLeft: '2px solid #94a3b8', borderRadius: '0 0 0 8px' }}></div>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#0d9488', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.1rem', zIndex: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                      {rootNode?.left?.value ?? 'NULL'}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.4rem' }}>Esquerda (&lt; Raiz)</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                    {/* Linha Falsa Conectora */}
                    <div style={{ position: 'absolute', top: '-2rem', left: '-4rem', width: '4rem', height: '2rem', borderBottom: '2px solid #94a3b8', borderRight: '2px solid #94a3b8', borderRadius: '0 0 8px 0' }}></div>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#0d9488', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.1rem', zIndex: 2, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                      {rootNode?.right?.value ?? 'NULL'}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.4rem' }}>Direita (&gt; Raiz)</span>
                  </div>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.75rem', fontStyle: 'italic', marginTop: '-1rem' }}>(A árvore real desce por muitos mais níveis no código!)</p>

                {/* Percursos Calculados */}
                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', textAlign: 'left' }}>
                  <div style={{ padding: '1rem', background: '#ecfdf5', borderRadius: 'var(--radius-sm)', border: '1px solid #a7f3d0' }}>
                    <strong style={{ color: '#065f46', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      🟢 Percurso In-Order (Esquerda ➔ Raiz ➔ Direita):
                    </strong>
                    <p style={{ fontSize: '0.8rem', color: '#047857', marginBottom: '0.5rem', marginTop: '0.2rem' }}>
                      Repare como o In-Order naturalmente coloca TODOS os números em ordem crescente, sem precisar usar sort()!
                    </p>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: '#047857', fontWeight: 600 }}>
                      [ {inOrderList.join(' ➔ ')} ]
                    </div>
                  </div>

                  <div style={{ padding: '1rem', background: '#f0f9ff', borderRadius: 'var(--radius-sm)', border: '1px solid #bae6fd' }}>
                    <strong style={{ color: '#0369a1', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      🔵 Percurso Pre-Order (Raiz ➔ Esquerda ➔ Direita):
                    </strong>
                    <p style={{ fontSize: '0.8rem', color: '#0284c7', marginBottom: '0.5rem', marginTop: '0.2rem' }}>
                      Excelente para fazer uma cópia da árvore, pois lê os nós de cima para baixo.
                    </p>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: '#0284c7', fontWeight: 600 }}>
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
        <h2 className="section-title">🛡️ Boas Práticas & Mercado</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div className="alert alert-warning">
            <div>
              <strong>O perigo da Árvore Desbalanceada (Degenerada):</strong> Se você criar uma árvore vazia e começar a inserir números que <em>já estão em ordem</em> (ex: 10, depois 20, depois 30, depois 40), todos eles vão cair para a Direita da árvore. A árvore vira uma "linha reta" que se comporta como uma Lista Encadeada comum! A performance desaba de incrível <strong>O(log N)</strong> para péssima <strong>O(N)</strong>.
            </div>
          </div>
          
          <div className="alert alert-success">
            <div>
              <strong>Árvores AVL e Red-Black (A Solução):</strong> Nos bastidores dos Bancos de Dados Reais (como PostgreSQL e MySQL), as Árvores Binárias são "Auto-Balanceáveis". Se ela começar a pender demais para um lado, o algoritmo gira os nós no ar para manter a árvore sempre baixinha e perfeitamente simétrica. É assim que os Índices de Banco de Dados funcionam!
            </div>
          </div>

        </div>
      </section>
        
    </div>
  );
};
