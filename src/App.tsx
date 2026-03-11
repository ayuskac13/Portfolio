import { motion, useScroll, useSpring } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import GraphicDesign from "./components/GraphicDesign";
import Skills from "./components/Skills";
import SocialMarketing from "./components/SocialMarketing";
import Footer from "./components/Footer";
import VoxelBurger from "./components/VoxelBurger";
import VoxelRoom from "./components/VoxelRoom";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="bg-black selection:bg-indigo-500 selection:text-white">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-500 origin-left z-[100]"
        style={{ scaleX }}
      />

      <Navbar />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Hero />
        
        <About />

        <div className="px-6 py-20 bg-black">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <VoxelBurger />
            <VoxelRoom />
          </div>
        </div>

        <Projects />
        
        <SocialMarketing />

        <GraphicDesign />
        
        <Skills />
        
        <Footer />
      </motion.div>
    </main>
  );
}
