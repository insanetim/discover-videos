import Head from 'next/head'

import Navbar from '@/components/Navbar'
import Banner from '@/components/Banner'
import SectionCards from '@/components/SectionCards'

import { getVideos, getPopularVideos } from '@/lib/videos'

import styles from '@/styles/Home.module.css'

export async function getServerSideProps() {
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
    },
  }
}

export default function Home({
  marvelVideos,
  productivityVideos,
  travelVideos,
  popularVideos,
}) {
  return (
    <div className={styles.main}>
      <Head>
        <title>Netflix</title>
      </Head>

      <Navbar />

      <Banner
        title='The Lord of the Rings'
        subTitle='best movie ever'
        imgUrl='/static/lotr.webp'
      />

      <div className={styles.sectionWrapper}>
        <SectionCards
          title='Marvel'
          videos={marvelVideos}
          size='large'
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
