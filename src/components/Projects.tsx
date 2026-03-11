import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "Ram Corrugated Boxes Website",
      category: "Web Development",
      image: "https://picsum.photos/seed/packaging/800/600",
      description: "Premium Corrugated Packaging Solutions."
    },
    {
      title: "UI/UX Prototyping",
      category: "Design",
      image: "https://picsum.photos/seed/uiux/800/600",
      description: "Introducing ZONA, Angola's first Hard Seltzer brand."
    },
    {
      title: "Graphic Designs",
      category: "Branding",
      image: "https://picsum.photos/seed/graphic/800/600",
      description: "Creating brands impossible to ignore."
    },
    {
      title: "3D Models and Simulation",
      category: "Engineering",
      image: "https://picsum.photos/seed/3d/800/600",
      description: "Functional designs and pretty, eye-catching visuals."
    },
    {
      title: "AI Generated Images",
      category: "AI Art",
      image: "https://picsum.photos/seed/ai/800/600",
      description: "Exploring the boundaries of generative art."
    },
    {
      title: "Video Editing",
      category: "Content Creation",
      image: "https://picsum.photos/seed/video/800/600",
      description: "Scripting and editing high-impact video content."
    }
  ];

  return (
    <section id="work" className="py-32 px-6 bg-white text-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="space-y-4"
          >
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">Impressive <br /> Works</h2>
            <p className="text-gray-500 max-w-md text-lg">
              A selection of projects that showcase my passion for design and development, reflecting creativity and innovation.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="hidden md:block text-right"
          >
            <p className="text-sm font-mono uppercase tracking-widest text-gray-400 mb-4">Explore More</p>
            <button className="w-16 h-16 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all duration-500">
              <ArrowRight />
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 bg-gray-100">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
              </div>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold tracking-tight">{project.title}</h3>
                  <p className="text-gray-500">{project.description}</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <ArrowRight size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
