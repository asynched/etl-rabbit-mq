import { Router } from 'express'
import { RabbitMQConnectorPool } from '@/messages/rabbitmq'
import { kUpdateCatalog, kUpdateSingleProduct } from '@/config/globals'

const productsRouter = Router()

productsRouter.get('/updateProducts', async (req, res) => {
  const connector = RabbitMQConnectorPool.getConnector(kUpdateCatalog)

  await connector.publish(
    JSON.stringify({
      type: 'updateCatalog',
    })
  )

  res.status(200).json({
    message: 'Message to update catalog has been sent to the queue',
  })
})

productsRouter.get('/updateProducts/:productId', async (req, res) => {
  const { productId } = req.params

  const connector = RabbitMQConnectorPool.getConnector(kUpdateSingleProduct)

  await connector.publish(
    JSON.stringify({
      type: 'updateSingleProduct',
      productId,
    })
  )

  res.status(200).json({
    message: `Message for product update with id '${productId}' has been sent to the queue`,
  })
})

export default productsRouter
