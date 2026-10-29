import React from 'react';
import clsx from 'clsx';
import Marker from './Marker.jsx';

export default function Button({
  children,
  href,
  onClick,
  className = '',
  markerFill,
  variant = 'primary', // 'primary' | 'secondary' | 'outline'
  showMarker = false,
  disabled = false,
  target,
  rel,
  ...props
}) {
  const isLink = Boolean(href);
  const Component = isLink ? 'a' : 'button';

  const baseStyles =
    'relative inline-flex items-center justify-center gap-3 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 select-none group rounded-sm';

  const variants = {
    primary:
      'bg-text-primary text-s1 hover:bg-p2 hover:text-s1 border border-transparent shadow-sm',
    secondary:
      'bg-s2 text-text-primary border border-s4 hover:border-p1/60 hover:bg-s3',
    outline:
      'bg-transparent text-text-primary border border-s4 hover:border-p1 hover:text-p1',
  };

  const resolvedMarkerFill =
    markerFill || (variant === 'primary' ? 'var(--bg-base)' : 'var(--accent-primary)');

  return (
    <Component
      href={href}
      onClick={onClick}
      disabled={!isLink && disabled}
      target={target}
      rel={rel}
      className={clsx(
        baseStyles,
        variants[variant] || variants.primary,
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
      {...props}
    >
      {showMarker && (
        <span className="transition-transform duration-300 group-hover:scale-125">
          <Marker markerFill={resolvedMarkerFill} />
        </span>
      )}
      <span className="relative z-10 font-sans tracking-[0.14em]">{children}</span>
    </Component>
  );
}

