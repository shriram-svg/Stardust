"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IconX } from "@tabler/icons-react";

interface LightboxProps {
  src: string;
  alt: string;
  description?: string;
  open: boolean;
  onClose: () => void;
}

export default function Lightbox({ src, alt, description, open, onClose }: LightboxProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
              aria-label="Close"
            >
              <IconX size={20} />
            </button>
            <Image
              src={src}
              alt={alt}
              width={1920}
              height={1080}
              unoptimized
              className="h-auto max-h-[80vh] w-full object-contain"
            />
            {(alt || description) && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white">
                  {alt}
                </p>
                {description && (
                  <p className="mt-1 text-sm text-cosmic/60">{description}</p>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
