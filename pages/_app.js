import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Roboto_Slab } from 'next/font/google'
import Cookies from 'js-cookie'

import Loading from '@/components/Loading'

import '@/styles/globals.css'

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
})

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = Cookies.get('token')

    if (token) {
      setIsLoading(false)
    } else {
      router.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false)
    }

    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router.events])

  return (
    <>
      <style
        jsx
        global
      >{`
        html {
          font-family: ${robotoSlab.style.fontFamily};
        }
      `}</style>
      {isLoading ? <Loading /> : <Component {...pageProps} />}
    </>
  )
}
