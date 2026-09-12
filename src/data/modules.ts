import type { ModuloLogica } from '../types/course';

export const LOGICA_MODULES: ModuloLogica[] = [
  {
    id: 'modulo-01-fundamentos-memoria',
    number: '01',
    phase: 1,
    phaseName: 'Fase 1: Alicerce da Computação',
    title: 'Módulo 1: Memória & Complexidade Big-O',
    icon: '🧠',
    level: 'Fundamentos',
    description: 'Stack vs Heap, alocação na memória, valores vs referências e Notação Big-O',
    shortDesc: 'Entenda como a memória do computador funciona e como medir a eficiência de código.',
    tags: ['Stack vs Heap', 'Big-O', 'Gestão de Memória']
  },
  {
    id: 'modulo-02-pilhas-filas',
    number: '02',
    phase: 1,
    phaseName: 'Fase 1: Alicerce da Computação',
    title: 'Módulo 2: Pilhas (LIFO) & Filas (FIFO)',
    icon: '🥞',
    level: 'Fundamentos',
    description: 'Estruturas lineares com simuladores visuais animados de Push, Pop, Enqueue e Dequeue',
    shortDesc: 'Aplicações reais de pilhas (Ctrl+Z, call stack) e filas (job queues, buffer).',
    tags: ['Pilhas (Stack)', 'Filas (Queue)', 'LIFO / FIFO']
  },
  {
    id: 'modulo-03-listas-encadeadas',
    number: '03',
    phase: 1,
    phaseName: 'Fase 1: Alicerce da Computação',
    title: 'Módulo 3: Listas Encadeadas (Linked Lists)',
    icon: '🔗',
    level: 'Fundamentos',
    description: 'Ponteiros, nós dinâmicos, listas simplesmente e duplamente encadeadas',
    shortDesc: 'Aprenda como funcionam coleções sem tamanho fixo com referências dinâmicas.',
    tags: ['Singly Linked List', 'Doubly Linked', 'Pointers']
  },
  {
    id: 'modulo-04-tabelas-hash',
    number: '04',
    phase: 2,
    phaseName: 'Fase 2: Estruturas Avançadas',
    title: 'Módulo 4: Tabelas Hash & Mapas',
    icon: '🗝️',
    level: 'Intermediário',
    description: 'Funções de Hash, buckets de memória, resolução de colisões e busca em O(1)',
    shortDesc: 'A estrutura de dados mais importante da web por trás de Objetos, Maps e Caches.',
    tags: ['Hash Functions', 'O(1) Lookup', 'Collisions']
  },
  {
    id: 'modulo-05-arvores-binarias',
    number: '05',
    phase: 2,
    phaseName: 'Fase 2: Estruturas Avançadas',
    title: 'Módulo 5: Árvores Binárias de Busca (BST)',
    icon: '🌳',
    level: 'Intermediário',
    description: 'Nós pais e filhos, percursos In-Order, Pre-Order, Post-Order e busca binária',
    shortDesc: 'Visualizador interativo de árvore binária de busca com inserção e percursos.',
    tags: ['Binary Search Tree', 'In-Order Traversal', 'Recursão']
  },
  {
    id: 'modulo-06-algoritmos-busca',
    number: '06',
    phase: 2,
    phaseName: 'Fase 2: Estruturas Avançadas',
    title: 'Módulo 6: Algoritmos de Busca (Linear vs Binária)',
    icon: '🔎',
    level: 'Intermediário',
    description: 'Comparador em tempo real: Busca Linear O(n) vs Busca Binária O(log n)',
    shortDesc: 'Veja com os próprios olhos a diferença absurda de velocidade da busca binária.',
    tags: ['Busca Linear', 'Busca Binária', 'O(log n)']
  },
  {
    id: 'modulo-07-ordenacao-basica',
    number: '07',
    phase: 3,
    phaseName: 'Fase 3: Algoritmos & Otimização',
    title: 'Módulo 7: Ordenação Básica (Bubble, Selection, Insertion)',
    icon: '📊',
    level: 'Avançado',
    description: 'Visualizador animado passo a passo com barras de ordenação e velocidade ajustável',
    shortDesc: 'Compreenda a mecânica dos algoritmos quadráticos O(n²) de ordenação.',
    tags: ['Bubble Sort', 'Selection Sort', 'Insertion Sort']
  },
  {
    id: 'modulo-08-ordenacao-avancada',
    number: '08',
    phase: 3,
    phaseName: 'Fase 3: Algoritmos & Otimização',
    title: 'Módulo 8: Ordenação Avançada (Merge & Quick Sort)',
    icon: '⚡',
    level: 'Avançado',
    description: 'Dividir para Conquistar, partição de pivôs e ordenação logarítmica O(n log n)',
    shortDesc: 'Os algoritmos que movem os motores JavaScript V8 e bancos de dados modernos.',
    tags: ['Merge Sort', 'Quick Sort', 'Divide & Conquer']
  },
  {
    id: 'modulo-09-paradigmas',
    number: '09',
    phase: 3,
    phaseName: 'Fase 3: Algoritmos & Otimização',
    title: 'Módulo 9: Funcional vs Orientação a Objetos',
    icon: '🏛️',
    level: 'Avançado',
    description: 'Imutabilidade, recursão e HOFs vs Classes, Herança e Polimorfismo estrito em TS',
    shortDesc: 'Como arquitetar soluções elegantes combinando o melhor dos dois paradigmas.',
    tags: ['Programação Funcional', 'POO em TS', 'Polimorfismo']
  },
  {
    id: 'modulo-10-arena-desafios',
    number: '10',
    phase: 3,
    phaseName: 'Fase 3: Algoritmos & Otimização',
    title: 'Módulo 10: Arena de Desafios LeetCode-Style',
    icon: '🏆',
    level: 'Master',
    description: 'Desafios clássicos de entrevistas técnicas (Two Sum, Palíndromo, Parentheses) com runner de testes',
    shortDesc: 'Treinamento intensivo para entrevistas de grandes empresas de tecnologia (Big Techs).',
    tags: ['LeetCode Runner', 'Two Sum', 'Testes Automatizados']
  }
];
