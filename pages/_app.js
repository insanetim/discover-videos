import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Roboto_Slab } from 'next/font/google'

import Loading from '@/components/Loading'

import { magic } from '@/lib/magic-client'

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
    const checkIsLoggedIn = async () => {
      try {
        const isLoggedIn = await magic.user.isLoggedIn()
        if (isLoggedIn) {
          setIsLoading(false)
        } else {
          router.push('/login')
        }
      } catch (error) {
        console.error('Something went wrong', error)
      }
    }
    checkIsLoggedIn()
  }, [router])

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
