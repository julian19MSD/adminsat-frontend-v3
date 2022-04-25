import {FormControl} from '@angular/forms';

export const formFields = {
  cliente__in: new FormControl([], []),
  referencia__in: new FormControl([], []),
  posicion: new FormControl(),
  estado: new FormControl(),
};

