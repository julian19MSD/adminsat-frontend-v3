import {FormControl, FormGroup, Validators} from '@angular/forms';




export const FormFieldsTpms = {
  id: new FormControl(null),
  referencia: new FormControl(null, [Validators.required]),
  posicion: new FormControl(null, [Validators.required]),
  estado: new FormControl(null, [Validators.required]),
  presion: new FormControl(null),
  temperatura: new FormControl(null),
  cliente: new FormControl(null, [Validators.required]),
  fabricante: new FormControl("", [Validators.required]),
  recaptcha: new FormControl(null)
};
