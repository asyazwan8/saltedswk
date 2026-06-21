'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Props {
  size?: number;
  className?: string;
}

export default function Logo({ size = 40, className = '' }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full bg-[#CC0000] text-white font-extrabold shadow-md ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.32 }}
        aria-label="SALTed logo"
      >
        ST
      </span>
    );
  }

  return (
    <Image
      src="/brand/logo.png"
      alt="SALTed logo"
      width={size}
      height={size}
      className={`rounded-full object-cover ${className}`}
      priority
      onError={() => setFailed(true)}
    />
  );
}
