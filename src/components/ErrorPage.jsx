import React from 'react'
import { motion } from "framer-motion";

const Error = () => {
  return (
    <motion.div   initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.8,
      delay: 0.5,
      ease: [0, 0.71, 0.2, 1.01]
    }} className='error'>
        <h1>Escriba un valor entre 1 y 126</h1>
    </motion.div>
  )
}

export default Error