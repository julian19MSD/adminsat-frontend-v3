import {FormControl, FormGroup, Validators} from '@angular/forms';



export const FormFieldsNotification = {
  id: new FormControl(null),
  cliente: new FormControl(null, [Validators.required]),
  module: new FormControl(0, [Validators.required]),
  correos_notificaciones_m2m: new FormControl([]),
  validate_mail: new FormControl([]),
  tracking: new FormGroup({
    time_without_reporting: new FormControl(0, [Validators.required]),
    assets: new FormControl([], [Validators.required]),
  }),
  recaptcha: new FormControl(null)
};
