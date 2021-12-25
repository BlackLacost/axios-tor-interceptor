import { AxiosRequestConfig } from 'axios'
import { type GenSocksProxyAgents } from './genSocksProxyAgents'
import { log } from './logging'

export type RequestInterceptor = (
  request: AxiosRequestConfig,
) => AxiosRequestConfig

export const requestInterceptor =
  (proxyAgents: GenSocksProxyAgents) =>
  (request: AxiosRequestConfig): AxiosRequestConfig => {
    if (request.headers?.tor) {
      const { socksProxyAgent, socksPort } = proxyAgents.next().value
      request.httpsAgent = socksProxyAgent
      request.metadata = { socksPort }
      log.info('tor request interceptor', {
        request: {
          url: request.url,
          socksPort: socksPort,
        },
      })
    }
    return request
  }
