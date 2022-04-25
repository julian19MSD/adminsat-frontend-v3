import {FormControl, Validators} from '@angular/forms';

export const FormFieldsWorkdayObservation = {
  nombre: new FormControl(null, [Validators.required]),
  comando_nombre : new FormControl(null, [Validators.required]),
};
