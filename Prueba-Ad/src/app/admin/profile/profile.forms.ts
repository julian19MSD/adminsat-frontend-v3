import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

import {ADDRESS_PATTERN, CITY_PATTERN, EMAIL_PATTERN, NAME_PATTERN, PHONE_PATTERN} from '@shared/consts/patterns.consts';

export const formFieldsProfile = {
  first_name: new FormControl(null, [Validators.required, Validators.pattern(NAME_PATTERN)]),
  last_name: new FormControl('', [Validators.required, Validators.pattern(NAME_PATTERN)]),
  correo: new FormControl('', [Validators.required, Validators.pattern(EMAIL_PATTERN)]),
  datos_json: new FormGroup({
    celular: new FormControl('', [Validators.pattern(PHONE_PATTERN)]),
    telefono: new FormControl('', [Validators.pattern(PHONE_PATTERN)]),
    ciudad: new FormControl('', [Validators.pattern(CITY_PATTERN)]),
    direccion: new FormControl('', [Validators.pattern(ADDRESS_PATTERN)]),
    homepage: new FormControl('', [Validators.required])
  }),
  formatos_json: new FormGroup({
    velocity: new FormControl('', [Validators.required]),
    volume: new FormControl('', [Validators.required]),
    pressure: new FormControl('', [Validators.required]),
    coordinate: new FormControl('', [Validators.required]),
    distance: new FormControl('', [Validators.required]),
    timedelta: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    date_report: new FormControl('', [Validators.required]),
    time_report: new FormControl('', [Validators.required])
  }),
  idioma: new FormControl('', [Validators.required]),
  correos_notificaciones_m2m: new FormControl([]),
  enviar_alarma_correo: new FormControl(),
  enviar_notifi_correo: new FormControl(),
  notificaciones: new FormArray([]),
  alarmas: new FormArray([]),
  recaptcha: new FormControl()
};


