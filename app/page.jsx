'use client'
import React from "react";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { TypeAnimation } from "react-type-animation";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { motion } from 'framer-motion'
import { SiLeetcode } from 'react-icons/si'
const Home = () => {
  return (
    <div
      // initial={{opacity:0}}
      // animate={{opacity:1}}
      // transition={{duration : 3}}
      className=" pt-20 md:pt-28 min-w-screen ">
      <div className="px-4 md:px-28">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .7, duration: 1 }}
        >

          <TypeAnimation
            className="text-2xl md:text-4xl font-bold md:first-letter:text-5xl  md:tracking-wide font-mono"
            sequence={["I'm KUSH CHOUDHARY", 2000, "I'm a Web Developer.", 2000]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            style={{
              display: "inline-block-block",
              letterSpacing: "2px",
            }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}


          className="pt-12" style={{ paddingRight: "2rem" }}>
          <div>
            <h1 className="text-sm leading-loose md:tracking-widest	">
              Your friendly neighborhood frontend developer, UX architect, and
              JavaScript engineer. I spend my days (and often nights) painting
              the Internet canvas with
              <span className=""> PROJECTS</span>. and lines
              of code, turning zeroes and ones into immersive, interactive
              experiences.
            </h1>
          </div>
          <div>
            <h1 className="leading-loose pt-4 md:tracking-wider">
              Bona fide photochromic
              <span className="uppercase font-bold"> LENS </span>. enthusiast -
              sunlight or indoors, I've got it covered. I tread the path of
              minimalism, finding beauty in simplicity and order. When I'm not
              crafting beautiful web experiences, you can find me reading
              ARTICLES or swaying to the rhythm of Pop Music & Jazz, losing
              myself in the captivating flow of melodies. anyways you can{" "}

              <div >
                <Link href="/contact">
                  <h1 className="uppercase font-bold">contact me.</h1>
                </Link>
              </div>
            </h1>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="underline underline-offset-2 pt-4">
          <Link href="/about">see me about me </Link>
          <ArrowForwardIcon className="font-bold font-mono" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="pt-5 ">
          <div className="inline-block">
            <Link target="_blank" href='https://www.linkedin.com/in/kush-kumar-choudhary-013596289/'>
              <LinkedInIcon className="mx-3 hover:scale-125 transition-all" />
            </Link>
          </div>

          <div className="inline-block">
            <Link target="_blank" href='https://github.com/kushc225?tab=repositories'>
              <GitHubIcon className="mx-3 hover:scale-125 transition-all" />
            </Link>
          </div>


          <div className="inline-block">
            <Link target="_blank" href='https://leetcode.com/kush_op/'>
              <SiLeetcode className="mx-3 hover:scale-125 transition-all" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
