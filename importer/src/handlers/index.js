import path from 'path'
import axios from 'axios'
import fs from 'fs/promises'

const DATA_FOLDER_PATH = path.join(__dirname, '..', '..', 'data')
const CATALOG_FILE_PATH = path.join(DATA_FOLDER_PATH, 'catalog.json')

export default class CatalogHandler {
  constructor(sanitizer) {
    this.sanitizer = sanitizer
  }

  async _getProducts() {
    const { data } = await axios.get(`http://localhost:3333/api/products`)
    return data
  }

  async _getProduct(id) {
    const { data } = await axios.get(`http://localhost:3333/api/products/${id}`)
    return data
  }

  async updateCatalog() {
    const rawProducts = await this._getProducts()
    const products = await Promise.all(rawProducts.map(this.sanitizer))

    await fs.writeFile(CATALOG_FILE_PATH, JSON.stringify(products))
  }

  async updateProduct(id) {
    const rawProduct = await this._getProduct(id)
    const product = await this.sanitizer(rawProduct)

    const products = JSON.parse(await fs.readFile(CATALOG_FILE_PATH))

    const newProducts = products.map((p) => {
      if (p.id === product.id) {
        return product
      }
      return p
    })

    await fs.writeFile(CATALOG_FILE_PATH, JSON.stringify(newProducts))
  }
}
