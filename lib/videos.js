import videoTestData from '@/data/videos.json'
import { getWatchedVideos, getFavouritedVideos } from './db/hasura'

const fetchVideos = async url => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY
  const BASE_URL = 'https://youtube.googleapis.com/youtube/v3'

  const response = await fetch(
    `${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
  )

  return await response.json()
}

const getCommonVideos = async url => {
  try {
    const isDev = process.env.DEVELOPMENT

    const data = isDev === 'true' ? videoTestData : await fetchVideos(url)

    if (data?.error) {
      console.error('Youtube API error', data.error)
      return []
    }

    return data?.items?.map(item => {
      const id = item?.id?.videoId ?? item?.id
      const snippet = item?.snippet

      return {
        id,
        title: snippet?.title,
        description: snippet?.description,
        publishTime: snippet?.publishedAt,
        channelTitle: snippet?.channelTitle,
        imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        viewCount: item?.statistics?.viewCount ?? 0,
      }
    })
  } catch (error) {
    console.error('Something went wrong with vidoe library', error)
    return []
  }
}

export const getVideos = searchQuery => {
  const URL = `search?part=snippet&q=${searchQuery}&type=video`

  return getCommonVideos(URL)
}

export const getPopularVideos = () => {
  const URL =
    'videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US'

  return getCommonVideos(URL)
}

export const getYoutubeVideoById = videoId => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`

  return getCommonVideos(URL)
}

export const getWatchItAgainVideos = async (token, userId) => {
  const videos = (await getWatchedVideos(token, { userId })) || []

  return videos.map(video => ({
    id: video.videoId,
    imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
  }))
}

export const getMyListVideos = async (token, userId) => {
  const videos = (await getFavouritedVideos(token, { userId })) || []

  return videos.map(video => ({
    id: video.videoId,
    imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
  }))
}
