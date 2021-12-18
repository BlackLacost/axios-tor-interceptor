import { AxiosRequestConfig } from 'axios'
import { Logger, pino } from 'pino'

let logger: Logger | undefined

/** Logger level.
 * `silent` disable logger.
 * `info` show all logs. Default `info`
 */
export type LogLevel = 'silent' | 'info'

export const initLog = (logLevel: LogLevel) => {
  logger = pino({
    transport: {
      target: 'pino-pretty',
    },
    level: logLevel,
  })
}

export const log = {
  info: (message: string, properties: any): void => {
    return logger?.child(properties).info(message)
  },
}
