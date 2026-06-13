import { useRef, useCallback } from 'react';

/**
 * useMouseTilt – returns a ref to attach to an element + motion style values
 * for real-time mouse-tracking 3D tilt (like a holographic card).
 *
 * @param {number} maxTilt  – degrees of max tilt (default 18)
 * @param {number} scale    – scale on hover (default 1.05)
 */
export function useMouseTilt(maxTilt = 18, scale = 1.05) {
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width  / 2);   // -1 … +1
    const dy = (e.clientY - cy) / (rect.height / 2);   // -1 … +1
    const rotY =  dx * maxTilt;
    const rotX = -dy * maxTilt;

    el.style.transform =
      `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale}) translateZ(20px)`;
    el.style.transition = 'transform 0.08s ease-out';

    // Glare highlight
    const glare = el.querySelector('.tilt-glare');
    if (glare) {
      const pctX = ((dx + 1) / 2) * 100;
      const pctY = ((dy + 1) / 2) * 100;
      glare.style.background =
        `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255,255,255,0.28) 0%, transparent 65%)`;
      glare.style.opacity = '1';
    }
  }, [maxTilt, scale]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0)';
    el.style.transition = 'transform 0.5s cubic-bezier(0.175,0.885,0.32,1.275)';
    const glare = el.querySelector('.tilt-glare');
    if (glare) glare.style.opacity = '0';
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}
