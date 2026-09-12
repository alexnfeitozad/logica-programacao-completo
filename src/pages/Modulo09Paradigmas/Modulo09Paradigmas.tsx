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

export class ContaPoupanca extends ContaBancaria {
  sacar(valor: number): boolean {
    if (this.saldo >= valor) {
      this.saldo -= valor;
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
        <h1>Funcional vs Orientação a Objetos (POO)</h1>
        <p className="subtitle">
          Imutabilidade, Pipelines com Map/Filter/Reduce vs Classes, Encapsulamento e Polimorfismo.
        </p>
      </div>

      

      

      

      

      
    
        
      {/* SEÇÃO: 📖 Teoria */}
      <section className="module-section">
        <h2 className="section-title">📖 Teoria</h2>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              A Fusão Moderna: Multi-paradigma em TypeScript
            </h3>
            <p style={{ color: '#475569', lineHeight: 1.6 }}>
              Os melhores engenheiros não são fanáticos por apenas um paradigma.
              Eles usam <strong>POO</strong> para modelar domínios de negócios ricos e encapsulados, e <strong>FP</strong> para transformar coleções de dados sem efeitos colaterais.
            </p>
          </div>
        </div>
      </section>
        
        
      {/* SEÇÃO: 💻 Exemplos Práticos */}
      <section className="module-section">
        <h2 className="section-title">💻 Exemplos Práticos</h2>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Pipeline Funcional Puro com TypeScript
          </h3>
          <pre>
            <code>{`const totalIncome = transactions
  .filter(t => t.type === 'income')
  .map(t => t.amount)
  .reduce((acc, val) => acc + val, 0);`}</code>
          </pre>
        </div>
      </section>
        
        
      {/* SEÇÃO: 🧪 Prática / Simulador */}
      <section className="module-section">
        <h2 className="section-title">🧪 Prática / Simulador</h2>
        <div className="grid-2">
          {/* Lado 1: Programação Funcional */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                λ Programação Funcional (FP)
              </h3>
              <span className="badge badge-primary">Pura & Imutável</span>
            </div>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              Transformação de fluxos com <code>filter()</code> e <code>reduce()</code> sem alterar a fonte original.
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <select
                className="input"
                value={filtroTipo}
                onChange={e => setFiltroTipo(e.target.value as any)}
                style={{ width: 'auto' }}
              >
                <option value="todos">Todos os Tipos</option>
                <option value="entrada">Entradas (+)</option>
                <option value="saida">Saídas (-)</option>
              </select>

              <input
                type="text"
                className="input"
                placeholder="Filtrar categoria..."
                value={categoriaBusca}
                onChange={e => setCategoriaBusca(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
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
                  <span style={{ fontWeight: 600 }}>{t.categoria}</span>
                  <span style={{ fontWeight: 800, color: t.tipo === 'entrada' ? '#16a34a' : '#dc2626' }}>
                    {t.tipo === 'entrada' ? '+' : '-'} R$ {t.valor.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ padding: '0.75rem', background: '#ecfdf5', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', fontWeight: 800, color: '#065f46' }}>
              <span>Total Calculado (Reduce):</span>
              <span>R$ {totalCalculado.toFixed(2)}</span>
            </div>
          </div>

          {/* Lado 2: Orientação a Objetos */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                🏛️ Orientação a Objetos (POO)
              </h3>
              <span className="badge badge-success">Encapsulamento</span>
            </div>
            <p style={{ color: 'var(--neutral-500)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              Entidades com estado protegido (<code>private/protected</code>) e regras de polimorfismo.
            </p>

            <div style={{ padding: '1rem', background: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-200)', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Titular: <strong>{conta.titular}</strong></div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Tipo: <strong>Conta Corrente (Taxa R$ 2,50 no saque)</strong></div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#059669', margin: '0.5rem 0' }}>
                R$ {pooSaldo.toFixed(2)}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <input
                type="number"
                className="input"
                value={valorOperacao}
                onChange={e => setValorOperacao(Number(e.target.value))}
                style={{ width: '120px' }}
                step="50"
              />
              <button onClick={handleDepositarPOO} className="btn btn-primary btn-sm">
                Depositar
              </button>
              <button onClick={handleSacarPOO} className="btn btn-danger btn-sm">
                Sacar (com Taxa)
              </button>
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
              <strong>Dica de Carreira:</strong> Entender polimorfismo e composição funcional é o divisor de águas entre desenvolvedores juniores e arquitetos de software frontend.
            </div>
          </div>
        </div>
      </section>
        
      
</div>
  );
};
