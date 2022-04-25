import {FormControl, Validators} from '@angular/forms';

export const FormFieldsAssetDocument = {
  correos_notificaciones_m2m: new FormControl([]),
  validate_mail: new FormControl([]),
  numero_documento: new FormControl(),
  compania: new FormControl(),
  fecha_expedicion: new FormControl(null, [Validators.required]),
  vigencia_desde: new FormControl(null, [Validators.required]),
  vigencia_hasta: new FormControl(null, [Validators.required]),
  dias_notificacion: new FormControl(),
  nombre_otro: new FormControl(),
  valor: new FormControl(),
  activo: new FormControl(),
  tipo_documento: new FormControl(null, [Validators.required]),
  recaptcha: new FormControl()
};
