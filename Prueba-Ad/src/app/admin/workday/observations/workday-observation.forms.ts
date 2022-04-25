import {FormControl, Validators} from '@angular/forms';


export const FormRequiredFieldsShiftObservation = ['zona_control', 'fecha_ingreso'];

export const FormFieldsWorkdayObservation = {
  added_time: new FormControl(null, [Validators.required]),
  observation: new FormControl(null, [Validators.required]),
  recaptcha: new FormControl()
};
