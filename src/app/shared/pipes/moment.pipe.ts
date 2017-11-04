import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {
  transform(value: string|Date, dateFormat: string = 'YYYY-MM-DD HH:mm'): string {
    return moment(value).format(dateFormat)
  }
}
