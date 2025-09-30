import { en } from './en';
import { ptBR } from './pt-br';

export type Language = 'en' | 'pt-br';
export type TranslationKeys = typeof en;

export const translations = {
  en,
  'pt-br': ptBR,
};

export { en, ptBR };