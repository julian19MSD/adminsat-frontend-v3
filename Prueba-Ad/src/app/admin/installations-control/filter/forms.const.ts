import {FormControl} from '@angular/forms';

export const formFields = {
activos__in: new FormControl([]),
nombre__in: new FormControl([]),
cliente__in: new FormControl([]),
riesgo: new FormControl(),
velocidad_maxima__lte: new FormControl(),
velocidad_maxima__gte: new FormControl(),
};
