import {FormControl, Validators} from '@angular/forms';

import {PASSWORD_PATTERN} from '@shared/consts/patterns.consts';
import {matchOtherValidator} from '@shared/validators/match.validator';


export const formFields = {
  new_password: new FormControl(null, [Validators.required, Validators.pattern(PASSWORD_PATTERN)]),
  confirm_new_password: new FormControl(null, [Validators.required, Validators.pattern(PASSWORD_PATTERN),
    matchOtherValidator('new_password')]),
  recaptcha: new FormControl()
};

