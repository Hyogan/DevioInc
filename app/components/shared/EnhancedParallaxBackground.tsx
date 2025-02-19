'use client'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const EnhancedParallaxBackground = () => {
  const containerRef = useRef(null);
  const layer1Ref = useRef(null);
  const layer2Ref = useRef(null);
  const layer3Ref = useRef(null);

  useEffect(() => {
    // Layer 1 - Moves slowly
    gsap.to(layer1Ref.current, {
      y: '10%',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });

    // Layer 2 - Moves faster
    gsap.to(layer2Ref.current, {
      y: '25%',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 2
      }
    });

    // Layer 3 - Moves fastest
    gsap.to(layer3Ref.current, {
      y: '40%',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 3
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      {/* Background Layer 1 - Far */}
      <div 
        ref={layer1Ref}
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 50%, var(--gradient-start), transparent 70%)',
        }}
      />
      
      {/* Background Layer 2 - Middle */}
      <div 
        ref={layer2Ref}
        className="absolute inset-0 opacity-15"
        style={{
          background: 'radial-gradient(circle at 30% 70%, var(--gradient-end), transparent 60%)',
        }}
      />
      
      {/* Background Layer 3 - Close */}
      <div 
        ref={layer3Ref}
        className="absolute inset-0 opacity-10"
        style={{
          background: 'radial-gradient(circle at 70% 30%, var(--accent-color), transparent 50%)',
        }}
      />
    </div>
  );
}; 