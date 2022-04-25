import {FormControl, Validators} from '@angular/forms';

export const formFieldsFilter = {
  cliente__in: new FormControl([]),
  placa__in: new FormControl([]),
  status: new FormControl(),
  status_color: new FormControl(),
  origen__in: new FormControl([]),
  destino__in: new FormControl([]),
  via__in: new FormControl([]),
  actor_vial__in: new FormControl([]),
  total_workdays__gte: new FormControl(),
  total_restdays__gte: new FormControl(),
  current_duration__gte: new FormControl(),
  current_duration__lte: new FormControl()
};
