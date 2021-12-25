import { genSocksProxyAgents } from './genSocksProxyAgents'
import { RequestInterceptor, requestInterceptor } from './request.interceptor'

jest.mock('./logging', () => ({
  log: {
    info: jest.fn(),
  },
}))

describe('request interceptor', () => {
  let interceptor: RequestInterceptor

  beforeEach(() => {
    interceptor = requestInterceptor(genSocksProxyAgents([9050, 9052]))
  })

  it('each request uses the specified ports in an infinite sequential loop', () => {
    // Каждый запрос использует указанные порты в бесконечном последовательном цикле
    const EXPECTED_PORTS = [9050, 9052, 9050]
    EXPECTED_PORTS.forEach((expectedPort) => {
      const { metadata } = interceptor({ headers: { tor: 'true' } })

      expect(metadata?.socksPort).toBe(expectedPort)
    })
  })

  it('if not header tor=true httpsAgent is undefined', () => {
    const config = interceptor({ headers: { some: 'headers' } })

    expect(config.httpsAgent).toBeUndefined()
  })

  it('if not header httpsAgent is undefined', () => {
    const config = interceptor({})

    expect(config.httpsAgent).toBeUndefined()
  })
})
