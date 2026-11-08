"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGamepad } from "react-icons/fa";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-16 border-b border-slate-800/80 bg-slate-950/90 shadow-lg backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 md:px-12">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-400 text-slate-950 font-black text-xs transition group-hover:scale-110">
            K
          </span>
          <span className="text-base font-bold tracking-tight text-white group-hover:text-cyan-300 transition">
            Kush Kumar<span className="text-cyan-400">.</span>
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs font-semibold tracking-wide uppercase transition ${
                  isActive
                    ? "text-cyan-300"
                    : "text-slate-300 hover:text-cyan-300"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/40 px-3.5 py-1.5 text-xs font-bold text-cyan-300 transition hover:bg-cyan-400 hover:text-slate-950 shadow-sm"
          >
            <FaGamepad size={13} /> 3D Portfolio
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900 p-2.5 text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300 md:hidden"
          aria-label="Toggle navigation"
        >
          {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-800 bg-slate-950/95 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? "bg-slate-900 text-cyan-300"
                      : "text-slate-200 hover:bg-slate-900 hover:text-cyan-300"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
