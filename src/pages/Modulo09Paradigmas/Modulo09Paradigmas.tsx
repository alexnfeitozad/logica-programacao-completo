import React, { useState } from 'react';

// --- POO Model ---
abstract class ContaBancaria {
  titular: string;
  protected saldo: number;

  constructor(titular: string, saldoInicial: number) {
    this.titular = titular;
    this.saldo = saldoInicial;
  }

  getSaldo(): number {
    return this.saldo;
  }

  depositar(valor: number): void {
    if (valor <= 0) throw new Error('Valor inválido');
    this.saldo += valor;
  }

  abstract sacar(valor: number): boolean;
}

class ContaCorrente extends ContaBancaria {
  sacar(valor: number): boolean {
    const taxa = 2.50;
    if (this.saldo >= valor + taxa) {
      this.saldo -= (valor + taxa);
      return true;
    }
    return false;
  }
}

interface Transacao {
  id: number;
  tipo: 'entrada' | 'saida';
  valor: number;
  categoria: string;
}

const TRANSACOES_INICIAIS: Transacao[] = [
  { id: 1, tipo: 'entrada', valor: 3500, categoria: 'Salário' },
  { id: 2, tipo: 'saida', valor: 120, categoria: 'Alimentação' },
  { id: 3, tipo: 'saida', valor: 450, categoria: 'Educação' },
  { id: 4, tipo: 'entrada', valor: 800, categoria: 'Freelance' },
  { id: 5, tipo: 'saida', valor: 300, categoria: 'Lazer' }
];

export const Modulo09Paradigmas: React.FC = () => {
  
  // FP State
  const [filtroTipo, setFiltroTipo] = useState<'todos' | 'entrada' | 'saida'>('todos');
  const [categoriaBusca, setCategoriaBusca] = useState('');

  // POO State
  const [conta] = useState<ContaCorrente>(new ContaCorrente('Mariana Engenheira', 1000));
  const [pooSaldo, setPooSaldo] = useState(conta.getSaldo());
  const [valorOperacao, setValorOperacao] = useState(100);

  // Pipeline Funcional (Imutável)
  const transacoesFiltradas = TRANSACOES_INICIAIS
    .filter(t => filtroTipo === 'todos' || t.tipo === filtroTipo)
    .filter(t => !categoriaBusca || t.categoria.toLowerCase().includes(categoriaBusca.toLowerCase()));

  const totalCalculado = transacoesFiltradas.reduce((acc, t) => {
    return t.tipo === 'entrada' ? acc + t.valor : acc - t.valor;
  }, 0);

  const handleDepositarPOO = () => {
    conta.depositar(valorOperacao);
    setPooSaldo(conta.getSaldo());
  };

  const handleSacarPOO = () => {
    const ok = conta.sacar(valorOperacao);
    if (!ok) alert('Saldo insuficiente para saque com taxa!');
    setPooSaldo(conta.getSaldo());
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="badge-container">
          <span className="badge badge-primary">Fase 3: Algoritmos & Otimização</span>
          <span className="badge badge-neutral">Módulo 09</span>
        </div>
        <h1>Paradigmas: FP vs POO</h1>
        <p className="subtitle">
          Como dominar os dois mundos (Programação Funcional Imutável e Orientação a Objetos Encapsulada) no TypeScript.
        </p>
      </div>

      {/* SEÇÃO: 📖 Teoria Completa */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria Completa & Padrões Visuais</h2>
        
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          
          {/* Tópico 1 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🏛️ 1. Orientação a Objetos (POO / OOP)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  A POO modela o mundo real encapsulando o <strong>Estado</strong> (Dados) e o <strong>Comportamento</strong> (Métodos) juntos dentro de uma Cápsula (Classe/Objeto).
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  O foco é em regras de negócios blindadas. Ninguém de fora pode mudar o saldo de uma Conta Corrente diretamente (<code>private</code>). O único jeito de interagir com o dado é pedindo permissão aos métodos <code>sacar()</code> e <code>depositar()</code>.
                </p>
              </div>
              <div>
                <img 
                  src="https://placehold.co/600x400/ecfdf5/065f46?text=%5B+C%C3%A1psula+OOP+%5D%5Cn%5CnDados%3A+Saldo+R%24100+(Blindado)%5Cn%E2%86%95%5CnM%C3%A9todos%3A+Sacar()+Depositar()" 
                  alt="Esquema Orientação a Objetos" 
                  style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0' }} />

          {/* Tópico 2 */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              λ 2. Programação Funcional (FP)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ order: 2 }}>
                <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1rem' }}>
                  A Funcional detesta mutabilidade (mudar estados). Em vez de modificar um objeto, você coloca dados em uma <strong>Esteira de Produção (Pipeline)</strong>.
                </p>
                <p style={{ color: '#475569', lineHeight: 1.6 }}>
                  O array de transações originais nunca é tocado. Ele entra no tubo <code>filter()</code>, sai uma cópia menor. Que entra no tubo <code>map()</code>, sai uma cópia transformada. Que entra no <code>reduce()</code>, saindo o resultado final de R$1.000,00.
                </p>
              </div>
              <div style={{ order: 1 }}>
                <img 
                  src="https://placehold.co/600x400/f0f9ff/0369a1?text=Pipeline+Funcional%5Cn%5Cn%5B+A%2C+B%2C+C+%5D%5Cn%E2%86%93++%5C%5C+filter()%5Cn%5B+A%2C+B+%5D%5Cn%E2%86%93++%5C%5C+map()%5Cn%5B+a%2C+b+%5D" 
                  alt="Esquema Funcional" 
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
            Pipeline Funcional Declarativo em TypeScript
          </h3>
          <p style={{ color: 'var(--neutral-500)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Diferente de um loop <code>for</code> enorme que faz tudo de uma vez (Imperativo), na FP dizemos <em>o que</em> queremos, usando blocos independentes e encadeados (Declarativo).
          </p>
          <pre>
            <code>{`const totalIncome = transactions
  .filter(t => t.type === 'income') // Passo 1: Jogue fora as despesas
  .map(t => t.amount)               // Passo 2: Extraia apenas o dinheiro (números)
  .reduce((acc, val) => acc + val, 0); // Passo 3: Some tudo começando do 0`}</code>
          </pre>
        </div>
      </section>
        
      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática: O Laboratório Computacional</h2>
        <div className="grid-2">
          
          {/* Lado 1: Programação Funcional */}
          <div className="glass-card" style={{ borderTop: '4px solid #0ea5e9' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                λ Funcional (Pipeline Imutável)
              </h3>
            </div>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              Use os filtros abaixo. Eles recriarão o array de transações derivado do zero instantaneamente na memória usando <code>filter()</code> e calcularão com <code>reduce()</code>.
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexDirection: 'column' }}>
              <select
                className="input"
                value={filtroTipo}
                onChange={e => setFiltroTipo(e.target.value as any)}
              >
                <option value="todos">1º Pipe: Todos os Tipos</option>
                <option value="entrada">1º Pipe: Só Entradas (+)</option>
                <option value="saida">1º Pipe: Só Saídas (-)</option>
              </select>

              <input
                type="text"
                className="input"
                placeholder="2º Pipe: Buscar categoria..."
                value={categoriaBusca}
                onChange={e => setCategoriaBusca(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem', minHeight: '180px' }}>
              {transacoesFiltradas.length === 0 && (
                <div style={{ textAlign: 'center', color: '#94a3b8', fontStyle: 'italic', margin: 'auto' }}>Nenhuma transação atende aos filtros.</div>
              )}
              {transacoesFiltradas.map(t => (
                <div
                  key={t.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0.75rem',
                    background: '#f8fafc',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--neutral-200)',
                    fontSize: '0.85rem'
                  }}
                >
                  <span style={{ fontWeight: 600, color: '#334155' }}>{t.categoria}</span>
                  <span style={{ fontWeight: 800, color: t.tipo === 'entrada' ? '#16a34a' : '#dc2626' }}>
                    {t.tipo === 'entrada' ? '+' : '-'} R$ {t.valor.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ padding: '1rem', background: '#f0f9ff', borderRadius: 'var(--radius-md)', border: '1px solid #bae6fd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, color: '#0369a1', fontSize: '0.9rem' }}>3º Pipe: Reduce (Total)</span>
              <span style={{ fontWeight: 900, color: '#0284c7', fontSize: '1.25rem' }}>R$ {totalCalculado.toFixed(2)}</span>
            </div>
          </div>

          {/* Lado 2: Orientação a Objetos */}
          <div className="glass-card" style={{ borderTop: '4px solid #10b981' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                🏛️ Orientação a Objetos (POO)
              </h3>
            </div>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              Interaja com a Classe <code>ContaCorrente</code>. O Atributo Saldo é <code>protected</code>. Ele só permite saque se houver dinheiro para pagar a taxa bancária de R$2,50!
            </p>

            <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-200)', marginBottom: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.9rem', color: '#475569', fontWeight: 600 }}>Titular: {conta.titular}</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>Classe Instanciada: ContaCorrente (Taxa Fixa R$ 2,50)</div>
              
              <div style={{ fontSize: '3rem', fontWeight: 900, color: '#059669', margin: '1rem 0', fontFamily: 'var(--font-mono)' }}>
                R$ {pooSaldo.toFixed(2)}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700, background: '#ecfdf5', display: 'inline-block', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>Estado Encapsulado</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>Valor da Operação (R$)</label>
              <input
                type="number"
                className="input"
                value={valorOperacao}
                onChange={e => setValorOperacao(Number(e.target.value))}
                step="50"
              />
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button onClick={handleDepositarPOO} className="btn btn-success" style={{ flex: 1 }}>
                  Chamar depositar()
                </button>
                <button onClick={handleSacarPOO} className="btn btn-danger" style={{ flex: 1 }}>
                  Chamar sacar()
                </button>
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
              <strong>Multi-paradigma Front-end:</strong> No React moderno, usamos os DOIS o tempo todo! O estado dentro de um componente muitas vezes simula o encapsulamento POO (Ninguém de fora altera as variáveis do Componente diretamente). Ao mesmo tempo, usamos a Imutabilidade FP de Array Methods pesadamente (ex: usando o <code>.map()</code> para renderizar JSX sem quebrar estados originais). O arquiteto sênior abraça os dois!
            </div>
          </div>
        </div>
      </section>
        
    </div>
  );
};
