export interface ModuloLogica {
  id: string;
  number: string;
  title: string;
  icon: string;
  phase: 1 | 2 | 3;
  phaseName: string;
  level: 'Fundamentos' | 'Intermediário' | 'Avançado' | 'Master';
  description: string;
  shortDesc: string;
  tags: string[];
}
