import { motion } from "motion/react";

export default function About() {
  return (
    <section id="about" className="py-32 px-6 bg-zinc-950 text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="relative group"
          >
            <div className="relative z-10 aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://picsum.photos/seed/ayuska-portrait/800/800" 
                alt="Ayuska Portrait" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -inset-4 border border-indigo-500/20 rounded-[3.5rem] -z-10 group-hover:scale-105 transition-transform duration-700" />
          </motion.div>

          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <h2 className="text-6xl md:text-8xl font-bold tracking-tighter italic font-serif text-amber-500">About Me</h2>
              <p className="text-2xl md:text-4xl font-medium leading-tight tracking-tight text-white/90">
                I'm Ayuska Choudhary—a content creator and engineer. 
                Whether I'm scripting videos, designing posters or building AI systems, 
                I live for <span className="text-indigo-500">functional designs</span> and eye-catching visuals.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Location</p>
                <p className="text-xl font-bold">Mumbai, India</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Role</p>
                <p className="text-xl font-bold">Creative Developer</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Education</p>
                <p className="text-xl font-bold">Engineering Student</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Focus</p>
                <p className="text-xl font-bold">AI & Design</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
