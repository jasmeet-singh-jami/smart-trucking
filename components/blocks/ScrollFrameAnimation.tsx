"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useMotionValueEvent, type MotionValue } from "framer-motion";

interface ScrollFrameAnimationProps {
  scrollProgress: MotionValue<number>;
  frameCount: number;
  framePath?: (i: number) => string;
}

const defaultFramePath = (i: number) =>
  `/frames/frame_${String(i + 1).padStart(4, "0")}.webp`;

export function ScrollFrameAnimation({
  scrollProgress,
  frameCount,
  framePath = defaultFramePath,
}: ScrollFrameAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = framePath(i);
      imgs.push(img);
    }
    imagesRef.current = imgs;

    const first = imgs[0];
    const drawFirst = () => drawFrame(0);
    if (first.complete && first.naturalWidth > 0) {
      drawFirst();
    } else {
      first.addEventListener("load", drawFirst, { once: true });
    }
  }, [frameCount, framePath]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
  }, []);

  useMotionValueEvent(scrollProgress, "change", (v) => {
    if (reducedMotion) return;
    const clamped = Math.min(1, Math.max(0, v));
    const idx = Math.round(clamped * (frameCount - 1));
    if (idx === currentFrameRef.current) return;
    currentFrameRef.current = idx;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => drawFrame(idx));
  });

  function drawFrame(idx: number) {
    const canvas = canvasRef.current;
    const img = imagesRef.current[idx];
    if (!canvas || !img) return;
    if (!img.complete || img.naturalWidth === 0) {
      img.addEventListener("load", () => drawFrame(idx), { once: true });
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const ir = iw / ih;
    const cr = cw / ch;
    let dw: number, dh: number, dx: number, dy: number;
    if (ir > cr) {
      dh = ch;
      dw = ch * ir;
      dx = (cw - dw) / 2;
      dy = 0;
    } else {
      dw = cw;
      dh = cw / ir;
      dx = 0;
      dy = (ch - dh) / 2;
    }
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full block"
    />
  );
}
