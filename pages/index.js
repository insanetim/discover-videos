import Head from 'next/head'

import Banner from '@/components/Banner'
import Navbar from '@/components/Navbar'
import SectionCards from '@/components/SectionCards'
import styles from '@/styles/Home.module.css'

export default function Home() {
  const disneyVideos = [
    { imgUrl: '/static/lotr.webp' },
    { imgUrl: '/static/lotr.webp' },
    { imgUrl: '/static/lotr.webp' },
  ]

  return (
    <div>
      <Head>
        <title>Netflix</title>
      </Head>

      <Navbar username='User' />

      <Banner
        title='The Lord of the Rings'
        subTitle='best movie ever'
        imgUrl='/static/lotr.webp'
      />

      <div className={styles.sectionWrapper}>
        <SectionCards
          title='Disney'
          videos={disneyVideos}
          size='large'
        />
      </div>
    </div>
  )
}
