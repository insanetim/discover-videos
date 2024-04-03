import Head from 'next/head'

import Banner from '@/components/Banner'
import Navbar from '@/components/Navbar'

export default function Home() {
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
    </div>
  )
}
