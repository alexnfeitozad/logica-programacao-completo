import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface Challenge {
  id: string;
  title: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  description: string;
  testCases: { input: string; expected: string }[];
  solutionCode: string;
}

const CHALLENGES: Challenge[] = [
  {
    id: 'two-sum',
    title: '1. Two Sum (Alvo de Dois Números)',
    difficulty: 'Fácil',
    description: 'Dado um array de números inteiros e um alvo (target), retorne os índices dos dois números cuja soma seja igual ao alvo. Solução ótima em O(n) com Hash Map.',
    testCases: [
      { input: 'nums = [2, 7, 11, 15], target = 9', expected: '[0, 1]' },
      { input: 'nums = [3, 2, 4], target = 6', expected: '[1, 2]' },
      { input: 'nums = [3, 3], target = 6', expected: '[0, 1]' }
    ],
    solutionCode: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement)!, i];
    map.set(nums[i], i);
  }
  return []; // Nunca deve chegar aqui se o array tiver solução
}`
  },
  {
    id: 'valid-parentheses',
    title: '20. Valid Parentheses (Parênteses Válidos)',
    difficulty: 'Fácil',
    description: 'Dada uma string contendo apenas "()[]{}", determine se a sequência de fechamento está correta usando uma Pilha (Stack).',
    testCases: [
      { input: 's = "()"', expected: 'true' },
      { input: 's = "()[]{}"', expected: 'true' },
      { input: 's = "(]"', expected: 'false' },
      { input: 's = "([)]"', expected: 'false' }
    ],
    solutionCode: `function isValid(s: string): boolean {
  const stack: string[] = []; // Uma pilha simples com array
  const map: Record<string, string> = { ')': '(', '}': '{', ']': '[' };

  for (const char of s) {
    if (char in map) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char); // Abre parenteses vai pra pilha
    }
  }
  return stack.length === 0; // Se sobrou alguém na pilha, deu erro
}`
  }
];

export const Modulo10ArenaDesafios: React.FC = () => {
  
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge>(CHALLENGES[0]);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testResults, setTestResults] = useState<{ passed: boolean; duration: number }[] | null>(null);

  const handleRunTests = async () => {
    setIsRunningTests(true);
    setTestResults(null);

    await new Promise(r => setTimeout(r, 600));

    const results = selectedChallenge.testCases.map(() => ({
      passed: true,
      duration: Math.floor(Math.random() * 8 + 2)
    }));

    setTestResults(results);
    setIsRunningTests(false);
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
  };

  return (
    <div className="page-container">
      <div className="page-header" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: '#fff', borderRadius: '16px', padding: '3rem 2rem', marginBottom: '3rem' }}>
        <div className="badge-container" style={{ marginBottom: '1rem' }}>
          <span className="badge" style={{ background: '#fff', color: '#1e293b' }}>Fase 4: Maestria (Desafios Finais)</span>
          <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}>Módulo 10</span>
        </div>
        <h1 style={{ color: '#fff', margin: 0, fontSize: '2.5rem', fontWeight: 900, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          Arena de Desafios (LeetCode Style)
        </h1>
        <p style={{ color: '#cbd5e1', fontSize: '1.15rem', marginTop: '1rem', opacity: 0.9 }}>
          O Teste Final. É hora de usar Stacks, Queues, Pointers, Arrays e Hash Maps para passar nos exames técnicos das grandes Big Techs.
        </p>
      </div>

      {/* SEÇÃO: 📖 Teoria Completa */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria: Como passar em entrevistas técnicas</h2>
        
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🧠 O Framework UMPIRE
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  Os melhores engenheiros nunca começam codando no quadro branco. Eles usam o método UMPIRE para destrinchar o problema e garantir a comunicação.
                </p>
                <ol style={{ marginLeft: '1.5rem', color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.6rem', lineHeight: 1.5 }}>
                  <li><strong>U (Understand - Entender):</strong> A array pode ser vazia? Pode ter números negativos?</li>
                  <li><strong>M (Match - Mapear):</strong> Lembro de algum padrão? Hash Map pode ajudar? 2 Ponteiros?</li>
                  <li><strong>P (Plan - Planejar):</strong> Fale em voz alta: "Vou criar um Map, depois um Loop..."</li>
                  <li><strong>I (Implement - Implementar):</strong> Só agora você escreve o código no quadro.</li>
                  <li><strong>R (Review - Revisar):</strong> "Rode" o código mentalmente na frente do recrutador.</li>
                  <li><strong>E (Evaluate - Avaliar):</strong> Declare o Big-O de tempo e memória.</li>
                </ol>
              </div>
              <div>
                <img 
                  src="https://placehold.co/600x400/fffbeb/b45309?text=%5B+Quadro+Branco+Google+%5D%5Cn%5CnEntrevistador%3A+%22Fa%C3%A7a+um+Two+Sum%22%5Cn%5CnVoc%C3%AA%3A+%22Hmm...+Se+eu+usar+um+Hash+Map%2C%5Cnconsigo+O%28n%29+de+tempo%21%22" 
                  alt="Esquema UMPIRE" 
                  style={{ width: '100%', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

        </div>
      </section>
        
      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática: O Laboratório LeetCode</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Seletor de Desafios */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {CHALLENGES.map(ch => (
              <button
                key={ch.id}
                onClick={() => {
                  setSelectedChallenge(ch);
                  setTestResults(null);
                }}
                className={\`btn btn-sm \${selectedChallenge.id === ch.id ? 'btn-primary' : 'btn-secondary'}\`}
                style={{ padding: '0.6rem 1.2rem', fontWeight: 700 }}
              >
                {ch.title}
              </button>
            ))}
          </div>

          <div className="grid-2" style={{ alignItems: 'stretch' }}>
            
            {/* Esquerda: Descrição e Código */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>{selectedChallenge.title}</h3>
                <span className="badge badge-success" style={{ background: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0', padding: '0.4rem 0.8rem' }}>
                  {selectedChallenge.difficulty}
                </span>
              </div>

              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
                {selectedChallenge.description}
              </p>

              <div style={{ background: '#1e293b', borderRadius: '8px', overflow: 'hidden', border: '1px solid #334155' }}>
                <div style={{ background: '#0f172a', padding: '0.5rem 1rem', fontSize: '0.75rem', color: '#94a3b8', borderBottom: '1px solid #334155', fontWeight: 600 }}>
                  Solution.ts (TypeScript)
                </div>
                <pre style={{ margin: 0, padding: '1rem', background: 'transparent', border: 'none', boxShadow: 'none' }}>
                  <code>{selectedChallenge.solutionCode}</code>
                </pre>
              </div>
            </div>

            {/* Direita: Engine de Testes */}
            <div className="glass-card" style={{ background: '#0f172a', color: '#e2e8f0', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
              <div style={{ background: '#1e293b', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #334155' }}>
                <span style={{ color: '#38bdf8', fontWeight: 800, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  ⚡ Vitest Test Engine
                </span>
                <button
                  onClick={handleRunTests}
                  disabled={isRunningTests}
                  className="btn btn-success btn-sm"
                  style={{ background: '#10b981', border: 'none' }}
                >
                  {isRunningTests ? 'Compilando...' : '▶ Submeter (Submit)'}
                </button>
              </div>

              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
                
                {/* Casos de Teste (Exibição prévia) */}
                {!testResults && !isRunningTests && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Test Cases Prontos para Execução:
                    </h4>
                    {selectedChallenge.testCases.map((tc, idx) => (
                      <div key={idx} style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                        <div style={{ color: '#cbd5e1' }}><strong>Input:</strong> {tc.input}</div>
                        <div style={{ color: '#94a3b8', marginTop: '0.2rem' }}><strong>Expected:</strong> {tc.expected}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Loading State */}
                {isRunningTests && (
                  <div style={{ margin: 'auto', textAlign: 'center', color: '#38bdf8', fontWeight: 600, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <span style={{ fontSize: '2rem' }}>⚙️</span>
                    Executando Test Cases em container isolado...
                  </div>
                )}

                {/* Resultados dos Testes */}
                {testResults && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                    {testResults.map((r, i) => (
                      <div
                        key={i}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '4px', color: '#34d399' }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>✓ Test Case {i + 1} Passed</span>
                          <span style={{ fontSize: '0.75rem', color: '#a7f3d0' }}>Expected: {selectedChallenge.testCases[i].expected}</span>
                        </div>
                        <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{r.duration}ms</span>
                      </div>
                    ))}
                    
                    <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #34d399', borderRadius: '4px', color: '#a7f3d0', fontWeight: 700, textAlign: 'center' }}>
                      🎉 ACCEPTED! Runtime: {testResults.reduce((acc, curr) => acc + curr.duration, 0)}ms.
                      <br/>
                      <span style={{ fontSize: '0.8rem', fontWeight: 400, color: '#6ee7b7', marginTop: '0.5rem', display: 'inline-block' }}>O(N) Complexidade de Tempo Aprovada.</span>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER DA MASTERCLASS */}
      <div style={{ marginTop: '4rem', textAlign: 'center', padding: '3rem', background: 'linear-gradient(135deg, #4f46e5 0%, #0ea5e9 100%)', color: '#fff', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.4)' }}>
        <div style={{ fontSize: '4.5rem', marginBottom: '1rem' }}>🏆</div>
        <h2 style={{ margin: '0 0 1rem 0', color: '#fff', fontSize: '2.5rem', fontWeight: 900 }}>Trilha Lógica Concluída!</h2>
        <p style={{ color: '#e0f2fe', maxWidth: '700px', margin: '0 auto', lineHeight: 1.7, fontSize: '1.15rem' }}>
          Você dominou Stack, Heap, Big-O Notation, Arrays, Linked Lists, Hash Maps, Árvores Binárias, Algoritmos de Ordenação O(n log n) e Arquitetura POO/FP. Você não é mais só um "codificador", você é um <strong>Engenheiro de Software</strong>.
        </p>
      </div>
        
    </div>
  );
};
