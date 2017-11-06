import { Pipe, PipeTransform } from '@angular/core';

import { ActivityStatusMap } from '../models/activity.model'

@Pipe({
  name: 'activityStatus'
})
export class ActivityStatusPipe implements PipeTransform {
  transform(value: number): string {
    return ActivityStatusMap[value] || '未知状态'
  }
}
