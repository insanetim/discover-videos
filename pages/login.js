import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/legacy/image'

import styles from '@/styles/Login.module.css'

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [userMsg, setUserMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleOnChangeEmail = e => {
    setUserMsg('')
    const email = e.target.value
    setEmail(email)
  }

  const handleLoginWithEmail = async e => {
    e.preventDefault()

    if (email) {
      if (email === 'insanetim1986@gmail.com') {
        setIsLoading(true)
        sessionStorage.setItem('isLoggedIn', email)
        router.push('/')
      } else {
        setUserMsg('Something went wrong logging in')
      }
    } else {
      setUserMsg('Enter a valid email address')
    }
  }

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
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link
            className={styles.logoLink}
            href='/'
          >
            <div className={styles.logoWrapper}>
              <Image
                src='/static/netflix.svg'
                alt='Netflix logo'
                width={128}
                height={34}
              />
            </div>
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>

          <input
            className={styles.emailInput}
            type='text'
            placeholder='Email address'
            onChange={handleOnChangeEmail}
          />
          {userMsg && <p className={styles.userMsg}>{userMsg}</p>}

          <button
            className={styles.loginBtn}
            onClick={handleLoginWithEmail}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
        </div>
      </main>
    </div>
  )
}

export default Login
