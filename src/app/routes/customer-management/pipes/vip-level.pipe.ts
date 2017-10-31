import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vipLevel'
})

export class VipLevelPipe implements PipeTransform {
  transform(value: number): any {
    const vips = ['普通会员', '银卡会员']
    return vips[value] || '未知会员'
  }
}
