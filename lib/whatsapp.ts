export interface CartItem {
  name: string;
  variantName?: string;
  quantity: number;
  unitPrice: number;
  note?: string;
}

export function formatOrderMessage(params: {
  items: CartItem[];
  pickupDate: Date;
  pickupTime: string;
  customerName: string;
  customerPhone?: string;
}): string {
  const { items, pickupDate, pickupTime, customerName, customerPhone } = params;

  const dateStr = pickupDate.toLocaleDateString('en-MY', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const [h, m] = pickupTime.split(':');
  const hour = parseInt(h);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour;
  const timeStr = `${displayHour}:${m} ${period}`;

  const itemLines = items
    .map((item, i) => {
      const label = item.variantName ? `${item.name} (${item.variantName})` : item.name;
      const line = `${i + 1}. ${label} × ${item.quantity}`;
      return item.note?.trim() ? `${line}\n   └ Note: ${item.note.trim()}` : line;
    })
    .join('\n');

  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return [
    '🍜 *SALTed Order Request*',
    '',
    '📋 *My Order:*',
    itemLines,
    '',
    `📅 *Pickup Date:* ${dateStr}`,
    `⏰ *Pickup Time:* ${timeStr}`,
    '',
    `👤 *Name:* ${customerName}`,
    customerPhone?.trim() ? `📱 *Phone:* ${customerPhone.trim()}` : '',
    '',
    `💰 *Estimated Total: RM ${total.toFixed(2)}*`,
    '',
    '---',
    'Sent via SALTed Online Menu 😊',
    'Thank you! We will confirm your order shortly 🙏',
  ]
    .filter((line) => line !== undefined && line !== null)
    .join('\n');
}

export function formatBookingMessage(params: {
  date: Date;
  time: string;
  guests: number;
  name: string;
  phone: string;
  specialRequests?: string;
}): string {
  const { date, time, guests, name, phone, specialRequests } = params;

  const dateStr = date.toLocaleDateString('en-MY', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const [h, m] = time.split(':');
  const hour = parseInt(h);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour;
  const timeStr = `${displayHour}:${m} ${period}`;

  return [
    '🪑 *Table Reservation Request*',
    '',
    `📅 *Date:* ${dateStr}`,
    `⏰ *Time:* ${timeStr}`,
    `👥 *Guests:* ${guests} ${guests === 1 ? 'person' : 'people'}`,
    `👤 *Name:* ${name}`,
    `📱 *Phone:* ${phone}`,
    specialRequests?.trim() ? `\n📝 *Special Requests:* ${specialRequests.trim()}` : '',
    '',
    '---',
    'Sent via SALTed Online Booking 😊',
    'We look forward to having you! 🙏',
  ]
    .filter((line) => line !== undefined && line !== null)
    .join('\n');
}

export function buildWhatsAppURL(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
