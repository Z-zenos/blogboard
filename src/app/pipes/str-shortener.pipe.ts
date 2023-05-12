import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strShortener'
})
export class StrShortenerPipe implements PipeTransform {

  transform(v: string): string {
    return v.length > 12 ? `${v.slice(0, 7)}...` : v;
  }

}
