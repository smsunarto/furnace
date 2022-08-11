import {
  chain,
  WagmiConfig,
  createClient,
  configureChains,
  defaultChains,
} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const { chains, provider, webSocketProvider } = configureChains(
    [chain.ropsten],
    [publicProvider()],
  )
  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  })
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}

export default MyApp
