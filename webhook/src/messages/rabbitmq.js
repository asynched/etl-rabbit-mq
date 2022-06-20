import amqp from 'amqplib'

export class RabbitMQConnector {
  constructor({ url = 'amqp://localhost:5672', queueName } = {}) {
    this.url = url
    this.queueName = queueName
    this.connection = null
    this.channel = null
  }

  async connect() {
    this.connection = await amqp.connect(this.url)
    this.channel = await this.connection.createChannel()
  }

  async publish(message) {
    if (!this.connection) {
      await this.connect()
    }

    await this.channel.assertQueue(this.queueName, { durable: true })
    await this.channel.sendToQueue(this.queueName, Buffer.from(message))
  }
}

export class RabbitMQConnectorPool {
  /**
   * @type { Record<string, RabbitMQConnector> }
   */
  static __connectors = {}

  static getConnector(queueName) {
    if (!RabbitMQConnectorPool.__connectors[queueName]) {
      RabbitMQConnectorPool.__connectors[queueName] = new RabbitMQConnector({
        queueName,
      })
    }

    return RabbitMQConnectorPool.__connectors[queueName]
  }
}
