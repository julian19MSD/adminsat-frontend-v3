import {FormControl, Validators} from '@angular/forms';

export const FormFieldsMyAverageRisk = {
  cliente: new FormControl(null, [Validators.required]),
  actores_viales: new FormControl([], [Validators.required]),
  desde: new FormControl(null, [Validators.required]),
  hasta: new FormControl(null, [Validators.required])
};
