import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  if (!aboutConfig.headline) return null;

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const gallery = galleryRef.current;
    const stats = statsRef.current;

    if (!section || !text || !gallery || !stats) return;

    const textElements = text.querySelectorAll('.reveal-text');
    textElements.forEach((el) => {
      gsap.set(el, { opacity: 0, y: 50 });
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
        },
      });
      triggersRef.current.push(trigger);
    });

    const columns = gallery.querySelectorAll<HTMLElement>('.gallery-col');
    columns.forEach((col) => {
      const speed = parseFloat(col.dataset.speed || '0');
      const trigger = ScrollTrigger.create({
        trigger: gallery,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
        onUpdate: (self) => {
          gsap.set(col, { y: self.progress * speed });
        },
      });
      triggersRef.current.push(trigger);
    });

    const imgWraps = gallery.querySelectorAll<HTMLElement>('.gallery-img-wrap');
    imgWraps.forEach((wrap) => {
      const offset = parseFloat(wrap.dataset.offset || '0');
      gsap.set(wrap, { opacity: 0.4, y: offset });
      const trigger = ScrollTrigger.create({
        trigger: wrap,
        start: 'top 92%',
        end: 'top 40%',
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(wrap, {
            opacity: 0.4 + progress * 0.6,
            y: offset * (1 - progress),
          });
        },
      });
      triggersRef.current.push(trigger);
    });

    const statItems = stats.querySelectorAll('.stat-item');
    statItems.forEach((el, i) => {
      gsap.set(el, { opacity: 0, y: 40 });
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.8, delay: i * 0.1, ease: 'power3.out' });
        },
      });
      triggersRef.current.push(trigger);
    });

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  const col1Images = aboutConfig.galleryImages.filter((_, i) => i % 3 === 0);
  const col2Images = aboutConfig.galleryImages.filter((_, i) => i % 3 === 1);
  const col3Images = aboutConfig.galleryImages.filter((_, i) => i % 3 === 2);

  return (
    <section id="about" ref={sectionRef} className="relative w-full bg-[#050505]">
      {/* Section Header */}
      <div ref={textRef} className="max-w-6xl mx-auto pt-32 pb-20 px-8 lg:px-16">
        <p className="reveal-text text-white/50 mb-4 text-sm tracking-wider">{aboutConfig.label}</p>
        <h2 className="reveal-text text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{aboutConfig.headline}</h2>
        <p className="reveal-text text-white/60 text-lg max-w-2xl">{aboutConfig.description}</p>
      </div>

      {/* Gallery */}
      <div className="overflow-hidden">
        <div ref={galleryRef} className="relative max-w-7xl mx-auto px-4 lg:px-8 pb-16">
          <div className="grid grid-cols-3 gap-4 lg:gap-5">
            <div className="gallery-col space-y-4 lg:space-y-5" data-speed="-80">
              {col1Images.map((img, i) => (
                <div key={i} className="gallery-img-wrap overflow-hidden" data-offset={i === 0 ? "60" : "120"}>
                  <img src={img.src} alt={img.alt} className="w-full h-auto object-cover rounded" style={{ aspectRatio: i === 0 ? '3/4' : '4/5' }} />
                  <p className="text-white/30 mt-2 text-xs">{img.label}</p>
                </div>
              ))}
            </div>
            <div className="gallery-col space-y-4 lg:space-y-5 pt-20 lg:pt-32" data-speed="100">
              {col2Images.map((img, i) => (
                <div key={i} className="gallery-img-wrap overflow-hidden" data-offset={i === 0 ? "80" : "160"}>
                  <img src={img.src} alt={img.alt} className="w-full h-auto object-cover rounded" style={{ aspectRatio: '3/4' }} />
                  <p className="text-white/30 mt-2 text-xs">{img.label}</p>
                </div>
              ))}
            </div>
            <div className="gallery-col space-y-4 lg:space-y-5" data-speed="-120">
              {col3Images.map((img, i) => (
                <div key={i} className="gallery-img-wrap overflow-hidden" data-offset={i === 0 ? "40" : "140"}>
                  <img src={img.src} alt={img.alt} className="w-full h-auto object-cover rounded" style={{ aspectRatio: i === 0 ? '4/5' : '3/4' }} />
                  <p className="text-white/30 mt-2 text-xs">{img.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Certifications - Official Logos */}
      <div className="max-w-7xl mx-auto px-8 lg:px-16 pb-12">
        <p className="text-white/40 text-sm mb-6">Our Certifications</p>
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex flex-col items-center">
            <img src="/images/cert-iso.png" alt="ISO 9001:2015" className="h-16 w-auto object-contain" />
            <span className="text-white/60 text-xs mt-2">ISO 9001:2015</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/images/cert-ce.png" alt="CE Marking" className="h-12 w-auto object-contain" />
            <span className="text-white/60 text-xs mt-2">CE Marking</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/images/cert-ccc.png" alt="CCC" className="h-14 w-auto object-contain" />
            <span className="text-white/60 text-xs mt-2">CCC</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/images/cert-rohs.jpg" alt="RoHS" className="h-14 w-auto object-contain" />
            <span className="text-white/60 text-xs mt-2">RoHS</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/images/cert-sgs.png" alt="SGS" className="h-10 w-auto object-contain" />
            <span className="text-white/60 text-xs mt-2">SGS</span>
          </div>
        </div>
      </div>

      {/* Bottom Section with Image and Text */}
      {aboutConfig.bottomText && (
        <div className="max-w-7xl mx-auto px-8 lg:px-16 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="rounded-lg overflow-hidden">
              <img src="/images/factory-building.jpg" alt="Samtyco Factory" className="w-full h-auto" />
            </div>
            <div>
              <p className="text-white/50 text-base lg:text-lg leading-relaxed">{aboutConfig.bottomText}</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats - Bottom Section */}
      <div ref={statsRef} className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 py-16 bg-[#050505]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
          {aboutConfig.stats.map((stat, i) => (
            <div key={i} className="stat-item text-center">
              <p className="text-white text-4xl md:text-5xl font-bold mb-1">{stat.value}</p>
              <p className="text-white/40 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
