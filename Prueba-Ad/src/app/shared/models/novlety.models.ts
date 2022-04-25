export interface INovletyList {
  count: number;
  next: string;
  previous: string;
  results: INovletyListItem[];
}


export interface INovletyListItem {
  id: number;
  isSelected: boolean;
  nombre: string;
  novedad_padre_nombre: string;
  cliente_nombre: string;
}


export interface INoveltyRetrieve {
  id: number;
  es: string;
  en: string;
  cliente: number;
  novedad_padre: number;
}

