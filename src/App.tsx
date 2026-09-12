import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { MobileHeader } from './components/MobileHeader';
import { Home } from './pages/Home/Home';

// Modules
import { Modulo01Memoria } from './pages/Modulo01Memoria/Modulo01Memoria';
import { Modulo02PilhasFilas } from './pages/Modulo02PilhasFilas/Modulo02PilhasFilas';
import { Modulo03Listas } from './pages/Modulo03Listas/Modulo03Listas';
import { Modulo04TabelasHash } from './pages/Modulo04TabelasHash/Modulo04TabelasHash';
import { Modulo05Arvores } from './pages/Modulo05Arvores/Modulo05Arvores';
import { Modulo06Buscas } from './pages/Modulo06Buscas/Modulo06Buscas';
import { Modulo07OrdenacaoBasica } from './pages/Modulo07OrdenacaoBasica/Modulo07OrdenacaoBasica';
import { Modulo08OrdenacaoAvancada } from './pages/Modulo08OrdenacaoAvancada/Modulo08OrdenacaoAvancada';
import { Modulo09Paradigmas } from './pages/Modulo09Paradigmas/Modulo09Paradigmas';
import { Modulo10ArenaDesafios } from './pages/Modulo10ArenaDesafios/Modulo10ArenaDesafios';

import './App.css';

export const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="app-container">
      <MobileHeader
        onToggle={() => setMobileMenuOpen((v) => !v)}
        onClose={() => setMobileMenuOpen(false)}
      />

      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/modulo-01-fundamentos-memoria" element={<Modulo01Memoria />} />
          <Route path="/modulo-02-pilhas-filas" element={<Modulo02PilhasFilas />} />
          <Route path="/modulo-03-listas-encadeadas" element={<Modulo03Listas />} />
          <Route path="/modulo-04-tabelas-hash" element={<Modulo04TabelasHash />} />
          <Route path="/modulo-05-arvores-binarias" element={<Modulo05Arvores />} />
          <Route path="/modulo-06-algoritmos-busca" element={<Modulo06Buscas />} />
          <Route path="/modulo-07-ordenacao-basica" element={<Modulo07OrdenacaoBasica />} />
          <Route path="/modulo-08-ordenacao-avancada" element={<Modulo08OrdenacaoAvancada />} />
          <Route path="/modulo-09-paradigmas" element={<Modulo09Paradigmas />} />
          <Route path="/modulo-10-arena-desafios" element={<Modulo10ArenaDesafios />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
