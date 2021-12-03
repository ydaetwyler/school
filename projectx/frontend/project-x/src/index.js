import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import dotenv from 'dotenv'

import { 
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client"

dotenv.config()
const baseUrl = process.env.BASE_URL

const client = new ApolloClient({
  uri: baseUrl,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
