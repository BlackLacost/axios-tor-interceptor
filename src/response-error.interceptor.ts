import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { SocksProxyAgent } from 'socks-proxy-agent'
import { log } from './logging'

export const responseError =
  (axiosInstance: AxiosInstance, proxyAgents: Generator<SocksProxyAgent>) =>
  (error: unknown): Promise<AxiosError> => {
    if (axios.isAxiosError(error)) {
      const currentSocksPort = error.config.httpsAgent?.proxy.port

      if (error.message.includes('ECONNREFUSED')) {
        log.error('response error tor interceptor', {
          response: {
            message: error.message,
            socksPort: currentSocksPort,
            info: `the socks port ${currentSocksPort} may not be open`,
          },
        })
        return Promise.reject(error)
      }
    }

    return Promise.reject(error)
  }
