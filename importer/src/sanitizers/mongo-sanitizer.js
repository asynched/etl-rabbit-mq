export default function mongoDBSanitizer(product) {
  const id = product._id

  delete product.__v
  delete product._id

  product.id = id

  return product
}
