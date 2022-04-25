

export interface IZonesListModel {
  count: number;
  next: string;
  previous: string;
  results: IZonesListItem[];
}

export interface IZonesListItem {
  id: number;
  cliente: number;
  cliente_nombre: string;
  name:string;
  isSelected: boolean;
}

export interface ISubzoneListItem {
  id: number;
  name:string
}

export interface IZonesRetrieve {
  id: number;
  cliente: number;
  cliente_nombre: string;
  name:string;
  subzones: Array<ISubzoneListItem>;
}

