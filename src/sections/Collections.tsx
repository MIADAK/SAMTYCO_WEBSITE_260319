import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { collectionsConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Collections = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  // Real industry images
  const industries = [
    {
      id: 1,
      title: "Robotics Field",
      year: "High Precision Components",
      description: "CNC machining is widely used in the robotics industry to manufacture high-precision structural parts such as robot arms, joints, shafts, frames and sensor components. With high accuracy, strong stability and fast customization, it supports the R&D and production of industrial and collaborative robots, making it an essential manufacturing process.",
      image: "/images/ind-Robotics Field.jpg",
    },
    {
      id: 2,
      title: "Automotive",
      year: "Engine & Transmission Parts",
      description: "Producing precision automotive components such as engine parts, transmission components, brake system parts, and custom fittings. We support both OEM and aftermarket requirements with high-volume production capabilities.",
      image: "/images/ind-automotive.jpg",
    },
    {
      id: 3,
      title: "Industrial Machinery",
      year: "Heavy Equipment Components",
      description: "Manufacturing robust components for industrial machinery, hydraulic systems, and heavy equipment. Our parts are built to withstand demanding operating conditions while maintaining precise tolerances.",
      image: "/images/ind-machinery.jpg",
    },
    {
      id: 4,
      title: "Electronics",
      year: "Precision Connectors & Housings",
      description: "Producing precision components for electronic devices including connectors, housings, heat sinks, and custom enclosures. Our clean manufacturing environment ensures contamination-free parts for sensitive applications.",
      image: "/images/ind-electronics.jpg",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;

    if (!section || !header || !grid) return;

    const headerEls = header.querySelectorAll('.reveal-header');
    headerEls.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 30 });
      const trigger = ScrollTrigger.create({
        trigger: header,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
        },
      });
      triggersRef.current.push(trigger);
    });

    const cards = grid.querySelectorAll<HTMLElement>('.industry-card');
    cards.forEach((card, i) => {
      gsap.set(card, { opacity: 0, y: 50 });
      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(card, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: 'power3.out' });
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
    <section id="collections" ref={sectionRef} className="relative w-full bg-[#f5f5f5] py-24 lg:py-32">
      {/* Section Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 lg:px-16 mb-16">
        <p className="reveal-header text-gray-500 text-sm tracking-wider uppercase mb-4">{collectionsConfig.label}</p>
        <h2 className="reveal-header text-gray-900 text-4xl md:text-5xl lg:text-6xl font-bold">{collectionsConfig.headline}</h2>
      </div>

      {/* Industries Grid */}
      <div ref={gridRef} className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {industries.map((item) => (
            <div key={item.id} className="industry-card group relative overflow-hidden rounded-lg bg-white shadow-sm">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8">
                  <p className="text-white/60 text-sm mb-2">{item.year}</p>
                  <h3 className="text-white text-2xl lg:text-3xl font-bold mb-3">{item.title}</h3>
                  <p className="text-white/70 text-sm max-w-md">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 mt-16">
        <div className="bg-[#1a1a1a] rounded-lg p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-2xl font-bold mb-2">Need Custom CNC Parts?</h3>
            <p className="text-white/60">Contact us for a free quote. We support custom designs and prototypes.</p>
          </div>
          <a href="#contact" className="px-8 py-4 bg-white text-black rounded font-medium hover:bg-white/90 transition-colors whitespace-nowrap">
            Get Free Quote
          </a>
        </div>
      </div>
    </section>
  );
};

export default Collections;
