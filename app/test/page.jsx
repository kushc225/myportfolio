'use client'
import { motion } from "framer-motion"

import React,{useState} from 'react'

const page = () => {
    const [flag,setFlag] = useState(true);
  return (
    <>
    {
        flag ? <motion.div
        className="bg-red-500 h-full w-40"
        animate={{
            scaleX : [1.2,1.3,1.4],
            borderRadius : [10,20,40,10,0]
            
        }}
        transition={{duration:5}}
        onClick={()=> setFlag(!flag)}
    >
        <ul className="flex flex-col justify-center items-center font-mono mt-3 text-2xl">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
        </ul>
        </motion.div> : <div
        onClick={() => setFlag(!flag)}
        className="bg-red-500 w-4 h-5" ></div>
    }
    
    
    </>
  )
}

export default page