export interface DiscountActivity {
  id?: string
  goodsId?: string
  goodsName: string
  originalPrice: number
  discount: number
  activityPrice: number
  purchaseLimitCount: number
  target: string
  qrcodeTemplateId: string
}

