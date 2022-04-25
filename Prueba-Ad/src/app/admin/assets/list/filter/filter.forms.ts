import {FormControl} from '@angular/forms';

export const formFields = {
  cliente__in: new FormControl([], []),
  placa__in: new FormControl([], []),
  nombre__in: new FormControl([], []),
  equipos_identificador__in: new FormControl([], []),
  grupo_nombre__in: new FormControl([], []),
  apagado_remoto: new FormControl(),
  sensor_combustible: new FormControl(),
  ecumonitor: new FormControl(),
  boton_panico: new FormControl(),
  is_active: new FormControl(),
  vehiculo_seguro: new FormControl(),
  tipo_activo: new FormControl(),
};