import {FormControl, Validators} from '@angular/forms';

export const formFields = {
  username: new FormControl('', [Validators.required]),
  recaptcha: new FormControl()
};
