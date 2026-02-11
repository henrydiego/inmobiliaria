import emailjs from "@emailjs/browser"

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || ""
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ""
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""

export async function sendContactNotification(data: {
  name: string
  email: string
  phone: string
  message: string
  propertyTitle?: string
}) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) return

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone,
      message: data.message,
      property: data.propertyTitle || "Consulta general",
    }, PUBLIC_KEY)
  } catch (error) {
    console.error("Error sending email notification:", error)
  }
}
