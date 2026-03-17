"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium tracking-wide transition-all cursor-pointer text-sm px-6 py-3",
  {
    variants: {
      variant: {
        solid: "bg-nebula text-white glow-button hover:bg-nebula/90",
        outline:
          "border border-white/20 text-white hover:bg-white/5 hover:border-white/40",
        ghost: "text-white/70 hover:text-white hover:bg-white/5",
        glow: "bg-nebula text-white glow-button hover:bg-nebula/90 shadow-lg shadow-nebula/30",
      },
    },
    defaultVariants: {
      variant: "solid",
    },
  }
);

interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children">,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

export default function Button({ variant, children, className, ...props }: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={buttonVariants({ variant, className })}
      {...props}
    >
      {children}
    </motion.button>
  );
}
