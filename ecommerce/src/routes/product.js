import { Router } from 'express'
import ProductModel from '@/models/product'

const router = Router()

router.get('/products', async (_, res) => {
  const data = await ProductModel.find({}).exec()
  res.status(200).json(data)
})

router.get('/products/:productId', async (req, res) => {
  const { productId } = req.params
  const data = await ProductModel.findById(productId).exec()
  res.status(200).json(data)
})

export default router
