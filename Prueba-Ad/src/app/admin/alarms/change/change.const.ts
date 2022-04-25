import {FormControl, Validators} from '@angular/forms';

export const formFields = {
  alarmas: new FormControl(),
  descripcion: new FormControl(null, [Validators.required]),
  recaptcha: new FormControl()
};
