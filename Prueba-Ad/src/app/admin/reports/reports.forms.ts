import { FormControl, Validators } from '@angular/forms';

export const FormFieldsReports = {
  tipo: new FormControl(0, [Validators.required]),
  reporte: new FormControl(null, [Validators.required]),
  cliente: new FormControl(null, [Validators.required]),
  actores_viales: new FormControl([]),
  activos: new FormControl([], [Validators.required]),
  zonas_de_control: new FormControl([]),
  eventos: new FormControl([]),
  desde: new FormControl(null, [Validators.required]),
  hasta: new FormControl(null, [Validators.required]),
  recaptcha: new FormControl(null)

};

export interface ITypesReports {
  id: number;
  name: string;
  url: string;
  download: string;
}
