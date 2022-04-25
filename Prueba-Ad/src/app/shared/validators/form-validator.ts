import { FormControl } from "@angular/forms";


export function requiredFileType(type: string[]) {

  return function (control: FormControl) {
    const file = control.value;
    if (file && file.includes(';base64,')) {
      const mime = file.replace('data:', '', 1).split(';base64,')[0];

      if (!type.includes(mime)) {
        return {
          requiredFileType: true
        };
      }
      return null;
    }
    return null;
  };
}

