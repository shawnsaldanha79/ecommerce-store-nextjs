import { product } from './schemas/product'
import { productCategory } from './schemas/product-category'
import { promotionCampaign } from './schemas/promotion-campaign'
import { promotionCode } from './schemas/promotion-code'
import { type SchemaTypeDefinition } from 'sanity'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    promotionCode,
    promotionCampaign,
    productCategory,
    product,
  ],
}
