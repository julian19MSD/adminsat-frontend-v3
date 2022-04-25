import {FormControl, Validators} from '@angular/forms';

export const formFieldsFilter = {
  cliente__in: new FormControl([]),
  cliente_nombre: new FormControl([]),
  placa: new FormControl([]),
  identificador: new FormControl([]),
  datetime__lte: new FormControl(),
  datetime__gte: new FormControl(),
  status: new FormControl(),
  direction: new FormControl()
};
