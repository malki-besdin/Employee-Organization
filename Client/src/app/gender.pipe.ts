import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender',
  standalone: true
})
export class GenderPipe implements PipeTransform {

  transform(value: number | undefined): string {
    switch (value) {
      case 1:
        return "Famale";
      case 2:
        return "Male";
      default:
        return "undefind";
    }
  }
}