import { FormControl } from '@angular/forms';

function byteConverter(bytes: number, decimals: number): number {
  const K_UNIT = 1024;
  if (bytes == 0) return 0;
  return parseFloat((bytes / (K_UNIT * K_UNIT)).toFixed(decimals));
}

export class ImageValidator {

  static permitSize(maxSize: number) {
    return function (input: FormControl) {
      if (input?.value?.size) {
        return byteConverter(input.value.size, 2) > maxSize ? { maxSize: true } : null;
      }
      return null;
    };
  }

  static acceptExtensions(whiteListImageExtension: string[]) {
    return function (input: FormControl) {
      if (input?.value?.type) {
        return whiteListImageExtension.includes(input.value.type) ? null : { extension: true };
      }
      return null;
    };
  }
}
