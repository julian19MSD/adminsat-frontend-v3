import {FormControl} from '@angular/forms';

export const formFieldsSort = {
  cliente__nombre: new FormControl(),
  activo__placa: new FormControl(),
  enturnamiento__remolque: new FormControl(),
  enturnamiento__orden_cargue: new FormControl(),
  enturnamiento__origen: new FormControl(),
  enturnamiento__destino: new FormControl(),
  enturnamiento__via: new FormControl(),
  enturnamiento__planilla: new FormControl(),
  actor_vial__nombre: new FormControl(),
  actor_vial__apellidos: new FormControl(),
  total_workdays: new FormControl(),
  total_restdays: new FormControl(),
  status: new FormControl(),
  status_color: new FormControl(),
  start_dt: new FormControl(),
  current_duration: new FormControl(),
};
