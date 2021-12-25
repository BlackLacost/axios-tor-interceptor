import { genSocksProxyAgents } from './genSocksProxyAgents'

describe('genSocksProxyAgents', () => {
  it.each`
    port | expected
    ${1} | ${1}
    ${2} | ${2}
  `(
    'expected socks port = $expected when port: $port',
    ({ port, expected }: { port: number; expected: number }) => {
      const socksProxyAgents = genSocksProxyAgents([port])
      const { socksPort } = socksProxyAgents.next().value

      expect(socksPort).toBe(expected)
    },
  )

  it('SocksProxyAgents generated in a circle', () => {
    const ports = [1, 2]
    const socksProxyAgents = genSocksProxyAgents(ports)

    const result = [
      socksProxyAgents.next().value.socksPort,
      socksProxyAgents.next().value.socksPort,
      socksProxyAgents.next().value.socksPort,
    ]

    expect(result).toEqual([1, 2, 1])
  })
})
