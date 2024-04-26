import { findVideoByUserId, insertStats, updateStats } from '@/lib/db/hasura'
import { verifyToken } from '@/lib/utils'

export default async function stats(req, res) {
  try {
    const { token } = req.cookies

    if (!token) {
      return res.status(403).send({ msg: 'Unauthorized' })
    }

    const inputParams = req.method === 'POST' ? req.body : req.query
    const { videoId } = inputParams

    if (!videoId) {
      return res.status(400).send({ msg: 'Missing videoId' })
    }

    const userId = verifyToken(token)
    const existingStats = await findVideoByUserId(token, { userId, videoId })
    const doesStatsExist = existingStats.length > 0

    if (req.method === 'POST') {
      const { favourited, watched = true } = req.body
      const statsToUpdate = { userId, videoId, favourited, watched }

      doesStatsExist
        ? await updateStats(token, statsToUpdate)
        : await insertStats(token, statsToUpdate)

      return res.send({ done: true })
    } else if (req.method === 'GET') {
      return doesStatsExist
        ? res.send(existingStats)
        : res.status(404).send({ msg: 'Video not found' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).send({ done: false, error: error?.message })
  }
}
