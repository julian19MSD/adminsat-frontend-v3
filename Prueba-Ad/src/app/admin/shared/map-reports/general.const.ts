export const ORDERINGCONVERSIONKEYS = {
  fecha_hora_equipo: ['fecha_hora_equipo_iso', 'int'],
  nivel_bateria: ['bateria', 'int'],
  nombre: ['nombre', 'string']
};

export const FILTERCONVERSIONKEYS = {
  cliente: ['cliente', 'int'],
  fecha__lte: ['fecha_hora_equipo_iso', 'date'],
  fecha__gte: ['fecha_hora_equipo_iso', 'date'],
  calidad_gps: ['calidad_gps', 'boolean'],
  calidad_gps__isnull: ['calidad_gps', 'set_null'],
  evento__in: ['evento', 'array'],
  evento_nombre__in: ['evento_nombre', 'array'],
  nombre__in: ['nombre', 'array'],
  placa__in: ['placa', 'array'],
  punto_interes_nombre__in: ['punto_interes.nombre', 'array'],
  identificador__in: ['identificador', 'array'],
  actor_vial_apellidos__in: ['actor_vial_apellidos', 'array'],
  actor_vial_nombre__in: ['actor_vial_nombres', 'array'],
  fuera_servicio: ['out_of_service', 'boolean']
};
