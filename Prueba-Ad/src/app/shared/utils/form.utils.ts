/**
 * Quita un chip de un chipList
 * @param form: El formulario
 * @param key: El nombre del campo en el formulario
 * @param value: El valor que se desea eliminar.
 */
import {FormControl, FormGroup} from '@angular/forms';

export function removeChip(form, key, value): void {
  const index = form.get(key).value.indexOf(value);

  if (index >= 0) {
    form.get(key).value.splice(index, 1);
    if (form.get(key).value.length === 0) {
      form.get(key).setValue([]);
    }
  }
}

/**
 * Recibe y procesa la informacion que se desea pegar en un chipList para ajustarla y agregarla.
 * @param form: El formulario
 * @param key: El nombre del campo en el formulario
 * @param event: El evento pegar.
 * @param max: El numero maximo de elementos que permite el chipList
 * @param mail: Indicador de si el elemento es un correo electronico.
 */
export function pasteChip(form: FormGroup, key: string, event: ClipboardEvent, max: number = 5, mail: boolean = false) {
  event.preventDefault();
  event.clipboardData
    .getData('Text')
    .split(/;|,|\n/)
    .forEach(value => {
      addChip(form, key, null, value, max);
    });
}

/**
 * Agrega un elemento tipo chip a un campo de formulario tipo Array, realizando la previa validacion del contenido.
 * @param form: La isntancia del formulario
 * @param key: La clave del campo.
 * @param input: El input asociado al campo del formulario.
 * @param value: El valor a agregar al chip.
 * @param max: El numero de elementos maximos que permite el chip
 * @param mail: Indicador de si el elemento es un correo electronico.
 */
export function addChip(form: FormGroup, key: string, input: HTMLInputElement, value: string, max: number = 5, mail: boolean = false): void {
  if (!Array.isArray(form.get(key).value)) {
    form.get(key).reset([]);
  }

  if ((value || '').trim()) {
    if (!form.get(key)) {
      form.addControl(key, new FormControl([], []));
    } else if (!Array.isArray(form.get(key))) {
      form.addControl(key, new FormControl([], []));
    }
    if (form.get(key).value.length < max && form.get(key).value.indexOf(value) === -1 && (!mail || (mail && value.match('^.+@.+\..+$')))) {
      form.get(key).value.push(value.trim());
    }
  }

  if (input) {
    input.value = '';
  }
  form.get(key).updateValueAndValidity();
}


/**
 * Valida la informacion de un formulario de filtro u ordenamiento
 * @param form: EL formulario a validar.
 */
export function validatedData(form) {
  const cleanedData: any = {};
  Object.keys(form.value).forEach((key) => {

    if (Array.isArray(form.value[key])) {
      cleanedData[key] = form.value[key].length > 0 ? form.value[key].join(',') : null;
    } else if (form.value[key] instanceof Date) {
      cleanedData[key] = form.value[key].toISOString();
    } else if (!([undefined, null, ''].includes(form.value[key]))) {
      cleanedData[key] = form.value[key];
    } else {
      cleanedData[key] = null;
    }
  });
  return cleanedData;
}

