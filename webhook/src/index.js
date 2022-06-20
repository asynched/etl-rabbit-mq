import './config'
import Server from '@/server'
import productsRouter from '@/routes/products'

Server.fromDefaults()
  .addRouter({
    prefix: '/',
    router: productsRouter,
  })
  .start(3334, (port) => {
    console.log(`[INFO] Server started on port :${port}`)
  })
