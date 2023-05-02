import { FormControl } from "@angular/forms";

export function fileSizeChecker(types: string[]) {
  return function (control: FormControl) {
    const fileName = control.value;

    if (fileName) {
      const extension = fileName.split('.')[1].toLowerCase();
      if (!types.includes(extension)) {
        return {
          requiredFileType: true
        };
      }

      return null;
    }

    return null;
  };
}