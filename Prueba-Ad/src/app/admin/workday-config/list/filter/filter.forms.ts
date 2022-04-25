import {FormControl, Validators} from '@angular/forms';

export const formFieldsFilter = {
  cliente__in: new FormControl([]),
  workday_duration__gte: new FormControl(),
  workday_duration__lte: new FormControl(),
  workday_alert__gte: new FormControl(),
  workday_alert__lte: new FormControl(),
  rest_alert__gte: new FormControl(),
  rest_alert__lte: new FormControl(),
  rest_limit_speed__gte: new FormControl(),
  rest_limit_speed__lte: new FormControl(),
};
