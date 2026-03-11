import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="min-h-screen relative flex flex-col items-center justify-center pt-20 px-6 overflow-hidden bg-black text-white">
      {/* Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none opacity-10">
        <h2 className="text-[20vw] font-bold leading-none tracking-tighter uppercase">AYUSKA</h2>
      </div>

      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <p className="text-indigo-500 font-mono text-sm tracking-widest uppercase">Passionate Creative Designer & Developer</p>
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.85]">
              Ayuska <br /> Choudhary
            </h1>
          </div>
          
          <div className="flex flex-col gap-4 max-w-md">
            <p className="text-xl text-gray-400 leading-relaxed">
              Social Media Strategist, Creative Developer & Designer. 
              Driven by curiosity and a love for design, I create simple, functional, and visually striking digital experiences.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <button className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-indigo-500 hover:text-white transition-all duration-500 flex items-center gap-2 group">
                Explore Work <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-medium">
                2+ Years of <br /> Experience
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10"
        >
          <img 
            src="https://picsum.photos/seed/ayuska/1200/1500" 
            alt="Ayuska Choudhary" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </motion.div>
      </div>

      {/* Role Labels - Responsive positioning */}
      <div className="absolute bottom-10 right-6 md:bottom-20 md:right-10 z-20">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-right space-y-1"
        >
          <p className="text-2xl md:text-4xl font-bold tracking-tighter opacity-50">Social Media Strategist</p>
          <p className="text-2xl md:text-4xl font-bold tracking-tighter text-indigo-500">Creative Developer</p>
          <p className="text-2xl md:text-4xl font-bold tracking-tighter">& Designer</p>
        </motion.div>
      </div>
    </section>
  );
}
