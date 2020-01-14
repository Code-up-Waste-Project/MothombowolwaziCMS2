import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'registers'
})
export class RegistersPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
