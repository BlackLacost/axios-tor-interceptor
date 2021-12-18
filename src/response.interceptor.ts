import { AxiosResponse } from 'axios'

export const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
  if (response.config.httpsAgent) {
    delete response.config.httpsAgent
  }

  if (response.config.headers?.tor) {
    delete response.config.headers.tor
  }
  return response
}
