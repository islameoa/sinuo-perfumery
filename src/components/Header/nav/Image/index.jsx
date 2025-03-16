import React from 'react'
import { motion } from 'framer-motion';
import styles from './style.module.scss';
import { opacity } from '../../anim';

export default function Index({src, isActive}) {
  return (
    <motion.div variants={opacity} initial="initial" animate={isActive ? "open" : "closed"} className={styles.imageContainer}>
        <img src={`assets/images/${src}`} alt="prueba2" srcset="" />
    </motion.div>
  )
}