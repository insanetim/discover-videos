import jwt from 'jsonwebtoken'

export function verifyToken(token) {
  if (!token) {
    return null
  }

  const { issuer: userId } = jwt.verify(token, process.env.JWT_SECRET)

  return userId
}
