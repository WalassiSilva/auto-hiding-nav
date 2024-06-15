import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

export default function App() {
  return (
    <main className="min-h-[300vh] bg-black bg-gradient-to-b from-[rgba(255,255,255,0.1)] to-[#fff0]">
      <Nav />

      <section className="overflow-clip opacity-30">
        <p className="break-all text-[30vw] text-white">
          Beautiful sticky navigation that plays peek-a-boo on scroll
        </p>
      </section>
    </main>
  );
}

export function Nav() {
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);
  useMotionValueEvent(scrollY, "change", (y) => {
    const difference = y - lastYRef.current;

    if (Math.abs(difference) > 50) {
      setIsHidden(difference > 0);
      lastYRef.current = y;
    }
  });

  return (
    <motion.div
      animate={isHidden ? "hidden" : "visible"}
      whileHover="visible"
      onFocusCapture={ () => setIsHidden(false)}
      variants={{
        hidden: {
          y: "-100%",
        },
        visible: {
          y: "0%",
        },
      }}
      className="fixed top-3 z-10 flex w-full justify-center"
    >
      <nav className="flex justify-between gap-3 rounded-3xl bg-white p-5 *:border *:border-gray-200 *:px-7 *:py-2 *:rounded-lg ">
        <a href="#" className="bg-gray-200">
          <svg
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="https://www.w3.org/2000/svg"
          >
            <path d="M12 2L2 7l10 5 105-105zM2 17l10 5 10-5-10-5-10 5z"></path>
            <span className="sr-only"></span>
          </svg>
        </a>
        <a href="#">Products</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
      </nav>
    </motion.div>
  );
}
