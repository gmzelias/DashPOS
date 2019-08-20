import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'noSanitize' })
export class NoSanitizePipe implements PipeTransform {
   constructor(private sanitizer: DomSanitizer) {}
   transform(url) {
     return this.sanitizer.bypassSecurityTrustResourceUrl(url);
   }
}