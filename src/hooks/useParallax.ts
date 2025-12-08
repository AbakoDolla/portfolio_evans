import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface ParallaxOptions {
  offset?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function useParallax(options: ParallaxOptions = {}) {
  const { offset = 50, direction = "up" } = options;
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const getTransform = (): MotionValue<number> => {
    switch (direction) {
      case "up":
        return useTransform(scrollYProgress, [0, 1], [offset, -offset]);
      case "down":
        return useTransform(scrollYProgress, [0, 1], [-offset, offset]);
      case "left":
        return useTransform(scrollYProgress, [0, 1], [offset, -offset]);
      case "right":
        return useTransform(scrollYProgress, [0, 1], [-offset, offset]);
      default:
        return useTransform(scrollYProgress, [0, 1], [offset, -offset]);
    }
  };

  const y = direction === "up" || direction === "down" ? getTransform() : undefined;
  const x = direction === "left" || direction === "right" ? getTransform() : undefined;

  return { ref, y, x, scrollYProgress };
}

export function useParallaxMultiple() {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return { ref, y1, y2, y3, opacity, scale, rotate, scrollYProgress };
}
