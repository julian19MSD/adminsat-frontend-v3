import {FormControl, Validators} from '@angular/forms';
import { requiredFileType } from '@shared/validators/form-validator';

export const FormFieldsActorTickets = {
  actor_vial: new FormControl(),
  numero: new FormControl(null, [Validators.required]),
  fecha:new FormControl(null),
  descripcion: new FormControl(null),
  codigo_infraccion: new FormControl(null),
  comparendo:  new FormControl(null, [Validators.required, requiredFileType(['image/jpeg', 'image/png', 'application/pdf'])]),
  comprobante_pago: new FormControl(null, [requiredFileType(['image/jpeg', 'image/png', 'application/pdf'])]),
  pago: new FormControl(false),
  valor: new FormControl(0),
  interes: new FormControl(0),
  valor_total: new FormControl(),
  resolucion:new FormControl(),
  fecha_resolucion:new FormControl(),
  recaptcha: new FormControl(),
  activo: new FormControl(),
  observacion: new FormControl()
};
