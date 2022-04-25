export interface IPermanenceListModel {
  count: number;
  next: string;
  previous: string;
  results: IPermanenceListItem[];
}

export interface IPermanenceListItem {
  id: number;
  actor_vial_celular: string;
  placa: string;
  vehiculo_seguro: boolean;
  ultimo_reporte_fecha: string;
  ultimo_reporte_id: number;
  remolque: string;
  orden_cargue: string;
  actor_vial_nombre: string;
  cliente: number;
  cliente_nombre: string;
  actor_vial: number;
  permanence: IPermanencePermanencesListItem;
  permanences: IPermanencePermanencesListItem[];
}


export interface IPermanencePermanencesListItem {
  alert: number;
  entry_time: string;
  zona_control: number;
  current_duration: number;
  zona_control_nombre: string;
  level_1_time_alert: number;
  level_2_time_alert: number;
  level_3_time_alert: number;
  level_4_time_alert: number;
  min_permanence_time: number;
  expected_attention_time: number;
  exit_time: number;
  installation_type_name: string;
  sub_installation_type_name: string
}

export interface IPermanenceDetails {
  groups: IPermanenceDetailsGroups[];
  items: IPermanenceDetailsItems[];
}

export interface IPermanenceDetailsGroups {
  id: number;
  content: string;

}

export interface IPermanenceDetailsItems {
  color: string;
  duration: number;
  entry_time: string;
  exit_time: string;
  group: number;
  icono: string;
  id: number;
  installation_type_nombre: string;
  zona_control_nombre: string;
}