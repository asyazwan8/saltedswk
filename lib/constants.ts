export const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || '60374935266';

export const RESTAURANT = {
  name: 'SALTed',
  tagline: "Sarawak's Authentic Local Taste, Extra Delicious",
  phone: '+60 3-7493 5266',
  whatsapp: WHATSAPP_NUMBER,
  email: 'SALTedswk@gmail.com',
  address: '30-1, Jalan PJU 7/16A, Mutiara Damansara, 47810 Petaling Jaya, Selangor',
  instagram: 'https://www.instagram.com/saltedswk/',
  facebook: 'https://www.facebook.com/SALTedSwk/',
  handle: '@saltedswk',
};

export const BUSINESS_HOURS = {
  openTime: '10:00',
  closeTime: '14:00',
  closedDays: [1], // 0=Sunday, 1=Monday
};

export const OPERATING_HOURS_TEXT =
  'Tuesday – Friday: 12:00 PM – 6:00 PM  |  Saturday – Sunday: 10:00 AM – 6:00 PM  |  Closed Mondays';

export const PICKUP_SLOTS = (() => {
  const slots: string[] = [];
  for (let h = 10; h <= 13; h++) {
    for (const m of [0, 30]) {
      if (h === 13 && m === 30) continue;
      slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }
  return slots;
})();
