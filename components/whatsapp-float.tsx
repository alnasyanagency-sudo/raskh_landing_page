"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export function WhatsappFloat() {
  return (
    <motion.a
      href="https://wa.me/966500000000"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.4, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
      
      {/* Second pulse ring */}
      <motion.span
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-30"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main button */}
      <div className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-[#25D366]/30">
        <MessageCircle className="w-7 h-7 text-white fill-white" />
      </div>

      {/* Tooltip */}
      <motion.div
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-foreground text-background text-sm font-medium rounded-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200"
        initial={{ y: 10 }}
        whileHover={{ y: 0 }}
      >
        تواصل معنا
        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
      </motion.div>
    </motion.a>
  )
}
