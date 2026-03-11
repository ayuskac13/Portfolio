import { motion } from "motion/react";

export default function Skills() {
  const skillCategories = [
    {
      title: "Front-End Development",
      description: "Building engaging and user-friendly web interfaces using modern frameworks.",
      skills: ["HTML5", "JavaScript", "TypeScript", "Next.js", "React", "Redux"],
      color: "bg-orange-500/10 text-orange-500"
    },
    {
      title: "Styling & Design",
      description: "Crafting visually appealing and responsive designs with advanced tools.",
      skills: ["CSS3", "Tailwind", "Bootstrap", "Sass", "Material UI"],
      color: "bg-blue-500/10 text-blue-500"
    },
    {
      title: "Back-End Development",
      description: "Developing robust server-side logic and APIs to power dynamic applications.",
      skills: ["Node.js", "Express", "Django"],
      color: "bg-green-500/10 text-green-500"
    },
    {
      title: "Web Animations",
      description: "Creating seamless animations and transitions to enhance user engagement.",
      skills: ["Motion", "GSAP"],
      color: "bg-purple-500/10 text-purple-500"
    },
    {
      title: "Database Management",
      description: "Designing and managing databases to ensure secure and efficient storage.",
      skills: ["MySQL", "PostgreSQL", "MongoDB", "Firebase"],
      color: "bg-yellow-500/10 text-yellow-500"
    },
    {
      title: "Cloud & Deployment",
      description: "Experienced in deploying and managing applications using modern cloud platforms.",
      skills: ["Docker", "Azure", "AWS", "Google Cloud", "Vercel"],
      color: "bg-cyan-500/10 text-cyan-500"
    }
  ];

  return (
    <section id="skills" className="py-32 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="text-center mb-20 space-y-4"
        >
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter">Skills that fuel my passion</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A comprehensive toolkit of technologies and methodologies I use to bring creative visions to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={idx}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 bg-zinc-900/50 border border-white/5 rounded-[2rem] hover:border-amber-500/50 transition-all duration-500 group"
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight group-hover:text-amber-500 transition-colors">{category.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{category.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="px-3 py-1 bg-white/5 rounded-full text-xs font-mono tracking-wider text-gray-300 group-hover:text-white transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
