import axios from 'axios'
import { SocksProxyAgent } from 'socks-proxy-agent'

const url = 'https://api.ipify.org/'

async function originalIp() {
  const response = await axios.get(url)
  return response.data
}

async function torIp() {
  const port = 9050
  const httpsAgent = new SocksProxyAgent(`socks5://localhost:${port}`)

  const response = await axios.get(url, { httpsAgent })
  return response.data
}

async function main() {
  console.log('Original IP: ', await originalIp())
  console.log('Tor IP: ', await torIp())
}

main()
