import { useEffect, useRef } from "react";

export function Field() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const surface = canvas;
    const draw = ctx;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0, y: 0, on: false };
    let frame = 0;
    let running = true;

    const accent =
      getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim() || "#243044";

    function paint(now: number) {
      if (!running) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      const nextW = Math.floor(width * dpr);
      const nextH = Math.floor(height * dpr);
      if (surface.width !== nextW || surface.height !== nextH) {
        surface.width = nextW;
        surface.height = nextH;
      }
      draw.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw.clearRect(0, 0, width, height);

      if (!reduce && pointer.on) {
        const glow = draw.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 200);
        glow.addColorStop(0, "rgba(36, 48, 68, 0.1)");
        glow.addColorStop(1, "rgba(36, 48, 68, 0)");
        draw.fillStyle = glow;
        draw.beginPath();
        draw.arc(pointer.x, pointer.y, 200, 0, Math.PI * 2);
        draw.fill();
      }

      const gap = 32;
      const time = reduce ? 0 : now / 1000;
      draw.fillStyle = accent;
      for (let y = gap / 2; y < height; y += gap) {
        for (let x = gap / 2; x < width; x += gap) {
          let dx = 0;
          let dy = 0;
          let alpha = 0.28;
          let radius = 1.35;
          if (!reduce && pointer.on) {
            const ox = pointer.x - x;
            const oy = pointer.y - y;
            const dist = Math.hypot(ox, oy);
            if (dist < 160 && dist > 0) {
              const pull = (1 - dist / 160) * 10;
              dx = (ox / dist) * pull;
              dy = (oy / dist) * pull;
              alpha = 0.72;
              radius = 2;
            }
          } else if (!reduce) {
            dx = Math.sin(time * 0.35 + y * 0.02) * 2.2;
            dy = Math.cos(time * 0.28 + x * 0.02) * 2.2;
          }
          draw.globalAlpha = alpha;
          draw.beginPath();
          draw.arc(x + dx, y + dy, radius, 0, Math.PI * 2);
          draw.fill();
        }
      }
      draw.globalAlpha = 1;
      if (!reduce) frame = requestAnimationFrame(paint);
    }

    function onMove(event: PointerEvent) {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.on = true;
    }
    function onLeave() {
      pointer.on = false;
    }
    function onVisibility() {
      if (reduce) return;
      if (document.hidden) {
        cancelAnimationFrame(frame);
        return;
      }
      frame = requestAnimationFrame(paint);
    }

    function onOut(event: PointerEvent) {
      if (!event.relatedTarget) pointer.on = false;
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerout", onOut);
    window.addEventListener("blur", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    frame = requestAnimationFrame(paint);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onOut);
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0" aria-hidden />;
}
