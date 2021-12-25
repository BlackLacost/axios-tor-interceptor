import axios, { AxiosError, AxiosInstance } from 'axios'
import { GenSocksProxyAgents } from './genSocksProxyAgents'
import { log } from './logging'

export const responseError =
  (axiosInstance: AxiosInstance, proxyAgents: GenSocksProxyAgents) =>
  (error: unknown): Promise<AxiosError> => {
    if (axios.isAxiosError(error)) {
      const { socksProxyAgent: newHttpsAgent, socksPort: nextSocksPort } =
        proxyAgents.next().value

      const currentSocksPort = error.config.metadata?.socksPort

      if (currentSocksPort) {
        if (error.message.includes('timeout')) {
          log.error('response error tor interceptor', {
            response: {
              message: error.message,
              socksPort: currentSocksPort,
              info: `retrying the current request with next socks port ${nextSocksPort}`,
            },
          })
          error.config.httpsAgent = newHttpsAgent
          return axiosInstance.request(error.config)
        }

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
    }

    return Promise.reject(error)
  }
