import {FormControl, FormGroup, Validators} from '@angular/forms';


export const formFieldsWorkday = {
  cliente: new FormControl(null, [Validators.required]),
  activo: new FormControl(null, [Validators.required]),
  enturnamiento: new FormControl(null, [Validators.required]),
  actor_vial: new FormControl(null, [Validators.required]),
  workday_duration: new FormControl(12, [Validators.required, Validators.min(6), Validators.max(24)]),
  workday_alert: new FormControl(1, [Validators.required , Validators.min(1), Validators.max(5)]),
  rest_duration: new FormControl(9, [Validators.required, Validators.min(6), Validators.max(24)]),
  rest_alert: new FormControl(1, [Validators.required , Validators.min(1), Validators.max(5)]),
  recaptcha: new FormControl(null)
};
