"use client";
import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import { RxActivityLog } from "react-icons/rx";
const Navbar = () => {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  return (
    <>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className={` ${show && "hidden"} " pt-8 h-9" `}
      >
        <div className="flex w-full justify-between px-8 md:px-28 items-center md:h-12 ">
          <div className="font-bold text-5xl ">K</div>
          <div className="hidden md:flex ">
            <ul className="flex">
              <motion.li
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 200 }}
                className={`" ${
                  pathname === "/" && "active"
                } cursor-pointer  px-4 font-bold"`}
              >
                <Link href="/">Home</Link>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 200 }}
                className={`"${
                  pathname === "/about" && " active "
                }  cursor-pointer  px-4 font-bold"`}
              >
                <Link href="/about">About</Link>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 200 }}
                className={`"${
                  pathname === "/contact" && " active "
                } cursor-pointer  px-4 font-bold"`}
              >
                <Link href="/contact">Contact</Link>
              </motion.li>
            </ul>
          </div>

          {/* <Image
          src={Logo}
          alt="Picture of the author"
          width={30}
          height={40}
          style={{ mixBlendMode: "color-burn", color: "white" }}
          // blurDataURL="data:..." automatically provided
          // placeholder="blur" // Optional blur-up while loading
        /> */}

          <div className="md:hidden">
            <RxActivityLog
              onClick={() => setShow(!show)}
              className="cursor-pointer"
            />
          </div>
        </div>
      </motion.div>

      {/* responsive navbar */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            exit={{ y: -2000, opacity: 0 }}
            className={`md:hidden md:min-h-screen`}
          >
            <div className=" flex justify-around items-center ">
              <div className=" min-h-screen pt-12">
                <Brightness4OutlinedIcon className="hover:cursor-pointer md:hidden" />
              </div>
              <div>
                <div className="flex md:hidden">
                  <ul className="flex items-center flex-col px-5 min-h-screen pt-12 font-bold text-2xl  ">
                    <li onClick={() => setShow(false)} className="cursor- ">
                      <Link href="/">Home</Link>
                    </li>
                    <li
                      onClick={() => setShow(false)}
                      className="cursor- pt-20"
                    >
                      <Link href="/about">About</Link>
                    </li>
                    <li
                      onClick={() => setShow(false)}
                      className="cursor-pointer  pt-20"
                    >
                      <Link href="/contact">Contact</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="md:hidden min-h-screen pt-12">
                <CloseOutlinedIcon
                  onClick={() => setShow(!show)}
                  className="hover:cursor-pointer"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* second div from here  */}
    </>
  );
};

export default Navbar;
