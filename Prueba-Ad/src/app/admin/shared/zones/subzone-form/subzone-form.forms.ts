import {FormControl, Validators} from '@angular/forms';

export const FormFieldsSubzones = {
  id: new FormControl(null),
  name: new FormControl(null, [Validators.required]),
  zone: new FormControl(null, [Validators.required]),
  cliente: new FormControl(null, [Validators.required]),
  recaptcha: new FormControl(null)
};
