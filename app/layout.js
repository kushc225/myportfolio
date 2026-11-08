import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Kush Kumar Choudhary | Senior Full Stack Engineer (MERN)",
  description:
    "Interactive 3D Portfolio of Kush Kumar Choudhary — Senior Full Stack Engineer specializing in microservices, low-latency APIs, and real-time AI pipelines.",
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", type: "image/x-icon" },
      { url: "/icon.svg?v=2", type: "image/svg+xml" },
      { url: "/avatar.png?v=2", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: "/avatar.png?v=2",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased font-sans">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
