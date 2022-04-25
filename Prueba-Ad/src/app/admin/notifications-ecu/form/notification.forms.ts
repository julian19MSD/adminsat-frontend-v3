import { FormControl, FormGroup, Validators } from '@angular/forms';



export const FormFieldsNotification = {
  id: new FormControl(null),
  cliente: new FormControl(null, [Validators.required]),
  module: new FormControl(1, [Validators.required]),
  correos_notificaciones_m2m: new FormControl([]),
  validate_mail: new FormControl([]),
  ecu: new FormGroup({
    presion_aceite: new FormControl(null, [Validators.required]),
    presion_combustible: new FormControl(null, [Validators.required]),
    temperatura_refrigerante_motor: new FormControl(null, [Validators.required]),
    temperatura_aire_admision: new FormControl(null, [Validators.required]),
    odometro: new FormControl(null),
    carga_motor: new FormControl(null),
    combustible_ahorrado: new FormControl(null),
    combustible_muerto: new FormControl(null),
    combustible_total: new FormControl(null),
    dtc_motor: new FormControl(null),
    porcentaje_torque_motor: new FormControl(null),
    rpm_motor: new FormControl(null),
    tiempo_crucero_activo: new FormControl(null),
    tiempo_muerto_motor: new FormControl(null),
    velocidad: new FormControl(null),
  }),
  recaptcha: new FormControl(null)
};

