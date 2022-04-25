import {IFeatureGometry} from '@shared/models/general.model';

export interface IPointOfInteresGeo {
  features: IPointsOfInterestFeature;
  type: string;
}

export interface IPointsOfInterestFeature {
  id: number;
  geometry: IFeatureGometry;
  properties: IPointsOfInteresFeatureProperty;
  type: string;
}

export interface IPointsOfInteresFeatureProperty {
  cliente: number;
  cliente_nombre: string;
  icono: number;
  latitud: string;
  longitud: string;
  marcador: string;
  nombre: string;
}



