import { useRouter } from 'next/router'
import Modal from 'react-modal'

import styles from '@/styles/Video.module.css'

Modal.setAppElement('#__next')

const Video = () => {
  const router = useRouter()
  const { videoId } = router.query

  return (
    <div className={styles.container}>
      <Modal
        isOpen={true}
        contentLabel='Watch the video'
        onRequestClose={() => router.back()}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <iframe
          id='ytplayer'
          className={styles.videoPlayer}
          type='text/html'
          src={`https://www.youtube.com/embed/${videoId}?controls=0`}
          frameborder='0'
        ></iframe>
      </Modal>
    </div>
  )
}

export default Video
