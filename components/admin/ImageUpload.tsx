'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';

interface Props {
  value: string | null;
  onChange: (url: string | null) => void;
}

export default function ImageUpload({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFile(file: File) {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }
    setUploading(true);
    setError('');
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    setUploading(false);
    if (res.ok) {
      const { url } = await res.json();
      onChange(url);
    } else {
      const { error: msg } = await res.json();
      setError(msg || 'Upload failed.');
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div>
      {value ? (
        <div className="relative inline-block">
          <Image
            src={value}
            alt="Menu item"
            width={160}
            height={120}
            className="rounded-xl object-cover border border-[#E5E5E5]"
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
            aria-label="Remove image"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-[#E5E5E5] rounded-xl p-8 flex flex-col items-center gap-3 cursor-pointer hover:border-[#1A1A1A] transition-colors"
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
          aria-label="Upload image"
        >
          <Upload size={28} className="text-[#555555]" />
          <p className="text-[16px] text-[#555555]">
            {uploading ? 'Uploading…' : 'Drag & drop or click to upload'}
          </p>
          <p className="text-sm text-gray-400">JPG, PNG, WebP — max 5 MB</p>
        </div>
      )}
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}
