import videoTestData from '@/data/videos.json'

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
    const data = isDev ? videoTestData : await fetchVideos(url)

    if (data?.error) {
      console.error('Youtube API error', data.error)
      return []
    }

    return data?.items?.map(item => ({
      id: item?.id?.videoId ?? item?.id,
      title: item?.snippet?.title,
      description: item?.snippet?.description,
      publishTime: item?.snippet?.publishedAt,
      channelTitle: item?.snippet?.channelTitle,
      imgUrl: item?.snippet?.thumbnails?.high?.url,
      viewCount: item?.statistics?.viewCount ?? 0,
    }))
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
