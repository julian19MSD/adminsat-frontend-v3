import {FormControl, Validators} from '@angular/forms';

export const formFieldsFilter = {
  cliente_nombre: new FormControl([]),
  cliente: new FormControl([], []),
  placa: new FormControl([], []),
  orden_cargue: new FormControl([],[]),
  remolque: new FormControl([],[]),
  alert_gte: new FormControl(),
  alert_lte: new FormControl(),
  vehiculo_seguro: new FormControl(),
  zona_control_nombre: new FormControl([],[]),
};
