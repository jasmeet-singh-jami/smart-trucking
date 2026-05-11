"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { ScrollFrameAnimation } from "@/components/blocks/ScrollFrameAnimation";

const FRAME_COUNT = 121;

export function ScrollHomepage() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const scrollToServices = () => {
    const el = sectionRef.current;
    if (!el) return;
    const sectionTop = el.getBoundingClientRect().top + window.scrollY;
    const scrollRange = el.scrollHeight - window.innerHeight;
    // 0.32 = scrollYProgress where second overlay reaches full opacity
    window.scrollTo({ top: sectionTop + scrollRange * 0.32, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-slate-50 via-white to-white"
      style={{ minHeight: "500vh" }}
    >
      <noscript>
        <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <img
            src="/frames/frame_0001.webp"
            alt="Smart Trucking Services"
            className="mb-8 max-w-3xl w-full rounded-xl"
          />
          <h1 className="font-heading text-4xl font-extrabold text-navy">
            Your One-Stop Shop for Trucking Compliance & Permits
          </h1>
          <p className="mt-4 max-w-xl text-slate-600">
            Serving US-Canada carriers from Brampton, ON since 2014.
          </p>
        </div>
      </noscript>

      <div className="sticky top-0 h-screen overflow-hidden">
        <ScrollFrameAnimation
          scrollProgress={scrollYProgress}
          frameCount={FRAME_COUNT}
        />

        {/* Top + bottom vignettes for legibility against bright frames */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[40vh] bg-gradient-to-b from-white/85 via-white/40 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-white/85 via-white/40 to-transparent" />

        <Overlay
          scroll={scrollYProgress}
          input={[0, 0.14, 0.22]}
          opacity={[1, 1, 0]}
          y={[0, 0, -24]}
        >
          <Card>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/10 px-4 py-2 text-sm font-medium text-orange">
              <span className="h-2 w-2 animate-pulse rounded-full bg-orange" />
              Canada's Trusted Trucking Consultants
            </div>
            <h1 className="mt-6 font-heading text-4xl font-extrabold leading-tight text-navy sm:text-5xl lg:text-6xl">
              Your One-Stop Shop for{" "}
              <span className="text-orange">Trucking Compliance</span> & Permits
            </h1>
            <p className="mt-6 text-lg text-slate-700 sm:text-xl">
              Serving US–Canada carriers from Brampton, ON since 2014.
            </p>
            <button
              onClick={scrollToServices}
              className="mt-10 cursor-pointer text-sm uppercase tracking-widest text-slate-400 transition-colors hover:text-orange"
            >
              Scroll to explore ↓
            </button>
          </Card>
        </Overlay>

        <Overlay
          scroll={scrollYProgress}
          input={[0.24, 0.32, 0.46, 0.54]}
          opacity={[0, 1, 1, 0]}
          y={[24, 0, 0, -24]}
        >
          <Card>
            <p className="text-sm font-semibold uppercase tracking-widest text-orange">
              What we do
            </p>
            <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight text-navy sm:text-4xl lg:text-5xl">
              Permits, authorities, IFTA, eManifest &amp;{" "}
              <span className="text-orange">training</span> — all under one roof.
            </h2>
            <p className="mt-6 text-lg text-slate-700">
              Company registration, US/Canada authorities, oversize permits, and
              compliance support, handled end-to-end.
            </p>
            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-6 py-3 font-semibold text-navy backdrop-blur transition-colors hover:border-navy"
            >
              Explore Services <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>
        </Overlay>

        <Overlay
          scroll={scrollYProgress}
          input={[0.56, 0.64, 0.74, 0.82]}
          opacity={[0, 1, 1, 0]}
          y={[24, 0, 0, -24]}
        >
          <Card>
            <p className="text-sm font-semibold uppercase tracking-widest text-orange">
              Why carriers choose us
            </p>
            <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight text-navy sm:text-4xl lg:text-5xl">
              A decade of moving fleets across the border.
            </h2>
            <p className="mt-6 text-lg text-slate-700">
              Bilingual support, dedicated case managers, and the paperwork
              experience to keep your trucks rolling — not waiting.
            </p>
          </Card>
        </Overlay>

        <Overlay
          scroll={scrollYProgress}
          input={[0.84, 0.92, 1]}
          opacity={[0, 1, 1]}
          y={[24, 0, 0]}
        >
          <Card>
            <h2 className="font-heading text-3xl font-extrabold leading-tight text-navy sm:text-4xl lg:text-5xl">
              Ready when you are.
            </h2>
            <p className="mt-4 text-lg text-slate-700">
              Talk to a consultant in minutes — no obligation.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-orange px-8 py-4 font-semibold text-white shadow-lg shadow-orange/20 transition-colors hover:bg-orange-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2"
              >
                <Phone className="h-5 w-5" />
                Get a Free Consultation
              </Link>
              <a
                href="tel:9055816105"
                className="font-semibold text-navy hover:text-orange"
              >
                or call 905-581-6105
              </a>
            </div>
          </Card>
        </Overlay>
      </div>
    </section>
  );
}

interface OverlayProps {
  scroll: MotionValue<number>;
  input: number[];
  opacity: number[];
  y: number[];
  children: ReactNode;
}

function Overlay({ scroll, input, opacity, y, children }: OverlayProps) {
  const o = useTransform(scroll, input, opacity);
  const yT = useTransform(scroll, input, y);
  const pointerEvents = useTransform(o, (v) => (v > 0.05 ? "auto" : "none"));
  return (
    <motion.div
      style={{ opacity: o, y: yT, pointerEvents }}
      className="absolute inset-0 flex items-center justify-center px-6 sm:px-8"
    >
      {children}
    </motion.div>
  );
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl rounded-2xl bg-white/70 px-8 py-10 text-center shadow-xl shadow-slate-900/5 ring-1 ring-slate-200/60 backdrop-blur-md sm:px-12 sm:py-12">
      {children}
    </div>
  );
}
