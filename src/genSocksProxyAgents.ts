import { SocksProxyAgent } from 'socks-proxy-agent'

export type GenSocksProxyAgents = ReturnType<typeof genSocksProxyAgents>

export function* genSocksProxyAgents(ports: number[]) {
  const socksProxyAgents = ports.map((port) => ({
    socksProxyAgent: new SocksProxyAgent(`socks5://localhost:${port}`),
    socksPort: port,
  }))

  while (true) {
    for (const socksProxyAgent of socksProxyAgents) {
      yield socksProxyAgent
    }
  }

  return {
    socksProxyAgent: new SocksProxyAgent('socks5://localhost:9050'),
    socksPort: 9050,
  }
}
