import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import dotenv from 'dotenv'
import { CookiesProvider } from 'react-cookie'
import { 
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client"

dotenv.config()
const baseUrl = process.env.REACT_APP_BASE_URL

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    credentials: 'include',
    uri: baseUrl
  })
})

ReactDOM.render(
      <ApolloProvider client={client}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </ApolloProvider>,
  document.getElementById('root')
)
