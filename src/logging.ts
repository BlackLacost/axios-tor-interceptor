import { Logger, pino } from 'pino'

let logger: Logger | undefined

/** Logger level.
 * `silent` disable logger.
 * `error` show only errror log.
 * `info` show all logs. Default `info`.
 */
export type LogLevel = 'silent' | 'info' | 'error'

export const initLog = (logLevel: LogLevel) => {
  logger = pino({
    transport: {
      target: 'pino-pretty',
    },
    level: logLevel,
  })
}

export const log = {
  info: <T>(message: string, properties: T): void => {
    return logger?.child(properties).info(message)
  },
  error: <T>(message: string, properties: T): void => {
    return logger?.child(properties).error(message)
  },
}
