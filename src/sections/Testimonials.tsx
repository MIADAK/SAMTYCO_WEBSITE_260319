import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ChevronLeft, ChevronRight, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Samtyco has been our trusted CNC machining partner for over 5 years. Their attention to detail, on-time delivery, and competitive pricing have made them an invaluable supplier for our precision component needs.",
    authorName: "Michael Chen",
    authorTitle: "Procurement Manager, TechAuto Industries",
  },
  {
    quote: "The quality of CNC parts from Samtyco is exceptional. Their ISO certification gives us confidence, and their engineering team always provides valuable input on design optimization.",
    authorName: "Sarah Johnson",
    authorTitle: "Engineering Director, AeroTech Solutions",
  },
  {
    quote: "We've worked with many CNC suppliers, but Samtyco stands out for their reliability and communication. They consistently meet our tight deadlines without compromising quality.",
    authorName: "David Wang",
    authorTitle: "Operations Manager, Global Machinery Co.",
  },
  {
    quote: "From prototype to mass production, Samtyco has supported our growth. Their 50+ CNC machines mean they can handle our increasing order volumes with ease.",
    authorName: "Emily Rodriguez",
    authorTitle: "Supply Chain Lead, ElectroMax Corp",
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    gsap.set(content, { opacity: 0, y: 30 });
    const trigger = ScrollTrigger.create({
      trigger: content,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(content, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
      },
    });

    return () => { trigger.kill(); };
  }, []);

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section ref={sectionRef} className="relative w-full bg-[#1a1a1a] py-24 lg:py-32">
      <div ref={contentRef} className="max-w-4xl mx-auto px-8 lg:px-16">
        {/* Quote Icon */}
        <div className="flex justify-center mb-10">
          <Quote className="w-12 h-12 text-white/20" strokeWidth={1} />
        </div>

        {/* Testimonial Content */}
        <div className="text-center min-h-[280px] flex flex-col items-center justify-center">
          <blockquote className="text-white text-xl md:text-2xl lg:text-3xl leading-relaxed mb-10 transition-opacity duration-500">
            "{currentTestimonial.quote}"
          </blockquote>

          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
              <User className="w-7 h-7 text-white/50" />
            </div>
            <div>
              <p className="text-white font-semibold text-lg">{currentTestimonial.authorName}</p>
              <p className="text-white/50 text-sm">{currentTestimonial.authorTitle}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button 
            onClick={goToPrev}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(i);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-white w-6' : 'bg-white/30'}`}
              />
            ))}
          </div>

          <button 
            onClick={goToNext}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
