

export interface IInstallationsListModel {
  count: number;
  next: string;
  previous: string;
  results: IInstallationsListItem[];
}

export interface IInstallationsListItem {
  id: number;
  cliente: number;
  cliente_nombre: string;
  name:string;
  isSelected: boolean;
}

export interface ISubInstallationListItem {
  id: number;
  name:string
}

export interface IInstallationsRetrieve {
  id: number;
  cliente: number;
  cliente_nombre: string;
  name:string;
  icono: number;
  subinstallations: Array<ISubInstallationListItem>;
}

