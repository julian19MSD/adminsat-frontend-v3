import {FormControl, Validators} from '@angular/forms';



export const FormFieldsWorkdayConfig = {
  id: new FormControl(null),
  workday_duration: new FormControl(null, [Validators.required]),
  workday_alert: new FormControl(null, [Validators.required]),
  rest_duration: new FormControl(null, [Validators.required]),
  rest_alert: new FormControl(null, [Validators.required]),
  rest_limit_speed: new FormControl(null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8)]),
  cliente: new FormControl(null, [Validators.required]),
  recaptcha: new FormControl(null)
};
