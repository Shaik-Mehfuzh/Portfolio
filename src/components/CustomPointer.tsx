import React, { useEffect, useRef, useState } from 'react';

export const CustomPointer: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const [cursorText, setCursorText] = useState<string>('');
  const [isHoveringInteractive, setIsHoveringInteractive] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Check if device is coarse pointer (touch)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Instant central dot position
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      // Check hovered element for context labels
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(
        '[data-cursor], [data-cursor-label], a, button, input, [role="button"]'
      ) as HTMLElement | null;

      if (interactiveEl) {
        setIsHoveringInteractive(true);
        const explicitLabel =
          interactiveEl.getAttribute('data-cursor-label') ||
          interactiveEl.getAttribute('data-cursor');

        if (explicitLabel) {
          setCursorText(explicitLabel);
        } else if (interactiveEl.closest('#projects')) {
          setCursorText('EXPLORE');
        } else if (interactiveEl.closest('a[href*="github.com"]')) {
          setCursorText('VIEW SOURCE');
        } else if (interactiveEl.closest('input[type="range"]') || interactiveEl.closest('.interactive-workbench')) {
          setCursorText('INTERACT');
        } else {
          setCursorText('');
        }

        // Magnetic attraction if element requested data-magnetic
        if (interactiveEl.hasAttribute('data-magnetic')) {
          const rect = interactiveEl.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = (mouseX - centerX) * 0.22;
          const deltaY = (mouseY - centerY) * 0.22;
          interactiveEl.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
        }
      } else {
        setIsHoveringInteractive(false);
        setCursorText('');
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseOverReset = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && !target.closest('[data-magnetic]')) {
        document.querySelectorAll('[data-magnetic]').forEach((el) => {
          (el as HTMLElement).style.transform = 'translate3d(0, 0, 0)';
        });
      }
    };

    // Smooth inertia render loop for the outer ring & label
    const loop = () => {
      // Lerp ring towards mouse position (0.16 damping factor for responsive yet fluid glide)
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseover', onMouseOverReset, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseover', onMouseOverReset);
      document.querySelectorAll('[data-magnetic]').forEach((el) => {
        (el as HTMLElement).style.transform = 'translate3d(0, 0, 0)';
      });
    };
  }, [isVisible]);

  return (
    <div
      className="custom-pointer-layer fixed inset-0 pointer-events-none z-[100] transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* 1. Central precise dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#60a5fa] pointer-events-none transition-transform duration-75 ease-out"
        style={{ willChange: 'transform' }}
      />

      {/* 2. Fluid inertia ring with electric blue glow & dynamic size */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none transition-all duration-200 ease-out flex items-center justify-center ${
          cursorText
            ? 'w-24 h-24 bg-blue-600/15 border border-blue-400/60 shadow-[0_0_25px_rgba(59,130,246,0.35)] backdrop-blur-[2px]'
            : isHoveringInteractive
            ? 'w-12 h-12 bg-white/10 border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.2)]'
            : 'w-8 h-8 border border-white/30 shadow-[0_0_10px_rgba(96,165,250,0.2)]'
        }`}
        style={{ willChange: 'transform' }}
      >
        {/* Context Label inside ring */}
        {cursorText && (
          <span
            ref={labelRef}
            className="text-[9px] font-mono tracking-widest font-semibold text-blue-200 uppercase px-1 text-center select-none"
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
