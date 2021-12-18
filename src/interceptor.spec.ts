import axios from 'axios'
import { torInterceptor } from './interceptor'
import { genSocksProxyAgents } from './genSocksProxyAgents'

jest.mock('axios', () => ({
  interceptors: {
    request: {
      use: jest.fn(),
    },
    response: {
      use: jest.fn(),
    },
  },
}))

jest.mock('./genSocksProxyAgents')

describe('tor interceptor', () => {
  const SOCKS_PORTS = [9050, 9052]

  it('torInterceptor call genSocksProxyAgents with socks ports', async () => {
    torInterceptor(axios, SOCKS_PORTS)

    expect(genSocksProxyAgents).toHaveBeenCalledWith(SOCKS_PORTS)
  })

  it('torInterceptor adds interceptors to the request and response', async () => {
    torInterceptor(axios, SOCKS_PORTS)

    expect(axios.interceptors.request.use).toHaveBeenCalledTimes(1)
    expect(axios.interceptors.response.use).toHaveBeenCalledTimes(1)
  })
})
