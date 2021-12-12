# axios-tor-interceptor

## Functions

### torInterceptor

▸ `Const` **torInterceptor**(`axios`, `socksPorts`): `void`

The torInterceptor

Example using axios instance

```ts
const url = 'https://api.ipify.org/'
const api = axios.create({ baseURL: url })
torInterceptor(api, [9050, 9052, 9054])
api.get('/', { headers: { tor: 'true' } })
```

Example using axios

```ts
const url = 'https://api.ipify.org/'
torInterceptor(axios, [9050, 9052, 9054])
axios.get(url, { headers: { tor: 'true' } })
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `axios` | `AxiosInstance` \| `AxiosStatic` | Axios instance or axios |
| `socksPorts` | `number`[] | Socks ports opened by tor |

#### Returns

`void`

#### Defined in

[index.ts:32](https://github.com/BlackLacost/axios-tor-interceptor/blob/f0db68d/src/index.ts#L32)
