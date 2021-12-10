import SocksProxyAgent from 'socks-proxy-agent/dist/agent'
import { genSocksProxyAgents } from '../genSocksProxyAgents'

describe('genSocksProxyAgents', () => {
  it.each`
    port | expected
    ${1} | ${1}
    ${2} | ${2}
  `(
    'expected socks port = $expected when port: $port',
    ({ port, expected }) => {
      const socksProxyAgents = genSocksProxyAgents([port])
      const socksProxyAgent: SocksProxyAgent = socksProxyAgents.next().value

      // @ts-ignore
      const result = socksProxyAgent.proxy.port

      expect(result).toBe(expected)
    },
  )

  it('SocksProxyAgents generated in a circle', () => {
    const ports = [1, 2]
    const socksProxyAgents = genSocksProxyAgents(ports)

    socksProxyAgents.next().value
    socksProxyAgents.next().value
    const socksProxyAgent3: SocksProxyAgent = socksProxyAgents.next().value
    // @ts-ignore
    const result = socksProxyAgent3.proxy.port

    expect(result).toBe(1)
  })
})
