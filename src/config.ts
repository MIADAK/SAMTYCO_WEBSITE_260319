// Site configuration

export interface SiteConfig {
  language: string;
  title: string;
  description: string;
}

export interface NavLinkWithChildren {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface HeroConfig {
  brandLeft: string;
  brandRight: string;
  tagline: string;
  badge: string;
  since: string;
  email: string;
  heroImage: string;
  heroImageAlt: string;
  scrollText: string;
  copyrightText: string;
  navLinks: NavLinkWithChildren[];
  socialLinks: SocialLink[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  label: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface AboutConfig {
  label: string;
  headline: string;
  description: string;
  bottomText: string;
  galleryImages: GalleryImage[];
  stats: StatItem[];
}

export interface Exhibition {
  id: number;
  title: string;
  image: string;
  date: string;
}

export interface ExhibitionsConfig {
  label: string;
  headline: string;
  ctaText: string;
  exhibitions: Exhibition[];
}

export interface Collection {
  id: number;
  title: string;
  year: string;
  description: string;
  image: string;
}

export interface CollectionsConfig {
  label: string;
  headline: string;
  ctaText: string;
  collections: Collection[];
}

export interface TestimonialsConfig {
  quote: string;
  authorName: string;
  authorTitle: string;
  authorImage: string;
}

export interface InfoCard {
  icon: string;
  title: string;
  content: string;
}

export interface VisitConfig {
  label: string;
  headline: string;
  description: string;
  ctaText: string;
  infoCards: InfoCard[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterConfig {
  marqueeText: string;
  brandName: string;
  brandDescription: string;
  socialLinks: SocialLink[];
  quickLinks: FooterLink[];
  quickLinksTitle: string;
  contactTitle: string;
  contactItems: string[];
  bottomLinks: FooterLink[];
}

export const siteConfig: SiteConfig = {
  language: "en",
  title: "Xiamen Samtyco Industry & Trade Co.,Ltd - Precision CNC Machining",
  description: "Leading manufacturer of precision CNC machined parts with 17+ years experience. CNC Turning, CNC Milling, and Precision Parts for automotive, Robotics Field, electronics, and industrial sectors.",
};

export const heroConfig: HeroConfig = {
  brandLeft: "SAMTYCO",
  brandRight: "CNC",
  tagline: "Precision CNC Machining Solutions for Global Industries",
  badge: "XIAMEN, CHINA",
  since: "Since 2007",
  email: "david@samtyco.com",
  heroImage: "/images/factory-workshop.jpg",
  heroImageAlt: "CNC Workshop",
  scrollText: "Scroll to explore",
  copyrightText: "© 2024 Samtyco Industry",
  navLinks: [
    { label: "HOME", href: "#hero-section" },
    { label: "ABOUT", href: "#about" },
    { 
      label: "PRODUCT", 
      href: "#exhibitions",
      children: [
        { label: "CNC Turning", href: "/cnc-turning.html" },
        { label: "CNC Milling", href: "/cnc-milling.html" },
        { label: "Precision Parts", href: "/precision-parts.html" },
      ]
    },
    { label: "CONTACT", href: "#contact" },
  ],
  socialLinks: [
    { label: "Alibaba", href: "https://www.alibaba.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com" },
  ],
};

export const aboutConfig: AboutConfig = {
  label: "Established 2007",
  headline: "Precision Manufacturing Excellence",
  description: "Xiamen Samtyco Machinery Co.Ltd is specialized in CNC machining service for over 20 years in South-East China. Our primary machines include 25 CNC lathes, 35 Swiss lathes and 10 CNC milling machines etc. So far, we have established a cooperative relationship with over 300 customers worldwide from 50 countries. Customers benefit from our cooperation by 100% quality assurance, fast delivery and competitive prices.",
  bottomText: "Our commitment to quality is demonstrated through our ISO 9001:2015, CE, CCC, RoHS, and SGS certifications. We continuously invest in advanced CNC technology to deliver precision parts that meet the most demanding specifications.",
  galleryImages: [
    { src: "/images/real-turning-process.jpg", alt: "CNC Turning Machine", label: "Turning Center" },
    { src: "/images/real-milling-process.jpg", alt: "CNC Milling Machine", label: "Milling Center" },
    { src: "/images/factory-workshop.jpg", alt: "Quality Inspection", label: "Swiss Lathe Machinery" },
    { src: "/images/precision-parts.jpg", alt: "Precision Parts", label: "Products" },
    { src: "/images/product-detail-1.jpg", alt: "Product Detail", label: "Surface Finish" },
    { src: "/images/product-detail-3.jpg", alt: "Thread Detail", label: "Precision Thread" },
  ],
  stats: [
    { value: "17+", label: "Years Experience" },
    { value: "50+", label: "CNC Machines" },
    { value: "350+", label: "Global Clients" },
    { value: "99.8%", label: "Quality Rate" },
  ],
};

export const exhibitionsConfig: ExhibitionsConfig = {
  label: "Our Products",
  headline: "CNC Machining Services",
  ctaText: "View All Products",
  exhibitions: [
    {
      id: 1,
      title: "CNC Turning",
      image: "/images/cnc-turning.jpg",
      date: "High Precision Shafts & Components",
    },
    {
      id: 2,
      title: "CNC Milling",
      image: "/images/cnc-milling.jpg",
      date: "Complex 3D Parts & Assemblies",
    },
    {
      id: 3,
      title: "Precision Parts",
      image: "/images/precision-parts.jpg",
      date: "Custom Engineered Solutions",
    },
    {
      id: 4,
      title: "Quality Control",
      image: "/images/quality-control.jpg",
      date: "ISO 9001:2015 Certified",
    },
  ],
};

export const collectionsConfig: CollectionsConfig = {
  label: "Industries We Serve",
  headline: "Our Expertise",
  ctaText: "Learn More",
  collections: [
    {
      id: 1,
      title: "Robotics Field",
      year: "High Precision Components",
      description: "CNC machining is widely used in the robotics industry to manufacture high-precision structural parts such as robot arms, joints, shafts, frames and sensor components. With high accuracy, strong stability and fast customization, it supports the R&D and production of industrial and collaborative robots, making it an essential manufacturing process.",
      image: "/images/factory-workshop.jpg",
    },
    {
      id: 2,
      title: "Automotive",
      year: "Engine & Transmission Parts",
      description: "Producing precision automotive components such as engine parts, transmission components, brake system parts, and custom fittings. We support both OEM and aftermarket requirements with high-volume production capabilities.",
      image: "/images/factory-building.jpg",
    },
    {
      id: 3,
      title: "Industrial Machinery",
      year: "Heavy Equipment Components",
      description: "Manufacturing robust components for industrial machinery, hydraulic systems, and heavy equipment. Our parts are built to withstand demanding operating conditions while maintaining precise tolerances.",
      image: "/images/cnc-milling.jpg",
    },
    {
      id: 4,
      title: "Electronics",
      year: "Precision Connectors & Housings",
      description: "Producing precision components for electronic devices including connectors, housings, heat sinks, and custom enclosures. Our clean manufacturing environment ensures contamination-free parts for sensitive applications.",
      image: "/images/precision-parts.jpg",
    },
  ],
};

export const testimonialsConfig: TestimonialsConfig = {
  quote: "Samtyco has been our trusted CNC machining partner for over 5 years. Their attention to detail, on-time delivery, and competitive pricing have made them an invaluable supplier for our precision component needs.",
  authorName: "Michael Chen",
  authorTitle: "Procurement Manager, TechAuto Industries",
  authorImage: "",
};

export const visitConfig: VisitConfig = {
  label: "Get In Touch",
  headline: "Contact Us",
  description: "Ready to discuss your CNC machining project? Contact us today for a free quote. Our engineering team is ready to help you bring your designs to life with precision manufacturing.",
  ctaText: "Send Inquiry",
  infoCards: [
    {
      icon: "MapPin",
      title: "Address",
      content: "5095, No.350 Changle Rd<br />Xiamen, 361006, China",
    },
    {
      icon: "Phone",
      title: "Phone / WhatsApp",
      content: "+86 13666012895",
    },
    {
      icon: "Mail",
      title: "Email",
      content: "david@samtyco.com",
    },
    {
      icon: "Clock",
      title: "Business Hours",
      content: "Mon - Sat: 8:00 AM - 6:00 PM<br />Sunday: Closed",
    },
  ],
};

export const footerConfig: FooterConfig = {
  marqueeText: "PRECISION • QUALITY • INNOVATION • RELIABILITY • ",
  brandName: "Xiamen Samtyco",
  brandDescription: "Leading manufacturer of precision CNC machined parts. ISO 9001:2015, CE, CCC, RoHS & SGS certified. Serving global industries since 2007.",
  socialLinks: [
    { label: "Linkedin", href: "https://www.linkedin.com" },
    { label: "Globe", href: "https://www.alibaba.com" },
  ],
  quickLinks: [
    { label: "Home", href: "#hero-section" },
    { label: "About Us", href: "#about" },
    { label: "Products", href: "#exhibitions" },
    { label: "Contact", href: "#contact" },
  ],
  quickLinksTitle: "Quick Links",
  contactTitle: "Contact Info",
  contactItems: [
    "5095, No.350 Changle Rd",
    "Xiamen, 361006, China",
    "<a href='tel:+8613666012895' class='hover:text-white transition-colors'>+86 13666012895</a>",
    "<a href='mailto:david@samtyco.com' class='hover:text-white transition-colors'>david@samtyco.com</a>",
  ],
  bottomLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};
