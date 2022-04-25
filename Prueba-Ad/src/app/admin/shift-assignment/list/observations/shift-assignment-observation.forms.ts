import {FormControl, Validators} from '@angular/forms';


export const FormRequiredFieldsShiftObservation = ['zona_control', 'tiempo_agregado'];

export const FormFieldsShiftAssignmentObservation = {
  tipo: new FormControl(null, [Validators.required]),
  sub_tipo: new FormControl(null),
  zona_control: new FormControl(null, [Validators.required]),
  tiempo_agregado: new FormControl(null, [Validators.required]),
  observacion: new FormControl(null, [Validators.required]),
  recaptcha: new FormControl()
};
