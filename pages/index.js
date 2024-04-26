import Head from 'next/head'

import Navbar from '@/components/Navbar'
import Banner from '@/components/Banner'
import SectionCards from '@/components/SectionCards'

import {
  getVideos,
  getPopularVideos,
  getWatchItAgainVideos,
} from '@/lib/videos'
import getUserMetadata from '@/utils/getUserMetadata'

import styles from '@/styles/Home.module.css'

export async function getServerSideProps({ req }) {
  const { token, userId } = getUserMetadata(req)

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const watchItAgainVideos = await getWatchItAgainVideos(token, userId)
  const marvelVideos = await getVideos('marvel trailer')
  const productivityVideos = await getVideos('productivity')
  const travelVideos = await getVideos('travel')
  const popularVideos = await getPopularVideos()

  return {
    props: {
      marvelVideos,
      productivityVideos,
      travelVideos,
      popularVideos,
      watchItAgainVideos,
    },
  }
}

export default function Home(props) {
  const {
    marvelVideos,
    productivityVideos,
    travelVideos,
    popularVideos,
    watchItAgainVideos,
  } = props

  return (
    <div className={styles.main}>
      <Head>
        <title>Netflix</title>
      </Head>

      <Navbar />

      <Banner
        videoId='V75dMMIW2B4'
        title='The Lord of the Rings'
        subTitle='The Fellowship of the Ring'
        imgUrl='/static/lotr.webp'
      />

      <div className={styles.sectionWrapper}>
        <SectionCards
          title='Marvel'
          videos={marvelVideos}
          size='large'
        />

        <SectionCards
          title='Watch it again'
          videos={watchItAgainVideos}
          size='small'
        />

        <SectionCards
          title='Travel'
          videos={travelVideos}
          size='small'
        />

        <SectionCards
          title='Productivity'
          videos={productivityVideos}
          size='medium'
        />

        <SectionCards
          title='Popular'
          videos={popularVideos}
          size='small'
        />
      </div>
    </div>
  )
}
