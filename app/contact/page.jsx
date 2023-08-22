'use client'
import Link from 'next/link'
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {AnimatePresence, motion} from 'framer-motion'
import React, { useRef,useState } from 'react';
import emailjs from '@emailjs/browser';
const Contact = () => {
  const form = useRef();
  const [success,setSuccess] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_b13uxeb', 'template_jjev594', form.current, 'qrKGdj0LBLy0TTwIa')
      .then((result) => {

        setSuccess(true);
       
        setTimeout(()=> {
            setSuccess(false);
        },[10000])
          // console.log(result.text);
      }, (error) => {
          // console.log(error.text);
      });
  };



  return (
    <div 
    className=' '>
      <div className="overflow-hidden  w-full justify-between px-6 md:px-28 items-center  ">
        <AnimatePresence>
        <motion.div 
        key = {123}
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{ delay : 0.5 , duration : 1}}
        exit={{opacity : 0}}
        
        className='pt-28'
        >
          <h1 className='pt-4 text-3xl font-bold font-serif '>Contact.</h1>
          <div className='pt-4'>

          <p className='font-mono'>Get in touch shoot me an email directly on <span className='hidden md:inline font-bold'> kushc225@gmail.com</span></p>
          <span className=' font-sans font-bold md:hidden mt-4'> kushc225@gmail.com</span>
          </div>
        </motion.div>
      <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{delay : 0.8 , duration : 1}}
      
      className='pt-12'>
        <form ref={form} className='form-container' onSubmit={sendEmail}>
          <div className=' '>
              <input name= 'name'   className='shadow-md bg-transparent w-full rounded-xl p-4 outline-none' type="text" placeholder='Name' />
          </div>
          <div className='pt-6 '>
              <input  name='email'  className='shadow-md bg-transparent w-full rounded-xl p-4 outline-none' type="email" placeholder='Email' />
          </div>
          <div className='pt-6 '>
              <input  name='message'  className='shadow-md bg-transparent w-full p-4 rounded-xl outline-none' type="text" placeholder='Message' />
          </div>
          <div className='pt-6'>
            <button type='submit' className=' hover:bg-transparent hover:text-white hover:border-2 hover:border-white px-6 py-2 bg-white text-black rounded-xl uppercase text-xl transition-all'>submit</button>
            {
              success && <p className='mt-3'>You message has been send and will be respond soon...</p>
            }
          </div>
        </form>
      </motion.div>
      </AnimatePresence>
      {/* <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{delay : 1.2 , duration : 1}}
      className="underline underline-offset-2 pt-4">
      <Link href="/projects">Let's move Projects section </Link>
      <ArrowForwardIcon className="font-bold font-mono" />
      </motion.div> */}
      </div>
    </div>

  )
}

export default Contact