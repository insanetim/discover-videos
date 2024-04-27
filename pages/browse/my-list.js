import Head from 'next/head'

import Navbar from '@/components/Navbar'
import SectionCards from '@/components/SectionCards'
import { getMyListVideos } from '@/lib/videos'
import getUserMetadata from '@/utils/getUserMetadata'

import styles from '@/styles/MyList.module.css'

export async function getServerSideProps({ req }) {
  const { token, userId } = getUserMetadata(req)

  const myListVideos = await getMyListVideos(token, userId)

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { myListVideos },
  }
}

const MyList = ({ myListVideos }) => {
  return (
    <>
      <Head>
        <title>My List</title>
      </Head>

      <main className={styles.main}>
        <Navbar />

        <div className={styles.sectionWrapper}>
          <SectionCards
            title='My List'
            videos={myListVideos}
            size='small'
            shouldWrap
            shouldScale={false}
          />
        </div>
      </main>
    </>
  )
}

export default MyList
