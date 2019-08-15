import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'passwordPipe'
})
export class PasswordPipe implements PipeTransform {

  transform(password: any, visible: boolean): string {
    if (visible) {
      return password;
    } else {
      let noVisible = '';
      for (const char of password) {
        noVisible = noVisible + '*';
      }
      return noVisible;
    }
  }

}
