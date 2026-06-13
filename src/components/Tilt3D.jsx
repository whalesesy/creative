import React from 'react';
import { useMouseTilt } from '../hooks/useMouseTilt';

/**
 * Tilt3D – wraps ANY child in a mouse-tracking 3D holographic card.
 * Drop it around any element: <Tilt3D><YourCard /></Tilt3D>
 *
 * Props:
 *  maxTilt  – max tilt degrees (default 18)
 *  scale    – scale on hover  (default 1.06)
 *  glare    – show glare highlight (default true)
 *  className – extra class names
 *  style     – extra inline styles
 */
export default function Tilt3D({
  children,
  maxTilt = 18,
  scale = 1.06,
  glare = true,
  className = '',
  style = {},
}) {
  const { ref, handleMouseMove, handleMouseLeave } = useMouseTilt(maxTilt, scale);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        position: 'relative',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        ...style,
      }}
    >
      {/* Holographic glare layer */}
      {glare && (
        <div
          className="tilt-glare"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity 0.15s ease',
            zIndex: 99,
            mixBlendMode: 'overlay',
          }}
        />
      )}
      {children}
    </div>
  );
}
