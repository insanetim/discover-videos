import cookie from 'cookie'

const MAX_AGE = 7 * 24 * 60 * 60 // 7 days

export const setTokenCookie = (token, res) => {
  const expires = new Date(Date.now() + MAX_AGE * 1000)
  const cookieOptions = {
    maxAge: MAX_AGE,
    expires,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  }

  const serializedCookie = cookie.serialize('token', token, cookieOptions)

  res.setHeader('Set-Cookie', serializedCookie)
}
