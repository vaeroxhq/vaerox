import { useEffect, useRef } from "react";

/**
 * AgentNetwork — The Signature Interaction (Phase Ω+)
 * An autonomous agent graph that reacts to cursor proximity.
 * Renders on a canvas. Very performant, subtle.
 */
export function AgentNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const nodes: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const NODE_COUNT = 45;
    const MOUSE_RADIUS = 250;
    const CONNECTION_RADIUS = 150;

    let mouseX = -1000;
    let mouseY = -1000;

    const resize = () => {
      // Get the parent container's dimensions instead of window
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        initNodes();
      }
    };

    const initNodes = () => {
      nodes.length = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Read CSS variable for color (fallback to a subtle gray)
      // we assume the parent handles opacity.
      ctx.fillStyle = "rgba(120, 120, 120, 0.4)";
      ctx.lineWidth = 0.5;

      // Update nodes
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        // Connect to mouse
        const dxMouse = n1.x - mouseX;
        const dyMouse = n1.y - mouseY;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < MOUSE_RADIUS) {
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(mouseX, mouseY);
          // Intensity based on mouse distance
          const intensity = 1 - distMouse / MOUSE_RADIUS;
          ctx.strokeStyle = `rgba(120, 120, 120, ${intensity * 0.4})`;
          ctx.stroke();
        }

        // Connect to other nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_RADIUS) {
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);

            // If both nodes are near mouse, connection is stronger
            let alpha = 0.1;
            if (distMouse < MOUSE_RADIUS) {
              alpha += 0.2 * (1 - distMouse / MOUSE_RADIUS);
            }

            ctx.strokeStyle = `rgba(120, 120, 120, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto"
      style={{ width: "100%", height: "100%", opacity: "var(--bg-circle-opacity, 0.2)" }}
    />
  );
}
