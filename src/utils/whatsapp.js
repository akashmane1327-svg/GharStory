const WHATSAPP_PHONE = '918888658892'
const DEFAULT_MESSAGE = 'Hi Ghar Story! 👋 I am browsing properties on your website and would like more details about your verified projects in Pune.'

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`

export function getWhatsAppUrl(message = DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`
}
