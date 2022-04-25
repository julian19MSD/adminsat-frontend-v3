import {FormControl, FormGroup, Validators} from '@angular/forms';

export const FormRequiredFieldsAsset = ['placa', 'tipo_vehiculo'];


export const FormFieldsAsset = {
  id: new FormControl(null),
  is_active: new FormControl(true),
  out_of_service: new FormControl(false),
  cliente: new FormControl(null, [Validators.required]),
  nombre: new FormControl(null, [Validators.required]),
  tipo_activo: new FormControl(null, [Validators.required]),
  placa: new FormControl(null, [Validators.required]),
  tipo_vehiculo: new FormControl(null),
  documentos_json: new FormGroup({
    marca: new FormControl(null),
    linea: new FormControl(null),
    color: new FormControl(null),
    puertas: new FormControl(null, [Validators.min(0)]),
    potencia: new FormControl(null, [Validators.min(0)]),
    modelo: new FormControl(null, [Validators.min(0)]),
    servicio: new FormControl(null),
    modalidad_servicio: new FormControl(null),
    capacidad_pasajeros: new FormControl(null, [Validators.min(0)]),
    radio_accion: new FormControl(null),
    peso: new FormControl(null, [Validators.min(0)]),
    cilindraje: new FormControl(null, [Validators.min(0)]),
    transito: new FormControl(null),
    vin: new FormControl(null),
    motor: new FormControl(null),
    chasis: new FormControl(null),
    serie: new FormControl(null),
    tipo_combustible: new FormControl(null),
    tipo_carroceria: new FormControl(null),
    numero_thermo: new FormControl(null),
    serie_thermo: new FormControl(null),
    linea_thermo: new FormControl(null),
    controlador_thermo: new FormControl(null)

  }),
  equipos: new FormControl([]),
  horas_uso: new FormControl(0),
  icono: new FormControl(null, [Validators.required]),
  activo_asociado: new FormControl(null),
  circulo_servicios: new FormControl(null),
  odometro: new FormControl(0),
  observaciones: new FormControl(null),
  varios_json: new FormGroup({
    ecumonitor: new FormControl(false),
    sensor_combustible: new FormControl(false),
    sensor_llantas: new FormControl(false),
    boton_panico: new FormControl(false),
    apagado_remoto: new FormControl(false),
    ignicion: new FormControl(false),
    own: new FormControl(false),
    tramites: new FormGroup({
      grupo_vehiculo: new FormControl(null),
      blindaje: new FormControl(false),
      impuestos: new FormControl(false)
    })


  }),
  propietario_json: new FormGroup({
    leasing: new FormControl(false),
    leasing_numero: new FormControl(null),
    leasing_vigencia_desde: new FormControl(null),
    leasing_vigencia_hasta: new FormControl(null),
    nombre: new FormControl(null),
    apellidos: new FormControl(null),
    correo: new FormControl(null),
    telefono: new FormControl(null),
    ciudad: new FormControl(null),
    direccion: new FormControl(null),
    identificacion: new FormControl(null)
  }),
  contacto_json: new FormGroup({
    nombre: new FormControl(null),
    apellidos: new FormControl(null),
    correo: new FormControl(null),
    cargo: new FormControl(null),
    telefono: new FormControl(null),
    ciudad: new FormControl(null),
    direccion: new FormControl(null),
    identificacion: new FormControl(null),
    departamento: new FormControl(null),
    asignado: new FormControl(null),
    cargo_asignado: new FormControl(null)
  }),
  seguridad_json: new FormGroup({
    seguridad_activa: new FormGroup({
      llantas: new FormControl(false),
      frenos_abs: new FormControl(false),
      frenos_bas: new FormControl(false),
      tcs: new FormControl(false),
      control_estabilidad: new FormControl(false),
      direccion_asistida: new FormControl(false),
      suspension_activa: new FormControl(false),
      iluminacion: new FormControl(false),
      climatizacion: new FormControl(false),
      cambio_carril: new FormControl(false),
      circulacion_sentido_contrario: new FormControl(false),
      angulo_muerto: new FormControl(false),
      mobileye: new FormControl(false),
    }),
    seguridad_pasiva: new FormGroup({
      airbag: new FormControl(false),
      cinturon_seguridad: new FormControl(false),
      apoyacabezas: new FormControl(false),
      diseno_carroceria: new FormControl(false),
      chasis: new FormControl(false),
      blindaje: new FormControl(false),
      polarizado: new FormControl(false)
    })
  }),
  recaptcha: new FormControl(null)
};
