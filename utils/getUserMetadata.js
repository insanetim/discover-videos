import { verifyToken } from '@/lib/utils'

const getUserMetadata = req => {
  const token = req?.cookies?.token ?? null
  const userId = verifyToken(token)

  return { token, userId }
}

export default getUserMetadata
