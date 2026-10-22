import React, { useRef, useState } from 'react';

interface Interactive3DCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  maxTilt?: number;
  glare?: boolean;
  onClick?: () => void;
  dataCursorLabel?: string;
}

export const Interactive3DCard: React.FC<Interactive3DCardProps> = ({
  children,
  className = '',
  depth = 40,
  maxTilt = 14,
  glare = true,
  onClick,
  dataCursorLabel,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [glarePos, setGlarePos] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * maxTilt;
    const rotY = ((x - centerX) / centerX) * maxTilt;

    setRotateX(rotX);
    setRotateY(rotY);

    if (glare) {
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.28,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor-label={dataCursorLabel}
      className={`perspective-1000 transform-gpu transition-transform duration-200 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
          isHovered ? `scale3d(1.025, 1.025, 1.025)` : 'scale3d(1, 1, 1)'
        }`,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      <div
        className="w-full h-full relative rounded-[inherit]"
        style={{
          transform: `translateZ(${isHovered ? depth : 0}px)`,
          transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
          transformStyle: 'preserve-3d',
        }}
      >
        {children}

        {/* Specular 3D glare overlay */}
        {glare && (
          <div
            className="absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 overflow-hidden mix-blend-overlay"
            style={{
              opacity: glarePos.opacity,
              background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.9), transparent 80%)`,
            }}
          />
        )}
      </div>
    </div>
  );
};
