# axios-tor-interceptor

## Type aliases

### LogLevel

Ƭ **LogLevel**: ``"silent"`` \| ``"info"``

Logger level.
`silent` disable logger.
`info` show all logs. Default `info`

#### Defined in

[logging.ts:10](https://github.com/BlackLacost/axios-tor-interceptor/blob/23906a7/src/logging.ts#L10)

## Functions

### torInterceptor

▸ `Const` **torInterceptor**(`axios`, `socksPorts`, `logLevel?`): `void`

The torInterceptor

Example using axios instance

```ts
const url = 'https://api.ipify.org/'
const api = axios.create({ baseURL: url })
torInterceptor(api, [9050, 9052, 9054], logLevel='info')
api.get('/', { headers: { tor: 'true' } })
```

Example using axios

```ts
const url = 'https://api.ipify.org/'
torInterceptor(axios, [9050, 9052, 9054], logLevel='silent')
axios.get(url, { headers: { tor: 'true' } })
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `axios` | `AxiosInstance` \| `AxiosStatic` | `undefined` | Axios instance or axios |
| `socksPorts` | `number`[] | `undefined` | Socks ports opened by tor |
| `logLevel` | [`LogLevel`](README.md#loglevel) | `'info'` | Can be info or silent |

#### Returns

`void`

#### Defined in

[interceptor.ts:31](https://github.com/BlackLacost/axios-tor-interceptor/blob/23906a7/src/interceptor.ts#L31)
