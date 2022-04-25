import {FormArray, FormControl} from '@angular/forms';

export const formFields = {
    items: new FormArray([]),
    recaptcha: new FormControl(),
};

export const itemsFormFields = {
    x: new FormControl(),
    y: new FormControl(),
    cols: new FormControl(),
    rows: new FormControl(),
    type: new FormControl(),
};
