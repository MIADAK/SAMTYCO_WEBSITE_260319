import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { exhibitionsConfig } from '../config';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Exhibitions = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!exhibitionsConfig.headline && exhibitionsConfig.exhibitions.length === 0) return null;

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

    // Header reveal
    const headerEls = header.querySelectorAll('.reveal-header');
    headerEls.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 40 });
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
        },
      });
      triggersRef.current.push(trigger);
    });

    // Card reveal with stagger
    const cards = grid.querySelectorAll<HTMLElement>('.exhibit-card');
    cards.forEach((card, i) => {
      gsap.set(card, { opacity: 0, y: 60 });
      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(card, { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            delay: i * 0.15,
            ease: 'power3.out' 
          });
        },
      });
      triggersRef.current.push(trigger);
    });

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  return (
    <section
      id="exhibitions"
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-24 lg:py-32 px-6 lg:px-16"
    >
      {/* Section Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="reveal-header text-blue-400 text-sm font-medium tracking-wider uppercase mb-4">
              {exhibitionsConfig.label}
            </p>
            <h2 className="reveal-header text-white text-4xl md:text-5xl lg:text-6xl font-bold">
              {exhibitionsConfig.headline}
            </h2>
          </div>
          <p className="reveal-header text-white/50 text-lg max-w-md">
            High-precision CNC machining services for various industries. From prototypes to mass production.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div ref={gridRef} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {exhibitionsConfig.exhibitions.map((exhibit) => (
          <div
            key={exhibit.id}
            className="exhibit-card group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-500"
            data-cursor="hover"
          >
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={exhibit.image}
                alt={exhibit.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-blue-400 text-sm font-medium mb-2">{exhibit.date}</p>
                  <h3 className="text-white text-2xl lg:text-3xl font-bold mb-2">
                    {exhibit.title}
                  </h3>
                  <p className="text-white/50 text-sm max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to explore our {exhibit.title.toLowerCase()} capabilities and product range.
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-[#050505] transition-all duration-300">
                  <ArrowRight className="w-5 h-5 text-white group-hover:text-[#050505] transition-colors" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto mt-12 text-center">
        <a
          href="#contact"
          data-cursor="hover"
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#050505] rounded-full font-semibold hover:bg-white/90 transition-colors"
        >
          {exhibitionsConfig.ctaText}
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};

export default Exhibitions;
