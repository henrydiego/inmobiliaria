export function formatPrice(price: number, currency: "USD" | "BOB" = "USD"): string {
  if (currency === "BOB") {
    return `Bs. ${price.toLocaleString("es-BO")}`
  }
  return `$${price.toLocaleString("en-US")}`
}

export function formatArea(area: number): string {
  return `${area.toLocaleString()} m²`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function getWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, "")
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
}
