'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import PickupDatePicker from '../cart/PickupDatePicker';
import { WHATSAPP_NUMBER, PICKUP_SLOTS } from '@/lib/constants';
import { formatBookingMessage, buildWhatsAppURL } from '@/lib/whatsapp';

export default function BookingForm() {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  function validate() {
    const errs: Record<string, string> = {};
    if (!date) errs.date = 'Please choose a date.';
    if (!time) errs.time = 'Please choose a time.';
    if (!name.trim()) errs.name = 'Please enter your name.';
    if (!phone.trim()) errs.phone = 'Please enter your phone number.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const msg = formatBookingMessage({
      date: date!,
      time,
      guests,
      name: name.trim(),
      phone: phone.trim(),
      specialRequests: specialRequests.trim() || undefined,
    });
    setWhatsappUrl(buildWhatsAppURL(WHATSAPP_NUMBER, msg));
    setShowConfirm(true);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto" noValidate>
        {/* Date */}
        <div>
          <label className="block font-semibold text-[16px] mb-2">
            Date <span className="text-[#CC0000]">*</span>
          </label>
          <PickupDatePicker value={date} onChange={setDate} />
          {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date}</p>}
        </div>

        {/* Time */}
        <div>
          <label htmlFor="booking-time" className="block font-semibold text-[16px] mb-2">
            Time <span className="text-[#CC0000]">*</span>
          </label>
          <select
            id="booking-time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-[#E5E5E5] rounded-xl px-4 py-3 text-[16px] focus:outline-none focus:border-[#CC0000] min-h-[52px] bg-white"
          >
            <option value="">Choose a time</option>
            {PICKUP_SLOTS.map((slot) => {
              const [h, m] = slot.split(':');
              const hour = parseInt(h);
              const period = hour >= 12 ? 'PM' : 'AM';
              const displayHour = hour > 12 ? hour - 12 : hour;
              return (
                <option key={slot} value={slot}>
                  {displayHour}:{m} {period}
                </option>
              );
            })}
          </select>
          {errors.time && <p className="text-red-600 text-sm mt-1">{errors.time}</p>}
        </div>

        {/* Guests */}
        <div>
          <span className="block font-semibold text-[16px] mb-2">
            Number of Guests <span className="text-[#CC0000]">*</span>
          </span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="w-12 h-12 flex items-center justify-center border border-[#E5E5E5] rounded-xl hover:bg-gray-100 min-h-[52px]"
              aria-label="Decrease guests"
            >
              <Minus size={18} />
            </button>
            <span className="text-[22px] font-bold w-10 text-center" aria-live="polite">
              {guests}
            </span>
            <button
              type="button"
              onClick={() => setGuests(Math.min(20, guests + 1))}
              className="w-12 h-12 flex items-center justify-center border border-[#E5E5E5] rounded-xl hover:bg-gray-100 min-h-[52px]"
              aria-label="Increase guests"
            >
              <Plus size={18} />
            </button>
            <span className="text-[#555555] text-[16px]">
              {guests === 1 ? 'person' : 'people'}
            </span>
          </div>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="booking-name" className="block font-semibold text-[16px] mb-2">
            Full Name <span className="text-[#CC0000]">*</span>
          </label>
          <input
            id="booking-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className="w-full border border-[#E5E5E5] rounded-xl px-4 py-3 text-[16px] focus:outline-none focus:border-[#CC0000] min-h-[52px]"
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="booking-phone" className="block font-semibold text-[16px] mb-2">
            Phone Number <span className="text-[#CC0000]">*</span>
          </label>
          <input
            id="booking-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="012-345 6789"
            className="w-full border border-[#E5E5E5] rounded-xl px-4 py-3 text-[16px] focus:outline-none focus:border-[#CC0000] min-h-[52px]"
          />
          {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Special requests */}
        <div>
          <label htmlFor="booking-requests" className="block font-semibold text-[16px] mb-2">
            Special Requests (Optional)
          </label>
          <textarea
            id="booking-requests"
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            rows={3}
            placeholder="e.g. Please prepare a high chair"
            className="w-full border border-[#E5E5E5] rounded-xl px-4 py-3 text-[16px] focus:outline-none focus:border-[#CC0000] resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#CC0000] hover:bg-[#990000] text-white font-bold text-[18px] min-h-[56px] rounded-xl transition-colors"
        >
          Reserve Table via WhatsApp
        </button>
      </form>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowConfirm(false)} />
          <div className="relative bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-[22px] font-bold mb-2">Confirm Reservation</h3>
            <p className="text-[16px] text-[#555555] mb-6">
              You are about to open WhatsApp to send your table reservation request to SALTed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 border border-[#E5E5E5] rounded-xl min-h-[52px] text-[16px] font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-[#CC0000] hover:bg-[#990000] text-white rounded-xl min-h-[52px] text-[16px] font-bold flex items-center justify-center"
              >
                Open WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
