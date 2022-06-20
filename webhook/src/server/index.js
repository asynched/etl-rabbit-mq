import express from 'express'

export default class Server {
  constructor() {
    this.app = express()
    this.routers = []
  }

  addRouter({ prefix, router }) {
    this.routers.push({ prefix, router })
    return this
  }

  async start(port, callback) {
    this.app.use(express.json())

    for (const { prefix, router } of this.routers) {
      this.app.use(prefix, router)
    }

    this.app.listen(port, callback?.bind(null, port))
  }

  static fromDefaults() {
    return new Server()
  }
}
