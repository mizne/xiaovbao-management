import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-activity-management',
  templateUrl: './activity-management.component.html',
  styleUrls: ['./activity-management.component.less']
})
export class ActivityManagementComponent {
  size = 'default'

  data = [
    {
      key: '1',
      name: '全场8折',
      type: 0,
      status: '进行中'
    },
    {
      key: '2',
      name: '满200减50',
      type: 1,
      status: '进行中'
    },
    {
      key: '3',
      name: '新客立减20',
      type: 2,
      status: '进行中'
    }
  ]
}
