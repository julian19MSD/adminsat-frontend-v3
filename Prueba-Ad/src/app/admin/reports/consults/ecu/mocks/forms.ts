
export interface ListItemsECUModel {
  activo: number;
  consumo: number;
  consumo_inactivo: number;
  consumo_inactivo_total: number;
  consumo_total: number;
  desde: string;
  hasta: string;
  nombre: string;
  odometro: number;
  odometro_total: number;
  placa: string;
  presion_aceite_maximo: number;
  presion_aceite_promedio: number;
  promedio_consumo: number;
  refrigerante_maximo: number;
  refrigerante_promedio: number;
  admision_maximo: number;
  admision_promedio: number;
  presion_combustible_maximo: number;
  presion_combustible_promedio: number;
}


export interface ItemsTableECUModel {
  consumo: featureEcuItem;
  consumo_inactivo: featureEcuItem;
  admision_maximo: featureEcuItem;
  admision_promedio: featureEcuItem;
  presion_combustible_maximo: featureEcuItem;
  presion_combustible_promedio: featureEcuItem;
  consumo_inactivo_total: featureEcuItem;
  consumo_total: featureEcuItem;
  odometro: featureEcuItem;
  odometro_total: featureEcuItem;
  presion_aceite_maximo: featureEcuItem;
  presion_aceite_promedio: featureEcuItem;
  promedio_consumo: featureEcuItem;
  refrigerante_maximo: featureEcuItem;
  refrigerante_promedio: featureEcuItem;
  costo: featureEcuItem;
  costo_total: featureEcuItem;

}

export interface featureEcuItem {
  traduccion: string;
  medida: string;
}

export interface TableECUModel {
  propiedad: string;
  valor: number;
  medida: string;
  traduccion: string;
}
