'use client';
import React, { useRef } from 'react';

type Props = {
  imageSrc: string;
  alt: string;
  onActivate: () => void;
  style?: React.CSSProperties;
};

export default function DeskObject({ imageSrc, alt, onActivate, style }: Props) {
  const ref = useRef<HTMLImageElement | null>(null);

  const handleClick = () => {
    if (ref.current) {
      ref.current.classList.add('abc-peel-out');
      // Let the animation run, then activate
      setTimeout(() => {
        onActivate();
      }, 220);
    } else {
      onActivate();
    }
  };

  return (
    <img
      ref={ref}
      src={imageSrc}
      alt={alt}
      className="abc-desk-object"
      onClick={handleClick}
      style={style}
      draggable={false}
    />
  );
}
