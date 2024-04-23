async function fetchGraphQL(query, operationName, variables = {}, token) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, operationName, variables }),
  })

  return await result.json()
}

export async function isNewUser(token, issuer) {
  const query = `
    query isNewUser($issuer: String!) {
      users(where: {issuer: {_eq: $issuer}}) {
        id
        email
        issuer
      }
    }
  `
  const response = await fetchGraphQL(query, 'isNewUser', { issuer }, token)

  return response?.data?.users?.length === 0
}

export async function createNewUser(token, { email, issuer, publicAddress }) {
  const query = `
    mutation createNewUser($email: String!, $issuer: String!, $publicAddress: String!) {
      insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
        returning {
          email
          issuer
          publicAddress
        }
      }
    }
  `
  return await fetchGraphQL(
    query,
    'createNewUser',
    { email, issuer, publicAddress },
    token
  )
}

export async function findVideoByUserId(token, { userId, videoId }) {
  const query = `
    query findVideoByUserId($userId: String!, $videoId: String!) {
      stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
        id
        favourited
        userId
        videoId
        watched
      }
    }
  `
  const response = await fetchGraphQL(
    query,
    'findVideoByUserId',
    { userId, videoId },
    token
  )

  return response?.data?.stats
}

export async function insertStats(
  token,
  { userId, videoId, favourited, watched }
) {
  const query = `
    mutation insertStats($userId: String!, $videoId: String!, $favourited: Int!, $watched: Boolean!) {
      insert_stats_one(
        object: {userId: $userId, videoId: $videoId, favourited: $favourited, watched: $watched}
      ) { id }
    }
  `
  return await fetchGraphQL(
    query,
    'insertStats',
    { userId, videoId, favourited, watched },
    token
  )
}

export async function updateStats(
  token,
  { userId, videoId, favourited, watched }
) {
  const query = `
    mutation updateStats($userId: String!, $videoId: String!, $favourited: Int!, $watched: Boolean!) {
      update_stats(
        where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}},
        _set: {favourited: $favourited, watched: $watched}
      ) { affected_rows }
    }
  `
  return await fetchGraphQL(
    query,
    'updateStats',
    { userId, videoId, favourited, watched },
    token
  )
}
