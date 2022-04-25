import * as cloneDeep from 'lodash/cloneDeep';

/**
 * Verifica sin un objeto cumple con los filtros establecidos en por el usuario.
 * @param msg: El objeto a evaluar.
 * @param filterKeys: Un objeto con los valores de filtros establecidos por el usuario.
 * @param searchItmes: Las claves que se usan en el filtro general de busqueda.
 * @param queryParams: Lo parametros de la url
 * @param filterConversionKeys: Un objeto con las transformaciones de las calves (clave en la url y clave dentro del objeto.)
 */
import {getDeep} from '@shared/utils/general.utils';

export function checkMatchFilter(msg: any, filterKeys: any, searchItmes: string[], queryParams: any, filterConversionKeys: any) {
  let valresult = true;
  let filterResult = true;
  if (queryParams.search) {
    const val = queryParams.search.toLowerCase();
    valresult = false;
    searchItmes.forEach(key => {
      const splited = key.split('.');
      if ((getDeep(splited, msg) || '').toLowerCase().indexOf(val) >= 0) {
        valresult = true;
      }
    });
  }

  for (const key of Object.keys(filterKeys)) {
    if (key in filterConversionKeys) {

      const msgKey = filterConversionKeys[key][0].split('.');
      const value = getDeep(msgKey, msg);

      if (key.endsWith('__in')) {
        let icontains = false;
        for (const item of filterKeys[key]) {
          if (value && value.toString().toLowerCase().includes(item)) {
            icontains = true;
            break;
          }
        }
        if (icontains) {
          continue;
        }
      } else if (key.endsWith('__isnull') && value === null) {
        continue;
      } else if (key.endsWith('__lte') && (value <= filterKeys[key])) {
        continue;
      } else if (key.endsWith('__gte') && (value >= filterKeys[key])) {
        continue;
      } else if (value === filterKeys[key]) {
        continue;
      }
      filterResult = false;
      break;
    }
  }
  return (valresult && filterResult);

}


/**
 * Ordena la lista recibida segun los criterios de ordenamiento.
 * @param items: La lista de elementos.
 * @param defaultKey: La clave de ordenamiento por defecto.
 * @param ordering: Un objeto con los items a ordenar
 * @param orderingConversionKeys: Un objeto con la transformacion de url al valor en cada item de la lista.
 */
export function sortList(items: any[], defaultKey: string, ordering: any[], orderingConversionKeys: any): any[] {

  if (ordering.length > 0) {
    const orderKeys = [];
    ordering.forEach(item => {
      if (item.replace('-', '') in orderingConversionKeys) {
        orderKeys.push(item);
      }
    });
    if (orderKeys.length > 0) {
      items.sort((a, b) => {
        for (const val of orderKeys) {
          const ahead = '-' === val[0] ? -1 : 1;
          let key = val.replace('-', '');
          const itemType = orderingConversionKeys[key][1];
          key = orderingConversionKeys[key][0].split('.');
          const valA = getDeep(key, a);
          const valB = getDeep(key, b);
          if (valA === valB) {
            continue;
          }
          return validateSort(valA, valB, itemType, ahead);
        }
        return 0;
      });
    }
  } else {
    const defaultKeys = defaultKey.split('.');
    items.sort((a, b) => {
      return validateSort(getDeep(defaultKeys, a), getDeep(defaultKeys, b), 'int', -1);
    });
  }
  return items.slice();
}

/***
 * Valida y ordena los valores recibidos
 * @param a: Parametro 1
 * @param b: Parametro 2
 * @param itemType: Tipo de parametro (string, int)
 * @param ahead: Direccion (ascendente o descendente)
 */
export function validateSort(a, b, itemType, ahead) {
  if (a === b) {
    return 0;
  }
  if ([null, undefined].includes(a)) {
    return 1;
  }
  if ([null, undefined].includes(b)) {
    return -1;
  }
  if ('string' === itemType) {
    return a.localeCompare(b) * ahead;
  }
  return (a - b) * ahead;
}


/**
 * Establece los parametros de filtrado dinamico de una lista.
 * @param queryParams: Los queryParams del routes
 * @param filterConversionKeys: El objeto con las conversiones de filtros (Valor en la url y el valor en el objeto)
 */
export function setFilterParams(queryParams: any, filterConversionKeys: any) {
  const filterKeys = cloneDeep(queryParams);
  delete filterKeys.ordering;
  delete filterKeys.search;
  delete filterKeys.page_size;

  Object.keys(filterKeys).forEach(key => {
    if (key in filterConversionKeys) {
      let info;
      switch (filterConversionKeys[key][1]) {
        case 'array':
          info = [];
          filterKeys[key].split(',').forEach(item => {
            info.push(item.toLowerCase());
          });
          filterKeys[key] = info;
          break;
        case 'date':
          filterKeys[key] = new Date(filterKeys[key]);
          break;
        case 'int':
          filterKeys[key] = parseInt(filterKeys[key], 10);
          break;
        case 'boolean':
          filterKeys[key] = JSON.parse(filterKeys[key]);
          break;
        default:
          filterKeys[key] = filterKeys[key].toLowerCase();
      }
    }
  });
  return filterKeys;
}
