"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { HelpCircle, MapPin, Calculator } from "lucide-react";

export default function FloatingIcons() {
  const [hovered, setHovered] = useState<string | null>(null);

  const icons = [
    { id: "location", icon: <MapPin size={20} />, label: "Locate Us" },
    { id: "help", icon: <HelpCircle size={20} />, label: "Help" },
    { id: "calculator", icon: <Calculator size={20} />, label: "Calculator" },
  ];

  return (
    <div className="fixed right-4 top-1/3 z-50 flex flex-col items-end gap-3">
      {icons.map(({ id, icon, label }) => (
        <motion.div
          key={id}
          onMouseEnter={() => setHovered(id)}
          onMouseLeave={() => setHovered(null)}
          className="flex items-center gap-2 cursor-pointer"
          whileHover={{ x: -10 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {/* Label box */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: hovered === id ? 1 : 0,
              x: hovered === id ? 0 : 20,
            }}
            transition={{ duration: 0.25 }}
            className={`bg-white text-gray-800 text-sm font-medium rounded-lg shadow-md px-3 py-1 whitespace-nowrap ${
              hovered === id ? "block" : "hidden"
            }`}
          >
            {label}
          </motion.div>

          {/* Icon circle */}
          <div className="bg-black hover:bg-yellow-400 text-white hover:text-black p-3 rounded-full shadow-md transition-all duration-300">
            {icon}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
