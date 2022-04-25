import { FormControl, Validators } from '@angular/forms';

export const FormFieldsReports = {
  cliente: new FormControl(null, [Validators.required]),
  activos: new FormControl([], [Validators.required]),
  desde: new FormControl(null, [Validators.required]),
  hasta: new FormControl(null, [Validators.required]),
  recaptcha: new FormControl(null)

};

