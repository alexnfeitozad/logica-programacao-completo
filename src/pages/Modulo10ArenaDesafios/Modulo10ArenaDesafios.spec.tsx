import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Modulo10ArenaDesafios } from './Modulo10ArenaDesafios';

describe('Modulo 10 - Arena de Desafios LeetCode', () => {
  it('deve renderizar o título da arena de desafios', () => {
    render(<Modulo10ArenaDesafios />);
    expect(screen.getByText(/Arena de Desafios LeetCode/i)).toBeDefined();
  });

  it('deve exibir o botão de submissão de testes', () => {
    render(<Modulo10ArenaDesafios />);
    const button = screen.getByRole('button', { name: /Submeter Solução/i });
    expect(button).toBeDefined();
  });
});
