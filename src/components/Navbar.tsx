import { motion } from "motion/react";
import { Home, User, Briefcase, Code, Image as ImageIcon, Mail, Github, Instagram, Linkedin, FileText, Globe } from "lucide-react";

export default function Navbar() {
  const navItems = [
    { icon: <Home size={20} />, label: "Home", href: "#home" },
    { icon: <User size={20} />, label: "About", href: "#about" },
    { icon: <Briefcase size={20} />, label: "Work", href: "#work" },
    { icon: <ImageIcon size={20} />, label: "Design", href: "#design" },
    { icon: <Code size={20} />, label: "Skills", href: "#skills" },
    { icon: <Mail size={20} />, label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 md:px-6 py-2 md:py-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-3 md:gap-6 shadow-2xl max-w-[95vw] md:max-w-none overflow-x-auto no-scrollbar"
    >
      {navItems.map((item, idx) => (
        <a 
          key={idx} 
          href={item.href}
          className="text-white/60 hover:text-white transition-colors duration-300 flex flex-col items-center gap-1 group shrink-0"
        >
          <div className="p-1 md:p-0">
            {item.icon}
          </div>
          <span className="text-[8px] md:text-[10px] uppercase tracking-widest font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
            {item.label}
          </span>
        </a>
      ))}
      <div className="w-px h-6 bg-white/10 mx-1 md:mx-2 shrink-0" />
      <div className="flex items-center gap-3 md:gap-4 shrink-0">
        <a href="https://github.com" className="text-white/60 hover:text-white transition-colors"><Github size={16} /></a>
        <a href="https://instagram.com" className="text-white/60 hover:text-white transition-colors"><Instagram size={16} /></a>
        <a href="https://linkedin.com" className="text-white/60 hover:text-white transition-colors"><Linkedin size={16} /></a>
      </div>
    </motion.nav>
  );
}
