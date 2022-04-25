import {FormControl, Validators} from '@angular/forms';

export const FormFieldsNovelty = {
  cliente: new FormControl(null, [Validators.required]),
  es: new FormControl(null, [Validators.required]),
  en: new FormControl(null, [Validators.required]),
  novedad_padre: new FormControl(),
  recaptcha: new FormControl()
};
