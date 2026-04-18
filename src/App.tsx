/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUpRight, Search, BedDouble, Bath, Ruler, MapPin, Mail, Phone, Menu, X } from "lucide-react";
import Lenis from "lenis";

const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const IconX = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const IconLinkedin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const stats = [
  { value: 12, prefix: "", suffix: "+", decimals: 0, label: "Years in the Bay Area" },
  { value: 2.4, prefix: "$", suffix: "B", decimals: 1, label: "Total Sales Volume" },
  { value: 1200, prefix: "", suffix: "+", decimals: 0, label: "Homes Closed" },
  { value: 98, prefix: "", suffix: "%", decimals: 0, label: "Client Satisfaction" },
];

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const start = performance.now();
    const duration = 1800;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * stat.value);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, stat.value]);

  const display =
    stat.decimals > 0
      ? count.toFixed(stat.decimals)
      : Math.floor(count).toLocaleString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      className="p-6 md:p-8 bg-white border border-stone-200 rounded-[24px] flex flex-col justify-between min-h-[130px] shadow-sm"
    >
      <p className="text-3xl md:text-4xl font-display font-bold tracking-tight text-[#0f0f0f]">
        {stat.prefix}{display}{stat.suffix}
      </p>
      <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] mt-3 leading-snug">
        {stat.label}
      </p>
    </motion.div>
  );
}

type FilterType = "All" | "For Sale" | "For Rent";

const properties = [
  {
    id: 1,
    address: "2847 Broadway St",
    city: "San Francisco, CA 94115",
    neighborhood: "Pacific Heights",
    price: "$3,250,000",
    beds: 4, baths: 3, sqft: "2,840",
    status: "For Sale" as FilterType,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    address: "741 Rinconada Ave",
    city: "Palo Alto, CA 94306",
    neighborhood: "Crescent Park",
    price: "$4,100,000",
    beds: 5, baths: 4, sqft: "3,200",
    status: "For Sale" as FilterType,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    address: "1203 Grand Ave",
    city: "Oakland, CA 94610",
    neighborhood: "Grand Lake",
    price: "$1,450,000",
    beds: 3, baths: 2, sqft: "1,980",
    status: "For Sale" as FilterType,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    address: "88 Belvedere Dr",
    city: "Tiburon, CA 94920",
    neighborhood: "Marin County",
    price: "$6,800,000",
    beds: 5, baths: 5, sqft: "4,600",
    status: "For Sale" as FilterType,
    image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    address: "534 Arch St",
    city: "Berkeley, CA 94708",
    neighborhood: "North Berkeley",
    price: "$5,400 / mo",
    beds: 3, baths: 2, sqft: "1,620",
    status: "For Rent" as FilterType,
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    address: "1450 Marina Blvd",
    city: "San Francisco, CA 94123",
    neighborhood: "Marina District",
    price: "$4,200 / mo",
    beds: 2, baths: 2, sqft: "1,240",
    status: "For Rent" as FilterType,
    image: "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&auto=format&fit=crop&q=80",
  },
];

const team = [
  {
    name: "Sarah Lin",
    role: "Co-Founder & Managing Broker",
    bio: "Sarah founded Brickly in 2012 after navigating the Bay Area market as a first-time buyer herself. Her mission: make every client feel like they have a true insider on their side.",
    photo: "/christopher-campbell-rDEOVtE7vOs-unsplash.jpg",
  },
  {
    name: "James Hartwell",
    role: "Senior Buyer's Agent",
    bio: "With 9 years helping buyers win in competitive markets, James knows how to craft an offer that stands out — and a negotiation strategy that always sticks.",
    photo: "/linkedin-sales-solutions-pAtA8xe_iVM-unsplash.jpg",
  },
  {
    name: "Marco Reyes",
    role: "Luxury Listings Specialist",
    bio: "Marco brings a designer's eye and a data-driven approach to every listing. His properties consistently close above ask and in record time.",
    photo: "/nartan-buyukyildiz-hr_feH2URs0-unsplash.jpg",
  },
];

const agents = [
  {
    name: "Sarah Lin",
    role: "Co-Founder & Managing Broker",
    bio: "Sarah founded Brickly in 2012 after struggling to find an honest agent as a first-time buyer herself. With 12+ years of Bay Area experience and over $800M in closed transactions, she leads the team with a client-first philosophy that has never wavered.",
    photo: "/christopher-campbell-rDEOVtE7vOs-unsplash.jpg",
    stats: [
      { label: "Active Listings", value: "24" },
      { label: "Volume Closed", value: "$140M+" },
      { label: "Experience", value: "12 yrs" },
    ],
    areas: ["Pacific Heights", "Noe Valley", "The Marina"],
    featured: true,
  },
  {
    name: "James Hartwell",
    role: "Senior Buyer's Agent",
    bio: "James has guided 300+ buyers to successful closings across the East Bay. He specializes in competitive offer strategy and helps first-time buyers navigate one of the most demanding markets in the country.",
    photo: "/linkedin-sales-solutions-pAtA8xe_iVM-unsplash.jpg",
    stats: [
      { label: "Active Listings", value: "11" },
      { label: "Volume Closed", value: "$62M+" },
      { label: "Experience", value: "9 yrs" },
    ],
    areas: ["Oakland", "Berkeley", "Emeryville"],
    featured: false,
  },
  {
    name: "Marco Reyes",
    role: "Luxury Listings Specialist",
    bio: "Marco's design background and data-driven pricing approach consistently deliver results above ask. His Marin County listings average 12% over list price and close in under 18 days.",
    photo: "/nartan-buyukyildiz-hr_feH2URs0-unsplash.jpg",
    stats: [
      { label: "Active Listings", value: "18" },
      { label: "Volume Closed", value: "$95M+" },
      { label: "Experience", value: "7 yrs" },
    ],
    areas: ["Tiburon", "Sausalito", "Mill Valley"],
    featured: false,
  },
];

const posts = [
  {
    id: 1,
    category: "Market Insight",
    title: "How to Win a Bidding War in San Francisco's Most Competitive Neighborhoods",
    excerpt: "With inventory at historic lows, here's the exact playbook Brickly agents use to help buyers claim the home they want — even in 10-offer situations.",
    author: "Sarah Lin",
    date: "Apr 10, 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&auto=format&fit=crop&q=80",
    featured: true,
  },
  {
    id: 2,
    category: "Neighborhood Guide",
    title: "The Best East Bay Neighborhoods to Buy in 2026",
    excerpt: "Oakland and Berkeley are evolving fast. We break down where the value is, block by block.",
    author: "James Hartwell",
    date: "Apr 3, 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&auto=format&fit=crop&q=80",
    featured: false,
  },
  {
    id: 3,
    category: "Selling Tips",
    title: "What Luxury Buyers Are Looking For in Marin County Right Now",
    excerpt: "Marco Reyes breaks down the finishes, layouts, and locations that are commanding top dollar in today's Marin market.",
    author: "Marco Reyes",
    date: "Mar 28, 2026",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
    featured: false,
  },
  {
    id: 4,
    category: "First-Time Buyers",
    title: "5 Things First-Time Buyers Wish They Knew Before Closing",
    excerpt: "From hidden costs to inspection red flags — the honest guide we give every first-time buyer before they sign anything.",
    author: "Sarah Lin",
    date: "Mar 19, 2026",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80",
    featured: false,
  },
  {
    id: 5,
    category: "Finance",
    title: "What the Fed's Latest Rate Decision Means for Bay Area Buyers",
    excerpt: "Interest rate shifts hit the Bay Area harder than almost any other market. Here's how to position yourself regardless of which way rates move.",
    author: "James Hartwell",
    date: "Mar 11, 2026",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=80",
    featured: false,
  },
  {
    id: 6,
    category: "Market Insight",
    title: "Is the Bay Area Market Finally Cooling — Or Is This Just a Pause?",
    excerpt: "Data from the last 90 days paints a nuanced picture. We cut through the noise so you can make your move with confidence.",
    author: "Marco Reyes",
    date: "Mar 4, 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&auto=format&fit=crop&q=80",
    featured: false,
  },
];

export default function App() {
  const navLinks = ["Home", "About", "Properties", "Agents", "Blog"];
  const filters: FilterType[] = ["All", "For Sale", "For Rent"];
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const filtered = activeFilter === "All" ? properties : properties.filter(p => p.status === activeFilter);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => { lenis.destroy(); };
  }, []);

  return (
    <div className="font-sans">

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <div className="relative h-[100dvh] flex flex-col overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="/hf_20260417_112519_ee251b70-18a7-4bd4-9f24-073805cb8311.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/45" />
        </div>

        {/* Mobile full-screen menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#0c0d11]/95 backdrop-blur-xl flex flex-col px-6 py-5"
          >
            <div className="flex items-center justify-between mb-10">
              <span className="text-2xl font-display font-bold tracking-[0.2em] text-white">BRICKLY</span>
              <button onClick={() => setMenuOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full border border-white/15 text-white/60 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 flex-1">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-4xl font-display font-bold text-white/30 hover:text-white transition-colors py-3 border-b border-white/[0.06]"
                >
                  {link}
                </a>
              ))}
            </nav>
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 px-5 py-3.5 bg-white/[0.05] border border-white/10 rounded-2xl">
                <Search className="w-4 h-4 text-white/35 shrink-0" />
                <input type="text" placeholder="Search properties…" className="bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none flex-1" />
              </div>
              <button className="w-full flex items-center justify-center gap-2 px-5 py-4 bg-white/10 border border-white/20 rounded-2xl">
                <span className="text-sm font-semibold tracking-wider uppercase text-white">Contact Us</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Header / Navbar */}
        <header className="relative z-50 flex items-center justify-between px-6 md:px-8 py-5 max-w-7xl mx-auto w-full gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-display font-bold tracking-[0.2em] text-white shrink-0"
          >
            BRICKLY
          </motion.div>

          {/* Desktop nav + search pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:flex items-center px-6 py-2.5 bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-full gap-6 flex-1 max-w-[43rem]"
          >
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-white/70 hover:text-white transition-colors text-sm font-medium whitespace-nowrap">
                {link}
              </a>
            ))}
            <div className="w-px h-4 bg-white/20 shrink-0" />
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Search className="w-3.5 h-3.5 text-white/35 shrink-0" />
              <input type="text" placeholder="Search address, city, neighborhood…" className="bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none w-full" />
            </div>
          </motion.div>

          {/* Desktop: Contact Us | Mobile: Hamburger */}
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setMenuOpen(true)}
            className="md:hidden w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all"
          >
            <Menu className="w-5 h-5 text-white" />
          </motion.button>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center space-x-2 px-5 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all group shrink-0"
          >
            <span className="text-sm font-semibold tracking-wider uppercase">Contact Us</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </header>

        {/* Hero card — centered, top ~30% */}
        <main className="relative z-10 flex-1 flex flex-col items-center justify-start pt-8 md:pt-14 px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-xl p-6 sm:p-8 md:p-10 bg-white/[0.06] backdrop-blur-md border border-white/15 rounded-[28px] md:rounded-[36px] shadow-2xl relative overflow-hidden text-center"
          >
            <div className="absolute -top-20 -right-20 w-56 h-56 bg-amber-500/10 blur-[80px] rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-slate-500/10 blur-[80px] rounded-full" />

            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-white/40 mb-3 md:mb-4">
              Brickly — Bay Area & Sacramento
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-[1.15] mb-3 md:mb-4">
              Find Your Place to Call Home
            </h1>
            <p className="text-white/55 text-sm md:text-base font-light mb-6 md:mb-8 leading-relaxed">
              Brickly connects you with trusted local agents and premium listings across the Bay Area and Sacramento — from first home to forever home.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button className="px-7 sm:px-9 py-3 sm:py-3.5 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:bg-white/90 transition-all">
                <span className="text-xs sm:text-sm">Browse Listings</span>
              </button>
              <button className="px-5 sm:px-6 py-3 sm:py-3.5 bg-white/10 border border-white/20 rounded-full hover:bg-white/15 transition-all">
                <span className="text-xs sm:text-sm font-medium text-white/80">Meet Our Agents</span>
              </button>
            </div>
          </motion.div>
        </main>

        {/* Decorative vertical rail */}
        <div className="absolute left-6 bottom-32 z-20 hidden lg:block">
          <span className="text-[10px] font-display font-medium uppercase tracking-[0.5em] text-white/30 [writing-mode:vertical-rl] rotate-180">
            Luxury Real Estate Redefined
          </span>
        </div>

        {/* Scroll indicator */}
        <div className="absolute right-6 bottom-8 z-20 hidden sm:flex flex-col items-center gap-3">
          <div className="w-px h-14 bg-gradient-to-t from-white/40 to-transparent" />
          <span className="text-[10px] font-display font-medium uppercase tracking-[0.3em] text-white/40 [writing-mode:vertical-rl] rotate-180">
            Scroll
          </span>
        </div>
      </div>

      {/* ── ABOUT ────────────────────────────────────────────────── */}
      <section
        id="about"
        className="relative text-[#0f0f0f] py-16 md:py-24 lg:py-32 px-6 md:px-8 bg-[#fafaf8] overflow-hidden"
        style={{ backgroundImage: "radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      >
        {/* Ambient blobs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-amber-300/30 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-sky-300/25 blur-[120px] rounded-full pointer-events-none" />
        {/* Oversized watermark — desktop only */}
        <span className="absolute right-8 top-1/2 -translate-y-1/2 text-[180px] md:text-[260px] font-display font-black text-black/[0.025] leading-none select-none pointer-events-none tracking-tight hidden md:block">
          BRICKLY
        </span>

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16 md:mb-20"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-400 mb-5">
              About Brickly
            </p>
            <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-end">
              <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-bold leading-[1.1]">
                Built on Trust.<br />Rooted in the Bay.
              </h2>
              <p className="text-stone-500 text-base md:text-lg leading-relaxed">
                Since 2012, Brickly has helped Bay Area families buy, sell, and invest with confidence. We combine deep local knowledge with a client-first approach — because a home is never just a transaction.
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 md:mb-28">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-stone-200 mb-20 md:mb-28" />

          {/* Team heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-400 mb-3">
                The Team
              </p>
              <h3 className="text-3xl md:text-4xl font-display font-bold">
                The people behind every deal.
              </h3>
            </div>
            <p className="text-stone-500 text-sm max-w-xs leading-relaxed">
              Small by design. Every client works directly with a senior agent — no hand-offs, no assistants.
            </p>
          </motion.div>

          {/* Team cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7 }}
                className="group rounded-[28px] overflow-hidden bg-white border border-stone-200 hover:border-stone-300 hover:shadow-md transition-all duration-300"
              >
                {/* Photo */}
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-500 ease-out"
                  />
                </div>
                {/* Info */}
                <div className="p-6 md:p-7">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-400 mb-1.5">
                    {member.role}
                  </p>
                  <h4 className="text-lg font-display font-bold mb-3">{member.name}</h4>
                  <p className="text-stone-500 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── PROPERTIES ───────────────────────────────────────────── */}
      <section
        id="properties"
        className="relative text-white py-16 md:py-24 lg:py-32 px-6 md:px-8"
        style={{
          backgroundImage: "url(/benjamin-davies-Oja2ty_9ZLM-unsplash.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#0c0d11]/75" />

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* Header row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/35 mb-3">
                Featured Listings
              </p>
              <h2 className="text-4xl md:text-5xl font-display font-bold leading-[1.1]">
                Find your next home.
              </h2>
            </div>

            {/* Filter tabs */}
            <div className="flex items-center gap-1.5 p-1.5 bg-white/[0.05] border border-white/10 rounded-full self-start md:self-auto">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${activeFilter === f
                    ? "bg-white text-black"
                    : "text-white/50 hover:text-white"
                    }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Property grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((property, i) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="group rounded-[24px] overflow-hidden bg-[#14151a] border border-white/[0.08] hover:border-white/20 transition-colors duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.address}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider backdrop-blur-md border ${property.status === "For Rent"
                    ? "bg-blue-500/20 border-blue-400/30 text-blue-300"
                    : "bg-white/10 border-white/20 text-white"
                    }`}>
                    {property.status}
                  </span>
                  <p className="absolute bottom-4 left-4 text-[11px] font-medium text-white/60 tracking-wide">
                    {property.neighborhood}
                  </p>
                </div>

                {/* Details */}
                <div className="p-5">
                  <p className="text-2xl font-display font-bold mb-1">{property.price}</p>
                  <p className="flex items-center gap-1.5 text-white/45 text-sm mb-4">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    {property.address}, {property.city}
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-white/[0.07] text-white/40 text-xs">
                    <span className="flex items-center gap-1.5">
                      <BedDouble className="w-3.5 h-3.5" />{property.beds} Beds
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Bath className="w-3.5 h-3.5" />{property.baths} Baths
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Ruler className="w-3.5 h-3.5" />{property.sqft} sqft
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View all */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex justify-center mt-12"
          >
            <button className="flex items-center gap-2 px-8 py-3.5 border border-white/20 rounded-full text-sm font-semibold hover:bg-white/5 transition-all group">
              View All Listings
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>

        </div>
      </section>

      {/* ── AGENTS ───────────────────────────────────────────────── */}
      <section
        id="agents"
        className="relative text-[#0f0f0f] py-16 md:py-24 lg:py-32 px-6 md:px-8 bg-white overflow-hidden"
        style={{ backgroundImage: "radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      >
        {/* Ambient blobs */}
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-violet-300/25 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-amber-300/25 blur-[120px] rounded-full pointer-events-none" />
        {/* Oversized watermark — desktop only */}
        <span className="absolute left-8 top-1/2 -translate-y-1/2 text-[180px] md:text-[260px] font-display font-black text-black/[0.025] leading-none select-none pointer-events-none tracking-tight hidden md:block">
          AGENTS
        </span>

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-400 mb-3">Our Agents</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold leading-[1.1]">
                Experts you can<br />actually trust.
              </h2>
            </div>
            <p className="text-stone-500 text-sm max-w-xs leading-relaxed">
              Every Brickly client works directly with a senior agent — no assistants, no hand-offs, no surprises.
            </p>
          </motion.div>

          {/* Featured agent — full-width horizontal card */}
          {agents.filter(a => a.featured).map((agent) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75 }}
              className="group flex flex-col md:flex-row rounded-[32px] overflow-hidden bg-[#fafaf8] border border-stone-200 hover:border-stone-300 hover:shadow-lg transition-all duration-300 mb-5"
            >
              {/* Photo */}
              <div className="md:w-[38%] aspect-[4/3] md:aspect-auto overflow-hidden shrink-0">
                <img
                  src={agent.photo}
                  alt={agent.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col justify-between p-8 md:p-12 flex-1">
                <div>
                  <span className="inline-block px-3 py-1 mb-5 rounded-full bg-stone-100 border border-stone-200 text-[11px] font-bold uppercase tracking-widest text-stone-500">
                    Featured Agent
                  </span>
                  <h3 className="text-3xl md:text-4xl font-display font-bold mb-1">{agent.name}</h3>
                  <p className="text-stone-400 text-sm mb-6">{agent.role}</p>
                  <p className="text-stone-500 text-sm md:text-base leading-relaxed mb-8 max-w-lg">{agent.bio}</p>

                  {/* Neighborhoods */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {agent.areas.map(area => (
                      <span key={area} className="px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs text-stone-500">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                  {/* Stats */}
                  <div className="flex flex-wrap gap-x-8 gap-y-4">
                    {agent.stats.map(s => (
                      <div key={s.label}>
                        <p className="text-2xl font-display font-bold">{s.value}</p>
                        <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  <button className="flex items-center gap-2 px-7 py-3 bg-[#0f0f0f] text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-stone-800 transition-all group/btn self-start sm:self-auto">
                    Contact Sarah
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Supporting agents — 2-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {agents.filter(a => !a.featured).map((agent, i) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7 }}
                className="group flex flex-col sm:flex-row rounded-[28px] overflow-hidden bg-[#fafaf8] border border-stone-200 hover:border-stone-300 hover:shadow-md transition-all duration-300"
              >
                {/* Photo */}
                <div className="sm:w-[42%] aspect-[4/3] sm:aspect-auto overflow-hidden shrink-0">
                  <img
                    src={agent.photo}
                    alt={agent.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between p-6 flex-1">
                  <div>
                    <h3 className="text-xl font-display font-bold mb-0.5">{agent.name}</h3>
                    <p className="text-stone-400 text-xs mb-4">{agent.role}</p>
                    <p className="text-stone-500 text-sm leading-relaxed mb-5">{agent.bio}</p>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {agent.areas.map(area => (
                        <span key={area} className="px-2.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-[11px] text-stone-500">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats + button */}
                  <div>
                    <div className="flex gap-5 mb-5 pt-4 border-t border-stone-200">
                      {agent.stats.map(s => (
                        <div key={s.label}>
                          <p className="text-lg font-display font-bold">{s.value}</p>
                          <p className="text-[9px] text-stone-400 uppercase tracking-[0.2em]">{s.label}</p>
                        </div>
                      ))}
                    </div>
                    <button className="flex items-center gap-2 px-5 py-2.5 border border-stone-300 rounded-full text-xs font-bold uppercase tracking-widest text-stone-700 hover:bg-stone-100 transition-all group/btn">
                      Contact {agent.name.split(" ")[0]}
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── BLOG ─────────────────────────────────────────────────── */}
      <section
        id="blog"
        className="relative text-[#0f0f0f] py-16 md:py-24 lg:py-32 px-6 md:px-8 bg-[#fafaf8] overflow-hidden"
        style={{ backgroundImage: "radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "28px 28px" }}
      >
        {/* Ambient blobs */}
        <div className="absolute -top-20 left-1/4 w-[500px] h-[500px] bg-orange-300/25 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-rose-300/20 blur-[120px] rounded-full pointer-events-none" />
        {/* Oversized watermark — desktop only */}
        <span className="absolute right-8 bottom-16 text-[180px] md:text-[260px] font-display font-black text-black/[0.025] leading-none select-none pointer-events-none tracking-tight hidden md:block">
          JOURNAL
        </span>

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-400 mb-3">The Journal</p>
              <h2 className="text-4xl md:text-5xl font-display font-bold leading-[1.1]">
                Insights for every<br />step of the journey.
              </h2>
            </div>
            <button className="flex items-center gap-2 px-6 py-2.5 border border-stone-300 rounded-full text-sm font-medium text-stone-700 hover:bg-stone-100 transition-all group self-start md:self-auto shrink-0">
              View All Posts
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>

          {/* Bento grid — featured large + 2 stacked, then 3 equal */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-5">

            {/* Featured post */}
            {posts.filter(p => p.featured).map(post => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="md:col-span-7 group relative rounded-[28px] overflow-hidden bg-white border border-stone-200 hover:border-stone-300 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="relative h-64 md:h-80 overflow-hidden shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-white">
                    {post.category}
                  </span>
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="text-xl md:text-2xl font-display font-bold leading-[1.25] mb-3 group-hover:text-stone-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed mb-6 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                    <div className="flex items-center gap-2 text-xs text-stone-400">
                      <span>{post.author}</span>
                      <span className="w-1 h-1 rounded-full bg-stone-300" />
                      <span>{post.date}</span>
                    </div>
                    <span className="text-xs text-stone-400">{post.readTime} read</span>
                  </div>
                </div>
              </motion.article>
            ))}

            {/* Stacked sidebar posts */}
            <div className="md:col-span-5 flex flex-col gap-5">
              {posts.slice(1, 3).map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.65 }}
                  className="group relative rounded-[28px] overflow-hidden bg-white border border-stone-200 hover:border-stone-300 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col flex-1"
                >
                  <div className="relative h-40 overflow-hidden shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-white">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-base font-display font-bold leading-[1.3] mb-2 group-hover:text-stone-600 transition-colors flex-1">
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between pt-3 border-t border-stone-100 mt-3">
                      <div className="flex items-center gap-2 text-[11px] text-stone-400">
                        <span>{post.author}</span>
                        <span className="w-1 h-1 rounded-full bg-stone-300" />
                        <span>{post.date}</span>
                      </div>
                      <span className="text-[11px] text-stone-400">{post.readTime} read</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Bottom row — 3 equal cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.slice(3).map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.65 }}
                className="group rounded-[28px] overflow-hidden bg-white border border-stone-200 hover:border-stone-300 hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="relative h-44 overflow-hidden shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-white">
                    {post.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base font-display font-bold leading-[1.3] mb-2 group-hover:text-stone-600 transition-colors flex-1">
                    {post.title}
                  </h3>
                  <p className="text-stone-500 text-xs leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                    <div className="flex items-center gap-2 text-[11px] text-stone-400">
                      <span>{post.author}</span>
                      <span className="w-1 h-1 rounded-full bg-stone-300" />
                      <span>{post.date}</span>
                    </div>
                    <span className="text-[11px] text-stone-400">{post.readTime} read</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="bg-[#0c0d11] text-white px-6 md:px-8 pt-20 pb-8">
        <div className="max-w-7xl mx-auto">

          {/* Top grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 pb-16 border-b border-white/[0.08]">

            {/* Brand col */}
            <div className="sm:col-span-2 lg:col-span-4">
              <p className="text-2xl font-display font-bold tracking-[0.2em] mb-4">BRICKLY</p>
              <p className="text-white/45 text-sm leading-relaxed max-w-xs mb-8">
                Bay Area's trusted boutique real estate agency — helping families buy, sell, and invest with clarity since 2012.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-3">
                {[
                  { icon: <IconInstagram />, label: "Instagram" },
                  { icon: <IconX />,         label: "X" },
                  { icon: <IconLinkedin />,  label: "LinkedIn" },
                ].map(({ icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="lg:col-span-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/30 mb-5">Navigation</p>
              <ul className="space-y-3">
                {["Home", "About", "Properties", "Agents", "Blog"].map(link => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-white/55 text-sm hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Properties links */}
            <div className="lg:col-span-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/30 mb-5">Properties</p>
              <ul className="space-y-3">
                {["For Sale", "For Rent", "New Listings", "Open Houses", "Price Reduced"].map(item => (
                  <li key={item}>
                    <a href="#properties" className="text-white/55 text-sm hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Neighborhoods */}
            <div className="lg:col-span-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/30 mb-5">Neighborhoods</p>
              <ul className="space-y-3">
                {["Pacific Heights", "The Marina", "Noe Valley", "Oakland", "Palo Alto", "Tiburon"].map(n => (
                  <li key={n}>
                    <a href="#properties" className="text-white/55 text-sm hover:text-white transition-colors">
                      {n}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="lg:col-span-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/30 mb-5">Contact</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-white/55 text-sm">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 text-white/30" />
                  hello@brickly.com
                </li>
                <li className="flex items-start gap-3 text-white/55 text-sm">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0 text-white/30" />
                  (415) 555-0192
                </li>
                <li className="flex items-start gap-3 text-white/55 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-white/30" />
                  2180 Union St, Suite 4<br />San Francisco, CA 94123
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
            <p className="text-white/25 text-xs">
              © 2026 Brickly Real Estate. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Use", "Cookie Policy"].map(item => (
                <a key={item} href="#" className="text-white/25 text-xs hover:text-white/50 transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
