import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Calendar, Mail, Phone, Send } from 'lucide-react';
import { visitConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  MapPin,
  Clock,
  Calendar,
  Mail,
  Phone,
};

const Visit = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!visitConfig.headline && visitConfig.infoCards.length === 0) return null;

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    const form = formRef.current;

    if (!section || !cards) return;

    const cardElements = cards.querySelectorAll('.info-card');
    cardElements.forEach((card, i) => {
      gsap.set(card, { opacity: 0, y: 40 });
      const trigger = ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.15,
            ease: 'power3.out',
          });
        },
      });
      triggersRef.current.push(trigger);
    });

    // Form reveal
    if (form) {
      gsap.set(form, { opacity: 0, y: 40 });
      const formTrigger = ScrollTrigger.create({
        trigger: form,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(form, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          });
        },
      });
      triggersRef.current.push(formTrigger);
    }

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create mailto link with form data
    const subject = `Inquiry from ${formData.name} - ${formData.company}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`;
    window.location.href = `mailto:david@samtyco.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-32 px-8 lg:px-16"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <p className="museo-label text-white/50 mb-4">{visitConfig.label}</p>
        <h2
          className="museo-headline text-white text-4xl md:text-5xl lg:text-6xl mb-8"
          dangerouslySetInnerHTML={{ __html: visitConfig.headline }}
        />
        <p className="museo-body text-white/60 text-lg max-w-2xl">
          {visitConfig.description}
        </p>
      </div>

      {/* Info Cards Grid */}
      <div
        ref={cardsRef}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
      >
        {visitConfig.infoCards.map((card, i) => {
          const IconComponent = iconMap[card.icon];
          return (
            <div key={i} className="info-card p-8 border border-white/10 hover:border-white/20 transition-colors">
              {IconComponent && <IconComponent className="w-8 h-8 text-white/50 mb-6" strokeWidth={1.5} />}
              <h3 className="museo-headline text-white text-xl mb-3">{card.title}</h3>
              <div
                className="museo-body text-white/60 text-sm"
                dangerouslySetInnerHTML={{ __html: card.content }}
              />
            </div>
          );
        })}
      </div>

      {/* Map and Form Section */}
      <div ref={formRef} className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="border border-white/10 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3475.1234567890123!2d118.12345678901234!3d24.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDA3JzI0LjQiTiAxMTjCsDA3JzI0LjQiRQ!5e0!3m2!1sen!2scn!4v1234567890123!5m2!1sen!2scn"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Xiamen Samtyco Location"
            />
          </div>

          {/* Contact Form */}
          <div className="border border-white/10 p-8">
            <h3 className="museo-headline text-white text-2xl mb-6">Send Inquiry</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="museo-label text-white/50 text-xs mb-2 block">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-white/20 px-4 py-3 text-white museo-body text-sm focus:border-white/50 focus:outline-none transition-colors"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="museo-label text-white/50 text-xs mb-2 block">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-white/20 px-4 py-3 text-white museo-body text-sm focus:border-white/50 focus:outline-none transition-colors"
                    placeholder="john@company.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="museo-label text-white/50 text-xs mb-2 block">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-white/20 px-4 py-3 text-white museo-body text-sm focus:border-white/50 focus:outline-none transition-colors"
                    placeholder="+1 234 567 890"
                  />
                </div>
                <div>
                  <label className="museo-label text-white/50 text-xs mb-2 block">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-white/20 px-4 py-3 text-white museo-body text-sm focus:border-white/50 focus:outline-none transition-colors"
                    placeholder="Your Company Ltd."
                  />
                </div>
              </div>
              <div>
                <label className="museo-label text-white/50 text-xs mb-2 block">Message *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-transparent border border-white/20 px-4 py-3 text-white museo-body text-sm focus:border-white/50 focus:outline-none transition-colors resize-none"
                  placeholder="Please describe your CNC machining requirements..."
                />
              </div>
              <button
                type="submit"
                data-cursor="hover"
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#050505] museo-label hover:bg-white/90 transition-colors"
              >
                {submitted ? 'Message Sent!' : 'Send Inquiry'}
                <Send className="w-4 h-4" />
              </button>
              <p className="museo-body text-white/40 text-xs text-center">
                Your inquiry will be sent to: david@samtyco.com
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Visit;
