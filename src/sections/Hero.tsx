import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ChevronDown, Menu, X, Mail } from 'lucide-react';
import { heroConfig } from '../config';

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!heroConfig.brandLeft && !heroConfig.brandRight) return null;

  useEffect(() => {
    const content = contentRef.current;
    const nav = navRef.current;

    if (!content || !nav) return;

    gsap.set(content.children, { opacity: 0, y: 40 });
    gsap.set(nav, { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 });
    tl.to(nav, { opacity: 1, duration: 0.6 })
      .to(content.children, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, '-=0.3');

    return () => { tl.kill(); };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full bg-[#0a0a0a]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/images/factory-workshop.jpg" 
          alt="CNC Workshop" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/50" />
      </div>

      {/* Navigation */}
      <nav ref={navRef} className="absolute top-0 left-0 w-full z-50 px-6 lg:px-16 py-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <a href="#hero-section" className="text-white font-semibold text-xl tracking-wider">SAMTYCO</a>
          
          <div className="hidden lg:flex items-center gap-8">
            {heroConfig.navLinks.map((link, i) => (
              <div key={i} className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.children ? (
                  <>
                    <button className="flex items-center gap-1 text-white/70 hover:text-white transition-colors text-sm">
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`absolute top-full left-0 mt-2 w-44 bg-white rounded shadow-xl overflow-hidden transition-all ${activeDropdown === link.label ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                      <a href="/cnc-turning.html" className="block px-4 py-3 text-gray-800 hover:bg-gray-100 text-sm border-b border-gray-100">CNC Turning</a>
                      <a href="/cnc-milling.html" className="block px-4 py-3 text-gray-800 hover:bg-gray-100 text-sm border-b border-gray-100">CNC Milling</a>
                      <a href="/precision-parts.html" className="block px-4 py-3 text-gray-800 hover:bg-gray-100 text-sm">Precision Parts</a>
                    </div>
                  </>
                ) : (
                  <a href={link.href} className="text-white/70 hover:text-white transition-colors text-sm">{link.label}</a>
                )}
              </div>
            ))}
          </div>

          <a href="#contact" className="hidden lg:block px-6 py-2.5 bg-white text-black rounded text-sm font-medium hover:bg-white/90 transition-colors">
            Get Quote
          </a>

          <button className="lg:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-[#0a0a0a]/95 backdrop-blur border-t border-white/10">
            <div className="px-6 py-4 space-y-3">
              <a href="#hero-section" className="block py-2 text-white/70 text-sm" onClick={() => setMobileMenuOpen(false)}>HOME</a>
              <a href="#about" className="block py-2 text-white/70 text-sm" onClick={() => setMobileMenuOpen(false)}>ABOUT</a>
              <div className="space-y-2">
                <span className="block text-white/50 text-sm py-2">PRODUCT</span>
                <div className="pl-4 space-y-2">
                  <a href="/cnc-turning.html" className="block py-2 text-white/70 text-sm" onClick={() => setMobileMenuOpen(false)}>CNC Turning</a>
                  <a href="/cnc-milling.html" className="block py-2 text-white/70 text-sm" onClick={() => setMobileMenuOpen(false)}>CNC Milling</a>
                  <a href="/precision-parts.html" className="block py-2 text-white/70 text-sm" onClick={() => setMobileMenuOpen(false)}>Precision Parts</a>
                </div>
              </div>
              <a href="#contact" className="block py-2 text-white/70 text-sm" onClick={() => setMobileMenuOpen(false)}>CONTACT</a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex items-center min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 w-full">
          <div ref={contentRef} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-white/70 text-sm">ISO 9001:2015 Certified</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Precision CNC
              <span className="block text-white/90">Machining Solutions</span>
            </h1>

            <p className="text-white/60 text-lg mb-8 max-w-lg">
              17+ years of experience in precision CNC manufacturing. Serving 350+ global clients with 50+ CNC machines.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <a href="#exhibitions" className="px-8 py-3.5 bg-white text-black rounded font-medium hover:bg-white/90 transition-colors">
                View Products
              </a>
              <a href="#contact" className="px-8 py-3.5 border border-white/30 text-white rounded font-medium hover:bg-white/10 transition-colors">
                Contact Us
              </a>
            </div>

            <a 
              href="mailto:david@samtyco.com" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm"
            >
              <Mail className="w-4 h-4" />
              david@samtyco.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
