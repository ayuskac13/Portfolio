import { motion } from "motion/react";
import { Instagram, Twitter, Youtube, MessageSquare } from "lucide-react";

export default function SocialMarketing() {
  const stats = [
    { label: "Followers", value: "50K+" },
    { label: "Engagement", value: "12%" },
    { label: "Reach", value: "1M+" },
    { label: "Campaigns", value: "100+" },
  ];

  return (
    <section id="marketing" className="py-32 px-6 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <h2 className="text-6xl md:text-8xl font-bold tracking-tighter">Social Media <br /> <span className="text-indigo-500">Marketing</span></h2>
              <p className="text-xl text-gray-400 max-w-lg">
                Strategizing and executing high-impact social media campaigns that drive growth and build community.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="space-y-1 group cursor-default">
                  <p className="text-4xl md:text-5xl font-bold tracking-tighter group-hover:text-amber-500 transition-colors duration-500">{stat.value}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <div className="p-4 bg-white/5 rounded-2xl hover:bg-indigo-500/20 hover:border-indigo-500/50 border border-transparent transition-all cursor-pointer">
                <Instagram size={28} />
              </div>
              <div className="p-4 bg-white/5 rounded-2xl hover:bg-blue-500/20 hover:border-blue-500/50 border border-transparent transition-all cursor-pointer">
                <Twitter size={28} />
              </div>
              <div className="p-4 bg-white/5 rounded-2xl hover:bg-red-500/20 hover:border-red-500/50 border border-transparent transition-all cursor-pointer">
                <Youtube size={28} />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-zinc-900 border border-white/5">
                <img src="https://picsum.photos/seed/social1/600/800" alt="Social Media" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
              </div>
              <div className="aspect-square rounded-3xl overflow-hidden bg-zinc-900 border border-white/5">
                <img src="https://picsum.photos/seed/social2/600/600" alt="Social Media" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="aspect-square rounded-3xl overflow-hidden bg-zinc-900 border border-white/5">
                <img src="https://picsum.photos/seed/social3/600/600" alt="Social Media" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
              </div>
              <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-zinc-900 border border-white/5">
                <img src="https://picsum.photos/seed/social4/600/800" alt="Social Media" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
