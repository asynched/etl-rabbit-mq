import amqp from 'amqplib'
import './config'

import CatalogHandler from '@/handlers'
import mongoDBSanitizer from '@/sanitizers/mongo-sanitizer'

const kUpdateCatalog = 'importer:update_catalog'
const kUpdateSingleProduct = 'importer:update_single_product'

amqp.connect('amqp://localhost').then(async (connection) => {
  const handler = new CatalogHandler(mongoDBSanitizer)
  const channel = await connection.createChannel()

  await channel.assertQueue(kUpdateCatalog)
  await channel.assertQueue(kUpdateSingleProduct)

  channel.consume(kUpdateCatalog, (message) => {
    handler.updateCatalog().then(() => {
      channel.ack(message)
    })
  })

  channel.consume(kUpdateSingleProduct, (message) => {
    const { productId } = JSON.parse(message.content.toString())
    handler.updateProduct(productId).then(() => {
      channel.ack(message)
    })
  })
})
