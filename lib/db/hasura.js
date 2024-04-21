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
  const response = await fetchGraphQL(
    query,
    'createNewUser',
    { email, issuer, publicAddress },
    token
  )

  return response
}
