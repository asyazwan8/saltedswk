import BookingForm from '@/components/public/booking/BookingForm';

export default function BookingPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-[28px] font-extrabold mb-2">Book a Table</h1>
      <p className="text-[16px] text-[#555555] mb-8">
        Reserve your seats at SALTed. We&apos;ll confirm via WhatsApp.
      </p>
      <BookingForm />
    </div>
  );
}
