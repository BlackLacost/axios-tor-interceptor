import { AxiosInstance, AxiosStatic } from 'axios'
import { genSocksProxyAgents } from './genSocksProxyAgents'
import { initLog, type LogLevel } from './logging'
import { requestInterceptor } from './request.interceptor'
import { responseInterceptor } from './response.interceptor'

/**
 * The torInterceptor
 *
 * Example using axios instance
 *
 * ```ts
 * const url = 'https://api.ipify.org/'
 * const api = axios.create({ baseURL: url })
 * torInterceptor(api, [9050, 9052, 9054], logLevel='info')
 * api.get('/', { headers: { tor: 'true' } })
 * ```
 *
 * Example using axios
 *
 * ```ts
 * const url = 'https://api.ipify.org/'
 * torInterceptor(axios, [9050, 9052, 9054], logLevel='silent')
 * axios.get(url, { headers: { tor: 'true' } })
 * ```
 *
 * @param axios Axios instance or axios
 * @param socksPorts Socks ports opened by tor
 * @param logLevel Can be info or silent
 */
export const torInterceptor = (
  axios: AxiosInstance | AxiosStatic,
  socksPorts: number[],
  logLevel: LogLevel = 'info',
) => {
  initLog(logLevel)
  const proxyAgents = genSocksProxyAgents(socksPorts)
  axios.interceptors.request.use(requestInterceptor(proxyAgents))
  axios.interceptors.response.use(responseInterceptor)
}
