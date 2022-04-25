import {FormControl, Validators} from '@angular/forms';

export const FormFieldsSubinstallations = {
  id: new FormControl(null),
  name: new FormControl(null, [Validators.required]),
  installation_type: new FormControl(null, [Validators.required]),
  cliente: new FormControl(null, [Validators.required]),
  recaptcha: new FormControl(null)
};
