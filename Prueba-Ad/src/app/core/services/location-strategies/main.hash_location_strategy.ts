import {HashLocationStrategy} from '@angular/common';
import {Injectable} from '@angular/core';

@Injectable()
export class MainHashLocationStrategy extends HashLocationStrategy {
  prepareExternalUrl(internal: string): string {
    return this.getBaseHref() + '#' + internal;
  }
}
