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

export function calculateMortgage(
  price: number,
  downPayment: number,
  annualRate: number,
  years: number
): { monthlyPayment: number; totalInterest: number; totalCost: number } {
  const principal = price - downPayment
  if (principal <= 0) return { monthlyPayment: 0, totalInterest: 0, totalCost: 0 }
  const monthlyRate = annualRate / 100 / 12
  const n = years * 12
  if (monthlyRate === 0) {
    const monthlyPayment = principal / n
    return { monthlyPayment, totalInterest: 0, totalCost: principal }
  }
  const monthlyPayment =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, n))) /
    (Math.pow(1 + monthlyRate, n) - 1)
  const totalCost = monthlyPayment * n
  const totalInterest = totalCost - principal
  return { monthlyPayment, totalInterest, totalCost }
}

export function getWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, "")
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
}
