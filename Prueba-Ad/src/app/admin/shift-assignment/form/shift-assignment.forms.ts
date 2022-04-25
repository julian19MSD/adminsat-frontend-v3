import {FormControl, FormGroup, Validators} from '@angular/forms';


export const formFieldsShiftAssignment = {
  cliente: new FormControl(null, [Validators.required]),
  cliente_enturne: new FormControl(null, [Validators.required]),
  activo: new FormControl(null, [Validators.required]),
  ruta: new FormControl(null, [Validators.required]),
  actores_viales: new FormControl([]),
  fecha_hora_inicio: new FormControl(null, [Validators.required]),
  orden_cargue: new FormControl(null, [Validators.required]),
  planilla: new FormControl(),
  id_carga: new FormControl(),
  producto: new FormControl(null, [Validators.required]),
  inicializacion: new FormControl(null, [Validators.required]),
  finalizacion: new FormControl(null, [Validators.required]),
  varios_json: new FormGroup({
    tt: new FormControl(null),
    od: new FormControl(null)
  }),
  recaptcha: new FormControl(null)
};
