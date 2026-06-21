'use client';

import { useState } from 'react';
import { format, addDays, isBefore, startOfDay, getDay } from 'date-fns';
import { BUSINESS_HOURS } from '@/lib/constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

function getStartOfToday() {
  return startOfDay(new Date());
}

function isDateBlocked(date: Date) {
  const today = getStartOfToday();
  if (isBefore(date, today)) return true;
  if (BUSINESS_HOURS.closedDays.includes(getDay(date))) return true;
  return false;
}

export default function PickupDatePicker({ value, onChange }: Props) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = getStartOfToday();
  const maxDate = addDays(today, 30);

  const days: (Date | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  function prevMonth() {
    setViewDate(new Date(year, month - 1, 1));
  }

  function nextMonth() {
    setViewDate(new Date(year, month + 1, 1));
  }

  function selectDate(date: Date) {
    if (isDateBlocked(date) || date > maxDate) return;
    onChange(date);
    setShowCalendar(false);
  }

  const displayValue = value ? format(value, 'EEEE, d MMM yyyy') : 'Choose Date';

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShowCalendar(!showCalendar)}
        className="w-full flex items-center justify-between border border-[#E5E5E5] rounded-xl px-4 py-3 text-[16px] min-h-[52px] hover:border-[#EA580C] focus:outline-none focus:border-[#EA580C] bg-white"
        aria-haspopup="true"
        aria-expanded={showCalendar}
      >
        <span className={value ? 'text-[#111111]' : 'text-[#555555]'}>{displayValue}</span>
        <span className="text-[#555555]">📅</span>
      </button>

      {showCalendar && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-[#E5E5E5] rounded-2xl shadow-lg z-50 p-4">
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={prevMonth}
              className="p-2 rounded-lg hover:bg-gray-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Previous month"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="font-semibold text-[16px]">
              {format(viewDate, 'MMMM yyyy')}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="p-2 rounded-lg hover:bg-gray-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Next month"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
              <div key={d} className="text-center text-xs text-[#555555] font-medium py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, idx) => {
              if (!date) return <div key={`empty-${idx}`} />;
              const blocked = isDateBlocked(date) || date > maxDate;
              const selected = value ? format(date, 'yyyy-MM-dd') === format(value, 'yyyy-MM-dd') : false;
              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  onClick={() => selectDate(date)}
                  disabled={blocked}
                  className={`h-9 w-full rounded-lg text-sm font-medium transition-colors
                    ${selected ? 'bg-[#EA580C] text-white' : ''}
                    ${!blocked && !selected ? 'hover:bg-orange-50 hover:text-[#EA580C]' : ''}
                    ${blocked ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                  aria-label={format(date, 'EEEE, d MMMM yyyy')}
                  aria-pressed={selected}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-[#555555] mt-3 text-center">
            Closed Mondays · Bookings up to 30 days ahead
          </p>
        </div>
      )}
    </div>
  );
}
