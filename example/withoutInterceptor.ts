import axios from 'axios'
import { SocksProxyAgent } from 'socks-proxy-agent'
import { genSocksProxyAgents } from '../src/genSocksProxyAgents'

const url = 'https://api.ipify.org/'
const socksProxyAgents = genSocksProxyAgents([9050, 9052, 9054])

async function originalIp() {
  const response = await axios.get(url)
  console.log('Original IP: ', response.data)
}

async function torIp(httpsAgent: SocksProxyAgent) {
  try {
    const response = await axios.get(url, { httpsAgent })
    console.log('Tor IP: ', response.data)
  } catch (err: any) {
    console.log(err.message)
  }
}

async function main() {
  await originalIp()
  await torIp(socksProxyAgents.next().value)
  await torIp(socksProxyAgents.next().value)
  await torIp(socksProxyAgents.next().value)
  await torIp(socksProxyAgents.next().value)
}

main()
