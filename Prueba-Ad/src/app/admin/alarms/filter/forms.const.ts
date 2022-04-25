import {FormControl} from '@angular/forms';

export const formFields = {
  activo__cliente__in: new FormControl([]),
  activo_placa__in: new FormControl([]),
  activo_nombre__in: new FormControl([]),
  evento_nombre__in: new FormControl([]),
  reporte_fecha__gte: new FormControl(),
  reporte_fecha__lte: new FormControl(),
};

