import {
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosRequestTransformer,
} from 'axios'
import { Logger } from 'pino'
import SocksProxyAgent from 'socks-proxy-agent/dist/agent'

import { genSocksProxyAgents } from './genSocksProxyAgents'
import { requestInterceptor } from './request.interceptor'

jest.mock('./logging', () => ({
  log: {
    info: jest.fn(),
  },
}))

describe('request interceptor', () => {
  let interceptor: any

  beforeEach(() => {
    const socksPorts: Generator<SocksProxyAgent> = genSocksProxyAgents([
      9050, 9052,
    ])
    interceptor = requestInterceptor(socksPorts)
  })

  it('each request uses the specified ports in an infinite sequential loop', async () => {
    // Каждый запрос использует указанные порты в бесконечном последовательном цикле
    const EXPECTED_PORTS = [9050, 9052, 9050]
    EXPECTED_PORTS.forEach((expectedPort) => {
      const config = interceptor({ headers: { tor: 'true' } })

      expect(config.httpsAgent.proxy.port).toBe(expectedPort)
    })
  })

  it('if not header tor=true httpsAgent is undefined', async () => {
    const config = interceptor({ headers: { some: 'headers' } })

    expect(config.httpsAgent).toBeUndefined()
  })

  it('if not header httpsAgent is undefined', async () => {
    const config = interceptor({})

    expect(config.httpsAgent).toBeUndefined()
  })
})
