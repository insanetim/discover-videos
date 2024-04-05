import { useState } from 'react'
import Image from 'next/legacy/image'
import { motion } from 'framer-motion'
import classNames from 'classnames'

import styles from './styles.module.css'

const defaultImgSrc =
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80'

const Card = props => {
  const { imgUrl = defaultImgSrc, size = 'medium', id } = props
  const [imgSrc, setImgSrc] = useState(imgUrl)
  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  }
  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 }

  const handleOnError = () => {
    setImgSrc(defaultImgSrc)
  }

  return (
    <div className={styles.container}>
      <motion.div
        className={classNames(styles.imgMotionWrapper, classMap[size])}
        whileHover={{ ...scale }}
      >
        <Image
          className={styles.cardImg}
          src={imgSrc}
          alt='image'
          layout='fill'
          onError={handleOnError}
        />
      </motion.div>
    </div>
  )
}

export default Card
