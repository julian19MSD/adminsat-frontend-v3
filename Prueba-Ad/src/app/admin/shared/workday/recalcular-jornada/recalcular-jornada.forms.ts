import {FormControl, Validators} from '@angular/forms';

export const FormFieldsWorkdayRecalculate = {
  new_date: new FormControl(null, [Validators.required]),
  event: new FormControl(null, [Validators.required]),
  recaptcha: new FormControl()
};
