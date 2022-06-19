import AdminBro from 'admin-bro'
import adminBroExpress from 'admin-bro-expressjs'
import adminBroMongoose from 'admin-bro-mongoose'

import Plugin from '@/plugins'

AdminBro.registerAdapter(adminBroMongoose)

export default class AdminBroAdapter extends Plugin {
  constructor() {
    super()
    this.resources = []
  }

  addResource(resource) {
    this.resources.push(resource)
    return this
  }

  withApp(app) {
    const adminBro = new AdminBro({
      rootPath: '/admin',
      resources: this.resources,
    })

    const router = adminBroExpress.buildRouter(adminBro)

    app.use(adminBro.options.rootPath, router)
  }

  static fromDefaults() {
    return new AdminBroAdapter()
  }
}
