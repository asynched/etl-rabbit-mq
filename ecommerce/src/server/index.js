import express from 'express'
import mongoose from 'mongoose'

export default class Server {
  constructor(port = 3333) {
    this.port = port
    this.plugins = []
    this.routers = []
  }

  addPlugin(plugin) {
    this.plugins.push(plugin)
    return this
  }

  addRouter({ prefix, router }) {
    this.routers.push({
      prefix,
      router,
    })

    return this
  }

  async start(callback) {
    try {
      await mongoose.connect('mongodb://localhost:27017/ecommerce')
      const app = express()

      this.plugins.forEach((plugin) => plugin.withApp(app))
      this.routers.forEach((router) => {
        if (router.prefix) {
          return app.use(router.prefix, router.router)
        }

        app.use(router.router)
      })

      app.listen(this.port, callback?.bind(null, this.port))
    } catch (err) {
      console.error(err)
    }
  }

  static fromDefaults() {
    return new Server()
  }
}
