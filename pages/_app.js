import { Roboto_Slab } from 'next/font/google'

import '../styles/globals.css'

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
})

export default function MyApp({ Component, pageProps }) {
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
      <Component {...pageProps} />
    </>
  )
}
