export const formatPrice = priceWithDecimals => {
  if (!priceWithDecimals) {
    return 0
  }
  const realPrice = parseInt(priceWithDecimals) / 100
  return realPrice.toLocaleString("en-US", {
    style: "currency",
    currency: "EUR",
  })
}
