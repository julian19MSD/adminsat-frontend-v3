import { FocusMonitorDetectionMode } from '@angular/cdk/a11y';
import {FormControl} from '@angular/forms';

export const formFields = {
  activo_nombre__in:new FormControl([]),
  activo_placa__in:new FormControl([]),
  cliente__in: new FormControl([]),
  username_in: new FormControl([]),
  dt__lte:  new FormControl(),
  dt__gte:  new FormControl(),
  
};

