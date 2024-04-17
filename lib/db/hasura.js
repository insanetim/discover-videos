async function fetchGraphQL(query, operationName, variables = {}) {
  const result = await fetch('https://loved-mammoth-89.hasura.app/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzEzMzQxMDUyLCJleHAiOjE3MTM5NDU4OTAsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsidXNlciIsImFkbWluIl0sIngtaGFzdXJhLXVzZXItaWQiOiJhZG1pbiJ9fQ.B_kRPO4GQ1eoVUgUJfjIBUW8NrnsiHXe9GDY5Rbl2Y4',
    },
    body: JSON.stringify({ query, operationName, variables }),
  })

  return await result.json()
}

const query = `
  query MyQuery {
    users {
      id
      email
      issuer
      publicAddress
    }
  }
`

function fetchMyQuery() {
  return fetchGraphQL(query, 'MyQuery', {})
}

export async function startFetchMyQuery() {
  const { errors, data } = await fetchMyQuery()

  if (errors) {
    // handle those errors like a pro
    console.error(errors)
  }

  // do something great with this precious data
  console.log(data)
}
