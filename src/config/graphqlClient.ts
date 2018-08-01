import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: 'http://uscchannel.com/graphql',
})

export default client
