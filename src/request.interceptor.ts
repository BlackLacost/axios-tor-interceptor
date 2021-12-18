import { AxiosInterceptorManager, AxiosRequestConfig } from 'axios'
import { Logger } from 'pino'
import { SocksProxyAgent } from 'socks-proxy-agent'
import { log } from './logging'

export const requestInterceptor =
  (proxyAgents: Generator<SocksProxyAgent>) =>
  (request: AxiosRequestConfig) => {
    if (request.headers?.tor) {
      const httpsAgent = proxyAgents.next().value
      request.httpsAgent = httpsAgent
      log.info('tor request interceptor', {
        request: {
          url: request.url,
          socksPort: request.httpsAgent.proxy.port,
        },
      })
    }
    return request
  }
