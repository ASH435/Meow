import { motion, useScroll, useTransform, useInView } from 'motion/react';
import React, { useRef, useState, useEffect } from 'react';
import { Heart, Volume2, ArrowDown, Sparkles, Stars, Quote } from 'lucide-react';

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const speak = () => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance("I love my mom and dad");
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      // Filter for a warmer voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.lang.includes('en-US') && v.name.includes('Samantha')) || voices[0];
      if (preferredVoice) utterance.voice = preferredVoice;
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStart = () => {
    setHasStarted(true);
    speak();
  };

  if (!hasStarted) {
    return (
      <div id="welcome-overlay" className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-warm-bg">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 max-w-md"
        >
          <Heart className="w-16 h-16 text-gold mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl text-warm-ink mb-4 italic">For the ones who gave me everything.</h1>
          <p className="text-warm-ink/60 mb-8 font-light tracking-wide">Please turn up your volume and enter.</p>
          <button 
            onClick={handleStart}
            id="enter-btn"
            className="px-8 py-3 bg-gold text-white rounded-full font-medium tracking-widest uppercase text-xs hover:bg-gold/90 transition-all shadow-lg hover:shadow-gold/20"
          >
            Enter the Tribute
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <main ref={containerRef} className="relative">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-20 overflow-hidden">
        <Stars className="absolute top-10 left-1/4 text-gold/30 w-12 h-12" />
        <Sparkles className="absolute bottom-20 right-1/4 text-gold/30 w-16 h-16" />
      </div>

      {/* Progress Bar */}
      <ScrollProgress />

      {/* Hero Section */}
      <section id="hero" className="h-screen flex items-center justify-center relative overflow-hidden px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="text-center z-10"
        >
          <p className="text-gold tracking-[0.3em] uppercase text-xs mb-4">Dedicated to</p>
          <h1 className="text-7xl md:text-9xl text-warm-ink mb-8 leading-tight">
            Mom <span className="text-gold">&</span> Dad
          </h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="flex flex-col items-center"
          >
            <p className="text-warm-ink/40 text-sm tracking-widest uppercase mb-12">Scroll to explore my gratitude</p>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowDown className="text-gold w-6 h-6" />
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Parallax Image Background */}
        <div className="absolute inset-0 z-0 overflow-hidden opacity-10">
            <img 
              src="/Screenshot_20251217_180200.jpg" 
              alt="Family Tribute"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1200";
              }}
              className="w-full h-full object-cover scale-110"
              referrerPolicy="no-referrer"
            />
        </div>
      </section>

      {/* Section: Mom */}
      <SectionWrapper id="mom" bgColor="bg-soft-rose/20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-full h-full border border-gold translate-x-2 -translate-y-2 z-0" />
            <img 
              src="/IMG_20220102_204802.jpg" 
              alt="Mom"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1594132410311-64906963c63c?auto=format&fit=crop&q=80&w=800";
              }}
              className="relative z-10 w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 aspect-[3/4] object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-5xl md:text-7xl font-serif text-warm-ink tracking-tight">To My Dearest Mother,</h2>
            <Quote className="text-gold w-10 h-10 opacity-50" />
            <p className="text-xl md:text-2xl text-warm-ink/80 leading-relaxed font-light italic">
              "Your heart is the first place I knew love. Your arms are the safest place in the world. Thank you for every prayer, every meal, and every sacrifice you made to see me smile."
            </p>
            <p className="text-base text-warm-ink/60 leading-loose">
              You are the glue that holds our family together. Your strength is silent but unbreakable. I am who I am because of your endless patience and grace.
            </p>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Section: Dad */}
      <SectionWrapper id="dad" bgColor="bg-gold/5">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-6 order-2 md:order-1"
          >
            <h2 className="text-5xl md:text-7xl font-serif text-warm-ink tracking-tight">To My Dearest Father,</h2>
            <Quote className="text-gold w-10 h-10 opacity-50" />
            <p className="text-xl md:text-2xl text-warm-ink/80 leading-relaxed font-light italic">
              "You are my first hero and my forever guide. You taught me that strength isn't just about power, but about the shoulders you provide for others to lean on."
            </p>
            <p className="text-base text-warm-ink/60 leading-loose">
              Thank you for working so hard to give me the life I have. For the wisdom in your silence and the warmth in your protection. You inspired me to be brave.
            </p>
          </motion.div>
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative order-1 md:order-2"
          >
             <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold translate-x-2 -translate-y-2 z-0" />
            <img 
              src="/IMG_20200203_230422.jpg" 
              alt="Dad"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=800";
              }}
              className="relative z-10 w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 aspect-[3/4] object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Together Section */}
      <section id="together" className="py-32 px-6 text-center bg-warm-bg relative">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="max-w-4xl mx-auto space-y-12"
        >
          <Sparkles className="mx-auto text-gold w-12 h-12" />
          <h2 className="text-6xl md:text-8xl italic">The Greatest Team</h2>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
          >
            <img 
              src="/FB_IMG_1767514274526.jpg" 
              alt="Family Together" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&q=80&w=800";
              }}
              className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
            <div className="glass p-8 rounded-3xl max-w-sm">
                <h3 className="text-2xl mb-4 text-gold">Infinite Love</h3>
                <p className="text-sm text-warm-ink/70">The way you look at each other taught me what true partnership means.</p>
            </div>
            <div className="glass p-8 rounded-3xl max-w-sm mt-0 md:mt-12">
                <h3 className="text-2xl mb-4 text-gold">Sacrifice</h3>
                <p className="text-sm text-warm-ink/70">You built a world for me out of your own dreams and hard work.</p>
            </div>
            <div className="glass p-8 rounded-3xl max-w-sm">
                <h3 className="text-2xl mb-4 text-gold">Guidance</h3>
                <p className="text-sm text-warm-ink/70">No matter how far I go, your voices are the compass that brings me home.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Final Section */}
      <section id="final" className="h-screen flex items-center justify-center bg-warm-ink text-warm-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#c5a35822,transparent_70%)]" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-center z-10 px-6"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="inline-block mb-8"
          >
            <Heart className="w-24 h-24 text-gold fill-gold" />
          </motion.div>
          
          <h2 className="text-7xl md:text-9xl mb-6">I Love You</h2>
          <p className="text-gold text-lg md:text-2xl tracking-[0.5em] uppercase">Mom & Dad</p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={speak}
            id="speak-again-btn"
            className="mt-16 flex items-center gap-3 mx-auto border border-gold/30 px-6 py-3 rounded-full hover:bg-gold/10 transition-all text-xs uppercase tracking-widest text-gold"
          >
            <Volume2 className="w-4 h-4" /> Listen Again
          </motion.button>
        </motion.div>

        {/* Footer */}
        <div className="absolute bottom-10 left-0 w-full text-center text-[10px] uppercase tracking-[1em] text-warm-bg/20">
          Always & Forever
        </div>
      </section>
    </main>
  );
}

function SectionWrapper({ children, id, bgColor = 'bg-transparent' }: { children: React.ReactNode, id: string, bgColor?: string }) {
  return (
    <section id={id} className={`py-24 md:py-48 px-6 md:px-24 ${bgColor}`}>
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-gold z-[100] origin-left"
      style={{ scaleX }}
    />
  );
}
