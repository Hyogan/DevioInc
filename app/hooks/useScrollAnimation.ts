'use client'
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = () => {
  useEffect(() => {
    // Fade up animations
    const fadeUpElements = document.querySelectorAll('.fade-up');
    fadeUpElements.forEach((element, index) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out'
      });
    });

    // Gradient cards animation
    const cards = document.querySelectorAll('.gradient-card');
    cards.forEach((card) => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top center',
          scrub: 1
        },
        backgroundPosition: '200% center',
        ease: 'none'
      });
    });

    // Parallax effect
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach((element) => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        y: '20%',
        ease: 'none'
      });
    });
  }, []);
}; 