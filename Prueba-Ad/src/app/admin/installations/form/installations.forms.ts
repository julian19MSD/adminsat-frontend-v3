import {FormControl,  Validators} from '@angular/forms';




export const FormFieldsInstallations = {
  id: new FormControl(null),
  name: new FormControl(null, [Validators.required]),
  cliente: new FormControl(null, [Validators.required]),
  icono: new FormControl(null, [Validators.required]),
  recaptcha: new FormControl(null)
};
