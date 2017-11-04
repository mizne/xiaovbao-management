export class Activity {
  id?: string
  type: ActivityType
  name: string
  status: ActivityStatus
}

export enum ActivityType {
  REDUCE = 0, NEW_CUSTOMER = 1, DISCOUNT = 2
}

export enum ActivityStatus {
  NOT_STARTED = 0, PROCESSING = 1, END = 2
}
export const ActivityStatusMap = {
  0: '未开始',
  1: '进行中',
  2: '已结束'
}
