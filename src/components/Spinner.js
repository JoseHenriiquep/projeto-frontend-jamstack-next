'use client';

import { MoonLoader } from 'react-spinners';

export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-full">
      <MoonLoader size={20} />
    </div>
  );
}