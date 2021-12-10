import { SocksProxyAgent } from 'socks-proxy-agent'

export function* genSocksProxyAgents(
  ports: number[],
): Generator<SocksProxyAgent> {
  const socksProxyAgents = ports.map((port) => {
    return new SocksProxyAgent(`socks5://localhost:${port}`)
  })

  while (true) {
    for (const socksProxyAgent of socksProxyAgents) {
      yield socksProxyAgent
    }
  }
}
