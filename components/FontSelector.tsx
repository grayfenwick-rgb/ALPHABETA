'use client';
import React from 'react';

const FONTS = [
  { name: "Roboto", file: "/fonts/Roboto-Bold.ttf" },
  { name: "Lato", file: "/fonts/Lato-Bold.ttf" },
  { name: "Montserrat", file: "/fonts/Montserrat-Bold.ttf" }
];

export default function FontSelector({
  value,
  onChange,
}: {
  value: string,
  onChange: (font: string) => void
}) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      {FONTS.map(f => (
        <option key={f.file} value={f.file}>{f.name}</option>
      ))}
    </select>
  );
}
