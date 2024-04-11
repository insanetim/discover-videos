import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-modal'
import classNames from 'classnames'

import Navbar from '@/components/Navbar'

import { getYoutubeVideoById } from '@/lib/videos'

import styles from '@/styles/Video.module.css'

Modal.setAppElement('#__next')

export async function getStaticProps(context) {
  const { videoId } = context.params
  const videoArray = await getYoutubeVideoById(videoId)

  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const listOfVideos = ['V75dMMIW2B4', 'Lb2wwEx6DVw', 'uJMCNJP2ipI']
  const paths = listOfVideos.map(id => ({
    params: { videoId: id },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

const Video = ({ video }) => {
  const router = useRouter()
  const { videoId } = router.query
  const [isLoaded, setIsLoaded] = useState(false)
  const modalRef = useRef(null)
  const columnRef = useRef(null)

  const { title, publishTime, description, channelTitle, viewCount } = video

  useEffect(() => {
    const handleResize = () => {
      if (isLoaded) {
        const ytplayerHeight = document.getElementById('ytplayer').offsetHeight
        const modalHeight = modalRef.current.portal.content.offsetHeight

        columnRef.current.style.maxHeight = `${modalHeight - ytplayerHeight}px`
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isLoaded])

  return (
    <div className={styles.container}>
      <Navbar />

      <Modal
        isOpen={true}
        contentLabel='Watch the video'
        onRequestClose={() => router.back()}
        className={styles.modal}
        overlayClassName={styles.overlay}
        ref={modalRef}
      >
        <iframe
          id='ytplayer'
          className={styles.videoPlayer}
          type='text/html'
          src={`https://www.youtube.com/embed/${videoId}?controls=0`}
          frameBorder='0'
          onLoad={() => setIsLoaded(true)}
        ></iframe>

        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div
              ref={columnRef}
              className={styles.col1}
            >
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={classNames(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={classNames(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Video
