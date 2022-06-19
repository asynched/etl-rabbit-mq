import './config/alias'

import AdminBroPlugin from '@/admin'
import Server from '@/server'

import ProductModel from '@/models/product'
import productRouter from '@/routes/product'

const adminBroPlugin = AdminBroPlugin.fromDefaults().addResource(ProductModel)

Server.fromDefaults()
  .addPlugin(adminBroPlugin)
  .addRouter({
    prefix: '/api',
    router: productRouter,
  })
  .start((port) => {
    console.log(`[INFO] Server running on port :${port}`)
  })
