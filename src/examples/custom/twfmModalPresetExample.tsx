import { motion } from "framer-motion";
import type { ModalLayout } from "modal-stack";
import React from "react";

const STACK_OFFSET = 80;
const SCALE_STEP = 0.06;
const OPACITY_STEP = 0.08;

export const twfmModalLayoutExample: ModalLayout = {
  Background: ({
    children,
    onClose,
  }: {
    children: React.ReactNode;
    onClose: () => void;
  }) => {
    React.useEffect(() => {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keyup", onKey);
      return () => window.removeEventListener("keyup", onKey);
    }, [onClose]);

    return (
      <motion.div
        className="fixed inset-0 z-1000 flex items-center justify-center backdrop-blur-md"
        style={{
          background:
            "linear-gradient(to bottom right, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      >
        <motion.div
          className="absolute inset-0 bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </motion.div>
    );
  },

  ModalWrap: ({
    children,
    depth,
    isTop,
  }: {
    children: React.ReactNode;
    depth: number;
    isTop: boolean;
  }) => {
    const x = -depth * STACK_OFFSET;
    const scale = 1 - depth * SCALE_STEP;
    const opacity = 1 - depth * OPACITY_STEP;

    return (
      <motion.div
        className="absolute w-auto max-w-[90vw] rounded-3xl bg-white p-8 ring-1 ring-black/5"
        style={{
          left: "50%",
          top: "50%",
          pointerEvents: isTop ? "auto" : "none",
          background:
            "linear-gradient(to bottom right, white, white, rgb(249, 250, 251))",
          boxShadow: isTop
            ? "0 20px 70px -10px rgba(0,0,0,0.3), 0 0 0 1px rgba(99,102,241,0.1)"
            : "0 10px 40px -10px rgba(0,0,0,0.2)",
        }}
        initial={{
          opacity: 0,
          scale: 0.9,
          x: "-50%",
          y: "-45%",
        }}
        animate={{
          opacity,
          scale,
          x: `calc(-50% + ${x}px)`,
          y: "-50%",
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
          x: "-50%",
          y: "-45%",
        }}
        transition={{
          type: "spring",
          stiffness: 280,
          damping: 28,
          mass: 0.8,
        }}
      >
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom right, rgba(99, 102, 241, 0.05), transparent, rgba(168, 85, 247, 0.05))",
          }}
        />
        <div
          className="absolute -top-px left-1/2 -translate-x-1/2 w-1/2 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(99, 102, 241, 0.5), transparent)",
          }}
        />

        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  },
};
