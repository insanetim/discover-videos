import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/legacy/image'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

import { magic } from '@/lib/magic-client'

import styles from './styles.module.css'

const Navbar = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  const handleToggleDropdown = () => {
    setShowDropdown(prev => !prev)
  }

  const handleSignout = async e => {
    e.preventDefault()
    await magic.user.logout()
    Cookies.remove('token')
    router.push('/login')
  }

  useEffect(() => {
    try {
      const { email } = jwtDecode(Cookies.get('token'))
      if (email) {
        setUsername(email)
      }
    } catch (error) {
      console.error('Error retrieving email', error)
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
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
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href='/'>Home</Link>
          </li>
          <li className={styles.navItem2}>
            <Link href='/browse/my-list'>My List</Link>
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button
              className={styles.usernameBtn}
              onClick={handleToggleDropdown}
            >
              <span className={styles.username}>{username}</span>
              <Image
                src={'/static/expand_more.svg'}
                alt='Expand dropdown'
                width={24}
                height={24}
              />
            </button>

            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <a
                    className={styles.linkName}
                    onClick={handleSignout}
                  >
                    Sign out
                  </a>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
