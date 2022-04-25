import {FormControl, Validators} from '@angular/forms';



export const FormFieldsMessage = {
  cliente: new FormControl(null, [Validators.required]),
  activo: new FormControl(null, [Validators.required]),
  device: new FormControl(null, [Validators.required]),
  content: new FormControl(null, [Validators.required]),
  recaptcha: new FormControl()
};
