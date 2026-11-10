"use client";

import { useEffect, useState } from "react";

type Slide = { src: string; alt: string };

export default function HeroSlideshow({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const goTo = (index: number) => setActive((index + slides.length) % slides.length);

  return (
    <div className="hero-image-wrap" aria-label="Gilgil Hills Academy photo slideshow">
      {slides.map((slide, index) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={index === active ? slide.alt : ""}
          aria-hidden={index !== active}
          className={`hero-image hero-slide ${index === active ? "is-active" : ""}`}
          fetchPriority={index === 0 ? "high" : "auto"}
        />
      ))}
      <div className="hero-image-shade"></div>
      <div className="hero-slideshow-controls" aria-label="Slideshow controls">
        <button type="button" onClick={() => goTo(active - 1)} aria-label="Previous school photo">‹</button>
        <div className="hero-slide-dots">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              className={index === active ? "active" : ""}
              onClick={() => goTo(index)}
              aria-label={`Show school photo ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
            />
          ))}
        </div>
        <button type="button" onClick={() => goTo(active + 1)} aria-label="Next school photo">›</button>
      </div>
    </div>
  );
}
