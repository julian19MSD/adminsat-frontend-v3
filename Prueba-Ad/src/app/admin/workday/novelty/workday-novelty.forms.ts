import {FormControl, Validators} from '@angular/forms';



export const FormFieldsWorkdayNovelty = {
  tipo: new FormControl(null, [Validators.required]),
  actor_vial: new FormControl(null, [Validators.required]),
  start_dt: new FormControl(null, [Validators.required]),
  event: new FormControl(null, [Validators.required]),
  recaptcha: new FormControl()
};
