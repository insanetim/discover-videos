import { Magic } from 'magic-sdk'

const createMagicClient = () =>
  typeof window !== 'undefined' &&
  new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY)

export const magic = createMagicClient()
