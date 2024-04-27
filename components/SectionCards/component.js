import { useEffect, useRef } from 'react'
import Link from 'next/link'
import classNames from 'classnames'

import Card from '../Card'

import styles from './styles.module.css'

const SectionCards = props => {
  const { title, videos = [], size, shouldWrap = false, shouldScale } = props
  const wrapperRef = useRef(null)

  useEffect(() => {
    const wrapperElement = wrapperRef.current
    const handleScroll = e => {
      if (shouldWrap) {
        return
      }
      e.preventDefault()
      wrapperElement.scrollLeft += e.deltaY
    }

    wrapperElement.addEventListener('wheel', handleScroll, { passive: false })

    return () => {
      wrapperElement.removeEventListener('wheel', handleScroll)
    }
  }, [shouldWrap])

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div
        className={classNames(styles.cardWrapper, shouldWrap && styles.wrap)}
        ref={wrapperRef}
      >
        {videos.map((video, idx) => (
          <Link
            key={video.id}
            href={`/video/${video.id}`}
          >
            <Card
              idx={idx}
              imgUrl={video.imgUrl}
              size={size}
              shouldScale={shouldScale}
            />
          </Link>
        ))}
      </div>
    </section>
  )
}

export default SectionCards
