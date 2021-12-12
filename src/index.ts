import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { genSocksProxyAgents } from './genSocksProxyAgents'

export const torInterceptor = (
  instance: AxiosInstance,
  socksPorts: number[],
) => {
  const proxyAgents = genSocksProxyAgents(socksPorts)

  instance.interceptors.request.use((request: AxiosRequestConfig) => {
    if (request.headers?.tor) {
      request.httpsAgent = proxyAgents.next().value
    }
    return request
  })

  instance.interceptors.response.use((response: AxiosResponse) => {
    if (response.config.httpsAgent) {
      delete response.config.httpsAgent
    }

    if (response.config.headers?.tor) {
      delete response.config.headers.tor
    }
    return response
  })
}
