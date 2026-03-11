import { motion } from "motion/react";
import { ArrowRight, Mail, Instagram, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-black text-white pt-32 pb-40 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="space-y-8"
          >
            <p className="text-sm font-mono uppercase tracking-widest text-gray-500">That's all for now.</p>
            <h2 className="text-7xl md:text-9xl font-bold tracking-tighter leading-none">
              Got a project <br /> in mind? <br /> <span className="text-indigo-500">Let's talk</span>
            </h2>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="flex items-center justify-center lg:justify-end"
          >
            <button className="w-64 h-64 rounded-full bg-indigo-600 hover:bg-indigo-500 transition-all duration-500 flex items-center justify-center group relative overflow-hidden">
              <span className="text-2xl font-bold z-10">Get in touch</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="absolute text-2xl font-bold text-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">Get in touch</span>
            </button>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-20 border-t border-white/10 gap-8">
          <div className="space-y-2">
            <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Email</p>
            <a href="mailto:ayuskac13@gmail.com" className="text-2xl font-bold hover:text-indigo-400 transition-colors">ayuskac13@gmail.com</a>
          </div>

          <div className="flex items-center gap-8">
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Github size={24} /></a>
          </div>
        </div>

        <div className="mt-32 flex justify-between items-center">
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter">your friendly chaos creator</h3>
          <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
            <ArrowRight className="-rotate-45" />
          </div>
        </div>
      </div>
    </footer>
  );
}
