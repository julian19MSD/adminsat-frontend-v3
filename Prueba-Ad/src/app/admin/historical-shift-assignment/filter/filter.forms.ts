import {FormControl} from '@angular/forms';

export const formFields = {
  cliente__in: new FormControl([]),
  cliente_final__in: new FormControl([]),
  placa__in: new FormControl([]),
  origen__in: new FormControl([]),
  destino__in: new FormControl([]),
  via__in: new FormControl([]),
  orden_cargue__in: new FormControl([]),
  planilla__in: new FormControl([]),
  id_carga__in: new FormControl([]),
  estado: new FormControl(),
};
