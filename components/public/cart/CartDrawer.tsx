'use client';

import { useState, useEffect } from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from './CartContext';
import PickupDatePicker from './PickupDatePicker';
import { WHATSAPP_NUMBER, PICKUP_SLOTS } from '@/lib/constants';
import { formatOrderMessage, buildWhatsAppURL } from '@/lib/whatsapp';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const { items, removeItem, updateQuantity, updateNote, total, clearCart } = useCart();
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [pickupTime, setPickupTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  function validate() {
    const errs: Record<string, string> = {};
    if (!pickupDate) errs.date = 'Please choose a pickup date.';
    if (!pickupTime) errs.time = 'Please choose a pickup time.';
    if (!name.trim()) errs.name = 'Please enter your name.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSend() {
    if (!validate()) return;
    const msg = formatOrderMessage({
      items: items.map((e) => ({
        name: e.name,
        variantName: e.variantName,
        quantity: e.quantity,
        unitPrice: e.unitPrice,
        note: e.note,
      })),
      pickupDate: pickupDate!,
      pickupTime,
      customerName: name.trim(),
      customerPhone: phone.trim() || undefined,
    });
    setWhatsappUrl(buildWhatsAppURL(WHATSAPP_NUMBER, msg));
    setShowConfirm(true);
  }

  function confirmSend() {
    clearCart();
    onClose();
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setShowConfirm(false);
  }

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col"
        role="dialog"
        aria-label="Your order"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E5E5]">
          <h2 className="text-[22px] font-bold">Your Order</h2>
          <button
            onClick={onClose}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-gray-100"
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {items.length === 0 ? (
            <p className="text-[#555555] text-[16px] text-center py-12">Your cart is empty.</p>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.id} className="border border-[#E5E5E5] rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <p className="text-[16px] font-semibold leading-snug">{item.name}</p>
                      {item.variantName && (
                        <p className="text-sm text-[#555555]">{item.variantName}</p>
                      )}
                    </div>
                    <p className="text-[16px] font-bold text-[#EA580C] whitespace-nowrap">
                      RM {(item.unitPrice * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#E5E5E5] hover:bg-gray-100"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-[16px] font-semibold w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#E5E5E5] hover:bg-gray-100"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto text-red-500 hover:text-red-700 p-2"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Note */}
                  <div>
                    <label className="text-sm text-[#555555] block mb-1" htmlFor={`note-${item.id}`}>
                      📝 Add note (optional)
                    </label>
                    <input
                      id={`note-${item.id}`}
                      type="text"
                      value={item.note}
                      onChange={(e) => updateNote(item.id, e.target.value)}
                      placeholder="e.g. Extra sambal please"
                      className="w-full border border-[#E5E5E5] rounded-lg px-3 py-2 text-[16px] focus:outline-none focus:border-[#EA580C]"
                    />
                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="flex justify-between items-center py-3 border-t border-[#E5E5E5]">
                <span className="text-[16px] font-semibold">Estimated Total</span>
                <span className="text-[18px] font-bold text-[#EA580C]">RM {total.toFixed(2)}</span>
              </div>

              {/* Pickup date */}
              <div>
                <label className="block font-semibold text-[16px] mb-2">📅 Pickup Date *</label>
                <PickupDatePicker value={pickupDate} onChange={setPickupDate} />
                {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date}</p>}
              </div>

              {/* Pickup time */}
              <div>
                <label className="block font-semibold text-[16px] mb-2" htmlFor="pickup-time">
                  ⏰ Pickup Time *
                </label>
                <select
                  id="pickup-time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full border border-[#E5E5E5] rounded-xl px-4 py-3 text-[16px] focus:outline-none focus:border-[#EA580C] min-h-[52px]"
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

              {/* Name */}
              <div>
                <label className="block font-semibold text-[16px] mb-2" htmlFor="customer-name">
                  👤 Your Name *
                </label>
                <input
                  id="customer-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full border border-[#E5E5E5] rounded-xl px-4 py-3 text-[16px] focus:outline-none focus:border-[#EA580C] min-h-[52px]"
                />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block font-semibold text-[16px] mb-2" htmlFor="customer-phone">
                  📱 Phone Number (Optional)
                </label>
                <input
                  id="customer-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="012-345 6789"
                  className="w-full border border-[#E5E5E5] rounded-xl px-4 py-3 text-[16px] focus:outline-none focus:border-[#EA580C] min-h-[52px]"
                />
              </div>

              {/* Send button */}
              <button
                onClick={handleSend}
                className="w-full bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-[18px] min-h-[56px] rounded-xl transition-colors"
              >
                Send Order via WhatsApp
              </button>
            </>
          )}
        </div>
      </aside>

      {/* Confirm dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowConfirm(false)} />
          <div className="relative bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-[22px] font-bold mb-2">Ready to send?</h3>
            <p className="text-[16px] text-[#555555] mb-6">
              You are about to open WhatsApp to send your order to SALTed.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 border border-[#E5E5E5] rounded-xl min-h-[52px] text-[16px] font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmSend}
                className="flex-1 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-xl min-h-[52px] text-[16px] font-bold"
              >
                Open WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
