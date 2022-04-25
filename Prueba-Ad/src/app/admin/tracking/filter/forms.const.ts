import {FormControl} from '@angular/forms';

export const formFields = {
  placa__in: new FormControl([]),
  nombre__in: new FormControl([]),
  identificador__in: new FormControl([]),
  punto_interes_nombre__in: new FormControl([]),
  actor_vial_nombre__in: new FormControl([]),
  actor_vial_apellidos__in: new FormControl([]),
  evento_nombre__in: new FormControl([]),
  fecha__lte: new FormControl(),
  fecha__gte: new FormControl(),
  calidad_gps: new FormControl(),
  calidad_gps__isnull: new FormControl(),
  alarmas: new FormControl(),
  evento__in: new FormControl(),
  fuera_servicio: new FormControl(),
};
