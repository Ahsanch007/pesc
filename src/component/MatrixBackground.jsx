import { useEffect, useRef } from "react";

const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Ensure canvas exists

    const ctx = canvas.getContext("2d");
    if (!ctx) return; // Ensure context exists

    // Function to resize the canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas(); // Initial size setup
    window.addEventListener("resize", resizeCanvas);

    const columns = Math.floor(canvas.width / 20);
    const drops = new Array(columns).fill(0); // Ensure drops array is correctly initialized

    const draw = () => {
      if (!ctx) return; // Ensure context exists before drawing

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0f0";
      ctx.font = "20px monospace";

      drops.forEach((y, index) => {
        const text = Math.random() > 0.5 ? "0" : "1";
        const x = index * 20;
        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[index] = 0;
        } else {
          drops[index] = y + 20;
        }
      });
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full" />;
};

export default MatrixBackground;
