import {FormControl, FormGroup, Validators} from '@angular/forms';
import { EMAIL_PATTERN, PHONE_PATTERN, CITY_PATTERN, ADDRESS_PATTERN, NAME_PATTERN } from '@shared/consts/patterns.consts';
import { requiredFileType } from '@shared/validators/form-validator';

export const FormRequiredFieldsAsset = ['placa', 'tipo_vehiculo'];


export const FormFieldsActor = {
  id: new FormControl(null),
  tipo_actor: new FormControl(null),
  // cliente_id: new FormControl(null),
  cliente: new FormControl(null, [Validators.required]),
  is_active: new FormControl(true , [Validators.required]),
  nombre: new FormControl('', [Validators.required, Validators.pattern(NAME_PATTERN)]),
  apellidos:  new FormControl('', [Validators.required, Validators.pattern(NAME_PATTERN)]),
  tipo_documento_identidad: new FormControl(null, [Validators.required]),
  numero_documento_identidad: new FormControl(null, [Validators.required]),
  telefono: new FormControl('', [Validators.pattern(PHONE_PATTERN)]),
  celular: new FormControl('', [Validators.pattern(PHONE_PATTERN)]),
  ciudad: new FormControl('', [Validators.pattern(CITY_PATTERN)]),
  direccion: new FormControl('', [Validators.pattern(ADDRESS_PATTERN)]),
  correo: new FormControl('', [Validators.pattern(EMAIL_PATTERN)]),
  correos_notificaciones_m2m:  new FormControl([]),
  validate_mail: new FormControl([]),
  runt: new FormControl(null, [requiredFileType(['image/jpeg', 'image/png', 'application/pdf'])]),
  examen_atencion: new FormControl(null, [requiredFileType(['image/jpeg', 'image/png', 'application/pdf'])]),
  examen_habilidad: new FormControl(null, [requiredFileType(['image/jpeg', 'image/png', 'application/pdf'])]),
  examen_agudeza: new FormControl(null, [requiredFileType(['image/jpeg', 'image/png', 'application/pdf'])]),
  examen_psicosensorica: new FormControl(null, [requiredFileType(['image/jpeg', 'image/png', 'application/pdf'])]),
  examen_visiometria: new FormControl(null, [requiredFileType(['image/jpeg', 'image/png', 'application/pdf'])]),
  examen_audiometria: new FormControl(null, [requiredFileType(['image/jpeg', 'image/png', 'application/pdf'])]),
  examen_psicologia: new FormControl(null, [requiredFileType(['image/jpeg', 'image/png', 'application/pdf'])]),
  examen_coordinacion_motriz: new FormControl(null, [requiredFileType(['image/jpeg', 'image/png', 'application/pdf'])]),
  examen_medico: new FormControl(null, [requiredFileType(['image/jpeg', 'image/png', 'application/pdf'])]),
  examen_prueba_teorica: new FormControl(null, [requiredFileType(['image/jpeg', 'image/png', 'application/pdf'])]),
  examen_prueba_practica: new FormControl(null, [requiredFileType(['image/jpeg', 'image/png', 'application/pdf'])]),
  examen_prueba_ingreso: new FormControl(null, [requiredFileType(['image/jpeg', 'image/png', 'application/pdf'])]),
  ibutton: new FormControl(null),
  activo: new FormControl(null),
  datos_personales_json:new FormGroup({
    fecha_nacimiento: new FormControl(null),
    sexo: new FormControl(null),
    nacionalidad: new FormControl(null),
    hijos: new FormControl(null),
    estado_civil: new FormControl(null),
    fecha_nacimiento_conyugue: new FormControl(null),
    conyugue_nombres: new FormControl(null),
    conyugue_apellidos: new FormControl(null),
    conyugue_formacion: new FormControl(null)
  }),
  formacion_json:new FormGroup({
    nivel_estudios: new FormControl(null),
    numero_licencia: new FormControl(null),
    licencia_fecha_expedicion: new FormControl(null),
    licencia_fecha_vencimiento: new FormControl(null),
    licencia_categoria: new FormControl(null),

    numero_licencia_1: new FormControl(null),
    licencia_fecha_expedicion_1: new FormControl(null),
    licencia_fecha_vencimiento_1: new FormControl(null),
    licencia_categoria_1: new FormControl(null),

    numero_licencia_2: new FormControl(null),
    licencia_fecha_expedicion_2: new FormControl(null),
    licencia_fecha_vencimiento_2: new FormControl(null),
    licencia_categoria_2: new FormControl(null),


    experiencia_conducion: new FormControl(null)
  }),
  informacion_laboral_json:new FormGroup({
    fecha_ingreso: new FormControl(null),
    grupo_trabajo: new FormControl(null),
    tipo_contrato: new FormControl(null),
    tipo_vinculacion: new FormControl(null),
    tipo_vehiculo: new FormControl(null),
    cargo: new FormControl(null)
  }),
  prestacionessociales: new FormControl([]),
  recaptcha: new FormControl(null)
};
