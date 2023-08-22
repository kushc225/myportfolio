"use client";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });
import { motion, useScroll } from "framer-motion";
export const metadata = {
  title: "Kush ~!",
  description: "This is a portfolio Website by Kush",
};

export default function RootLayout({ children }) {
  const { scrollYProgress } = useScroll();
  const [x, setX] = useState(500);
  const [y, setY] = useState(500);
  const [showCursor, setShowCursor] = useState(false);
  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      setX(e.clientX);
      setShowCursor(true);
      setY(e.clientY);
    });
  }, [x, y]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <motion.div
          className="progress-bar"
          style={{ scaleX: scrollYProgress }}
        ></motion.div>
        {showCursor && (
          <div
            // style={{ top: y + 20, left: x + 10 }}
            style={{ top: y - 30, left: x - 30 }}
            className="main-cursor"
          ></div>
        )}
        {/* {showCursor && (
          <div
            // style={{ top: y + 20, left: x + 10 }}
            style={{ top: y, left: x }}
            className="mini-cursor"
          ></div>
        )} */}
        {children}
      </body>
    </html>
  );
}
