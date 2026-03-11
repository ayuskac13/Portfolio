import { motion } from "motion/react";

export default function GraphicDesign() {
  const designs = [
    { src: "https://picsum.photos/seed/burger/600/800", title: "Spicy Tangy Chicken", span: "row-span-2" },
    { src: "https://picsum.photos/seed/model/600/900", title: "Adele Rye", span: "row-span-3" },
    { src: "https://picsum.photos/seed/plants/600/700", title: "Window Garden", span: "row-span-2" },
    { src: "https://picsum.photos/seed/phone/600/600", title: "Can We Talk?", span: "row-span-1" },
    { src: "https://picsum.photos/seed/coke/600/800", title: "Coca Cola", span: "row-span-2" },
    { src: "https://picsum.photos/seed/art/600/900", title: "Cultural Art", span: "row-span-3" },
    { src: "https://picsum.photos/seed/vinyl/600/600", title: "Nritya", span: "row-span-1" },
    { src: "https://picsum.photos/seed/mood/600/800", title: "Mood Board", span: "row-span-2" },
    { src: "https://picsum.photos/seed/brutal/600/600", title: "Occupy", span: "row-span-1" },
  ];

  return (
    <section id="design" className="py-32 px-6 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="mb-20"
        >
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter">Graphic Designs</h2>
          <p className="text-gray-500 mt-4 text-lg">A collection of visual stories and branding identities.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4">
          {designs.map((design, idx) => (
            <motion.div 
              key={idx}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              className={`${design.span} relative group rounded-2xl overflow-hidden border border-white/5`}
            >
              <img 
                src={design.src} 
                alt={design.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <p className="text-sm font-bold tracking-widest uppercase">{design.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
