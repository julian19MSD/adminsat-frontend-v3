import {FormControl, Validators} from '@angular/forms';

import {matchOtherValidator} from '@shared/validators/match.validator';
import {PASSWORD_PATTERN} from '@shared/consts/patterns.consts';

export const formFields = {
  password: new FormControl(),
  new_password: new FormControl(null, [Validators.pattern(PASSWORD_PATTERN)]),
  confirm_new_password: new FormControl(null, [Validators.pattern(PASSWORD_PATTERN),
    matchOtherValidator('new_password')]),
  recaptcha: new FormControl()
};

