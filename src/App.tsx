import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const NOTEBOOKS = [
  {
    id: 'master',
    vol: 'Vol. I',
    title: 'Bhaktivedānta Master Collection',
    description: 'The broadest study portal spanning Śrīla Prabhupāda’s major books for deep philosophical research and daily reading.',
    link: 'https://notebooklm.google.com/notebook/d507600e-3bee-4a9b-ae75-add4e211387c?authuser=3',
  },
  {
    id: 'audio',
    vol: 'Vol. II',
    title: 'Audio Teachings Archive',
    description: 'Search across lectures, conversations, morning walks, and spoken teachings for living insight in spoken form.',
    link: 'https://notebooklm.google.com/notebook/9234d4c1-c121-47ae-938f-721aa4c5b907',
  },
  {
    id: 'letters',
    vol: 'Vol. III',
    title: 'Letters and Correspondence',
    description: 'Explore personal letters and historical exchanges filled with guidance, mood, instruction, and context.',
    link: 'https://notebooklm.google.com/notebook/ac84348a-1229-4e07-b148-bf7ac493a66e?authuser=3',
  },
  {
    id: 'bio-1',
    vol: 'Vol. IV - Part 1',
    title: 'Śrīla Prabhupāda Biographies & Memoirs (Part 1)',
    description: 'Discover the life, mission, and global impact of Śrīla Prabhupāda through biographical works and memoir.',
    link: 'https://notebooklm.google.com/notebook/3199b23a-6731-4ed7-86db-f15b7fa71646',
  },
  {
    id: 'bio-2',
    vol: 'Vol. IV - Part 2',
    title: 'Śrīla Prabhupāda Biographies & Memoirs (Part 2)',
    description: 'Continue exploring the life, mission, and global impact of Śrīla Prabhupāda through biographical works and memoir.',
    link: 'https://notebooklm.google.com/notebook/c499d1e3-7665-4eb1-a3d6-3276cbff4578',
  },
  {
    id: 'analogies',
    vol: 'Vol. V',
    title: "Śrīla Prabhupāda's Analogies",
    description: 'Explore the profound philosophical concepts through the simple and clear analogies frequently used by Śrīla Prabhupāda.',
    link: 'https://notebooklm.google.com/notebook/237c84bc-7cb9-49e8-b889-3cb507a66620',
  }
];

const RuleOrnament = ({ className = "" }: { className?: string }) => (
  <svg className={`my-14 w-[240px] h-[14px] ${className}`} viewBox="0 0 240 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="7" x2="88" y2="7" stroke="rgba(184,146,42,0.3)" strokeWidth="0.5"/>
    <circle cx="96" cy="7" r="2" fill="rgba(184,146,42,0.5)"/>
    <circle cx="104" cy="7" r="1" fill="rgba(184,146,42,0.3)"/>
    <path d="M112 7 L120 2 L128 7 L120 12 Z" fill="rgba(184,146,42,0.5)"/>
    <circle cx="136" cy="7" r="1" fill="rgba(184,146,42,0.3)"/>
    <circle cx="144" cy="7" r="2" fill="rgba(184,146,42,0.5)"/>
    <line x1="152" y1="7" x2="240" y2="7" stroke="rgba(184,146,42,0.3)" strokeWidth="0.5"/>
  </svg>
);

const ChapterBreak = () => (
  <div className="text-center py-8">
    <svg viewBox="0 0 480 30" width="480" height="30" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-[90vw] inline-block">
      <line x1="0" y1="15" x2="180" y2="15" stroke="rgba(184,146,42,0.15)" strokeWidth="0.5"/>
      <path d="M186 15 L192 10 L198 15 L192 20 Z" fill="rgba(184,146,42,0.25)"/>
      <circle cx="210" cy="15" r="2.5" fill="rgba(184,146,42,0.35)"/>
      <path d="M222 15 L232 6 L242 15 L232 24 Z" fill="rgba(184,146,42,0.4)" stroke="rgba(184,146,42,0.3)" strokeWidth="0.5"/>
      <circle cx="254" cy="15" r="2.5" fill="rgba(184,146,42,0.35)"/>
      <path d="M266 15 L272 10 L278 15 L272 20 Z" fill="rgba(184,146,42,0.25)"/>
      <line x1="284" y1="15" x2="480" y2="15" stroke="rgba(184,146,42,0.15)" strokeWidth="0.5"/>
    </svg>
  </div>
);

const SimpleOrnament = () => (
  <div className="text-center py-12">
    <svg viewBox="0 0 200 20" width="200" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
      <line x1="0" y1="10" x2="70" y2="10" stroke="rgba(184,146,42,0.2)" strokeWidth="0.5"/>
      <circle cx="82" cy="10" r="2" fill="rgba(184,146,42,0.3)"/>
      <circle cx="100" cy="10" r="4" fill="rgba(184,146,42,0.2)" stroke="rgba(184,146,42,0.35)" strokeWidth="0.5"/>
      <circle cx="118" cy="10" r="2" fill="rgba(184,146,42,0.3)"/>
      <line x1="130" y1="10" x2="200" y2="10" stroke="rgba(184,146,42,0.2)" strokeWidth="0.5"/>
    </svg>
  </div>
);

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const isLight = localStorage.getItem('theme') === 'light' || 
                    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches);
    if (isLight) {
      document.documentElement.classList.add('light');
      setIsDark(false);
    } else {
      document.documentElement.classList.remove('light');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', '#F9F6EE');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', '#0F0C08');
    }
  };

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 border border-brand-gold/30 rounded-full text-brand-gold-bright hover:bg-brand-gold/10 transition-colors ml-4 shadow-[0_0_10px_rgba(212,168,67,0.15)]"
      aria-label="Toggle Theme"
    >
      {isDark ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      )}
    </button>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5vw] py-5 transition-all duration-700 ${scrolled ? 'bg-brand-bg/95 backdrop-blur-md border-b border-brand-gold/25 py-3' : 'bg-transparent'}`}>
        <a href="#hero" className="font-serif text-[0.78rem] tracking-[0.18em] uppercase text-brand-gold-bright decoration-transparent transition-colors hover:text-brand-gold-pale flex items-center gap-2">
          Bhaktivedānta <span className="bg-brand-crimson text-[#F2E8D5] px-1.5 py-0.5 rounded text-[0.55rem] font-bold tracking-widest shadow-[0_0_10px_rgba(139,26,26,0.3)] border border-brand-crimson-light">AI SUPER CHAT</span>
        </a>
        <div className="flex items-center gap-6">
          <ul className="hidden md:flex gap-12 list-none m-0 items-center">
            {['Library', 'Why It Works', 'How It Works'].map(item => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase().replace(/ /g, '') === 'whyitworks' ? 'benefits' : item.toLowerCase().replace(/ /g, '') === 'howitworks' ? 'how' : item.toLowerCase()}`} 
                  className="font-serif text-[0.65rem] tracking-[0.2em] uppercase text-brand-ghost decoration-transparent transition-colors hover:text-brand-gold-bright"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button 
              className="md:hidden flex bg-transparent border border-brand-gold/25 text-brand-gold-bright px-3 py-1.5 font-serif text-[0.6rem] tracking-[0.15em] cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? 'CLOSE' : 'MENU'}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-brand-bg/98 flex flex-col items-center justify-center gap-12"
          >
            {['Library', 'Why It Works', 'How It Works'].map(item => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, '') === 'whyitworks' ? 'benefits' : item.toLowerCase().replace(/ /g, '') === 'howitworks' ? 'how' : item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-lg tracking-[0.2em] uppercase text-brand-gold-bright decoration-transparent"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  return (
    <section id="hero" className="h-[100dvh] relative flex flex-col items-start justify-center px-[5vw] pt-[10vh] pb-[5vh] overflow-hidden text-left bg-brand-bg">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 select-none pointer-events-none"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[1px] scale-105 hero-image" 
          style={{ backgroundImage: 'url(https://i.ibb.co/gLCpXtm7/Srila-Prabhupada-Hero-Image.jpg)' }} 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg via-brand-bg/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/80 via-transparent to-brand-bg" />
        <div className="absolute inset-0 bg-radial-[ellipse_70%_50%_at_50%_30%] from-brand-gold/10 to-transparent mix-blend-screen" />
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-start">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2, delay: 0.4 }}
           className="w-full flex justify-start hidden md:flex"
        >
          <RuleOrnament className="!my-[4vh]" />
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-serif text-[clamp(0.5rem,1.5vh,0.62rem)] uppercase tracking-[0.35em] text-brand-gold mb-[3vh]"
        >
          Gauḍīya Vaiṣṇava Digital Study Library
        </motion.p>

        <h1 className="font-display text-[clamp(2.5rem,min(9vw,11vh),9.5rem)] font-black leading-[0.9] tracking-[0.01em] text-brand-parchment mb-4 flex flex-col items-start">
          <motion.span 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            <span className="italic text-brand-gold-bright drop-shadow-[0_0_30px_rgba(212,168,67,0.4)]">AI</span> Answers.
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            Rooted in <span className="italic text-brand-crimson-light">Śāstra.</span>
          </motion.span>
        </h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.1 }}
          className="mt-[4vh] max-w-[600px] w-full"
        >
          <div className="h-[1px] w-[50%] bg-gradient-to-r from-brand-gold-bright/50 to-transparent my-[2vh]" />
          <p className="font-sans text-[clamp(0.9rem,min(2vw,2.5vh),1.25rem)] font-light italic text-brand-ghost leading-[1.6]">
            The world's first curated <span className="text-brand-gold-bright font-medium not-italic bg-brand-gold/10 px-1.5 py-0.5 rounded shadow-[0_0_15px_rgba(212,168,67,0.15)] border border-brand-gold/20 text-[0.8em] tracking-[0.05em]">AI SUPER CHAT</span> gateway for studying Śrīla Prabhupāda's books, lectures, letters, and Gauḍīya Vaiṣṇava texts through <span className="text-brand-gold-bright font-medium not-italic bg-brand-gold/10 px-1.5 py-0.5 rounded shadow-[0_0_15px_rgba(212,168,67,0.15)] border border-brand-gold/20 text-[0.8em] tracking-[0.05em]"> source-grounded AI answers.</span> 
          </p>
          <div className="h-[1px] w-[50%] bg-gradient-to-r from-brand-gold-bright/50 to-transparent my-[2vh]" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="flex flex-wrap justify-start gap-[2vh] mt-[2vh]"
        >
          <a href="#library" className="group relative inline-flex items-center gap-3 px-[4vw] md:px-10 py-[1.5vh] md:py-4 bg-brand-crimson text-[#F2E8D5] font-serif text-[clamp(0.6rem,1.2vh,0.68rem)] font-medium tracking-[0.2em] uppercase border border-brand-crimson-light hover:bg-brand-crimson-light hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(139,26,26,0.4)] transition-all duration-400 overflow-hidden text-center justify-center min-w-[200px]">
            <span className="relative z-10">Open the Library</span>
          </a>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.7 }}
          className="mt-[5vh] font-serif text-[clamp(0.5rem,1.2vh,0.58rem)] tracking-[0.3em] uppercase text-brand-ink-faded"
        >
          Search deeply &nbsp;·&nbsp; Verify directly &nbsp;·&nbsp; Stay anchored in the source
        </motion.p>
      </div>
    </section>
  );
};

const TrustSection = () => {
  return (
    <section id="trust" className="py-32 px-[5vw] relative overflow-hidden bg-brand-bg">
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-brand-crimson to-transparent" />
      <div className="max-w-[860px] mx-auto flex flex-col md:flex-row gap-8 md:gap-20 items-start">
        <span className="font-serif text-[0.6rem] tracking-[0.3em] uppercase text-brand-crimson-light md:writing-vertical-rl md:rotate-180 self-start md:self-center">
          Guiding Principle
        </span>
        <motion.div
           initial={{ opacity: 0, y: 35 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display text-[clamp(2rem,4vw,3.8rem)] font-bold leading-[1.15] text-brand-parchment mb-6">
            Not trained to <em className="text-brand-gold-bright italic drop-shadow-[0_0_15px_rgba(212,168,67,0.3)]">impress.</em><br/>Built to <span className="text-brand-gold-bright border-b border-brand-gold/30 pb-1">reference.</span>
          </h2>
          <p className="font-sans text-[1.15rem] italic text-brand-ghost leading-[1.9]">
            Most <span className="text-brand-gold-bright font-medium not-italic">AI</span> tools generate confidence. This experience is built for traceability — helping you explore sacred texts through grounded, <span className="text-brand-gold-bright font-medium not-italic">source-linked answers.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const LibrarySection = ({ onOpenPortal }: { onOpenPortal: (link: string) => void }) => {
  return (
    <section id="library" className="py-32 px-[5vw] bg-brand-bg relative">
      <div className="text-center mb-20 max-w-4xl mx-auto">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-[0.6rem] tracking-[0.35em] uppercase text-brand-gold mb-6 block"
        >
          Six Portals
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-[clamp(2.5rem,6vw,6rem)] font-bold leading-none text-brand-parchment"
        >
          Enter the <em className="text-brand-gold-bright italic">Library</em>
        </motion.h2>
      </div>

      <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {NOTEBOOKS.map((notebook, i) => (
          <motion.a
            key={notebook.id}
            href={notebook.link}
            onClick={(e) => {
              e.preventDefault();
              onOpenPortal(notebook.link);
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="group block mb-0 border border-brand-gold/20 bg-gradient-to-b from-brand-bg-raised to-brand-bg p-12 relative overflow-hidden transition-all duration-500 hover:border-brand-gold-bright/50 hover:bg-brand-bg-raised/70 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          >
            <div className="absolute -right-4 -bottom-10 font-display text-[14rem] font-black leading-none text-brand-gold/5 select-none pointer-events-none transition-all duration-1000 ease-in-out group-hover:text-brand-gold/10 group-hover:-translate-y-[70%]">
              0{i + 1}
            </div>
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-crimson to-brand-gold-bright origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
            <div className="font-serif text-[0.58rem] tracking-[0.3em] uppercase text-brand-crimson-light mb-5 flex items-center gap-3 relative z-10">
              {notebook.vol}
              <div className="flex-1 h-[1px] bg-brand-gold/25" />
            </div>
            <h3 className="font-display text-[1.35rem] font-bold text-brand-parchment mb-3 leading-[1.3] relative z-10">
              {notebook.title}
            </h3>
            <p className="font-sans text-[0.92rem] text-brand-ghost leading-[1.75] mb-7 relative z-10">
              {notebook.description}
            </p>
            <div className="inline-flex items-center gap-2.5 font-serif text-[0.6rem] tracking-[0.2em] uppercase text-brand-gold transition-all duration-300 group-hover:text-brand-gold-bright group-hover:gap-4 relative z-10">
              <div className="w-5 h-[1px] bg-current transition-all duration-300 group-hover:w-8" />
              Open Superchat
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

const BenefitsSection = () => {
  const benefits = [
    { num: '1', title: "Source-grounded answers", desc: "Every response traceable to actual passages in the text" },
    { num: '2', title: "Semantic search beyond keywords", desc: "Ask naturally, receive meaningfully from within the corpus" },
    { num: '3', title: "Faster class preparation", desc: "Compress hours of study into precise, referenced inquiry" },
    { num: '4', title: "Focused by collection", desc: "Each portal is curated for depth within its specific corpus" },
    { num: '5', title: "Multilingual accessibility", desc: "Reach across language barriers without losing fidelity" },
    { num: '6', title: "Verifiable in the original", desc: "The source text always remains one click away" }
  ];

  return (
    <section id="benefits" className="py-32 px-[5vw] bg-gradient-to-b from-transparent via-brand-gold/5 to-transparent">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-end mb-20">
          <motion.div
             initial={{ opacity: 0, y: 35 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-serif text-[0.6rem] tracking-[0.35em] uppercase text-brand-gold mb-6 block">Why Study This Way</span>
            <h2 className="font-display text-[clamp(2.5rem,6vw,6rem)] font-bold leading-none text-brand-parchment">
              Six reasons<br/><em className="text-brand-gold-bright italic">it works</em>
            </h2>
          </motion.div>
          <motion.p 
             initial={{ opacity: 0, y: 35 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
             className="font-sans text-[1.1rem] italic text-brand-ghost leading-[1.85] m-0"
          >
            These collections are not generic <span className="text-brand-gold-bright not-italic font-medium">AI</span> chatbots. They are purpose-built study environments grounded entirely in the source texts — <span className="text-brand-gold-bright font-medium not-italic bg-brand-gold/10 px-2 py-0.5 rounded border border-brand-gold/20 shadow-[0_0_15px_rgba(212,168,67,0.1)]">answering from śāstra, not from the statistical center of the internet.</span>
          </motion.p>
        </div>

        <motion.ul 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 border border-brand-gold/25 list-none m-0 p-0"
        >
          {benefits.map((b, i) => (
            <li key={i} className={`flex items-start gap-5 p-8 md:p-10 transition-colors duration-400 hover:bg-brand-gold/5 border-b border-brand-gold/25 ${(i % 2 === 0) ? 'md:border-r border-r-0 md:border-r-brand-gold/25' : ''} ${i >= benefits.length - 2 ? 'md:border-b-0' : ''} ${i === benefits.length - 1 ? 'border-b-0' : ''}`}>
              <div className="font-display text-[2.5rem] font-black text-brand-gold/15 leading-none shrink-0 -mt-1">
                {b.num}
              </div>
              <div>
                <strong className="block font-sans font-medium text-[0.95rem] text-brand-parchment mb-1">
                  {b.title}
                </strong>
                <span className="font-sans text-[0.85rem] italic text-brand-ink-faded">
                  {b.desc}
                </span>
              </div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

const ContrastSection = () => {
  return (
    <section id="contrast" className="py-32 px-[5vw]">
      <div className="max-w-[700px] mx-auto text-center mb-20">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-[0.6rem] tracking-[0.35em] uppercase text-brand-gold mb-6 block"
        >
          A Necessary Distinction
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-[clamp(2.5rem,6vw,6rem)] font-bold leading-[1.05] text-brand-parchment"
        >
          When AI sounds right,<br/><em className="text-brand-gold-bright italic">but isn't</em>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-sans text-[1.1rem] italic text-brand-ghost leading-[1.8] mt-6"
        >
          The difference between a confident answer and a correct one is invisible — until you trace it back to the source.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 bg-brand-bg items-stretch"
      >
        <div className="bg-brand-bg-raised/80 p-10 md:p-14 relative group opacity-70 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100 border border-brand-gold/10">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-brand-gold/25">
            <div className="w-2 h-2 rounded-full shrink-0 bg-brand-ink-faded" />
            <span className="font-serif text-[0.6rem] tracking-[0.25em] uppercase text-brand-ink-faded">Generic <span className="text-brand-gold-bright/70 font-semibold tracking-wider">AI</span> response</span>
          </div>
          <p className="font-display text-[0.9rem] italic font-normal text-brand-ghost mb-6">
            Q: "How many stages of bhakti did Prabhupāda describe?"
          </p>
          <p className="font-sans text-base leading-[1.8] text-brand-ghost mb-6">
            Śrīla Prabhupāda often described devotional service as progressing through five primary stages, beginning with śraddhā and reaching prema through a process of purification and surrender described throughout his books.
          </p>
          <span className="inline-flex items-center gap-2 font-serif text-[0.58rem] tracking-[0.2em] uppercase px-4 py-2 border border-brand-ink-faded/20 text-brand-ink-faded">
            ⚠ No citation · Unverifiable
          </span>
          <span className="block mt-5 font-sans text-[0.82rem] italic text-brand-ink-faded">
            Sounds authoritative. May be partially accurate. Impossible to verify without independent research.
          </span>
        </div>

        <div className="bg-gradient-to-br from-brand-bg-raised to-brand-bg p-10 md:p-14 relative group border border-brand-gold-bright shadow-[0_0_70px_rgba(212,168,67,0.3)] z-10 md:scale-[1.05] ring-2 ring-brand-gold-bright overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold-bright/10 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-crimson/10 blur-3xl rounded-full" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-brand-gold/25">
              <div className="w-2 h-2 rounded-full shrink-0 bg-brand-gold-bright shadow-[0_0_10px_rgba(212,168,67,0.8)] animate-pulse" />
              <span className="font-serif text-[0.6rem] tracking-[0.2em] uppercase text-brand-gold-bright flex items-center justify-center gap-2">
                <span className="bg-brand-crimson border border-brand-crimson-light px-2 py-1 rounded shadow-[0_0_15px_rgba(139,26,26,0.3)] text-[#F2E8D5] font-bold">AI SUPER CHAT</span>
                · source-grounded
              </span>
            </div>
            <p className="font-display text-[0.9rem] italic font-normal text-brand-ghost mb-6">
              Q: "How many stages of bhakti did Prabhupāda describe?"
            </p>
            <p className="font-sans text-base leading-[1.8] text-brand-parchment mb-6">
              According to the <span className="text-brand-gold-bright font-medium underline decoration-brand-gold/50 underline-offset-4">Nectar of Devotion, Chapter 18</span>, Prabhupāda outlines the sixty-four items of devotional service and discusses the progressive stages leading to prema. <span className="inline-block mt-2 sm:mt-0 sm:ml-2 bg-brand-gold/15 px-2 py-0.5 rounded border text-[0.85em] border-brand-gold/30 text-brand-gold-bright shadow-[0_0_15px_rgba(212,168,67,0.15)] font-mono whitespace-nowrap">[Source: NOD Ch. 18, para. 4]</span>
            </p>
            <span className="inline-flex items-center gap-2 font-serif text-[0.58rem] tracking-[0.2em] uppercase px-4 py-2 border border-brand-gold-bright/50 bg-brand-gold/10 text-brand-gold-bright font-bold shadow-[0_0_15px_rgba(212,168,67,0.2)]">
              ✦ Source-linked · Verifiable - with citations
            </span>
            <span className="block mt-5 font-sans text-[0.82rem] italic text-brand-ink-faded">
              Precise and traceable. The passage is cited and accessible within the notebook for direct verification.
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const HowItWorksSection = () => {
  return (
    <section id="how" className="py-32 px-[5vw]">
      <div className="max-w-[1000px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center"
        >
          <span className="font-serif text-[0.6rem] tracking-[0.35em] uppercase text-brand-gold mb-6 block">Methodology</span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,6rem)] font-bold leading-none text-brand-parchment">
            Three layers <em className="text-brand-gold-bright italic">of clarity</em>
          </h2>
        </motion.div>

        <div className="mt-20 grid gap-0 border border-brand-gold/25">
          {[
            {
              num: 'I',
              step: 'Step One',
              title: 'Ask Naturally',
              body: 'Phrase your question as you would to a knowledgeable scholar — in plain language, without Boolean syntax or exact phrase matching. The system understands semantic intent.'
            },
            {
              num: 'II',
              step: 'Step Two',
              title: 'Retrieve from Source',
              body: <>The <span className="text-brand-gold-bright font-medium not-italic bg-brand-gold/10 px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(212,168,67,0.1)] border border-brand-gold/20 text-[0.85em] tracking-wider uppercase">AI SUPER CHAT</span> searches only within the curated texts of each collection. There is no external internet, no hallucinated authority — only what is actually written in the śāstra.</>
            },
            {
              num: 'III',
              step: 'Step Three',
              title: 'Verify in the Text',
              body: 'Every answer arrives with its source reference. Return to the original passage. Read it in full context. The library always leads back to the book.'
            }
          ].map((item, i) => (
            <motion.div 
              key={item.num}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.1 }}
              className={`grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-12 p-12 md:p-14 border-brand-gold/25 items-start transition-colors duration-400 hover:bg-brand-gold/5 ${i < 2 ? 'border-b' : ''}`}
            >
              <div className="font-display text-[5rem] md:text-[5rem] text-[3rem] font-black leading-none text-brand-gold/15 transition-colors duration-400 hover:text-brand-gold/25">
                {item.num}
              </div>
              <div>
                <div className="font-serif text-[0.58rem] tracking-[0.3em] uppercase text-brand-crimson-light mb-3">
                  {item.step}
                </div>
                <h3 className="font-display text-[1.8rem] font-bold text-brand-parchment mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-[0.95rem] italic text-brand-ghost leading-[1.8]">
                  {item.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 px-[5vw] text-center border-t border-brand-gold/25 bg-brand-bg">
      <span className="font-display text-[3.5rem] font-black italic text-brand-gold/25 leading-none mb-10 block">
        B
      </span>
      <div className="font-serif text-[0.72rem] tracking-[0.25em] uppercase text-brand-gold mb-10 flex flex-col sm:flex-row items-center justify-center gap-3">
        Bhaktivedānta 
        <span className="bg-brand-crimson border border-brand-crimson-light text-[#F2E8D5] px-2 py-1 rounded text-[0.65rem] font-bold tracking-widest shadow-[0_0_15px_rgba(139,26,26,0.4)]">AI SUPER CHAT</span>
      </div>
      <div className="w-[120px] h-[1px] bg-gradient-to-r from-transparent via-brand-gold/25 to-transparent mx-auto my-10" />
      <p className="font-sans text-[0.95rem] italic text-brand-ink-faded mb-3">
        Created and maintained by <em className="italic text-brand-gold-bright">Sri Radha Devi Dasi</em>
      </p>
      <p className="font-serif text-[0.75rem] text-brand-gold/60 uppercase tracking-[0.2em] mb-10">
        Made for the pleasure of Śrīla Prabhupāda
      </p>
      <div className="w-[120px] h-[1px] bg-gradient-to-r from-transparent via-brand-gold/25 to-transparent mx-auto my-10" />
      <ul className="flex flex-col md:flex-row justify-center items-center gap-8 list-none mb-10 p-0 m-0">
        {['Library', 'Why It Works', 'How It Works'].map(item => (
          <li key={item}>
            <a 
              href={`#${item.toLowerCase().replace(/ /g, '') === 'whyitworks' ? 'benefits' : item.toLowerCase().replace(/ /g, '') === 'howitworks' ? 'how' : item.toLowerCase()}`}
              className="font-serif text-[0.65rem] tracking-[0.2em] uppercase text-brand-ghost decoration-transparent transition-colors hover:text-brand-gold-bright"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
      <p className="font-sans text-[0.8rem] text-brand-ink-faded/55 leading-[1.9] max-w-[600px] mx-auto">
        This page curates access points for studying Gauḍīya Vaiṣṇava literature.<br/>
        Original source text copyright belongs to its respective holders.
      </p>
    </footer>
  );
};

const InstallPopup = ({ 
  isOpen, 
  onClose, 
  pendingLink, 
  onProceed, 
  deferredPrompt 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  pendingLink: string | null; 
  onProceed: () => void; 
  deferredPrompt: any;
}) => {
  if (!isOpen) return null;

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;

  if (isStandalone && !pendingLink) return null; // If already installed, don't show the initial welcome install prompt

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-bg/95 backdrop-blur-sm" onClick={onClose} />
      
      {/* Directional Arrows based on device */}
      {!deferredPrompt && !isStandalone && (
         isIOS ? (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[110] flex flex-col items-center pointer-events-none drop-shadow-[0_0_15px_rgba(212,168,67,0.5)]"
          >
            <span className="font-serif text-[0.6rem] tracking-[0.2em] uppercase text-brand-gold-bright mb-2 bg-brand-bg-raised/80 px-3 py-1.5 border border-brand-gold/30 rounded backdrop-blur">Tap Share</span>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-brand-gold-bright" strokeWidth="2">
               <path d="M12 4v16m0 0l-6-6m6 6l6-6"/>
            </svg>
          </motion.div>
         ) : (
          <motion.div 
            initial={{ opacity: 0, x: -10, y: 10 }}
            animate={{ opacity: 1, x: [0, 5, 0], y: [0, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="fixed top-4 right-10 z-[110] flex flex-col items-end pointer-events-none drop-shadow-[0_0_15px_rgba(212,168,67,0.5)]"
          >
            <span className="font-serif text-[0.6rem] tracking-[0.2em] uppercase text-brand-gold-bright mb-2 bg-brand-bg-raised/80 px-3 py-1.5 border border-brand-gold/30 rounded backdrop-blur max-w-[120px] text-right">Browser Menu</span>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-brand-gold-bright origin-top-right rotate-45 mr-2" strokeWidth="2">
               <path d="M12 20V4m0 0l-6 6m6-6l6 6"/>
            </svg>
          </motion.div>
         )
      )}

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-brand-bg-raised border border-brand-gold-bright/30 shadow-[0_0_50px_rgba(212,168,67,0.15)] max-w-[500px] w-full p-8 md:p-12 relative z-10"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-brand-gold hover:text-brand-gold-bright transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <h3 className="font-display text-[2.2rem] font-bold text-brand-parchment mb-4 leading-tight text-center">
          Keep the Gateway<br/><em className="text-brand-gold-bright italic">With You</em>
        </h3>
        
        <p className="font-sans text-[1rem] text-brand-ghost leading-[1.6] mb-8 text-center px-4">
          {pendingLink ? "Please bookmark or install this site before entering the portal, so you can always find your way back to these study resources." : "As a first-time visitor, we invite you to save this gateway to your device for easy access to all collections."}
        </p>

        <div className="bg-brand-bg-raised border border-brand-gold/20 p-6 mb-8 text-left">
          <h4 className="font-serif text-[0.65rem] tracking-[0.2em] uppercase text-brand-gold mb-4 text-center">Installation Guide</h4>
          
          {isStandalone ? (
            <div className="text-center font-sans text-[0.9rem] text-brand-gold mb-2">
              ✓ App is currently installed.
            </div>
          ) : deferredPrompt ? (
            <div className="text-center">
              <button 
                onClick={() => deferredPrompt.prompt()}
                className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-brand-gold-bright text-brand-bg font-serif text-[0.7rem] font-bold tracking-[0.2em] uppercase hover:bg-brand-parchment transition-all duration-300 shadow-[0_0_15px_rgba(212,168,67,0.3)]"
              >
                Install App Now
              </button>
            </div>
          ) : isIOS ? (
            <ol className="list-decimal pl-4 font-sans text-[0.9rem] text-brand-parchment space-y-3 marker:text-brand-gold">
              <li>Tap the <span className="inline-flex items-center justify-center w-6 h-6 bg-brand-gold/10 rounded align-middle mx-1"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 15V3m0 0L8.5 6.5M12 3l3.5 3.5M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7"/></svg></span> <strong>Share</strong> icon (pointed out below).</li>
              <li>Scroll down and tap <strong>Add to Home Screen</strong> <span className="inline-flex items-center justify-center w-6 h-6 bg-brand-gold/10 rounded align-middle mx-1"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 4v16m8-8H4"/></svg></span>.</li>
              <li>Tap <strong>Add</strong> in the top right corner.</li>
            </ol>
          ) : (
             <ol className="list-decimal pl-4 font-sans text-[0.9rem] text-brand-parchment space-y-3 marker:text-brand-gold">
              <li>Tap your browser's menu (⋮) or Share icon (pointed out above).</li>
              <li>Select <strong>Add to Home screen</strong> or <strong>Install app</strong>.</li>
              <li>Alternatively, press <strong>Ctrl+D</strong> (or <strong>Cmd+D</strong>) to bookmark this page.</li>
            </ol>
          )}

          {!isStandalone && (
            <div className="mt-6 pt-5 border-t border-brand-gold/10 font-sans text-[0.85rem] italic text-brand-ink-faded leading-[1.6]">
              Once saved, you can launch this gateway directly from your home screen like any app, ensuring the knowledge is always close at hand.
            </div>
          )}
        </div>

        {pendingLink ? (
          <button 
            onClick={onProceed}
            className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 bg-brand-crimson text-[#F2E8D5] font-serif text-[0.75rem] font-bold tracking-[0.2em] uppercase hover:bg-brand-crimson-light transition-all duration-300 shadow-[0_0_20px_rgba(139,26,26,0.3)]"
          >
            I've Saved It — Enter Portal 
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        ) : (
          <button 
            onClick={onClose}
            className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 border border-brand-gold/30 text-brand-gold hover:text-brand-gold-bright hover:bg-brand-gold/10 font-serif text-[0.7rem] font-bold tracking-[0.2em] uppercase transition-all duration-300"
          >
            Continue Exploring Gateway
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default function App() {
  const [showInstallPopup, setShowInstallPopup] = useState(false);
  const [pendingLink, setPendingLink] = useState<string | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    
    if (!hasVisited && !isStandalone) {
      setTimeout(() => setShowInstallPopup(true), 7000);
      localStorage.setItem('hasVisitedBefore', 'true');
    } else if (!hasVisited) {
      localStorage.setItem('hasVisitedBefore', 'true');
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleOpenPortal = (link: string) => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    if (isStandalone) {
      const newWin = window.open(link, '_blank', 'noopener,noreferrer');
      if (!newWin) window.location.href = link;
    } else {
      setPendingLink(link);
      setShowInstallPopup(true);
    }
  };

  const handleProceed = () => {
    if (pendingLink) {
      const newWin = window.open(pendingLink, '_blank', 'noopener,noreferrer');
      if (!newWin) window.location.href = pendingLink;
      setPendingLink(null);
    }
    setShowInstallPopup(false);
  };

  const handleClose = () => {
    setPendingLink(null);
    setShowInstallPopup(false);
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ChapterBreak />
        <TrustSection />
        <LibrarySection onOpenPortal={handleOpenPortal} />
        <SimpleOrnament />
        <BenefitsSection />
        <ContrastSection />
        <HowItWorksSection />
      </main>
      <Footer />
      <AnimatePresence>
        {showInstallPopup && (
          <InstallPopup 
            isOpen={showInstallPopup} 
            onClose={handleClose} 
            pendingLink={pendingLink} 
            onProceed={handleProceed} 
            deferredPrompt={deferredPrompt}
          />
        )}
      </AnimatePresence>
    </>
  );
}
