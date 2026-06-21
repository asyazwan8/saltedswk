export default function HalalBadge({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-1' : size === 'lg' ? 'text-base px-4 py-2' : 'text-sm px-3 py-1.5';
  return (
    <span className={`inline-flex items-center gap-1.5 bg-green-50 text-green-800 border border-green-200 rounded-full font-semibold ${sizeClass}`}>
      <span className="inline-flex items-center justify-center w-4 h-4 bg-green-600 text-white rounded-full text-[10px] font-bold">✓</span>
      Muslim-Owned · Halal
    </span>
  );
}
