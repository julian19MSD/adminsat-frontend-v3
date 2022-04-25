/**
 * Esconde la animacion de carga
 * @param hide: Si quiere ocultarla o no.
 */
export function hideLoader(hide: boolean) {
  const loader = document.getElementById('id_loader');
  if (loader) {
    if (hide) {
      loader.classList.add('d-none');
    } else {
      loader.classList.remove('d-none');
    }
  }
}

/***
 * Obtiene el valor en profundidad de una clave en un objeto.
 * @param p: La lista de claves a iterar.
 * @param o: El objeto donde se buscara la clave.
 */                                         
export const getDeep = (p, o) => p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o);
// Array.reduce(valoracumulado, valorIterradoArray) => (operacionArealizar , valorInicialDelValorAcumulado)

/**
 * Reemplaza cadenas en un texto de acuerdo  con los parametros recibidos/
 * @param text: El string a remplazar
 * @param params: los parametros con los valores a insertar en el string.
 */
export function strFormat(text: string, params: { [propName: string]: string | number }): string {
  Object.keys(params).forEach((key: string) => {
    if (text.includes(`{${key}}`)) {
      text = text.replace(`{${key}}`, String(params[key]));
    }
  });
  return text;
}


export function getDefaultLang(lang: string) {
  const base = lang.split('-')[0];
  return base.match(/^(es|en)$/g) ? base : 'es';
}
