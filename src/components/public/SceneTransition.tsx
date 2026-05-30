"use client";
// PATH: src/components/public/SceneTransition.tsx

import { motion, AnimatePresence } from "framer-motion";
import type { TransitionType } from "@/types";
import type {TargetAndTransition, Transition} from "framer-motion";

type Props = {
  children: React.ReactNode;
  sceneKey: string | number;
  transition: TransitionType;
  direction?: 1 | -1;
};

type VariantFn = (dir: number) => TargetAndTransition;

const VARIANTS: Record<TransitionType, {
  enter: VariantFn;
  center: TargetAndTransition;
  exit: VariantFn;
}> = {
  fade: {
    enter: () => ({ opacity: 0 }),
    center:      { opacity: 1 },
    exit:  () => ({ opacity: 0 }),
  },
  "slide-up": {
    enter: (dir) => ({ opacity: 0, y: dir > 0 ? "100%" : "-100%" }),
    center:          { opacity: 1, y: 0 },
    exit:  (dir) => ({ opacity: 0, y: dir > 0 ? "-100%" : "100%" }),
  },
  "slide-left": {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? "100%" : "-100%" }),
    center:          { opacity: 1, x: 0 },
    exit:  (dir) => ({ opacity: 0, x: dir > 0 ? "-100%" : "100%" }),
  },
  "zoom-in": {
    enter: () => ({ opacity: 0, scale: 0.88 }),
    center:      { opacity: 1, scale: 1 },
    exit:  () => ({ opacity: 0, scale: 1.08 }),
  },
  curtain: {
    enter: () => ({ opacity: 0, scaleY: 0 }),
    center:      { opacity: 1, scaleY: 1 },
    exit:  () => ({ opacity: 0, scaleY: 0 }),
  },
};

const SPRING: Transition = {
  type: "spring",
  stiffness: 280,
  damping: 30,
};

const EASE: Transition = {
  duration: 0.55,
  ease: [0.4, 0, 0.2, 1],
};

export default function SceneTransition({ children, sceneKey, transition, direction = 1 }: Props) {
  const v = VARIANTS[transition] ?? VARIANTS.fade;
  const isSpring = transition === "slide-up" || transition === "slide-left";

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={sceneKey}
        initial={v.enter(direction)}
        animate={v.center}
        exit={v.exit(direction)}
        transition={isSpring ? SPRING : EASE}
        className="w-full h-full"
        style={{ willChange: "transform, opacity" }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}