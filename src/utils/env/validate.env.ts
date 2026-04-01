import type { ApiEnvDtoOutput } from './index.js'
import { getConfig } from './utils.env'

export function validate(): ApiEnvDtoOutput {
	return getConfig()
}
