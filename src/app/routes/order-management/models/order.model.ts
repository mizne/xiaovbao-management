import * as R from 'ramda'

export class Order {
  id?: string
  tradeNo?: string
  remark?: string
  bizType?: string
  phone?: string
  foods?: Food[]
  status?: number
  orderAmount?: number
  createdAt?: string
  acceptAt?: string
  payAt?: string
  paymentMethod?: string

  static convertFromResp(orderResp: OrderResp): Order {
    return R.reject(R.isNil, {
      id: orderResp.id,
      tradeNo: orderResp.trade_no,
      remark: orderResp.info,
      bizType: orderResp.bizType,
      phone: orderResp.phone,
      foods: orderResp.foods.map(Order.convertFoodFromResp),
      status: orderResp.status,
      orderAmount: orderResp.total_amount,
      createdAt: orderResp.receiveTime,
      acceptAt: orderResp.acceptTime,
      payAt: orderResp.payTime,
      paymentMethod: orderResp.paymentMethod
    })
  }

  private static convertFoodFromResp(foodResp: FoodResp): Food {
    return R.reject(R.isNil, {
      id: foodResp.id,
      name: foodResp.name,
      price: foodResp.name,
      vipPrice: foodResp.vipPrice,
      num: foodResp.num,
      unit: foodResp.unit
    }) as Food
  }
  
}

export interface Food {
  id: number;
  name: string;
  price: number;
  vipPrice: number;
  num: number;
  unit: string;
}

export interface OrderResp {
  tableName: string;
  trade_no: string;
  info: string;
  id: number;
  bizType: string;
  deliveryTime: string;
  payTime: string;
  acceptTime: string;
  receiveTime: string;
  foods: FoodResp[];
  totalNum: number;
  dinersNum: number;
  status: number;
  time: string;
  phone: string;
  consigneeId: string;
  tenantId: string;
  consigneeName: string;
  total_amount: string;
  actual_amount: string;
  refund_amount: string;
  refund_reason: string;
  paymentMethod: string;
  totalPrice: number;
  platformCouponFee: number;
  merchantCouponFee: number;
}

export interface FoodResp {
  id: number;
  name: string;
  price: number;
  vipPrice: number;
  num: number;
  unit: string;
}
