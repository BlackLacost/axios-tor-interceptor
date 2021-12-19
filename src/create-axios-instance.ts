import { AxiosInstance, AxiosStatic } from 'axios'

function isAxiosStatic(
  axios: AxiosInstance | AxiosStatic,
): axios is AxiosStatic {
  return (axios as AxiosStatic).isAxiosError !== undefined
}

export function createAxiosInstance(
  axios: AxiosInstance | AxiosStatic,
): AxiosInstance {
  if (isAxiosStatic(axios)) {
    return axios.create({
      timeout: 10000,
    })
  }
  return axios
}
