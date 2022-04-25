import {FormControl,  Validators} from '@angular/forms';




export const FormFieldsControlInstallations = {
  id: new FormControl(null),
  correos_notificaciones_m2m: new FormControl([]),
  is_active: new FormControl(false),
  activos: new FormControl([]),
  modo: new FormControl(null, [Validators.required]),
  tiempo_maximo: new FormControl(null),
  riesgo: new FormControl(null),
  velocidad_maxima: new FormControl(null),
  mensaje: new FormControl(null),
  cliente: new FormControl(null, [Validators.required]),
  nombre: new FormControl(null, [Validators.required]),
  municipality: new FormControl(null),
  country: new FormControl(null),
  department: new FormControl(null),
  poligono: new FormControl(null, [Validators.required]),
  punto: new FormControl(null),
  radio_punto: new FormControl(null),
  zone: new FormControl(null),
  sub_zone: new FormControl(null),
  installation_type: new FormControl(null),
  sub_installation_type: new FormControl(null),
  uen_1: new FormControl(null),
  uen_2: new FormControl(null),
  recaptcha: new FormControl(null)
};
