import { useEffect, useRef } from 'react'

import Card from '../Card'
import styles from './styles.module.css'

const SectionCards = props => {
  const { title, videos = [], size } = props
  const wrapperRef = useRef(null)

  useEffect(() => {
    const wrapperElement = wrapperRef.current
    const handleScroll = e => {
      e.preventDefault()
      wrapperElement.scrollLeft += e.deltaY
    }

    wrapperElement.addEventListener('wheel', handleScroll, { passive: false })

    return () => {
      wrapperElement.removeEventListener('wheel', handleScroll)
    }
  }, [])

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div
        className={styles.cardWrapper}
        ref={wrapperRef}
      >
        {videos.map((video, idx) => (
          <Card
            key={video.id}
            idx={idx}
            imgUrl={video.imgUrl}
            size={size}
          />
        ))}
      </div>
    </section>
  )
}

export default SectionCards
