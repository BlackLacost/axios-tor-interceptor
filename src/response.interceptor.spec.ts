import { AxiosResponse } from 'axios'
import { responseInterceptor } from './response.interceptor'

describe('response interceptor', () => {
  let axiosResponse: AxiosResponse

  beforeEach(() => {
    axiosResponse = {
      data: '',
      status: 200,
      config: { url: 'https://mocked.url' },
      statusText: 'Some Status Text',
      headers: {},
    }
  })

  it('delete httpsAgent', () => {
    axiosResponse.config = { httpsAgent: 'dummy' }

    const response = responseInterceptor(axiosResponse)

    expect(response.config).toEqual({})
  })

  it('delete tor=true', () => {
    axiosResponse.config = { headers: { tor: 'true' } }

    const response = responseInterceptor(axiosResponse)

    expect(response.config).toEqual({ headers: {} })
  })
})
