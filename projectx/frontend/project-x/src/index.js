import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import dotenv from 'dotenv'
import { CookiesProvider } from 'react-cookie'
import { 
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client"

dotenv.config()
const baseUrl = process.env.REACT_APP_BASE_URL

console.log(baseUrl)

const client = new ApolloClient({
  uri: baseUrl,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <CookiesProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
  </CookiesProvider>,
  document.getElementById('root')
)
