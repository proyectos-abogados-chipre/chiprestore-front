import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Pipe({
  name: 'domseguro'
})
export class DomseguroPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) {}
  transform(url: any, args?: any): any {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

}
