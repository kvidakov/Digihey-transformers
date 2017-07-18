import { NgModule, Pipe, PipeTransform } from '@angular/core';
import * as _lodash from 'lodash';

@Pipe({
  name: 'unique',
  pure: false
})
export class UniquePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value !== 'undefiend' && value !== null) {
      return _lodash.uniqBy(value, 'type');
    }
    return value;
  }

}
