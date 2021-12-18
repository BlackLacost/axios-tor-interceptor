import { AxiosInterceptorManager, AxiosRequestConfig } from 'axios'
import { SocksProxyAgent } from 'socks-proxy-agent'

export const requestInterceptor =
  (proxyAgents: Generator<SocksProxyAgent>) =>
  (request: AxiosRequestConfig) => {
    if (request.headers?.tor) {
      request.httpsAgent = proxyAgents.next().value
    }
    return request
  }
