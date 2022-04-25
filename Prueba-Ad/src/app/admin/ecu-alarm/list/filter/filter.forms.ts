import {FormControl, Validators} from '@angular/forms';

export const formFieldsFilter = {
  cliente__in: new FormControl([]),
  placa__in: new FormControl([]),
  report_dt__lte:new FormControl(),
  report_dt__gte:new FormControl(),
  actor_vial__in: new FormControl([]),
  value_name:new FormControl(),
  report_value__lte:new FormControl(),
  report_value__gte:new FormControl(),
  alarm_value__lte:new FormControl(),
  alarm_value__gte:new FormControl(),
};
