import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderStatus'
})

export class OrderStatusPipe implements PipeTransform {
  transform(value: number): string {
    const arr = ['未支付', '待支付', '已支付']
    return arr[value] || '未知状态'
  }
}
