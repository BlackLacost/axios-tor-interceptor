import { responseInterceptor } from './response.interceptor'

describe('response interceptor', () => {
  it('delete httpsAgent', async () => {
    const response = (responseInterceptor as any)({
      config: { httpsAgent: 'dummy' },
    })

    expect(response.config).toEqual({})
  })

  it('delete tor=true', async () => {
    const response = (responseInterceptor as any)({
      config: { headers: { tor: 'true' } },
    })

    expect(response.config).toEqual({ headers: {} })
  })
})
