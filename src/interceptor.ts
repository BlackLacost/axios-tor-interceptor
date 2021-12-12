import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosStatic,
} from 'axios'
import { genSocksProxyAgents } from './genSocksProxyAgents'

/**
 * The torInterceptor
 *
 * Example using axios instance
 *
 * ```ts
 * const url = 'https://api.ipify.org/'
 * const api = axios.create({ baseURL: url })
 * torInterceptor(api, [9050, 9052, 9054])
 * api.get('/', { headers: { tor: 'true' } })
 * ```
 *
 * Example using axios
 *
 * ```ts
 * const url = 'https://api.ipify.org/'
 * torInterceptor(axios, [9050, 9052, 9054])
 * axios.get(url, { headers: { tor: 'true' } })
 * ```
 *
 * @param axios Axios instance or axios
 * @param socksPorts Socks ports opened by tor
 */
export const torInterceptor = (
  axios: AxiosInstance | AxiosStatic,
  socksPorts: number[],
) => {
  const proxyAgents = genSocksProxyAgents(socksPorts)

  axios.interceptors.request.use((request: AxiosRequestConfig) => {
    if (request.headers?.tor) {
      request.httpsAgent = proxyAgents.next().value
    }
    return request
  })

  axios.interceptors.response.use((response: AxiosResponse) => {
    if (response.config.httpsAgent) {
      delete response.config.httpsAgent
    }

    if (response.config.headers?.tor) {
      delete response.config.headers.tor
    }
    return response
  })
}

