import {FormControl} from '@angular/forms';

export const formFieldsFilter = {
  cliente__in: new FormControl([]),
  nombre__in: new FormControl([]),
  primer_nivel: new FormControl(),
  novedad_padre_nombre__in: new FormControl([])
};
