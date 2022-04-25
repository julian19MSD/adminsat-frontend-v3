
export const FILTERCONVERSIONKEYS = {
  cliente__in: ['cliente.id', 'array'],
  cliente_final__in: ['cliente_enturne.nombre', 'array'],
  placa__in: ['activo.placa', 'array'],
  origen__in: ['origen', 'array'],
  destino__in: ['destino', 'array'],
  via__in: ['via', 'array'],
  orden_cargue__in: ['orden_cargue', 'array'],
  planilla__in: ['planilla', 'array'],
  id_carga__in: ['id_carga', 'array'],
  estado: ['estado', 'int'],
  retraso: ['retraso_rango', 'int'],
  enturnamientos__gte: ['enturnamientos', 'int']
};

export const ORDERINGCONVERSIONKEYS = {
  cliente__nombre: ['cliente.nombre', 'string'],
  cliente_enturne__nombre: ['cliente_enturne.nombre', 'string'],
  activo__placa: ['activo.placa', 'string'],
  producto: ['producto', 'string'],
  origen: ['origen', 'string'],
  destino: ['destino', 'string'],
  via: ['via', 'string'],
  rutas_historicoreporte_historico_set__retraso: ['ultimo_reporte.retraso_minutos', 'int'],
  estado: ['estado', 'int'],
  fecha_hora_asignacion: ['fecha_hora_asignacion_iso', 'int'],
};



export const SEARCH_ITEMS: string[] = [
  'cliente.nombre',
  'cliente_enturne.nombre',
  'activo.placa',
  'activo.nombre',
  'orden_cargue',
  'planilla',
  'id_carga',
  'producto',
  'origen',
  'destino',
  'via',
  'ultimo_reporte.actor_vial.nombre'
];
